

import { useState, useEffect, useMemo } from "react";
import { ref, onValue, update } from "firebase/database";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line } from "recharts";
import { Card } from "@/components/ui/card";
import { database } from "./../firebase";

const MineralMonitor = () => {
  const [npkData, setNpkData] = useState<{ nitrogen?: number; phosphorus?: number; potassium?: number } | null>(null);
  const [npkCommandStatus, setNpkCommandStatus] = useState(false);

  // Fetch current NPK data
  useEffect(() => {
    const dataRef = ref(database, "/NPK_Sensor_Data");
    const unlisten = onValue(dataRef, (snapshot) => {
      const values = snapshot.val();
      setNpkData(values);
    });
    return () => unlisten();
  }, []);


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

  // Handler to send command flag for 5 seconds
  const handleNpkCommand = () => {
    const controlRef = ref(database, "/NPK_Sensor_Data/command");
    update(controlRef, { command: true });
    setNpkCommandStatus(true);
    setTimeout(() => {
      update(controlRef, { command: false });
      setNpkCommandStatus(false);
    }, 5000);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mineral Monitor</h1>
      {/* NPK Overview */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Current NPK Readings Card */}
        <Card className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Current NPK Readings</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-green-100 p-4 rounded-lg shadow text-center">
              <div className="text-2xl font-semibold text-green-600">Nitrogen</div>
              <p className="text-xl font-bold text-green-700 mt-2">
                {npkData?.nitrogen ?? "N/A"}
              </p>
            </div>
            <div className="bg-red-100 p-4 rounded-lg shadow text-center">
              <div className="text-2xl font-semibold text-red-600">Phosphorus</div>
              <p className="text-xl font-bold text-red-700 mt-2">
                {npkData?.phosphorus ?? "N/A"}
              </p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg shadow text-center">
              <div className="text-2xl font-semibold text-yellow-600">Potassium</div>
              <p className="text-xl font-bold text-yellow-700 mt-2">
                {npkData?.potassium ?? "N/A"}
              </p>
            </div>
          </div>
        </Card>

        {/* NPK Sensor History Chart Card */}
        <Card className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">NPK Sensor History</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={npkHistoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="index"
                  label={{ value: "Measurement", position: "insideBottomRight", offset: -5 }}
                />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="nitrogen" name="Nitrogen" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="phosphorus" name="Phosphorus" stroke="#ef4444" strokeWidth={2} />
                <Line type="monotone" dataKey="potassium" name="Potassium" stroke="#fbbf24" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* NPK Command Control */}
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </button>
            <p className="mt-2 text-sm text-gray-700 font-medium">Send Command</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MineralMonitor;