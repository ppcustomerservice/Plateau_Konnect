import { useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Start = () => {
  const [selectedOption, setSelectedOption] = useState("sell");
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!phoneNumber.trim()) {
      alert("Phone number is required");
      return;
    }
    navigate(user ? '/listings/add' : '/sign-in');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-100 to-blue-200 text-gray-900 p-6">
      <motion.div 
        initial={{ opacity: 0, y: -30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl bg-white p-10 rounded-2xl shadow-xl border border-gray-300"
      >
        <h1 className="text-4xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-400">
          Sell or Rent Your Property Faster
        </h1>
        <ul className="text-gray-600 text-lg text-center space-y-2">
          <li>✅ Advertise for <span className='text-green-500 font-semibold'>FREE</span></li>
          <li>✅ Get unlimited enquiries</li>
          <li>✅ Shortlisted buyers & tenants</li>
          <li>✅ Assistance in site visits</li>
        </ul>
        
        {/* Options */}
        <div className="flex justify-center space-x-4 mt-6">
          {["Sell", "Rent/Lease", "PG"].map(option => (
            <button 
              key={option} 
              onClick={() => setSelectedOption(option.toLowerCase())} 
              className={`px-6 py-3 rounded-full font-semibold text-lg transition-all shadow-md ${selectedOption === option.toLowerCase() ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              {option}
            </button>
          ))}
        </div>
        
        {/* Property Type */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-center text-gray-700">Choose Property Type</h3>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {["Flat/Apartment", "Villa", "Plot/Land", "Studio Apartment", "Farmhouse", "Other"].map(type => (
              <button 
                key={type} 
                onClick={() => setSelectedPropertyType(type)}
                className={`px-6 py-3 rounded-full transition-all shadow-lg ${selectedPropertyType === type ? 'bg-blue-500 text-white' : 'bg-gradient-to-r from-pink-300 to-blue-400 text-white hover:opacity-90'}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        
        {/* Contact Field */}
        <div className="mt-8">
          <label className="block text-gray-700 mb-2 text-lg">Your Contact Details</label>
          <input 
            type="text" 
            placeholder="Phone Number" 
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full p-4 rounded-lg bg-gray-100 text-gray-900 focus:ring-2 focus:ring-blue-400 outline-none text-lg"
          />
        </div>
        
        {/* Start Button */}
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full mt-8 bg-gradient-to-r from-blue-400 to-pink-400 text-white font-bold py-4 rounded-lg shadow-lg transition-all text-xl hover:from-blue-500 hover:to-pink-500"
          onClick={handleSubmit}
        >
          {user ? "Add Property" : "Start Now"}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Start;
