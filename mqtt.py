import json
import time
import paho.mqtt.client as mqtt
from collections import deque
import firebase_admin
from firebase_admin import credentials, db
from datetime import datetime
from pytz import timezone

def get_current_stage(now: datetime) -> tuple[str, int]:
    stage1_duration = 3
    stage1_value = 30

    stage2_duration = 3
    stage2_value = 5

    stage3_duration = 3
    stage3_value = 50

    stage4_duration = 2
    stage4_value = 40

    stage5_duration = 1
    stage5_value = 20

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

now = datetime.now(timezone("Asia/Colombo"))
print(f"[INFO] Current Date and Time: {now.strftime('%Y-%m-%d %H:%M:%S')}")

stage, Water_Supply = get_current_stage(now)

time.sleep(2)

# --- Global Variables ---
prev_water_command = False
last_supply = "morning"

prev_fan_control_data = "true"
prev_npk_command = "true"
prev_mixer_command = 0
prev_supply_command = 0


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

# Buffers for sensor data
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

# Global state
prev_water_command = False
last_supply = None

# MQTT Client Setup
client = mqtt.Client(client_id=CLIENT_ID, protocol=mqtt.MQTTv311)

def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("[INFO] Successfully connected to MQTT broker.")
        client.subscribe(DATA_TOPIC)
        print(f"[INFO] Subscribed to topic: {DATA_TOPIC}")
    else:
        print(f"❌ Connection failed with code {rc}")

client.on_connect = on_connect

# Handle incoming sensor data
client.on_message = lambda client, userdata, msg: handle_message(msg)
def handle_message(msg):
    try:
        payload = msg.payload.decode('utf-8')
        data = json.loads(payload)
        greenhouse = data.get("GreenHouse1", {})
        for key in buffers:
            if key in greenhouse:
                buffers[key].append(greenhouse[key])

        # Update Firebase
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

        print("[DEBUG] Buffered Sensor Data:")
        for key, q in buffers.items():
            print(f"  {key}: {list(q)}")
    except Exception as e:
        print(f"[ERROR] on_message handling failed: {e}")

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
    global prev_water_command, last_supply
    global prev_fan_control_data
    global prev_npk_command
    global prev_mixer_command
    global prev_supply_command

    now = datetime.now(timezone("Asia/Colombo"))

    stage, Water_Supply = get_current_stage(now)
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

        # Time-based automatic watering
        next_water = None
        if now.hour < 9:
            next_water = now.replace(hour=9, minute=0, second=0, microsecond=0)
            period = 'morning'
        elif now.hour < 18:
            next_water = now.replace(hour=18, minute=0, second=0, microsecond=0)
            period = 'evening'
        else:
            next_water = (now + timedelta(days=1)).replace(hour=9, minute=0, second=0, microsecond=0)
            period = 'morning'

        # Scheduled routines
        if period == 'morning' and now.hour == 9 and last_supply != period:
            print("[ACTION] Morning routine: Sending water supply command.")
            mixer_command = Water_Supply
            supply_command = Water_Supply / 2
            last_supply = period
        elif period == 'evening' and now.hour == 18 and last_supply != period:
            print("[ACTION] Evening routine: Reducing mixer, maintaining supply.")
            mixer_command = 0
            supply_command = Water_Supply / 2
            last_supply = period

        # Publish command
        command_data = {
            "Fan_Control": fan_control_data,
            "NPK_Command": npk_command,
            "mixer_control": mixer_command,
            "suppy_control": supply_command
        }

        if (prev_fan_control_data != fan_control_data) or (prev_npk_command != npk_command) or (prev_mixer_command != mixer_command) or (prev_supply_command != supply_command):
          client.publish(COMMAND_TOPIC, json.dumps(command_data))
          if (prev_mixer_command) > 0 or (prev_supply_command) > 0 :
            time.sleep(10)
          print(f"[INFO] Command published: {command_data}")

        prev_fan_control_data = fan_control_data
        prev_npk_command = npk_command
        prev_mixer_command = mixer_command
        prev_supply_command = supply_command

        # Time until next automatic watering
        delta = next_water - now
        hrs, rem = divmod(int(delta.total_seconds()), 3600)
        mins, secs = divmod(rem, 60)
        print(f"[INFO] Time until next automatic watering ({period}): {hrs}h {mins}m {secs}s")
    except Exception as e:
        print(f"[ERROR] Failed to send command: {e}")

# Main loop

def main():
    client.connect(BROKER, PORT, keepalive=60)
    client.loop_start()
    client.on_message = on_message

    while True:
        get_and_send_command()
        time.sleep(1)

if __name__ == "__main__":
    print(f"[INFO] Starting MQTT-Firebase bridge at {datetime.now()}")
    main()