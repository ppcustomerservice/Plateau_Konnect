import { useState, useEffect } from "react";
import { FaSearch, FaUser } from "react-icons/fa";
import { IoMenu, IoClose } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectFilter, setFilter } from "../redux/filter/filterSlice";
import { getListings } from "../redux/listings/listingService";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { user } = useSelector((state) => state.user);
  const filter = useSelector(selectFilter);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    if (location.pathname !== "/listings") {
      navigate("/listings");
    } else {
      dispatch(getListings()).unwrap();
    }
    dispatch(setFilter({ searchText: "" })); // Clear search input
  };

  useEffect(() => {
    setOpenMenu(false);
    dispatch(setFilter({ searchText: "" })); // Clear search text on navigation
  }, [location, dispatch]);

  return (
    <header
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 w-[92%] md:w-[85%] transition-all duration-500 bg-white shadow-lg border border-gray-300 py-2 px-5 rounded-full z-50`}
    >
      <nav className="flex justify-between items-center h-full">
        <Link to="/" className="flex items-center font-bold text-xl">
          <span className="text-black">Plateau</span>
          <span className="text-blue-700">Konnect</span>
        </Link>

        <div className="hidden md:flex">
          <form
            className="bg-gray-100 flex items-center h-9 w-72 rounded-full px-4 shadow-md border border-gray-300"
            onSubmit={handleSearch}
          >
            <input
              type="text"
              placeholder="Search by city, description..."
              className="bg-transparent focus:outline-none w-full text-black placeholder-gray-500"
              value={filter.searchText}
              autoComplete="off"
              onChange={(e) =>
                dispatch(setFilter({ searchText: e.target.value }))
              }
            />
            <button type="submit">
              <FaSearch className="text-gray-600 cursor-pointer" />
            </button>
          </form>
        </div>

        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-black font-medium hover:text-gray-700">
            Home
          </Link>
          <Link to="/start" className="text-black font-medium hover:text-gray-700">
            Add Property
          </Link>
          <Link to="/pricingplans" className="text-black font-medium hover:text-gray-700">
            Plans
          </Link>
          {user?.username ? (
            <Link to="/profile" className="hover:scale-110 transition">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg border-2 border-white animate-pulse">
                <FaUser size={20} className="text-black" />
              </div>
            </Link>
          ) : (
            <Link to="/sign-in" className="hover:scale-110 transition">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg border-2 border-white animate-pulse">
                <FaUser size={20} className="text-black" />
              </div>
            </Link>
          )}
        </div>

        <div className="md:hidden text-gray-700 cursor-pointer" onClick={() => setOpenMenu(!openMenu)}>
          {openMenu ? <IoClose size={26} /> : <IoMenu size={26} />}
        </div>
      </nav>

      {openMenu && (
        <div className="absolute top-full left-0 w-full bg-white/30 backdrop-blur-lg border border-gray-300 rounded-2xl shadow-lg py-4 mt-2">
          <Link to="/" className="block text-center py-2 text-black font-medium hover:text-gray-700">
            Home
          </Link>
          <Link to="/start" className="block text-center py-2 text-black font-medium hover:text-gray-700">
            Add Property
          </Link>
          <Link to="/pricingplans" className="block text-center py-2 text-black font-medium hover:text-gray-700">
            Plans
          </Link>
          {user?.username ? (
            <Link to="/profile" className="block text-center py-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg border-2 border-white animate-pulse mx-auto">
                <FaUser size={20} className="text-black" />
              </div>
            </Link>
          ) : (
            <Link to="/sign-in" className="block text-center py-2 text-gray-700 hover:text-blue-600">
              Sign In
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;