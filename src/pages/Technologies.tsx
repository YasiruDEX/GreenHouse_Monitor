import { Card } from "@/components/ui/card";

const Technologies = () => {
  const technologies = [
    {
      title: "ESP-NOW",
      description:
        "A protocol developed by Espressif that enables multiple ESP32 devices to communicate with each other without using a traditional Wi-Fi connection. Perfect for short-range, low-power communication between sensors and controllers.",
      icon: "📡",
    },
    {
      title: "LoRa",
      description:
        "Long Range (LoRa) technology enables long-distance communication with low power consumption. Ideal for transmitting sensor data from remote greenhouse locations to central monitoring stations.",
      icon: "🔋",
    },
    {
      title: "Automated Irrigation",
      description:
        "Smart watering system that monitors soil moisture and delivers precise amounts of water.",
      icon: "💧",
    },
    {
      title: "pH Monitoring",
      description:
        "Continuous monitoring of nutrient solution pH levels for optimal plant growth.",
      icon: "🧪",
    },
    {
      title: "Growth Tracking",
      description:
        "Advanced sensors and cameras to monitor plant development phases.",
      icon: "📊",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
          Our Technologies
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {technologies.map((tech) => (
            <Card key={tech.title} className="p-6">
              <div className="text-4xl mb-4">{tech.icon}</div>
              <h3 className="text-lg font-medium text-gray-900">{tech.title}</h3>
              <p className="mt-2 text-gray-500">{tech.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Technologies;