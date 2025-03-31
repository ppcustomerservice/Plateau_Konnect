import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllListings } from "../../redux/listings/listingService";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";
import noimage from "../../assets/noimage.jpg";
import Sidebar from "../Admin/Sidebar"; // ✅ Import Sidebar

const Projects = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { listings, count, error } = useSelector((store) => store.listing);

  useEffect(() => {
    dispatch(getAllListings({ page }));
  }, [dispatch, page]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto bg-gradient-to-r from-purple-500 to-indigo-600 rounded-3xl shadow-2xl p-10">
          <h2 className="text-4xl font-extrabold text-white text-center mb-8 drop-shadow-lg">
            All Properties
          </h2>

          {error && <p className="text-red-300 text-center italic">{error}</p>}

          {listings?.length ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map((property) => (
                  <div
                    key={property._id}
                    className="flex items-center p-6 bg-white rounded-lg border border-gray-300 shadow-md transition-transform hover:scale-105 hover:shadow-lg cursor-pointer"
                    onClick={() => navigate(`/listings/${property._id}`)}
                  >
                    <img
                      src={property?.photos?.[0] || noimage}
                      alt="property"
                      className="w-32 h-32 object-cover rounded-xl border-2 border-purple-400 mr-6"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {property.name}
                      </h3>
                      <p className="text-gray-600 italic">
                        {property.address?.locality}, {property.address?.city}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <Pagination
                page={page}
                limit={6}
                handleChange={setPage}
                count={count}
              />
            </>
          ) : (
            <p className="text-center text-white italic">No properties found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
