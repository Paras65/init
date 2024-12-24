import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  // Validate form data
  const validateForm = () => {
    const newErrors = {};

    // Name Validation
    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    // Email Validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone Validation
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Date Validation
    if (!formData.date) {
      newErrors.date = "Please select a date";
    }

    // Group Size Validation
    if (!formData.groupSize) {
      newErrors.groupSize = "Please select a group size";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate email format
  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
  };

  // Validate phone number format (basic US format, adjust as needed)
  const validatePhone = (phone) => {
    const phonePattern = /^[2-9]{1}[0-9]{9}$/; // Simple validation for US phone numbers
    return phonePattern.test(phone);
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Trigger real-time validation
    const newErrors = { ...errors };

    if (name === "name" && !value) {
      newErrors.name = "Name is required";
    } else {
      delete newErrors.name;
    }

    if (name === "email") {
      if (!value) {
        newErrors.email = "Email is required";
      } else if (!validateEmail(value)) {
        newErrors.email = "Please enter a valid email address";
      } else {
        delete newErrors.email;
      }
    }

    if (name === "phone") {
      if (!value) {
        newErrors.phone = "Phone number is required";
      } else if (!validatePhone(value)) {
        newErrors.phone = "Please enter a valid phone number";
      } else {
        delete newErrors.phone;
      }
    }

    if (name === "date" && !value) {
      newErrors.date = "Please select a date";
    } else {
      delete newErrors.date;
    }

    if (name === "groupSize" && !value) {
      newErrors.groupSize = "Please select a group size";
    } else {
      delete newErrors.groupSize;
    }

    setErrors(newErrors);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Booking Submitted:", formData);

      const successMessage = `Booking for ${formData.name} (${formData.groupSize} people) on ${formData.date} has been successfully submitted! Total price: $${totalPrice}`;
      toast.success(successMessage, {
        onClose: () => {
          setFormData({
            name: "",
            email: "",
            phone: "",
            groupSize: "1",
            date: "",
          });
          setTotalPrice(tripDetails.basePrice);
        },
      });
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
                min={new Date().toISOString().split('T')[0]} // Disable past dates
                className="w-full p-4 border-2 border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all"
              />
              {errors.date && <p className="text-red-500 text-sm mt-2">{errors.date}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg mt-6 font-bold transition-all hover:bg-green-700"
            >
              Book Now
            </button>
          </form>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default BookingDetail;
