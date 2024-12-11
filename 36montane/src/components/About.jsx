const AboutUs = () => {
  return (
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        {/* Section: Mission & Values */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We are dedicated to providing unforgettable experiences through immersive
            trekking, camping, and adventure travel. Our goal is to inspire people to
            explore the world, connect with nature, and create lasting memories.
          </p>
        </div>

        {/* Section: Company Values */}
        <div className="text-center mb-16">
          <h3 className="text-4xl font-semibold text-gray-800 mb-8">Our Core Values</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105">
              <h4 className="text-xl font-semibold text-green-600 mb-4">Sustainability</h4>
              <p className="text-gray-600">
                We believe in preserving the environment, ensuring sustainable practices
                in all our activities to protect nature for future generations.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105">
              <h4 className="text-xl font-semibold text-green-600 mb-4">Adventure</h4>
              <p className="text-gray-600">
                We encourage our guests to push their limits and embrace the thrill of adventure.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105">
              <h4 className="text-xl font-semibold text-green-600 mb-4">Community</h4>
              <p className="text-gray-600">
                We foster a sense of community by connecting like-minded individuals who share
                a passion for the outdoors.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105">
              <h4 className="text-xl font-semibold text-green-600 mb-4">Safety</h4>
              <p className="text-gray-600">
                The safety of our guests is our top priority. We ensure professional guides and
                safety measures throughout every adventure.
              </p>
            </div>
          </div>
        </div>

        {/* Section: Company History */}
        <div className="text-center mb-16">
          <h3 className="text-4xl font-semibold text-gray-800 mb-8">Our History</h3>
          <div className="relative flex items-center justify-center">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-t-2 border-gray-300 w-full z-0"></div>
            <div className="flex items-center justify-between space-x-8 z-10">
              <div className="text-center">
                <h4 className="text-xl font-semibold text-green-600">2010</h4>
                <p className="text-gray-600">Founded with a vision to inspire outdoor exploration.</p>
              </div>
              <div className="text-center">
                <h4 className="text-xl font-semibold text-green-600">2015</h4>
                <p className="text-gray-600">Expanded to multiple locations globally.</p>
              </div>
              <div className="text-center">
                <h4 className="text-xl font-semibold text-green-600">2020</h4>
                <p className="text-gray-600">Launched eco-friendly camping and trekking options.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Meet the Team */}
        <div className="text-center mb-16">
          <h3 className="text-4xl font-semibold text-gray-800 mb-8">Meet Our Team</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Team Member 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105">
              <img
                className="w-32 h-32 object-cover rounded-full mx-auto mb-6"
                src="https://picsum.photos/200/300?random=1150"
                alt="Team Member"
              />
              <h4 className="text-xl font-semibold text-gray-800 mb-2">John Doe</h4>
              <p className="text-gray-600">Lead Guide</p>
            </div>
            {/* Team Member 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105">
              <img
                className="w-32 h-32 object-cover rounded-full mx-auto mb-6"
                src="https://picsum.photos/200/300?random=1151"
                alt="Team Member"
              />
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Jane Smith</h4>
              <p className="text-gray-600">Marketing Manager</p>
            </div>
            {/* Team Member 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105">
              <img
                className="w-32 h-32 object-cover rounded-full mx-auto mb-6"
                src="https://picsum.photos/200/300?random=1152"
                alt="Team Member"
              />
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Sarah Lee</h4>
              <p className="text-gray-600">Operations Manager</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
