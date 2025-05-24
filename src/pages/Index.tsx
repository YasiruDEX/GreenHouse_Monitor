import { Card, CardContent } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { database } from "./../firebase";
import { ref, onValue, update } from "firebase/database";
import React, { useEffect, useState, useMemo } from "react";
import { FollowerPointerCard } from "@/components/ui/following-pointer";
import { Switch } from "@headlessui/react"; // Importing switch from Headless UI

const Index = () => {
  const [data, setData] = useState(null);
  const [fanStatus, setFanStatus] = useState(false); // Track fan status
  const [humidifierStatus, setHumidifierStatus] = useState(false);
  const [npkData, setNpkData] = useState(null); // Track NPK sensor data
  const [waterStatus, setWaterStatus] = useState(false);
  const [npkCommandStatus, setNpkCommandStatus] = useState(false);

  useEffect(() => {
    // Listen to GreenHouse_1 changes
    const dbRef = ref(database, "/GreenHouse_1");
    onValue(dbRef, (snapshot) => {
      setData(snapshot.val());
    });
  }, []);

  // Fetching NPK sensor data (both current values and history)
  const fetchNPKData = () => {
    const npkRef = ref(database, "/NPK_Sensor_Data");
    onValue(npkRef, (snapshot) => {
      setNpkData(snapshot.val());
    });
  };

  // Optionally, load NPK data on mount
  useEffect(() => {
    fetchNPKData();
  }, []);

  // Toggle Fan Control
  const toggleFan = () => {
    const newStatus = !fanStatus;
    setFanStatus(newStatus);
    // Update fan status in Firebase
    const fanControlRef = ref(database, "/GreenHouse_1/Fan_Control");
    update(fanControlRef, {
      fan_status: newStatus,
    });
  };

  // Toggle Humidifier Control
  const toggleHumidifier = () => {
    const newStatus = !humidifierStatus;
    setHumidifierStatus(newStatus);
    const humidifierControlRef = ref(database, "/GreenHouse_1/Fan_Control");
    update(humidifierControlRef, {
      humidifier_status: newStatus,
    });
  };

  // Water Flow Control Handler
  const handleWaterFlow = () => {
    const waterControlRef = ref(database, "/GreenHouse_1/Water_Control");
    update(waterControlRef, { command: true });
    setWaterStatus(true);
    setTimeout(() => {
      update(waterControlRef, { command: false });
      setWaterStatus(false);
    }, 5000);
  };

  // NPK Command Control Handler
  const handleNpkCommand = () => {
    const npkControlRef = ref(database, "/NPK_Sensor_Data");
    update(npkControlRef, { command: true });
    setNpkCommandStatus(true);
    setTimeout(() => {
      update(npkControlRef, { command: false });
      setNpkCommandStatus(false);
    }, 5000);
  };

  // Helper function to get sensor values or 'N/A'
  const getSensorValue = (sensorData, index) => {
    return sensorData && sensorData[index]
      ? JSON.stringify(sensorData[index])
      : 0;
  };

  const waterTankData = [
    {
      time: "00:00",
      balancing: getSensorValue(data?.Water_Tank_Data?.Balancing, 0),
      supply: getSensorValue(data?.Water_Tank_Data?.Supply, 0),
      rainwater: getSensorValue(data?.Water_Tank_Data?.rainwater, 0),
    },
    {
      time: "04:00",
      balancing: getSensorValue(data?.Water_Tank_Data?.Balancing, 1),
      supply: getSensorValue(data?.Water_Tank_Data?.Supply, 1),
      rainwater: getSensorValue(data?.Water_Tank_Data?.rainwater, 1),
    },
    {
      time: "08:00",
      balancing: getSensorValue(data?.Water_Tank_Data?.Balancing, 2),
      supply: getSensorValue(data?.Water_Tank_Data?.Supply, 2),
      rainwater: getSensorValue(data?.Water_Tank_Data?.rainwater, 2),
    },
    {
      time: "12:00",
      balancing: getSensorValue(data?.Water_Tank_Data?.Balancing, 3),
      supply: getSensorValue(data?.Water_Tank_Data?.Supply, 3),
      rainwater: getSensorValue(data?.Water_Tank_Data?.rainwater, 3),
    },
    {
      time: "16:00",
      balancing: getSensorValue(data?.Water_Tank_Data?.Balancing, 4),
      supply: getSensorValue(data?.Water_Tank_Data?.Supply, 4),
      rainwater: getSensorValue(data?.Water_Tank_Data?.rainwater, 4),
    },
    {
      time: "20:00",
      balancing: getSensorValue(data?.Water_Tank_Data?.Balancing, 5),
      supply: getSensorValue(data?.Water_Tank_Data?.Supply, 5),
      rainwater: getSensorValue(data?.Water_Tank_Data?.rainwater, 5),
    },
  ];

  const phTankData = [
    {
      time: "00:00",
      acid: getSensorValue(data?.Tank_PH?.Acid, 0),
      base: getSensorValue(data?.Tank_PH?.Base, 0),
    },
    {
      time: "04:00",
      acid: getSensorValue(data?.Tank_PH?.Acid, 1),
      base: getSensorValue(data?.Tank_PH?.Base, 1),
    },
    {
      time: "08:00",
      acid: getSensorValue(data?.Tank_PH?.Acid, 2),
      base: getSensorValue(data?.Tank_PH?.Base, 2),
    },
    {
      time: "12:00",
      acid: getSensorValue(data?.Tank_PH?.Acid, 3),
      base: getSensorValue(data?.Tank_PH?.Base, 3),
    },
    {
      time: "16:00",
      acid: getSensorValue(data?.Tank_PH?.Acid, 4),
      base: getSensorValue(data?.Tank_PH?.Base, 4),
    },
    {
      time: "20:00",
      acid: getSensorValue(data?.Tank_PH?.Acid, 5),
      base: getSensorValue(data?.Tank_PH?.Base, 5),
    },
  ];

  const soilData = [
    {
      time: "00:00",
      moisture: getSensorValue(data?.Soil_Data?.Moisture, 0),
      ph: getSensorValue(data?.Soil_Data?.PH, 0),
    },
    {
      time: "04:00",
      moisture: getSensorValue(data?.Soil_Data?.Moisture, 1),
      ph: getSensorValue(data?.Soil_Data?.PH, 1),
    },
    {
      time: "08:00",
      moisture: getSensorValue(data?.Soil_Data?.Moisture, 2),
      ph: getSensorValue(data?.Soil_Data?.PH, 2),
    },
    {
      time: "12:00",
      moisture: getSensorValue(data?.Soil_Data?.Moisture, 3),
      ph: getSensorValue(data?.Soil_Data?.PH, 3),
    },
    {
      time: "16:00",
      moisture: getSensorValue(data?.Soil_Data?.Moisture, 4),
      ph: getSensorValue(data?.Soil_Data?.PH, 4),
    },
    {
      time: "20:00",
      moisture: getSensorValue(data?.Soil_Data?.Moisture, 5),
      ph: getSensorValue(data?.Soil_Data?.PH, 5),
    },
  ];

  const environmentData = [
    {
      time: "00:00",
      temperature: getSensorValue(
        data?.Green_House_Sensors?.Temperature,
        0
      ),
      humidity: getSensorValue(data?.Green_House_Sensors?.Humidity, 0),
    },
    {
      time: "04:00",
      temperature: getSensorValue(
        data?.Green_House_Sensors?.Temperature,
        1
      ),
      humidity: getSensorValue(data?.Green_House_Sensors?.Humidity, 1),
    },
    {
      time: "08:00",
      temperature: getSensorValue(
        data?.Green_House_Sensors?.Temperature,
        2
      ),
      humidity: getSensorValue(data?.Green_House_Sensors?.Humidity, 2),
    },
    {
      time: "12:00",
      temperature: getSensorValue(
        data?.Green_House_Sensors?.Temperature,
        3
      ),
      humidity: getSensorValue(data?.Green_House_Sensors?.Humidity, 3),
    },
    {
      time: "16:00",
      temperature: getSensorValue(
        data?.Green_House_Sensors?.Temperature,
        4
      ),
      humidity: getSensorValue(data?.Green_House_Sensors?.Humidity, 4),
    },
    {
      time: "20:00",
      temperature: getSensorValue(
        data?.Green_House_Sensors?.Temperature,
        5
      ),
      humidity: getSensorValue(data?.Green_House_Sensors?.Humidity, 5),
    },
  ];

  // Prepare NPK history data if available (assuming arrays of 10 data points)
  const npkHistoryData = useMemo(() => {
    if (npkData && npkData.history && npkData.history.nitrogen) {
      return npkData.history.nitrogen.map((nitro, i) => ({
        index: i + 1,
        nitrogen: nitro,
        phosphorus: npkData.history.phosphorus[i],
        potassium: npkData.history.potassium[i],
      }));
    }
    return [];
  }, [npkData]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Bell Pepper Growth Phase */}
          <div className="mt-6 mb-6">
            <FollowerPointerCard
              title={
                <TitleComponent title={"Bell Protector"} avatar={"favicon.ico"} />
              }
            >
              <Card className="p-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Bell Pepper Growth Phase
                </h3>
                <div className="mt-4">
                  <div className="space-y-4">
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary bg-primary/10">
                            {data?.Phase?.Name}
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                        <div
                          style={{ width: `${data?.Phase?.Percentage}%` }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </FollowerPointerCard>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <FollowerPointerCard
              title={
                <TitleComponent title={"Bell Protector"} avatar={"favicon.ico"} />
              }
            >
              <Card className="p-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Daily Water Demand
                </h3>
                <p className="text-3xl font-bold text-primary mt-2">
                  {data && data.Daily_Water_Demand
                    ? JSON.stringify(data.Daily_Water_Demand)
                    : "N/A"}{" "}
                  L
                </p>
              </Card>
            </FollowerPointerCard>

            <FollowerPointerCard
              title={
                <TitleComponent title={"Bell Protector"} avatar={"favicon.ico"} />
              }
            >
              <Card className="p-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Target pH Value
                </h3>
                <p className="text-3xl font-bold text-primary mt-2">
                  {data && data.Target_PH ? JSON.stringify(data.Target_PH) : "N/A"}
                </p>
              </Card>
            </FollowerPointerCard>

            <FollowerPointerCard
              title={
                <TitleComponent title={"Bell Protector"} avatar={"favicon.ico"} />
              }
            >
              <Card className="p-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Current Temperature
                </h3>
                <p className="text-3xl font-bold text-orange-500 mt-2">
                  {environmentData[environmentData.length - 1].temperature}°C
                </p>
              </Card>
            </FollowerPointerCard>

            <FollowerPointerCard
              title={
                <TitleComponent title={"Bell Protector"} avatar={"favicon.ico"} />
              }
            >
              <Card className="p-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Current Humidity
                </h3>
                <p className="text-3xl font-bold text-blue-500 mt-2">
                  {environmentData[environmentData.length - 1].humidity}%
                </p>
              </Card>
            </FollowerPointerCard>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Water Tank Levels */}
            <Card className="p-6">
              <h3 className="text-lg font-medium text-gray-900">
                Water Tank Levels
              </h3>
              <div className="mt-4 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={waterTankData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="balancing"
                      name="Balancing Tank"
                      stroke="#0ea5e9"
                      fill="#bae6fd"
                    />
                    <Area
                      type="monotone"
                      dataKey="supply"
                      name="Supply Tank"
                      stroke="#2dd4bf"
                      fill="#99f6e4"
                    />
                    <Area
                      type="monotone"
                      dataKey="rainwater"
                      name="Rainwater Tank"
                      stroke="#818cf8"
                      fill="#c7d2fe"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-medium text-gray-900">
                PH Tank Levels
              </h3>
              <div className="mt-4 h-64">
                <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={phTankData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="acid"
                    name="Acid Tank"
                    stroke="#f43f5e"
                    fill="#fecdd3"
                  />
                  <Area
                    type="monotone"
                    dataKey="base"
                    name="Base Tank"
                    stroke="#3b82f6"
                    fill="#bfdbfe"
                  />
                </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card> 

            

            {/* Soil Metrics */}
            <Card className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Soil Metrics</h3>
              <div className="mt-4 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={soilData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="moisture"
                      name="Soil Moisture"
                      stroke="#059669"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="ph"
                      name="Soil pH"
                      stroke="#d97706"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* Environment Metrics */}
          <div className="mt-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium text-gray-900">
                Environment Metrics
              </h3>
              <div className="mt-4 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={environmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis yAxisId="temp" orientation="left" stroke="#f97316" />
                    <YAxis yAxisId="humidity" orientation="right" stroke="#3b82f6" />
                    <Tooltip />
                    <Line
                      yAxisId="temp"
                      type="monotone"
                      dataKey="temperature"
                      name="Temperature (°C)"
                      stroke="#f97316"
                      strokeWidth={2}
                    />
                    <Line
                      yAxisId="humidity"
                      type="monotone"
                      dataKey="humidity"
                      name="Humidity (%)"
                      stroke="#3b82f6"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Fan Control & Water Flow Control - Flex Row */}
            <div className="mt-6 flex flex-wrap gap-6">
              {/* Fan Control */}
              <Card className="p-6 w-full md:w-[48%]">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Fan Control</h3>
                <div className="flex justify-center items-center gap-12 h-40">
                  {/* Fan Button with Label */}
                  <div className="flex flex-col items-center">
                    <button
                      onClick={toggleFan}
                      className={`w-20 h-20 rounded-lg flex items-center justify-center transition-colors ${
                        fanStatus ? "bg-green-500" : "bg-gray-300"
                      }`}
                      title={fanStatus ? "Turn Fan Off" : "Turn Fan On"}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4V2m0 20v-2m8-8h2M2 12h2m13.66 6.34l1.42 1.42M4.93 4.93l1.42 1.42M16.24 7.76l1.42-1.42M4.93 19.07l1.42-1.42M12 6a6 6 0 000 12a6 6 0 000-12z"
                        />
                      </svg>
                    </button>
                    <p className="mt-2 text-sm text-gray-700 font-medium">Fan</p>
                  </div>

                  {/* Humidifier Button with Label */}
                  <div className="flex flex-col items-center">
                    <button
                      onClick={toggleHumidifier}
                      className={`w-20 h-20 rounded-lg flex items-center justify-center transition-colors ${
                        humidifierStatus ? "bg-green-500" : "bg-gray-300"
                      }`}
                      title="Toggle Humidifier"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 3C10 6 6 9 6 13a6 6 0 0012 0c0-4-4-7-6-10z"
                        />
                      </svg>
                    </button>
                    <p className="mt-2 text-sm text-gray-700 font-medium">Humidifier</p>
                  </div>
                </div>
              </Card>

              {/* Water Flow Control */}
              <Card className="p-6 w-full md:w-[48%] bg-gray-100">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Water Flow Control</h3>
                <div className="flex flex-col justify-center items-center h-40">
                  <button
                    onClick={handleWaterFlow}
                    className={`w-20 h-20 rounded-lg flex items-center justify-center transition duration-300 ${
                      waterStatus ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 2C8 6 6 10 6 13a6 6 0 0012 0c0-3-2-7-6-11z"
                      />
                    </svg>
                  </button>
                  <p className="mt-2 text-sm text-gray-700 font-medium flex items-center gap-1">
                    {/* Water icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 2C8 6 6 10 6 13a6 6 0 0012 0c0-3-2-7-6-11z"
                      />
                    </svg>
                    <span className="text-gray-500">Water Flow</span>
                  </p>
                </div>
              </Card>
            </div>
            {/* NPK Overview */}
            {/* <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              
              <Card className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Current NPK Readings</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-green-100 p-4 rounded-lg shadow text-center">
                    <div className="text-2xl font-semibold text-green-600">Nitrogen</div>
                    <p className="text-xl font-bold text-green-700 mt-2">
                      {npkData?.nitrogen || "N/A"}
                    </p>
                  </div>
                  <div className="bg-red-100 p-4 rounded-lg shadow text-center">
                    <div className="text-2xl font-semibold text-red-600">Phosphorus</div>
                    <p className="text-xl font-bold text-red-700 mt-2">
                      {npkData?.phosphorus || "N/A"}
                    </p>
                  </div>
                  <div className="bg-yellow-100 p-4 rounded-lg shadow text-center">
                    <div className="text-2xl font-semibold text-yellow-600">Potassium</div>
                    <p className="text-xl font-bold text-yellow-700 mt-2">
                      {npkData?.potassium || "N/A"}
                    </p>
                  </div>
                </div>
              </Card>

              
              <Card className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">NPK Sensor History</h3>
                <div className="mt-4 h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={npkHistoryData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="index" label={{ value: "Measurement", position: "insideBottomRight", offset: -5 }} />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="nitrogen" name="Nitrogen" stroke="#10b981" strokeWidth={2} />
                      <Line type="monotone" dataKey="phosphorus" name="Phosphorus" stroke="#ef4444" strokeWidth={2} />
                      <Line type="monotone" dataKey="potassium" name="Potassium" stroke="#fbbf24" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              
              <Card className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">NPK Control</h3>
                <div className="flex flex-col justify-center items-center h-40">
                  <button
                    onClick={handleNpkCommand}
                    className={`w-20 h-20 rounded-lg flex items-center justify-center transition duration-300 ${
                      npkCommandStatus ? "bg-indigo-500 hover:bg-indigo-600" : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    title={npkCommandStatus ? "Command Sent" : "Send Command"}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </button>
                  <p className="mt-2 text-sm text-gray-700 font-medium">Send Command</p>
                </div>
              </Card>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

const TitleComponent = ({
  title,
  avatar,
}: {
  title: string;
  avatar: string;
}) => (
  <div className="flex space-x-2 items-center">
    <img
      src={avatar}
      height={20}
      width={20}
      alt="thumbnail"
      className="rounded-full border-2 border-white"
    />
    <p>{title}</p>
  </div>
);
export default Index;