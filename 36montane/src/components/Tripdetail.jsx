//import TripImageGallery from './TripImageGallery'; // Uncomment if you have the gallery component

const TripDetailPage = () => {
    return (
      <div className="bg-gradient-to-r from-gray-100 via-gray-200 to-white text-gray-800">
        {/* Header Section */}
        <section className="relative h-[30vh]">
          <img
            src="https://picsum.photos/1500/800" // Replace with mountain image URL
            alt="Trip"
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          <div className="relative z-10 p-8 flex flex-col justify-center items-center text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-600 mb-4">
              Mountain Adventure Trip
            </h1>
            <p className="text-xl sm:text-2xl mb-6 text-gray-700">
              Explore the uncharted beauty of the mountains, a trip for the bold and adventurous.
            </p>
            
          </div>
        </section>
  
        {/* Details Section */}
        <section className="max-w-4xl mx-auto p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-semibold mb-4">Trip Details</h2>
              <p className="text-lg leading-relaxed text-gray-800">
                Embark on a 7-day journey through the majestic peaks. Experience nature like never before with guided hikes,
                beautiful vistas, and luxurious campsites. This premium adventure is designed for those seeking an elite outdoor
                experience, blending rugged wilderness with modern comfort.
              </p>
              <ul className="mt-6 space-y-4 text-lg text-gray-800">
                <li><strong>Duration:</strong> 7 Days</li>
                <li><strong>Location:</strong> Mount Everest Base Camp</li>
                <li><strong>Difficulty:</strong> Moderate to Hard</li>
                <li><strong>Group Size:</strong> Max 12 People</li>
              </ul>
            </div>
  
            <div>
              <h2 className="text-3xl font-semibold mb-4">What’s Included?</h2>
              <ul className="text-lg leading-loose text-gray-800">
                <li>Luxury Lodging & Meals</li>
                <li>Guided Tours & Activities</li>
                <li>Transportation to and from the destination</li>
                <li>24/7 Support & Emergency Assistance</li>
              </ul>
            </div>
          </div>
        </section>
  
        {/* Image Gallery Section */}
        {/* Uncomment the line below to include your gallery */}
        {/* <TripImageGallery /> */}
  
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
  