import React, { useState, useEffect } from 'react';
import { FaHiking, FaCampground, FaPaw, FaWater, FaSearch } from 'react-icons/fa';
import axios from 'axios';
import LazyLoad from 'react-lazyload';
import "../style/services.css";

const defaultServices = [
  {
    title: "Trekking in Kanger Valley",
    description: "Explore the scenic Kanger Valley National Park with our guided trekking services. Immerse yourself in dense forests, waterfalls, and natural caves.",
    icon: <FaHiking />,
    image: "https://via.placeholder.com/400x250",
    link: "#",
    category: "Outdoor Adventures",
    price: "₹2,500",
    duration: "1-2 days",
    location: "Kanger Valley, Chhattisgarh",
    rating: 4.8
  },
  {
    title: "Camping in Achanakmar Wildlife Sanctuary",
    description: "Experience a serene night under the stars with our camping services in Achanakmar Wildlife Sanctuary. Enjoy the sounds of nature and observe local wildlife.",
    icon: <FaCampground />,
    image: "https://via.placeholder.com/400x250",
    link: "#",
    category: "Camping",
    price: "₹3,000",
    duration: "1-2 days",
    location: "Achanakmar, Chhattisgarh",
    rating: 4.7
  },
  {
    title: "Wildlife Safari in Barnawapara",
    description: "Get close to nature with a thrilling wildlife safari in Barnawapara Wildlife Sanctuary. Spot tigers, leopards, and various species of birds and animals.",
    icon: <FaPaw />,
    image: "https://via.placeholder.com/400x250",
    link: "#",
    category: "Wildlife",
    price: "₹4,000",
    duration: "3 hours",
    location: "Barnawapara, Chhattisgarh",
    rating: 4.9
  },
  {
    title: "River Rafting in Mahanadi River",
    description: "Experience the adrenaline rush of white-water rafting in the Mahanadi River. Our expert guides ensure a safe yet thrilling adventure on the river.",
    icon: <FaWater />,
    image: "https://via.placeholder.com/400x250",
    link: "#",
    category: "Water Sports",
    price: "₹1,500",
    duration: "2-3 hours",
    location: "Mahanadi River, Chhattisgarh",
    rating: 4.6
  }
];

const defaultTrips = [
  {
    title: "Chhattisgarh Tribal Tour",
    description: "Experience the rich culture of Chhattisgarh with our guided tribal tours. Visit villages, learn about traditional crafts, and enjoy authentic local cuisine.",
    image: "https://via.placeholder.com/400x250",
    link: "#",
    category: "Cultural Tours",
    price: "₹7,000",
    duration: "5 days",
    location: "Raipur & Tribal Villages, Chhattisgarh",
    rating: 4.7
  },
  {
    title: "Chitrakote Waterfall Adventure",
    description: "Visit the stunning Chitrakote Waterfall, often referred to as the 'Niagara of India'. Enjoy a day trip with an option for boat rides and photography.",
    image: "https://via.placeholder.com/400x250",
    link: "#",
    category: "Nature Tours",
    price: "₹2,000",
    duration: "1 day",
    location: "Chitrakote, Chhattisgarh",
    rating: 4.8
  },
  {
    title: "Trekking in Dandakarnya Forest",
    description: "Explore the mystical Dandakarnya Forest, rich in flora and fauna. Enjoy trekking and nature walks in one of Chhattisgarh’s most scenic forests.",
    image: "https://via.placeholder.com/400x250",
    link: "#",
    category: "Outdoor Adventures",
    price: "₹3,500",
    duration: "2 days",
    location: "Dandakarnya Forest, Chhattisgarh",
    rating: 4.6
  },
  {
    title: "Raipur City Tour",
    description: "Discover the bustling city of Raipur with our comprehensive city tour. Visit historical sites, temples, and local markets to get a taste of urban life.",
    image: "https://via.placeholder.com/400x250",
    link: "#",
    category: "Urban Tours",
    price: "₹2,500",
    duration: "1 day",
    location: "Raipur, Chhattisgarh",
    rating: 4.4
  }
];

const categories = [
  "All", "Outdoor Adventures", "Camping", "Wildlife", "Water Sports", "Cultural Tours", "Nature Tours", "Urban Tours"
];

// ItemCard Component (Reusable for Both Services and Trips)
const ItemCard = ({ item, type, handleBooking }) => (
  <div className="relative bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition duration-300">
    <LazyLoad height={200} offset={100}>
      <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
    </LazyLoad>
    <div className="p-6">
      {/* Display Icon for Services */}
      {type === 'service' && (
        <div className="flex items-center mb-4">
          <div className="text-3xl text-green-600 mr-4">{item.icon}</div>
          <h4 className="text-xl font-semibold">{item.title}</h4>
        </div>
      )}
      
      {/* Display Title for Trips */}
      {type === 'trip' && (
        <h4 className="text-xl font-semibold">{item.title}</h4>
      )}

      {/* Description */}
      <p className="mt-2 text-sm text-gray-700">{item.description}</p>

      {/* Specific Details Based on Type */}
      {type === 'service' && (
        <div className="mt-4">
          <p className="text-sm font-semibold text-green-600">Price: {item.price}</p>
          <p className="text-sm text-gray-500">Duration: {item.duration}</p>
          <p className="text-sm text-gray-500">Location: {item.location}</p>
          <p className="mt-1 text-sm text-yellow-500">Rating: {item.rating} ⭐</p>
        </div>
      )}
      
      {type === 'trip' && (
        <div className="mt-4">
          <p className="text-sm font-semibold text-green-600">Price: {item.price}</p>
          <p className="text-sm text-gray-500">Duration: {item.duration}</p>
          <p className="text-sm text-gray-500">Location: {item.location}</p>
          <p className="mt-1 text-sm text-yellow-500">Rating: {item.rating} ⭐</p>
        </div>
      )}

      {/* Book Now Button */}
      <button
        onClick={() => handleBooking(type, item.title)}
        className="mt-4 inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
      >
        Book Now
      </button>
    </div>
  </div>
);

const ServicesAndTrips = () => {
  const [services, setServices] = useState(defaultServices);
  const [trips, setTrips] = useState(defaultTrips);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({ name: '', email: '', serviceOrTrip: '', itemName: '' });

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const servicesResponse = await axios.get(`/api/services`, {
        params: {
          search: searchQuery,
          category: selectedCategory !== 'All' ? selectedCategory : '',
        }
      });
      const tripsResponse = await axios.get(`/api/trips`, {
        params: {
          search: searchQuery,
          category: selectedCategory !== 'All' ? selectedCategory : '',
        }
      });

      setServices(servicesResponse?.data?.services || defaultServices);
      setTrips(tripsResponse?.data?.trips || defaultTrips);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error loading data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery, selectedCategory]);

  const filteredServices = selectedCategory === "All"
    ? services.filter(service => service.title.toLowerCase().includes(searchQuery.toLowerCase()) || service.description.toLowerCase().includes(searchQuery.toLowerCase()))
    : services.filter(service => service.category === selectedCategory && (service.title.toLowerCase().includes(searchQuery.toLowerCase()) || service.description.toLowerCase().includes(searchQuery.toLowerCase())));

  const filteredTrips = selectedCategory === "All"
    ? trips.filter(trip => trip.title.toLowerCase().includes(searchQuery.toLowerCase()) || trip.description.toLowerCase().includes(searchQuery.toLowerCase()))
    : trips.filter(trip => trip.category === selectedCategory && (trip.title.toLowerCase().includes(searchQuery.toLowerCase()) || trip.description.toLowerCase().includes(searchQuery.toLowerCase())));

  const handleBooking = (itemType, itemName) => {
    setBookingDetails({ ...bookingDetails, serviceOrTrip: itemType, itemName: itemName });
    setIsBookingModalOpen(true);
  };

  const handleBookingSubmit = () => {
    alert(`Booking confirmed for ${bookingDetails.itemName} (${bookingDetails.serviceOrTrip}).`);
    setIsBookingModalOpen(false);
  };

  const handleModalClose = () => {
    setIsBookingModalOpen(false);
  };

  const handleChange = (e) => {
    setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
  };

  const noDataFound = filteredServices.length === 0 && filteredTrips.length === 0;

  return (
    <div className="container mx-auto px-4 py-10 bg-green-50">
      <h2 className="text-4xl font-semibold text-black text-center mb-8">Explore Services and Trips in Chhattisgarh</h2>

      {/* Category Filter */}
      <div className="mb-8 text-center">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 mx-2 text-lg font-semibold ${selectedCategory === category ? "bg-green-600 text-white" : "bg-green-200 text-green-800"} rounded-lg hover:bg-green-500 hover:text-white transition duration-300`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Search Bar with Icon */}
      <div className="mb-8 relative max-w-md mx-auto">
        <input
          type="text"
          className="w-full pl-10 pr-4 py-2 border border-green-500 rounded-lg"
          placeholder="Search by title or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>

      {/* Loading/Error States */}
      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-center text-red-600">{error}</div>}

      {/* No Data Found */}
      {noDataFound && <div className="text-center text-gray-500">No services or trips found for the selected category.</div>}

      {/* Services & Trips Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredServices.map((service, index) => (
          <ItemCard key={index} item={service} type="service" handleBooking={handleBooking} />
        ))}
        {filteredTrips.map((trip, index) => (
          <ItemCard key={index} item={trip} type="trip" handleBooking={handleBooking} />
        ))}
      </div>

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-80">
            <h3 className="text-xl font-semibold mb-4">Booking {bookingDetails.serviceOrTrip}</h3>
            <p className="mb-4">You are booking: {bookingDetails.itemName}</p>
            <input
              type="text"
              name="name"
              value={bookingDetails.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full px-4 py-2 mb-4 border border-green-500 rounded"
            />
            <input
              type="email"
              name="email"
              value={bookingDetails.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full px-4 py-2 mb-4 border border-green-500 rounded"
            />
            <div className="flex justify-between">
              <button onClick={handleModalClose} className="px-4 py-2 bg-gray-300 text-gray-700 rounded">Cancel</button>
              <button onClick={handleBookingSubmit} className="px-4 py-2 bg-green-600 text-white rounded">Confirm Booking</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesAndTrips;
