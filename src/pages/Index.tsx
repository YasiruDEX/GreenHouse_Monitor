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

const waterTankData = [
  { time: "00:00", balancing: 65, supply: 70, rainwater: 45 },
  { time: "04:00", balancing: 68, supply: 72, rainwater: 48 },
  { time: "08:00", balancing: 72, supply: 75, rainwater: 52 },
  { time: "12:00", balancing: 70, supply: 73, rainwater: 50 },
  { time: "16:00", balancing: 69, supply: 71, rainwater: 49 },
  { time: "20:00", balancing: 67, supply: 70, rainwater: 47 },
];

const phTankData = [
  { time: "00:00", acid: 80, base: 75 },
  { time: "04:00", acid: 82, base: 73 },
  { time: "08:00", acid: 85, base: 70 },
  { time: "12:00", acid: 83, base: 72 },
  { time: "16:00", acid: 81, base: 74 },
  { time: "20:00", acid: 80, base: 73 },
];

const soilData = [
  { time: "00:00", moisture: 65, ph: 6.2 },
  { time: "04:00", moisture: 67, ph: 6.3 },
  { time: "08:00", moisture: 70, ph: 6.4 },
  { time: "12:00", moisture: 68, ph: 6.5 },
  { time: "16:00", moisture: 66, ph: 6.4 },
  { time: "20:00", moisture: 65, ph: 6.3 },
];

const environmentData = [
  { time: "00:00", temperature: 25, humidity: 65 },
  { time: "04:00", temperature: 24, humidity: 68 },
  { time: "08:00", temperature: 26, humidity: 70 },
  { time: "12:00", temperature: 28, humidity: 63 },
  { time: "16:00", temperature: 27, humidity: 65 },
  { time: "20:00", temperature: 25, humidity: 67 },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="p-4">
              <h3 className="text-lg font-medium text-gray-900">Daily Water Demand</h3>
              <p className="text-3xl font-bold text-primary mt-2">2500 L</p>
            </Card>
            <Card className="p-4">
              <h3 className="text-lg font-medium text-gray-900">Target pH Value</h3>
              <p className="text-3xl font-bold text-primary mt-2">6.5</p>
            </Card>
            <Card className="p-4">
              <h3 className="text-lg font-medium text-gray-900">Current Temperature</h3>
              <p className="text-3xl font-bold text-orange-500 mt-2">
                {environmentData[environmentData.length - 1].temperature}°C
              </p>
            </Card>
            <Card className="p-4">
              <h3 className="text-lg font-medium text-gray-900">Current Humidity</h3>
              <p className="text-3xl font-bold text-blue-500 mt-2">
                {environmentData[environmentData.length - 1].humidity}%
              </p>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Water Tank Levels */}
            <Card className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Water Tank Levels</h3>
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

            {/* pH Tank Levels */}
            <Card className="p-6">
              <h3 className="text-lg font-medium text-gray-900">pH Tank Levels</h3>
              <div className="mt-4 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={phTankData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="acid"
                      name="Acid Tank"
                      stroke="#ef4444"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="base"
                      name="Base Tank"
                      stroke="#3b82f6"
                      strokeWidth={2}
                    />
                  </LineChart>
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
              <h3 className="text-lg font-medium text-gray-900">Environment Metrics</h3>
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
          </div>

          {/* Bell Pepper Growth Phase */}
          <div className="mt-6">
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
                          Vegetative Growth
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                      <div
                        style={{ width: "75%" }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
