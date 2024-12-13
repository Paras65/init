import { useState, useEffect } from 'react';

const TripDetailPage = () => {
  const [tripData, setTripData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch trip data on component mount
  useEffect(() => {
    const fetchTripData = async () => {
      try {
        const response = await fetch('http://localhost:4000/trips'); // Await the fetch request
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json(); // Await the JSON response
        setTripData(data); // Set the fetched data
      } catch (err) {
        setError(err.message); // Catch any errors and update the state
      } finally {
        setIsLoading(false); // Set loading state to false after fetching
      }
    };

    fetchTripData();
  }, []); // Empty dependency array to run only once on mount

  // Loading state
  if (isLoading) {
    return <div>Loading...</div>; // Show loading state while fetching
  }

  // Error state
  if (error) {
    return <div>Error: {error}</div>; // Show error message if fetching fails
  }

  // Main content
  return (
    <div className="bg-gradient-to-r from-gray-100 via-gray-200 to-white text-gray-800">
        
     
      {/* Header Section */}
      <section className="relative h-[30vh]">
        <img
          src={tripData[0].headerImage} // Dynamic image from API response
          alt="Trip"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="relative z-10 p-8 flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-600 mb-4">
            {tripData[0].title} {/* Dynamic title from API */}
          </h1>
          <p className="text-xl sm:text-2xl mb-6 text-gray-700">
            {tripData[0].description} {/* Dynamic description from API */}
          </p>
        </div>
      </section>

      {/* Details Section */}
      <section className="max-w-4xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-semibold mb-4">Trip Details</h2>
            <p className="text-lg leading-relaxed text-gray-800">
              {tripData[0].details} {/* Dynamic trip details */}
            </p>
            <ul className="mt-6 space-y-4 text-lg text-gray-800">
              <li><strong>Duration:</strong> {tripData[0].duration} Days</li>
              <li><strong>Location:</strong> {tripData[0].location}</li>
              <li><strong>Difficulty:</strong> {tripData[0].difficulty}</li>
              <li><strong>Group Size:</strong> Max {tripData[0].maxGroupSize} People</li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-semibold mb-4">What’s Included?</h2>
            <ul className="text-lg leading-loose text-gray-800">
              {tripData[0].inclusions.map((item, index) => (
                <li key={index}>{item}</li> // Dynamic inclusions from API
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Action Section */}
      <section className="bg-gray-100 text-gray-800 py-12 text-center">
        <h2 className="text-2xl font-semibold mb-6">Ready to embark on the adventure?</h2>
        <button className="bg-blue-600 text-white py-3 px-8 rounded-lg text-lg font-bold shadow-md hover:bg-blue-500 transition">
          Book Your Trip
        </button>
      </section>
    </div>
  );
};

export default TripDetailPage;
