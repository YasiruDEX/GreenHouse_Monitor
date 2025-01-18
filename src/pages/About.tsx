const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
            About Our Greenhouse Monitoring System
          </h2>
          <div className="prose prose-green mx-auto">
            <p className="text-gray-500 leading-relaxed">
              Our state-of-the-art greenhouse monitoring system provides real-time
              tracking of crucial environmental parameters to ensure optimal growing
              conditions for your crops. We specialize in bell pepper cultivation,
              maintaining precise control over water levels, pH balance, and growth
              phases.
            </p>
            <p className="text-gray-500 leading-relaxed mt-4">
              With years of experience in agricultural technology, our system has
              been designed to maximize yield while minimizing resource usage. We
              combine traditional farming knowledge with cutting-edge technology to
              create the perfect growing environment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;