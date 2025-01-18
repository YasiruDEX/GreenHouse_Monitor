import { Card } from "@/components/ui/card";

const Technologies = () => {
  const technologies = [
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