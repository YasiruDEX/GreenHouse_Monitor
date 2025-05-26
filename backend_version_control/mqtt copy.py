import json
import time
import paho.mqtt.client as mqtt
from collections import deque
import firebase_admin
from firebase_admin import credentials, db
from datetime import datetime

def get_current_stage(now: datetime) -> tuple[str, int]:
    stage1_duration = 3  
    stage1_value = 2000

    stage2_duration = 3
    stage2_value = 2400

    stage3_duration = 3  
    stage3_value = 2300

    stage4_duration = 2  
    stage4_value = 2500

    stage5_duration = 1  
    stage5_value = 1400

    # --- Stage Calculation ---
    total_duration = stage1_duration + stage2_duration + stage3_duration + stage4_duration + stage5_duration
    start_date = datetime(2025, 1, 1)  # Adjust this as needed
    current_date = now
    months_passed = (current_date.year - start_date.year) * 12 + current_date.month - start_date.month

    stage = None
    if months_passed < stage1_duration:
        stage = "Stage 1"
        Water_Supply = stage1_value
    elif months_passed < stage1_duration + stage2_duration:
        stage = "Stage 2"
        Water_Supply = stage2_value
    elif months_passed < stage1_duration + stage2_duration + stage3_duration:
        stage = "Stage 3"
        Water_Supply = stage3_value
    elif months_passed < stage1_duration + stage2_duration + stage3_duration + stage4_duration:
        stage = "Stage 4"
        Water_Supply = stage4_value
    elif months_passed < total_duration:
        stage = "Stage 5"
        Water_Supply = stage5_value
    else:
        stage = "Completed"
        Water_Supply = 0

    print(f"[INFO] Current Stage: {stage}")
    print(f"[INFO] Total Project Duration: {total_duration} months")
    print(f"[INFO] Elapsed Time Since Start: {months_passed} months")
    return stage, Water_Supply

now = datetime.now()  
print(f"[INFO] Current Date and Time: {now.strftime('%Y-%m-%d %H:%M:%S')}")

stage, Water_Supply = get_current_stage(now)

time.sleep(2)

# --- Global Variables ---
prev_water_command = False
last_supply = "none"


# --- Firebase Initialization ---
cred = credentials.Certificate("service_key.json")
firebase_admin.initialize_app(cred, {
    "databaseURL": "https://project-bell-pepper-default-rtdb.firebaseio.com/"
})

# --- MQTT Broker Settings ---
BROKER = "broker.emqx.io"
PORT = 1883
DATA_TOPIC = "Bellpepergreen/data"
COMMAND_TOPIC = "Bellpepergreen/command"
CLIENT_ID = "python_mqtt_combined"

# --- Buffers for sensor data ---
buffers = {
    "Humidity": deque(maxlen=6),
    "Temperature": deque(maxlen=6),
    "acidLevel": deque(maxlen=6),
    "baseLevel": deque(maxlen=6),
    "mixerLevel": deque(maxlen=6),
    "supplyLevel": deque(maxlen=6),
    "rainLevel": deque(maxlen=6),
    "SoilPH": deque(maxlen=6),
    "SoilMoisture": deque(maxlen=6),
    "N": deque(maxlen=5),
    "P": deque(maxlen=5),
    "K": deque(maxlen=5),
}

# --- MQTT Client Setup ---
client = mqtt.Client(client_id=CLIENT_ID, protocol=mqtt.MQTTv311)

def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("[INFO] Successfully connected to MQTT broker.")
        client.subscribe(DATA_TOPIC)
        print(f"[INFO] Subscribed to topic: {DATA_TOPIC}")
    else:
        print(f"❌ Connection failed with code {rc}")

def on_message(client, userdata, msg):
    try:
        payload = msg.payload.decode('utf-8')
        data = json.loads(payload)
        print("[DEBUG] MQTT message received.")
        print(json.dumps(data, indent=2))

        greenhouse = data.get("GreenHouse1", {})
        for key in buffers:
            if key in greenhouse:
                buffers[key].append(greenhouse[key])

        print("[DEBUG] Buffered Sensor Data (most recent 5):")
        for key, q in buffers.items():
            print(f"  {key}: {list(q)}")

        try:
            db.reference("GreenHouse_1/Green_House_Sensors").update({
                "Humidity": list(buffers["Humidity"]),
                "Temperature": list(buffers["Temperature"])
            })

            db.reference("GreenHouse_1/Soil_Data").update({
                "Moisture": list(buffers["SoilMoisture"]),
                "PH": list(buffers["SoilPH"])
            })

            db.reference("GreenHouse_1/Tank_PH").update({
                "Acid": list(buffers["acidLevel"]),
                "Base": list(buffers["baseLevel"])
            })

            db.reference("GreenHouse_1/Water_Tank_Data").update({
                "Balancing": list(buffers["mixerLevel"]),
                "Supply": list(buffers["supplyLevel"]),
                "rainwater": list(buffers["rainLevel"])
            })

            db.reference("NPK_Sensor_Data").update({
                "nitrogen": buffers["N"][-1] if buffers["N"] else 0,
                "phosphorus": buffers["P"][-1] if buffers["P"] else 0,
                "potassium": buffers["K"][-1] if buffers["K"] else 0
            })
        except Exception as e:
            print(f"[ERROR] Firebase update failed: {e}")

    except json.JSONDecodeError:
        print(f"[WARN] Received malformed JSON: {payload}")

def get_and_send_command():
    global Water_Supply
    global prev_water_command
    global last_supply
    try:
        fan_control_data = db.reference("GreenHouse_1/Fan_Control").get()
        npk_command = db.reference("NPK_Sensor_Data/command/command").get()
        water_command = db.reference("GreenHouse_1/Water_Control/command").get()
        
        if water_command and prev_water_command != water_command:
            mixer_command = Water_Supply
            supply_command = Water_Supply
        else:
            mixer_command = 0
            supply_command = 0
            
        prev_water_command = water_command
        
        
        # --- Time-based Control Logic ---
        current_hour = now.hour
        print(f"[INFO] Evaluating commands for hour: {current_hour}")
        if current_hour == 9 and last_supply != "morning":
            print("[ACTION] Morning routine: Sending water supply command.")
            last_supply = "morning"
            mixer_command = Water_Supply
            supply_command = Water_Supply / 2
        elif current_hour == 18 and last_supply != "evening":
            print("[ACTION] Evening routine: Reducing mixer, maintaining supply.")
            last_supply = "evening"
            mixer_command = 0
            supply_command = Water_Supply / 2

        command_data = {
            "Fan_Control": fan_control_data,
            "NPK_Command": npk_command,
            "mixer_control": mixer_command,
            "supply_control": supply_command,
        }

        client.publish(COMMAND_TOPIC, json.dumps(command_data))
        print(f"[INFO] Command published to MQTT: {json.dumps(command_data)}")
    except Exception as e:
        print(f"[ERROR] Failed to send command: {e}")

def main():
    client.on_connect = on_connect
    client.on_message = on_message
    client.connect(BROKER, PORT, keepalive=60)
    client.loop_start()

    while True:
        get_and_send_command()
        time.sleep(1)

if __name__ == "__main__":
    main()