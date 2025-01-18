import { Card } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const waterData = [
  { time: "00:00", level: 65 },
  { time: "04:00", level: 68 },
  { time: "08:00", level: 72 },
  { time: "12:00", level: 70 },
  { time: "16:00", level: 69 },
  { time: "20:00", level: 67 },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Water Levels */}
            <Card className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Water Levels</h3>
              <div className="mt-4 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={waterData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="level"
                      stroke="#0ea5e9"
                      fill="#bae6fd"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* pH Levels */}
            <Card className="p-6">
              <h3 className="text-lg font-medium text-gray-900">pH Levels</h3>
              <div className="mt-4">
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary bg-primary/10">
                        Current: 6.5 pH
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                    <div
                      style={{ width: "65%" }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Acidic (0)</span>
                    <span>Neutral (7)</span>
                    <span>Basic (14)</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Bell Pepper Phase */}
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