import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteListing, getMyListing, getAllListings } from "./listingService"; // Ensure getAllListings is available
import { STATUS } from "../../utils/constants/common";
import noimage from "../../assets/noimage.jpg";
import { FaEdit, FaTrash } from "react-icons/fa";
import ConfirmationModal from "../../components/ConfirmationModal";
import { useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { axiosPublic } from "../../api/axios";
import Pagination from "../../components/Pagination";
import useFile from "../../hooks/useFile";
import Tooltip from "../../components/Tooltip";

const MyListings = () => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [selectedListing, setSelectedListing] = useState(null);
  const { user } = useSelector((store) => store.user);
  const { mylistings, error } = useSelector((store) => store.listing);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axios = useAxios(axiosPublic);
  const { handleFileDelete } = useFile();
  const callRef = useRef(false);

  useEffect(() => {
    if (!callRef.current) {
      setStatus(STATUS.LOADING);
      callRef.current = true;

      const filter = user.role === "admin" ? { page } : { userId: user._id, page };

      const fetchListings = user.role === "admin" ? getAllListings : getMyListing;

      dispatch(fetchListings(filter))
        .unwrap()
        .then((data) => {
          setStatus(STATUS.SUCCEEDED);
          setCount(data?.count || 0);
        })
        .catch(() => {
          setStatus(STATUS.FAILED);
        })
        .finally(() => {
          callRef.current = false;
        });
    }
  }, [dispatch, user.role, user._id, page]);

  const handleDelete = () => {
    setOpen(false);
    setStatus(STATUS.LOADING);
    if (!selectedListing?._id) return;

    dispatch(deleteListing({ axios, id: selectedListing._id }))
      .unwrap()
      .then(async () => {
        try {
          await handleFileDelete(selectedListing.photos);
          setStatus(STATUS.SUCCEEDED);
        } catch (error) {
          setStatus(STATUS.FAILED);
        }
      })
      .catch(() => {
        setStatus(STATUS.FAILED);
      });
  };

  return (
    <>
      <ConfirmationModal
        header="Delete Listing"
        body="Are you sure you want to delete this property?"
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleDelete}
        submitBtnText="Yes, Delete"
        warningMsg="By deleting this listing, you won't be able to access it again."
      />

      <div className="max-w-6xl mx-auto p-10 bg-gradient-to-br from-purple-900 to-gold-700 text-white rounded-3xl shadow-2xl border-4 border-gold-500">
        <h3 className="mb-8 text-5xl text-center font-extrabold text-gold-300 tracking-wide uppercase drop-shadow-lg">
          {user.role === "admin" ? "All Properties" : "Your Luxury Properties"}
        </h3>

        {error && <p className="text-lg text-red-500 text-center">{error}</p>}

        {mylistings && mylistings.length > 0 ? (
          <>
            {mylistings.map((property) => (
              <div
                className="grid grid-cols-8 items-center bg-gradient-to-r from-indigo-900 to-purple-700 p-8 rounded-3xl shadow-xl mb-8 transition-all transform hover:scale-105 hover:shadow-4xl border-2 border-gold-500 cursor-pointer"
                key={property._id}
                onClick={() => navigate(`/listings/${property._id}`)}
              >
                <div className="col-span-2 overflow-hidden rounded-xl border-4 border-gold-400">
                  <img
                    src={property?.photos?.[0] || noimage}
                    className="w-full h-40 object-cover rounded-xl"
                    alt="property image"
                  />
                </div>
                <div className="col-span-4 px-6">
                  <p className="font-semibold text-3xl text-gold-300 truncate uppercase drop-shadow-md">
                    {property.name || "Unnamed Property"}
                  </p>
                  <p className="text-gray-300 text-lg italic">
                    {property.address?.locality || "Unknown Locality"}, {property.address?.city || "Unknown City"}
                  </p>
                </div>
                <button
                  className="col-span-1 flex items-center justify-center bg-gold-600 text-white px-6 py-3 rounded-xl hover:bg-gold-400 transform transition hover:scale-110 border border-white shadow-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/listings/update/${property._id}`);
                  }}
                >
                  <FaEdit className="h-6 w-6 mr-2" /> Edit
                </button>
                <button
                  className="col-span-1 flex items-center justify-center bg-red-700 text-white px-6 py-3 rounded-xl hover:bg-red-500 transform transition hover:scale-110 border border-white shadow-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedListing(property);
                    setOpen(true);
                  }}
                >
                  <FaTrash className="h-6 w-6 mr-2" /> Delete
                </button>
              </div>
            ))}
            <Pagination
              page={page}
              limit={6}
              handleChange={(val) => setPage(val)}
              count={count}
            />
          </>
        ) : (
          <p className="text-xl text-center text-gray-300 italic">No Properties Available</p>
        )}
      </div>
    </>
  );
};

export default MyListings;
