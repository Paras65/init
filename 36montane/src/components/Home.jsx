import { Link } from 'react-router-dom'; // Import Link to navigate between pages

const Homepage = () => {
  return (
    <div className="bg-gray-50 text-gray-900 font-serif">

      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-[70vh]" style={{ backgroundImage: 'url("https://picsum.photos/1500/800?text=Premium+Camping+and+Trekking")' }}>
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="container mx-auto text-center text-white relative z-10 py-32">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gradient bg-clip-text text-transparent mb-6">
            Explore the Great Outdoors
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            Join us for unforgettable camping and trekking experiences across breathtaking landscapes. Immerse yourself in nature’s finest offerings.
          </p>
          <Link to="/Detail">
            <button className="mt-8 px-10 py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full shadow-xl hover:scale-105 hover:shadow-2xl transition-all ease-in-out duration-300">
              Book Your Adventure
            </button>
          </Link>
        </div>
      </section>

      {/* Featured Trips Section */}
      <section className="py-20 bg-gray-100">
  <div className="container mx-auto text-center">
    <h2 className="text-4xl font-semibold text-gray-800 mb-4">Featured Trips</h2>
    <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
      Check out our most exclusive adventures designed for those who seek only the best.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {/* Trip 1 */}
      <div className="border border-gray-300 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition transform hover:scale-105 duration-300">
        <img className="w-full h-64 object-cover" src="https://picsum.photos/600/400?random=1&text=Mountain+Camping" alt="Mountain Camping in the wilderness" />
        <div className="p-6 bg-white">
          <h3 className="text-2xl font-semibold text-gray-800">Mountain Camping</h3>
          <p className="text-gray-600 mt-2">Escape to the mountains for a weekend of luxury camping, hiking, and stargazing.</p>
          <p className="text-lg font-semibold text-gray-800 mt-4">₹3,499</p> {/* Price Tag in INR */}
          <Link to="/booking">
            <button className="mt-4 px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg hover:scale-105 hover:shadow-xl transition duration-300">
              Book Now
            </button>
          </Link>
        </div>
      </div>

      {/* Trip 2 */}
      <div className="border border-gray-300 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition transform hover:scale-105 duration-300">
        <img className="w-full h-64 object-cover" src="https://picsum.photos/600/400?random=2&text=Trekking+Adventure" alt="Trekking Adventure in scenic landscapes" />
        <div className="p-6 bg-white">
          <h3 className="text-2xl font-semibold text-gray-800">Trekking Adventure</h3>
          <p className="text-gray-600 mt-2">Embark on a scenic journey through majestic landscapes on our expert-guided treks.</p>
          <p className="text-lg font-semibold text-gray-800 mt-4">₹599</p> {/* Price Tag in INR */}
          <Link to="/booking">
            <button className="mt-4 px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg hover:scale-105 hover:shadow-xl transition duration-300">
              Book Now
            </button>
          </Link>
        </div>
      </div>

      {/* Trip 3 */}
      <div className="border border-gray-300 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition transform hover:scale-105 duration-300">
        <img className="w-full h-64 object-cover" src="https://picsum.photos/600/400?random=3&text=Guided+Tour" alt="Guided Tour through beautiful terrains" />
        <div className="p-6 bg-white">
          <h3 className="text-2xl font-semibold text-gray-800">Guided Tour</h3>
          <p className="text-gray-600 mt-2">Join a professional guide for a journey through the world's most beautiful terrains.</p>
          <p className="text-lg font-semibold text-gray-800 mt-4">₹999</p> {/* Price Tag in INR */}
          <Link to="/booking">
            <button className="mt-4 px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg hover:scale-105 hover:shadow-xl transition duration-300">
              Book Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>



      {/* Trekking Services Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-semibold text-gray-800 mb-6">Exclusive Trekking Services</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Whether you're a beginner or an expert, we offer services tailored to your needs.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="border border-gray-300 rounded-lg p-6 shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-semibold text-gray-800">Beginner Trekking</h3>
              <p className="text-gray-600 mt-2">Explore scenic, beginner-friendly routes with breathtaking views.</p>
              <Link to="/tripdetail">
                <button className="mt-4 px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg hover:scale-105 hover:shadow-xl transition duration-300">
                  Learn More
                </button>
              </Link>
            </div>

            {/* Service 2 */}
            <div className="border border-gray-300 rounded-lg p-6 shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-semibold text-gray-800">Advanced Trekking</h3>
              <p className="text-gray-600 mt-2">Conquer challenging terrains with expert guidance and support.</p>
              <Link to="/tripdetail">
                <button className="mt-4 px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg hover:scale-105 hover:shadow-xl transition duration-300">
                  Learn More
                </button>
              </Link>
            </div>

            {/* Service 3 */}
            <div className="border border-gray-300 rounded-lg p-6 shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-semibold text-gray-800">Family Trekking</h3>
              <p className="text-gray-600 mt-2">Family-friendly trekking routes suitable for all ages and skill levels.</p>
              <Link to="/tripdetail">
                <button className="mt-4 px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg hover:scale-105 hover:shadow-xl transition duration-300">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-20 bg-blue-700 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-6">Ready to Book Your Adventure?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Choose your next adventure from the exclusive services above and start your journey towards the most scenic destinations.
          </p>
          <Link to="/booking">
            <button className="mt-8 px-10 py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full shadow-xl hover:scale-105 hover:shadow-2xl transition-all ease-in-out duration-300">
              Book Your Trip
            </button>
          </Link>
        </div>
      </section>

    

    </div>
  );
};

export default Homepage;
