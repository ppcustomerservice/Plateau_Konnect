import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleCheckbox,
  togglePriceCheckbox,
  clearFilters,
  setFilter,
} from "./filterSlice";
import { FaFilter, FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { amenities } from "../../utils/constants/filter";
import { getListings } from "../listings/listingService";

const Filter = () => {
  const dispatch = useDispatch();
  const searchFilter = useSelector((store) => store.filter);
  const { enumConst } = useSelector((store) => store.enum);
  const [showFilter, setShowFilter] = useState(false);

  const handleCheckboxChange = (field, value) => {
    dispatch(toggleCheckbox({ field, value }));
  };

  const handleSearch = () => {
    dispatch(getListings());
  };

  return (
    <div className="w-full md:w-auto relative md:block z-10 sm:z-0 mt-8">
      {/* Search & Filter Button */}
      <div className="w-full flex justify-between md:hidden">
        <div className="grow mr-2">
          <form
            className="bg-gray-200 p-3 rounded-lg flex items-center justify-between w-full shadow-md"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <input
              type="text"
              placeholder="Search by cities, description..."
              className="bg-transparent focus:outline-none cursor-pointer w-full px-2"
              name="searchText"
              value={searchFilter.searchText}
              autoComplete="off"
              onChange={(e) =>
                dispatch(setFilter({ searchText: e.target.value }))
              }
            />
            <button type="submit">
              <FaSearch className="text-lg text-gray-700 cursor-pointer transition-transform transform hover:scale-110" />
            </button>
          </form>
        </div>
        <FaFilter
          className="w-12 h-12 bg-gray-200 text-gray-700 p-3 rounded-lg cursor-pointer shadow-md hover:text-gray-600 transition-transform transform hover:scale-110"
          onClick={() => setShowFilter((prev) => !prev)}
        />
      </div>

      {/* Filter Box with Glassmorphism */}
      <div
        className={`absolute bg-white/30 backdrop-blur-lg border border-white/20 rounded-lg p-5 min-w-[260px] shadow-lg transition-all duration-300 ease-in-out ${
          showFilter ? "top-24 right-0" : "left-[-1000%]"
        } md:block md:static`}
      >
        {/* Heading with Neon Effect */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white neon-text">All Filters</h3>
          <IoClose
            className="text-lg font-bold w-8 h-8 text-gray-600 cursor-pointer hover:bg-gray-200 rounded-full md:hidden transition-transform transform hover:scale-110"
            onClick={() => setShowFilter(false)}
          />
        </div>
        <div className="my-3 border-b-2 border-gray-300" />

        {/* Filter Categories */}
        <div className="max-h-[60vh] overflow-y-auto">
          {Object.entries(enumConst || {}).map(([key, values]) => {
            const formattedKey = key.replace(/([A-Z])/g, " $1").trim();
            const isNeon = [
              "Water Availability",
              "Electricity Availability",
              "Furnishing",
              "Category",
              "Status",
              "Listing Type",
              "Facing",
              "Lift",
              "Amenities",
            ].includes(formattedKey);

            return (
              <div key={key} className="mb-4">
                {/* Neon Heading */}
                <h3
                  className={`font-semibold text-gray-700 capitalize relative 
                  ${isNeon ? "text-white neon-text" : ""}`}
                >
                  {formattedKey}
                </h3>
                {Object.values(values).map((value) => (
                  <label
                    key={value}
                    className="flex items-center mt-2 text-gray-600 transition-transform transform hover:translate-x-1"
                  >
                    <input
                      type="checkbox"
                      checked={searchFilter[key]?.includes(value)}
                      onChange={() => handleCheckboxChange(key, value)}
                      className="mr-2 h-4 w-4 accent-blue-600 transition-all duration-300 ease-in-out hover:scale-110 checked:ring-2 checked:ring-blue-500"
                    />
                    {value}
                  </label>
                ))}
              </div>
            );
          })}

          {/* Amenities */}
          <div>
            <h3 className="font-semibold text-white neon-text">Amenities</h3>
            {amenities.map((amenity) => (
              <label
                key={amenity}
                className="flex items-center mt-2 text-gray-600 transition-transform transform hover:translate-x-1"
              >
                <input
                  type="checkbox"
                  checked={searchFilter.amenities.includes(amenity)}
                  onChange={() => handleCheckboxChange("amenities", amenity)}
                  className="mr-2 h-4 w-4 accent-blue-600 transition-all duration-300 ease-in-out hover:scale-110 checked:ring-2 checked:ring-blue-500"
                />
                {amenity}
              </label>
            ))}
          </div>
        </div>

        {/* Buttons with Glowing Effect */}
        <div className="grid grid-cols-2 mt-4 gap-4">
          <button
            className="rounded-lg border border-gray-300 shadow-sm px-3 py-2 bg-red-500 text-white font-medium hover:bg-red-600 focus:outline-none transition-shadow hover:shadow-red-400"
            onClick={() => {
              dispatch(clearFilters());
              handleSearch();
            }}
          >
            Clear
          </button>
          <button
            className="rounded-lg border border-gray-300 shadow-sm px-3 py-2 bg-blue-500 text-white font-medium hover:bg-blue-600 focus:outline-none transition-shadow hover:shadow-blue-400"
            onClick={handleSearch}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
