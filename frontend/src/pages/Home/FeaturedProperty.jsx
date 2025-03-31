import { useDispatch, useSelector } from "react-redux";
import { addField } from "../../redux/filter/filterSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import apartment from "../../assets/apartment.png";
import commercial from "../../assets/commercial.png";
import house from "../../assets/house.png";
import condo from "../../assets/condo.png";

const FeaturedProperty = () => {
  const { featuredListings } = useSelector((store) => store.listing);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (value) => {
    dispatch(addField({ field: "category", value }));
    navigate("/listings");
  };

  const serveImage = (name) => {
    switch (name) {
      case "apartment":
        return apartment;
      case "commercial":
        return commercial;
      case "house":
        return house;
      case "condo":
        return condo;
      default:
        return "";
    }
  };

  return (
    <section className="relative py-16 bg-gradient-to-b from-gray-900 via-gray-800 to-black text-gray-100">
      <div className="container max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Heading */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-widest">
            <span className="bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text drop-shadow-lg">
              Featured Property Types
            </span>
          </h2>
          <p className="text-sm sm:text-lg text-gray-400 mt-2">
            Discover premium properties for a luxurious lifestyle.
          </p>
        </div>

        {/* Animated Property Cards */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-12 px-2 sm:px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {featuredListings.length > 0 ? (
            featuredListings.map((property, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-lg border border-purple-500/40 shadow-xl rounded-xl p-6 text-center 
                           transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer hover:bg-white/20"
                onClick={() => handleClick(property.type)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.img
                  src={serveImage(property.type.toLowerCase())}
                  alt={property.type}
                  className="w-16 sm:w-20 h-16 sm:h-20 mx-auto object-cover mb-4 drop-shadow-lg"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                />
                <h3 className="text-sm sm:text-lg font-bold text-purple-400 uppercase tracking-wide drop-shadow-sm">
                  {property.type}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 mt-1">
                  {property.count} {property.count > 1 ? "Listings" : "Listing"}
                </p>
              </motion.div>
            ))
          ) : (
            <p className="col-span-4 text-center text-gray-500 text-sm sm:text-base">
              No featured properties available at the moment.
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProperty;
