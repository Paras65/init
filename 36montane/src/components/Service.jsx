import { FaHiking, FaCampground, FaPaw, FaWater } from 'react-icons/fa';  // Importing icons for better control

const services = [
  {
    title: "Mountain Trekking",
    description: "Experience the thrill of hiking through stunning mountain ranges. Suitable for beginners and experts alike.",
    image: "https://picsum.photos/200/300?random=1300x200?text=Mountain+Trekking",
    icon: <FaHiking />,
    link: "#",
  },
  {
    title: "Beach Camping",
    description: "Relax by the sea, enjoy the breeze, and sleep under the stars at our beach campsites.",
    image: "https://picsum.photos/200/300?random=1300x200?text=Beach+Camping",
    icon: <FaCampground />,
    link: "#",
  },
  {
    title: "Wildlife Safari",
    description: "Go on a wildlife safari and explore the beauty of nature and its magnificent creatures in their natural habitat.",
    image: "https://picsum.photos/200/300?random=1300x200?text=Wildlife+Safari",
    icon: <FaPaw />,
    link: "#",
  },
  {
    title: "Canoeing Adventures",
    description: "Take to the water in a canoe and enjoy a peaceful yet thrilling adventure along scenic rivers and lakes.",
    image: "https://picsum.photos/200/300?random=1300x200?text=Canoeing+Adventures",
    icon: <FaWater />,
    link: "#",
  },
];

const Services = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-4xl font-semibold text-gray-800 text-center mb-8">Our Premium Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="relative bg-white rounded-xl shadow-2xl overflow-hidden hover:scale-105 transform transition duration-500 ease-in-out"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="text-3xl text-green-600 mr-3">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-800">{service.title}</h3>
              </div>
              <p className="text-gray-600 text-lg mb-4">{service.description}</p>
              <a
                href={service.link}
                className="inline-block bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition duration-300 transform hover:scale-105"
              >
                Learn More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
