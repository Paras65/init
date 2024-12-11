import { useState, useEffect } from "react";

const BookingDetail = () => {
  // Initial form data and trip details state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    groupSize: "1",
    date: "",
  });

  const [errors, setErrors] = useState({});
  const [totalPrice, setTotalPrice] = useState(200); // Start with base price

  const tripDetails = {
    title: "Mountain Trekking Adventure",
    description:
      "Embark on a breathtaking trekking journey through the heart of the mountains. Explore pristine trails, connect with nature, and challenge yourself to conquer some of the best views on earth.",
    image: "https://picsum.photos/200/300?random=2?text=Mountain+Trekking",
    basePrice: 200,
    options: [
      { label: "Group of 2-5", value: "2-5", additionalPrice: 50 },
      { label: "Group of 6-10", value: "6-10", additionalPrice: 100 },
      { label: "Private Guide", value: "Private", additionalPrice: 150 },
    ],
  };

  // Update total price whenever group size changes
  const updateTotalPrice = () => {
    let price = tripDetails.basePrice;

    if (formData.groupSize === "2-5") price += tripDetails.options[0].additionalPrice;
    else if (formData.groupSize === "6-10") price += tripDetails.options[1].additionalPrice;
    else if (formData.groupSize === "Private") price += tripDetails.options[2].additionalPrice;

    setTotalPrice(price);
  };

  useEffect(() => {
    updateTotalPrice();
  }, [formData.groupSize]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.date) newErrors.date = "Please select a date";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Booking Submitted:", formData);
      alert("Your booking has been successfully submitted!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        groupSize: "1",
        date: "",
      });
      setTotalPrice(tripDetails.basePrice); // Reset price after form submission
    }
  };

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Trip Details Section */}
        <div className="bg-gray-50 rounded-xl shadow-lg overflow-hidden">
          <img
            src={tripDetails.image}
            alt="Trekking Adventure"
            className="w-full h-64 object-cover rounded-t-xl"
          />
          <div className="p-8">
            <h2 className="text-3xl font-extrabold text-gray-800">{tripDetails.title}</h2>
            <p className="text-lg text-gray-700 mt-4">{tripDetails.description}</p>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-800">Pricing</h3>
              <p className="text-lg text-gray-800 mt-2">Base Price: <span className="text-green-600">${tripDetails.basePrice}</span></p>
              <p className="text-lg text-gray-800 mt-2">Total Price: <span className="text-green-600">${totalPrice}</span></p>
            </div>
          </div>
        </div>

        {/* Booking Form Section */}
        <div className="bg-gray-50 rounded-xl shadow-lg p-8">
          <h3 className="text-3xl font-extrabold text-gray-800 mb-8">Book Your Adventure</h3>
          <form onSubmit={handleSubmit}>
            {/* Name Input */}
            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-4 border-2 border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all"
                placeholder="Enter your full name"
                required
              />
              {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
            </div>

            {/* Email Input */}
            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 border-2 border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all"
                placeholder="Enter your email address"
                required
              />
              {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
            </div>

            {/* Phone Input */}
            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700" htmlFor="phone">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-4 border-2 border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all"
                placeholder="Enter your phone number"
                required
              />
              {errors.phone && <p className="text-red-500 text-sm mt-2">{errors.phone}</p>}
            </div>

            {/* Group Size Selector */}
            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700" htmlFor="groupSize">
                Group Size
              </label>
              <select
                id="groupSize"
                name="groupSize"
                value={formData.groupSize}
                onChange={handleChange}
                className="w-full p-4 border-2 border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all"
                required
              >
                <option value="1">Solo</option>
                <option value="2-5">Group of 2-5</option>
                <option value="6-10">Group of 6-10</option>
                <option value="Private">Private Guide</option>
              </select>
              {errors.groupSize && <p className="text-red-500 text-sm mt-2">{errors.groupSize}</p>}
            </div>

            {/* Date Picker */}
            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700" htmlFor="date">
                Preferred Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-4 border-2 border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all"
                required
              />
              {errors.date && <p className="text-red-500 text-sm mt-2">{errors.date}</p>}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="px-8 py-4 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all"
              >
                Confirm Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingDetail;
