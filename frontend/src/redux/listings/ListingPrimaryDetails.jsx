import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaHome,
  FaQuestionCircle,
  FaCalendarAlt,
  FaCrown,
} from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";
import { BiSolidArea, BiSolidCategory } from "react-icons/bi";
import { GiSofa } from "react-icons/gi";
import { IoMdPricetags } from "react-icons/io";
import InformationModal from "../../components/InformationModal";

const ListingPrimaryDetails = ({ listing }) => {
  const [open, setOpen] = useState(false);
  const { enumConst } = useSelector((store) => store.enum);
  const { user } = useSelector((store) => store.user);
  const location = useLocation();

  return (
    <>
      <InformationModal open={open} onClose={() => setOpen(false)} owner={listing?.owner} />

      {/* Container */}
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-300 max-w-5xl mx-auto">
        
        {/* 🏡 Property Name */}
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 text-center">{listing.name}</h1>

        {/* 📍 Address */}
        <p className="text-md text-gray-600 mt-3 text-center">
          {listing.address?.locality}, {listing.address?.street}, {listing.address?.city}, {listing.address?.zipCode},{" "}
          {listing.address?.state}, {listing.address?.country}
        </p>

        <hr className="border-blue-300 my-6" />

        {/* 📋 Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: FaHome, label: "Property Category", value: listing?.category },
            { icon: BiSolidCategory, label: "Listed For", value: listing?.listingType },
            {
              icon: FaQuestionCircle,
              label: "Status",
              value: listing?.status === enumConst?.status?.AVAILABLE ? "Available" : listing.listingType === enumConst?.listingType?.SALE ? "Sold Out" : "Rented Out",
            },
            {
              icon: MdEventAvailable,
              label: "Available On",
              value: listing?.createdAt
                ? `${new Date(
                    new Date(listing.createdAt).getTime() + listing.availability * 24 * 60 * 60 * 1000
                  ).toLocaleDateString("en-GB")}`
                : "",
            },
            { icon: FaCalendarAlt, label: "Posted On", value: listing?.createdAt ? new Date(listing.createdAt).toLocaleDateString("en-GB") : "" },
            {
              icon: BiSolidArea,
              label: listing?.category === enumConst?.category?.HOUSE || listing?.category === enumConst?.category?.CONDOS ? "Property Area" : "Carpet Area",
              value: `${listing?.carpetArea} sq. ft.`,
            },
            { icon: GiSofa, label: "Furnishing", value: listing?.furnishing },
            {
              icon: IoMdPricetags,
              label: listing.listingType === enumConst?.listingType?.SALE ? "Price" : "Rent",
              value:
                listing.price !== undefined
                  ? `${listing?.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "INR",
                      maximumFractionDigits: 0,
                    })} ${listing.listingType === enumConst?.listingType?.SALE ? "" : "Per Month"}`
                  : "",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)" }}
              transition={{ duration: 0.3 }}
              className="shadow-md p-4 rounded-lg bg-blue-50 border border-gray-300 flex flex-col items-center text-center transition-all duration-300"
            >
              <item.icon className="text-blue-500 text-3xl mb-2" />
              <p className="text-gray-700 font-semibold">{item.label}:</p>
              <p className="text-lg font-bold">{item.value}</p>
            </motion.div>
          ))}
        </div>

        <hr className="border-blue-300 my-6" />

        {/* 👤 Owner Details */}
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center text-gray-700">
            <FaCrown className="mr-2 h-6 w-6 text-blue-500" />
            <span className="text-lg font-medium">Owner Details:</span>
          </div>

          {user ? (
            <motion.button
              className="mt-4 sm:mt-0 px-6 py-3 rounded-lg bg-blue-500 text-white font-semibold shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
              onClick={() => setOpen(true)}
              whileTap={{ scale: 0.95 }}
            >
              View Details
            </motion.button>
          ) : (
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <Link
                to="/sign-in"
                className="mt-4 sm:mt-0 px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
                state={{ from: location }}
              >
                Login First
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default ListingPrimaryDetails;
