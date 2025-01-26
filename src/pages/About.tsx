const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-8">
            About Our Greenhouse Monitoring System
          </h2>
          <p className="text-lg text-gray-600 mb-8">
          A modern system using advanced technology to monitor and improve greenhouse conditions for precise farming.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Real-Time Environmental Monitoring</h3>
            <p className="text-gray-500 leading-relaxed">
              Our system ensures real-time tracking of key environmental parameters such as water levels, pH balance, temperature, humidity, and crop growth phases. This allows for precise control over the growing conditions of bell peppers and other crops.
            </p>
            <div className="mt-4">
              <img
                src="cultivation.webp" // Replace with an actual image
                alt="Greenhouse Monitoring"
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">LoRa Communication & Centralized Gateway</h3>
            <p className="text-gray-500 leading-relaxed">
              The system leverages LoRa (Long Range) communication technology for seamless, low-power, long-distance data transmission between multiple greenhouses. A LoRa-based gateway serves as the central hub, aggregating and managing data across all connected units.
            </p>
            <div className="mt-4">
              <img
                src="Lora.webp" // Replace with an actual image
                alt="LoRa Communication"
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-gray-600 mb-6">
            This innovative system is part of a Final Year Research Project, combining agricultural expertise with the latest IoT technologies. Our aim is to optimize crop yields, reduce resource consumption, and contribute to sustainable agriculture.
          </p>

          <div className="space-x-4">
            <button className="px-6 py-2 text-white bg-green-500 hover:bg-green-600 rounded-lg shadow-md focus:outline-none transform transition duration-200 ease-in-out hover:scale-105">
              Learn More
            </button>
            <button className="px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md focus:outline-none transform transition duration-200 ease-in-out hover:scale-105">
              Contact Us
            </button>
          </div>

          <div className="mt-6">
            <p className="text-lg font-bold text-indigo-600">
              <span className="text-xl">Explore</span> more about our system's capabilities and how we can help you optimize your greenhouse operations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
