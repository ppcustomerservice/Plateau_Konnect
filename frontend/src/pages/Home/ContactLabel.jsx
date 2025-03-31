import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setFilter } from "../../redux/filter/filterSlice";
import { Navigate, useNavigate } from "react-router-dom";
// import Delhi from "../../assets/Delhi.jpeg";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

import { useState, useEffect } from "react";

const testimonials = [
  {
    date: "Jan 9, 2024",
    rating: 5,
    text: "Plateau Konnect surpassed my expectations! Their responsiveness and professionalism made the process smooth.",
    name: "Hrishikesh Panigrahi",
    location: "Goa",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    date: "Dec 29, 2023",
    rating: 5,
    text: "Plateau Konnect is a game-changer! Their service is lightning-fast, making the process seamless.",
    name: "Atul Agrawal",
    location: "Gurgaon",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    date: "Feb 15, 2024",
    rating: 4,
    text: "Great experience! The team was supportive and ensured a hassle-free process.",
    name: "Sneha Kapoor",
    location: "Mumbai",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    date: "Mar 5, 2024",
    rating: 5,
    text: "Excellent service and user-friendly interface. Highly recommended!",
    name: "Rohan Verma",
    location: "Bangalore",
    avatar: "https://randomuser.me/api/portraits/men/51.jpg",
  },
  {
    date: "Mar 10, 2024",
    rating: 4,
    text: "Smooth and professional experience. Would use again.",
    name: "Ananya Sharma",
    location: "Delhi",
    avatar: "https://randomuser.me/api/portraits/women/55.jpg",
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  // Auto-slide every 5 seconds, resets on manual navigation
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [index]);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-black mb-6">
        Testimonials
      </h2>

      <div className="relative overflow-hidden">
        <motion.div
          className="flex w-full"
          initial={{ x: 0 }}
          animate={{ x: `-${index * 100}%` }}
          transition={{ type: "spring", stiffness: 50 }}
          style={{ width: `${testimonials.length * 100}%` }} // Fix for smooth sliding
        >
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="min-w-full bg-white rounded-lg shadow-md p-6 text-left mx-2"
            >
              <p className="text-gray-700 italic">"{testimonial.text}"</p>
              <div className="mt-4 flex items-center space-x-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full border"
                />
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center items-center mt-6 space-x-4">
        <button
          onClick={prevSlide}
          className="p-3 bg-gray-200 hover:bg-gray-300 rounded-full text-gray-700 transition"
        >
          <MdArrowBack size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="p-3 bg-gray-200 hover:bg-gray-300 rounded-full text-gray-700 transition"
        >
          <MdArrowForward size={24} />
        </button>
      </div>

      {/* Dots for current slide indication */}
      <div className="flex justify-center mt-4 space-x-2">
        {testimonials.map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full ${
              i === index ? "bg-blue-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

const services = [
  {
    title: "Buying a Commercial Property",
    description: "Shops, offices, land, factories, warehouses, and more",
    image: "Logo1.jpeg",
  },
  {
    title: "Leasing a Commercial Property",
    description: "Shops, offices, land, factories, warehouses, and more",
    image: "building1.jpeg",
  },
  {
    title: "Buy Plots/Land",
    description:
      "Residential plots, agricultural farm lands, institutional lands, and more",
    image: "building2.jpeg",
  },
  {
    title: "Renting a Home",
    description: "Apartments, builder floors, villas, and more",
    image: "building3.webp",
  },
  {
    title: "PG and Co-Living",
    description: "Organized, owner and broker listed PGs",
    image: "building(3).jpeg",
  },
];

const cities = [
  {
    name: "Solapur",
    properties: "143,000+ Properties",
    image: "delhi.jpeg",
    target: "solapur",
  },
  {
    name: "Mumbai",
    properties: "33,000+ Properties",
    image: "Mumbai.jpeg",
    target: "mumbai",
  },
  {
    name: "Bangalore",
    properties: "33,000+ Properties",
    image: "banglore.jpg",
    target: "banglore",
  },
  {
    name: "Pune",
    properties: "35,000+ Properties",
    image: "pune.jpeg",
    target: "pune",
  },
  {
    name: "Chennai",
    properties: "28,000+ Properties",
    image: "chennai.jpg",
    target: "chennai",
  },
  {
    name: "Hyderabad",
    properties: "19,000+ Properties",
    image: "hyderabad.jpg",
    target: "hyderabad",
  },
  {
    name: "Kolkata",
    properties: "23,000+ Properties",
    image: "kolkata.jpeg",
    target: "kolkata",
  },
  {
    name: "Ahmedabad",
    properties: "16,000+ Properties",
    image: "ahmedabad.avif",
    target: "ahmedabad",
  },
  {
    name: "Jammu",
    properties: "3,000+ Properties",
    image: "jammu.jpg",
    target: "jammu",
  },
];
const ContactUs = () => {
  return (
    <section className="bg-gradient-to-r from-gray-100 to-gray-300 text-gray-800 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
        {/* Left Section */}
        <div className="text-center sm:text-left">
          <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">
            Have <span className="text-blue-600">Questions?</span>
          </p>
          <p className="text-lg sm:text-xl text-gray-600 mt-2">
            We’re here to help you find the perfect property.
          </p>
        </div>

        {/* Right Section - Contact Button */}
        <div>
          <a
            href="mailto:customerservice@propertyplateau.com"
            className="inline-block bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white text-lg sm:text-xl font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg"
          >
            Contact Us Now
          </a>
        </div>
      </div>
    </section>
  );
};

const ExploreServices = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e, index) => {
    const { clientX, clientY } = e;
    setHoveredIndex(index);
    setPosition({ x: clientX, y: clientY });
  };

  return (
    <section className="max-w-7xl mx-auto px-8 py-16">
      <h2 className="text-5xl font-bold text-center text-gray-900">
        Our <span className="text-blue-600">Premium Services</span>
      </h2>
      <p className="text-lg text-center text-gray-600 mt-4">
        Discover unparalleled real estate services tailored for you.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-12">
        {services.map((service, index) => {
          const isHovered = hoveredIndex === index;
          return (
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-xl shadow-lg bg-white transition-all"
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                transform: isHovered
                  ? `perspective(1000px) rotateX(${
                      (position.y - window.innerHeight / 2) * 0.02
                    }deg) 
                     rotateY(${
                       (position.x - window.innerWidth / 2) * -0.02
                     }deg)`
                  : "perspective(1000px) rotateX(0deg) rotateY(0deg)",
                transition: "transform 0.3s ease-out",
              }}
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-60 object-cover opacity-90 hover:opacity-60 transition duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-2xl font-semibold">{service.title}</h3>
                <p className="text-sm opacity-90">{service.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>` `
    </section>
  );
};

const ExploreCities = () => {
  // const navigate=Navigate()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const CardClicked = (e) => {
    dispatch(setFilter({ searchText: e }));
    if (location.pathname !== "/listings") {
      navigate("listings");
      return;
    }
    console.log("hdfd");
  };

  return (
    <section className="max-w-6xl mx-auto p-6">
      <h2 className="text-4xl font-bold text-center mb-6 text-blue-700">
        Explore Properties by City
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cities.map((city, index) => (
          <div
            key={index}
            className=" border rounded-lg shadow-lg bg-white hover:shadow-xl transition flex h-[16vh]"
            onClick={() => CardClicked(city.target)}
          >
            <div className="w-full h-full overflow-hidden">
              <img
                src={`./${city.image}`}
                className=" w-full h-full object-cover rounded-lg
            hover:scale-[1.2] hover:cursor-pointer
            transition-all duration-1000
            "
                alt=" image Not availabe"
              />
            </div>
            <div className="w-full h-full flex flex-col justify-center items-center text-center">
              <h3 className="text-2xl font-semibold text-gray-800">
                {city.name}
              </h3>
              <p className="text-gray-600 mt-2">{city.properties}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const RegisterProperty = () => {
  return (
    <section className="bg-gradient-to-r from-gray-100 to-gray-200 p-6 sm:p-8 max-w-5xl mx-auto my-8 rounded-lg shadow-lg text-center">
      <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-gray-900">
        Register to List Your Property for{" "}
        <span className="text-white bg-gradient-to-r from-blue-700 to-purple-600 px-3 py-1 rounded-lg shadow-md">
          FREE
        </span>
      </h2>
      <p className="text-gray-700 text-lg sm:text-xl mb-5">
        Post your residential or commercial property now!
      </p>

      <button className="bg-gradient-to-r from-blue-700 to-purple-600 hover:from-blue-800 hover:to-purple-700 text-white px-6 py-3 rounded-full text-lg font-medium transition duration-300 shadow-md">
        <a
          href="https://whatsapp.com/channel/0029VaBKTZqF6smwQ2AvsV3B"
          target="_blank"
          rel="noopener noreferrer"
        >
          Connect With Us!
        </a>
      </button>
    </section>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How to post a property on Plateau Konnect?",
      answer:
        "Choose your respective profile viz. Broker, Owner, or Builder. Follow the steps by filling in the necessary details regarding your property. In just three steps, your property will go live on Plateau Konnect.",
    },
    {
      question: "Can I post a property for free?",
      answer:
        "Yes. You can post a property for free on Plateau Konnect. However, there is a limit on the number of free listings based on your profile type. Free listings also have limited access to buyer/tenant inquiries.",
    },
    {
      question: "What type of property can I post for selling/renting?",
      answer:
        "As an owner, agent, or builder, you can post all types of residential and commercial properties for rent, lease, or sale. Millions of people search for flats, houses, plots, office spaces, shops, showrooms, warehouses, commercial land, and agricultural land, among others. Plateau Konnect is the best property portal to sell or rent out your property fast!",
    },
    {
      question:
        "What are the benefits of posting a property on Plateau Konnect?",
      answer:
        "Plateau Konnect has a strong online presence and is one of the top real estate platforms. Your property gains guaranteed visibility at zero cost! You will also benefit from our guidance to generate quicker leads and maximize your property’s exposure. So why wait? Advertise your property for free today and sell faster!",
    },
    {
      question: "When do I start getting inquiries on my property?",
      answer:
        "After you post your property, it will be activated within an hour and become visible on Plateau Konnect. As soon as an interested buyer or tenant shows interest in your property, you will receive a notification via SMS, WhatsApp, or email. You can also check all inquiries in the 'Leads' section of your homepage after logging in.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white text-gray-700 p-6 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-6 text-blue-700">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border p-4 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <button
              className="flex justify-between items-center w-full text-left text-lg font-medium"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
            </button>
            {openIndex === index && (
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

const Page = () => {
  return (
    <div>
      <RegisterProperty />
      <ExploreServices />
      <ExploreCities />
      <FAQSection />
      <Testimonials />
      <ContactUs />
    </div>
  );
};

export default Page;
