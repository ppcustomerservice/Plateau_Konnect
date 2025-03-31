import { useNavigate } from "react-router-dom";
import PropertyCard from "../../components/PropertyCard";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const RecentListings = () => {
  const { recentListings } = useSelector((store) => store.listing);
  const nav = useNavigate();

  return (
    <section className="bg-[#FFF] py-8 sm:py-16">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-800 tracking-wide relative inline-block 
                 bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text"
          >
            Recently Listed Properties
            <span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent 
                     w-full h-full transform translate-x-[-100%] animate-shine"
            ></span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-black">
            Find All Recently Added Listings
          </p>
        </div>

        {/* Property Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mt-8">
          {recentListings.slice(0, 6).map((property, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotateY: 10 }}
              className="relative p-4 rounded-lg shadow-lg transition-all duration-300 bg-white"
            >
              {/* <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition duration-300 p-4 bg-white"> */}
                <PropertyCard {...property} screen="home" />
              {/* </div> */}
            </motion.div>
          ))}
        </div>

        {/* Show "See More" button only if there are more than 6 properties */}
        {recentListings.length >= 6 && (
          <div className="flex justify-center mt-10">
            <motion.button
              onClick={() => nav("/listings")}
              className="px-6 py-3 bg-[#bc6ad1] text-white text-lg font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              See More Listings
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentListings;
