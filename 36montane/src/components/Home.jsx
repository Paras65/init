import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link to navigate between pages
import FAQComponent from './Faq';

const Homepage = () => {
  // State variables for different sections
  const [heroData, setHeroData] = useState({
    "title": "Explore the Great Outdoors",
    "description": "Join us for unforgettable camping and trekking experiences across breathtaking landscapes.",
    "imageUrl": "https://picsum.photos/1500/800?text=Premium+Camping+and+Trekking",
    "buttonText": "Book Your Adventure",
    "buttonLink": "/Detail"
  });
  const [featuredTrips, setFeaturedTrips] = useState([]);
  const [trekkingServices, setTrekkingServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false); // State to track errors

  // Fetch data from API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching all data concurrently to optimize loading time
        const [tripsResponse, servicesResponse] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/api/featuredtrips`),
          fetch(`${import.meta.env.VITE_API_URL}/api/featuredservice`)
        ]);

        // Check if both API requests were successful
        if (!tripsResponse.ok || !servicesResponse.ok) {
          throw new Error('Failed to fetch featured trips or services');
        }

        // Parse the data from both API responses
        const [tripsData, servicesData] = await Promise.all([
          tripsResponse.json(),
          servicesResponse.json()
        ]);

        setFeaturedTrips(tripsData);
        setTrekkingServices(servicesData);
        setIsLoading(false); // Data is loaded, update loading state
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false); // Finished loading even if there's an error
        setError(true); // Set error state to true
      }
    };

    fetchData();
  }, []);

  // Display loading state
  if (isLoading) {
    return (
      <div className="loading-overlay">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-message">Loading...</p>
        </div>
      </div>
    );
  }

  // Display error message if there was a problem fetching data
  if (error) {
    return <div className="error-message">Failed to load content. Please try again later.</div>;
  }

  return (
    <div className="bg-gray-50 text-gray-900 font-serif">
      {/* Hero Section */}
      {heroData && (
        <section className="relative bg-cover bg-center h-[70vh]" style={{ backgroundImage: `url(${heroData.imageUrl})` }}>
          <div className="absolute inset-0 bg-black opacity-30" aria-hidden="true"></div>
          <div className="container mx-auto text-center text-white relative z-10 py-32">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gradient bg-clip-text text-transparent mb-6">
              {heroData.title}
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">{heroData.description}</p>
            <Link to={heroData.buttonLink}>
              <button
                className="mt-8 px-10 py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full shadow-xl hover:scale-105 hover:shadow-2xl transition-all ease-in-out duration-300"
                aria-label="Book your adventure"
              >
                {heroData.buttonText}
              </button>
            </Link>
          </div>
        </section>
      )}

      {/* Featured Trips Section */}
      {featuredTrips.length > 0 ? (
        <section className="py-20 bg-gray-100">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-semibold text-gray-800 mb-4">Featured Trips</h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Check out our most exclusive adventures designed for those who seek only the best.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {featuredTrips.map((trip) => (
                <div key={trip.id} className="border border-gray-300 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition transform hover:scale-105 duration-300">
                  <img className="w-full h-64 object-cover" src={trip.imageUrl} alt={trip.title} loading="lazy" />
                  <div className="p-6 bg-white">
                    <h3 className="text-2xl font-semibold text-gray-800">{trip.title}</h3>
                    <p className="text-gray-600 mt-2">{trip.description}</p>
                    <p className="text-lg font-semibold text-gray-800 mt-4">₹{trip.price}</p> {/* Price Tag in INR */}
                    <Link to={trip.bookingLink}>
                      <button
                        className="mt-4 px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg hover:scale-105 hover:shadow-xl transition duration-300"
                        aria-label="Book Now"
                      >
                        Book Now
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <div>No featured trips available at the moment.</div> // Fallback message if no trips are available
      )}

      {/* Trekking Services Section */}
      {trekkingServices.length > 0 ? (
        <section className="py-20 bg-gray-100">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-semibold text-gray-800 mb-6">Exclusive Trekking Services</h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Whether you're a beginner or an expert, we offer services tailored to your needs.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {trekkingServices.map((service) => (
                <div key={service.id} className="border border-gray-300 rounded-lg p-6 shadow-lg hover:shadow-xl transition duration-300">
                  <h3 className="text-2xl font-semibold text-gray-800">{service.title}</h3>
                  <p className="text-gray-600 mt-2">{service.description}</p>
                  <Link to={service.detailLink}>
                    <button
                      className="mt-4 px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg hover:scale-105 hover:shadow-xl transition duration-300"
                      aria-label="Learn more about this service"
                    >
                      Learn More
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <div>No trekking services available at the moment.</div> // Fallback message if no services are available
      )}

      {/* Booking Section */}
      <section className="py-20 bg-gray-800 text-gray-200">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-6 text-white">Ready to Book Your Adventure?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-400">
            Choose your next adventure from the exclusive services above and start your journey towards the most scenic destinations.
          </p>
          <Link to="/booking">
            <button
              className="mt-8 px-10 py-4 bg-gray-900 text-white border border-gray-600 rounded-full shadow-lg hover:bg-gray-700 hover:shadow-xl transition-all ease-in-out duration-300"
              aria-label="Book your trip now"
            >
              Book Your Trip
            </button>
          </Link>
        </div>
      </section>

      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <FAQComponent />
      </div>
    </div>
  );
};

export default Homepage;
