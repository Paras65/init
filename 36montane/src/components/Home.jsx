import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link to navigate between pages
import FAQComponent from "./Faq";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SpinnerWithIcon from "./SpinnerWithIcon";
import { faHiking } from "@fortawesome/free-solid-svg-icons";
import {
  faMapMarkerAlt,
  faMountain,
  faClock,
  faUsers,
  faCheckCircle,
  faRupeeSign,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import CustomTripSection from "./CustomTripSelection"; // Import the CustomTripSection component

const Homepage = () => {
  // State variables for different sections
  const [heroData, setHeroData] = useState({
    title: "Explore the Great Outdoors",
    description:
      "Join us for unforgettable camping and trekking experiences across breathtaking landscapes.",
    imageUrl:
      "https://picsum.photos/1500/800?text=Premium+Camping+and+Trekking",
    buttonText: "Book Your Adventure",
    buttonLink: "/Detail",
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
          fetch(`${import.meta.env.VITE_API_URL}/api/featuredservice`),
        ]);

        // Check if both API requests were successful
        if (!tripsResponse.ok || !servicesResponse.ok) {
          throw new Error("Failed to fetch featured trips or services");
        }

        // Parse the data from both API responses
        const [tripsData, servicesData] = await Promise.all([
          tripsResponse.json(),
          servicesResponse.json(),
        ]);

        setFeaturedTrips(tripsData);
        setTrekkingServices(servicesData);
        setIsLoading(false); // Data is loaded, update loading state
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Finished loading even if there's an error
        setError(true); // Set error state to true
      }
    };

    fetchData();
  }, []);

  // Display loading state
  if (isLoading) {
    return <SpinnerWithIcon icon={faHiking} size="5xl" spinnerSize="w-24 h-24" />;
  }

  // Display error message if there was a problem fetching data
  if (error) {
    return <div className="error-message">Failed to load content. Please try again later.</div>;
  }

  return (
    <div className="bg-gray-50 text-gray-900 font-serif">
      {/* Hero Section */}
      {heroData && (
        <section
          className="relative bg-cover bg-center h-[70vh]"
          style={{ backgroundImage: `url(${heroData.imageUrl})` }}
        >
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
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Featured Trips</h2>
            <p className="text-xl text-gray-700 mb-16 max-w-3xl mx-auto">
              Explore our curated selection of exclusive adventures, tailored for those who seek the finest experiences.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {featuredTrips.map((trip) => (
                <div
                  key={trip._id}
                  className="relative border border-gray-300 rounded-lg overflow-hidden shadow-xl transform hover:scale-105 transition-all duration-300 hover:shadow-2xl group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      className="w-full h-[20vh] object-cover transform group-hover:scale-110 transition-transform duration-500"
                      src={trip.headerImage}
                      alt={trip.title}
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 bg-white">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2 text-left">{trip.title}</h3>
                    <p className="text-gray-600 text-lg mb-4 text-left">{trip.description}</p>
                    <div className="mt-4 text-sm text-gray-500 text-left">
                      <p>
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-gray-600 text-base" />
                        <strong>Location:</strong> {trip.location}
                      </p>
                      <p>
                        <FontAwesomeIcon icon={faMountain} className="mr-2 text-gray-600 text-base" />
                        <strong>Difficulty:</strong> {trip.difficulty}
                      </p>
                      <p>
                        <FontAwesomeIcon icon={faClock} className="mr-2 text-gray-600 text-base" />
                        <strong>Duration:</strong> {trip.duration} days
                      </p>
                      <p>
                        <FontAwesomeIcon icon={faUsers} className="mr-2 text-gray-600 text-base" />
                        <strong>Group Size:</strong> Max {trip.maxGroupSize} people
                      </p>
                    </div>
                    <div className="mt-6 text-left">
                      <p className="font-semibold text-gray-800 mb-2">What's Included:</p>
                      <ul className="list-none text-gray-600 pl-5">
                        {trip.inclusions.map((inclusion, index) => (
                          <li key={index} className="flex items-center text-sm">
                            <FontAwesomeIcon icon={faCheckCircle} className="mr-2 text-green-500 text-sm" />
                            {inclusion}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-6 text-left">
                      <p className="text-xl font-semibold text-gray-900">
                        <FontAwesomeIcon icon={faRupeeSign} className="mr-2 text-base" />
                        ₹{trip.price}
                      </p>
                      <Link to={trip.bookingLink}>
                        <button
                          className="mt-4 px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-md transform hover:scale-105 hover:shadow-xl transition duration-300"
                          aria-label={`Book ${trip.title}`}
                        >
                          <FontAwesomeIcon icon={faBookmark} className="mr-2 text-base" />
                          Book Now
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-yellow-500 text-white text-xs py-1 px-3 rounded-full shadow-md">
                    New
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <div>No featured trips available at the moment.</div>
      )}

      {/* Custom Trip Section */}
     

      {/* Booking Section */}
      <section className="py-20 bg-gray-800 text-gray-200">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-6 text-white">Ready to Book Your Adventure?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-400">
            Choose your next adventure from the exclusive services above and start your journey towards the most scenic destinations.
          </p>
         
             <CustomTripSection /> 
            
        </div>
      </section>

      {/* FAQ Section */}
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <FAQComponent />
      </div>
    </div>
  );
};

export default Homepage;
