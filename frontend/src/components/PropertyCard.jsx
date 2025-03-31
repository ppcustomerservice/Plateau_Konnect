import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Carousel from "./Carousel";
import Tooltip from "./Tooltip";
import { useState } from "react";

const PropertyCard = ({ _id, name, address, price, category, listingType, photos }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { enumConst } = useSelector((store) => store.enum);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { width, height, left, top } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 20;
    const y = ((e.clientY - top) / height - 0.5) * -20;
    setRotation({ x, y });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      className="bg-white    rounded-lg transition duration-300 transform cursor-pointer"
      onClick={() => navigate(`/listings/${_id}`, { state: { from: location } })}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `rotateY(${rotation.x}deg) rotateX(${rotation.y}deg)`,
        transition: "transform 0.05s linear",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Image Section */}
      <div className="relative">
        <Carousel photos={photos} />
      </div>

      {/* Spacing between image and content */}
      <div className="p-4 space-y-3">
        {/* "On Sale / Rent" Badge */}
        <span
          className={`inline-block px-3 py-1 rounded-full font-semibold text-sm ${
            listingType === enumConst?.listingType?.SALE
              ? "text-white bg-slate-700"
              : "text-slate-800 bg-slate-300"
          }`}
        >
          On {listingType}
        </span>

        {/* Property Name */}
        <h2 className="text-lg font-semibold text-gray-900">{name.substring(0, 30)}</h2>

        {/* Address with Tooltip */}
        <Tooltip
          message={`${address?.locality}, ${address?.street}, ${address?.city}`}
          classes="top-6 !w-72 !bg-slate-700"
        >
          <p className="text-gray-600 truncate">{`${address?.locality}, ${address?.city}`}</p>
        </Tooltip>

        {/* Divider */}
        <hr className="border-gray-300" />

        {/* Price & Category */}
        <div className="flex justify-between items-center">
          <p className="text-base font-bold bg-blue-500 text-white rounded-full px-4 py-1">
            {price.toLocaleString("en-US", {
              style: "currency",
              currency: "INR",
              maximumFractionDigits: 0,
            })}
            {listingType === enumConst?.listingType?.SALE ? "" : "/Month"}
          </p>
          <p className="text-base text-gray-700 font-medium">{category}</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
