import { Card } from "@/components/ui/card";

const Greenhouses = () => {
  const greenhouses = [
    {
      id: 1,
      name: "Greenhouse A",
      location: "North Wing",
      crops: "Bell Peppers",
      status: "Active",
    },
    {
      id: 2,
      name: "Greenhouse B",
      location: "South Wing",
      crops: "Bell Peppers",
      status: "Maintenance",
    },
    {
      id: 3,
      name: "Greenhouse C",
      location: "East Wing",
      crops: "Bell Peppers",
      status: "Active",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
          Our Greenhouses
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {greenhouses.map((greenhouse) => (
            <Card key={greenhouse.id} className="p-6">
              <h3 className="text-lg font-medium text-gray-900">
                {greenhouse.name}
              </h3>
              <dl className="mt-4 space-y-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Location</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {greenhouse.location}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Crops</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {greenhouse.crops}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="mt-1">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        greenhouse.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {greenhouse.status}
                    </span>
                  </dd>
                </div>
              </dl>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Greenhouses;