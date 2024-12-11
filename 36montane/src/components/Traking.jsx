

function CampingAndTrekking() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      {/* ... */}

      {/* Featured Trips Section */}
      <section className="container mx-auto py-16">
        <h2 className="text-3xl font-bold mb-8">Featured Trips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Trip Card 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img src="src/assets/images.jfif" alt="Trip Image" className="mb-4 rounded-lg" />
            <h3 className="text-xl font-bold mb-2">Himalayan Trek</h3>
            <p>A challenging trek through the majestic Himalayas.</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Book Now</button>
          </div>
          {/* Trip Card 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img src="src/assets/images.jfif" alt="Trip Image" className="mb-4 rounded-lg" />
            <h3 className="text-xl font-bold mb-2">Himalayan Trek</h3>
            <p>A challenging trek through the majestic Himalayas.</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Book Now</button>
          </div>
       
            <div className="bg-white p-6 rounded-lg shadow-md">
            <img src="src/assets/images.jfif" alt="Trip Image" className="mb-4 rounded-lg" />
            <h3 className="text-xl font-bold mb-2">Himalayan Trek</h3>
            <p>A challenging trek through the majestic Himalayas.</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Book Now</button>
          </div>
          {/* ... */}
        </div>
      </section>
    </div>
  );
}

export default CampingAndTrekking;