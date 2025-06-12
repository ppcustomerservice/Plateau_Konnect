import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, logout } from "../redux/user/userService";
import { getMyListing } from "../redux/listings/listingService";
import useAxios from "../hooks/useAxios";
import { axiosPublic } from "../api/axios";
import useFile from "../hooks/useFile";

import ProfileForm from "./ProfileForm";
import MyListings from "../redux/listings/MyListings";
import ConfirmationModal from "../components/ConfirmationModal";
import { allOptions } from "../utils/constants/user";
import { STATUS } from "../utils/constants/common";

// Renders appropriate component based on selected option
const renderer = (option) => {
  switch (option) {
    case "profile":
      return <ProfileForm />;
    case "mylistings":
      return <MyListings />;
    default:
      return <></>;
  }
};

// Renders sidebar options
const optionRenderer = (label, value, option, setOption, navigate) => {
  const handleClick = () => {
    if (value === "broker") {
      navigate("/broker-dashboard");
    } else {
      setOption(value);
    }
  };

  return (
    <li
      key={label}
      className={`px-4 py-3 cursor-pointer transition-all duration-300 rounded-xl text-base sm:text-lg font-semibold shadow-md text-center whitespace-nowrap
      ${
        option === value
          ? "bg-gradient-to-r from-purple-600 to-indigo-700 text-white shadow-lg scale-105 border border-white border-opacity-30"
          : "bg-white text-gray-800 hover:bg-gray-100 hover:scale-105"
      }`}
      onClick={handleClick}
    >
      {label}
    </li>
  );
};

const Profile = () => {
  const [option, setOption] = useState("profile");
  const [open, setOpen] = useState(false);
  const { status, user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axios = useAxios(axiosPublic);
  const { handleFileDelete } = useFile();

  useEffect(() => {
    if (status === STATUS.LOADING) return;
    if (option === "logout" || option === "delete") {
      setOpen(true);
    }
  }, [option, status, user]);

  const handleLogout = () => {
    setOpen(false);
    dispatch(logout());
  };

  const handleDelete = async () => {
    try {
      const filter = { userId: user._id, limit: 1000 };
      const allListings = await dispatch(getMyListing(filter)).unwrap();
      await dispatch(deleteUser({ id: user._id, axios })).unwrap();
      const urls = allListings?.listings.flatMap((listing) => listing.photos);
      await handleFileDelete(urls);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Confirmation Modal */}
      <ConfirmationModal
        header={option === "delete" ? "Delete Account" : "Logout"}
        body={`Are you sure you want to ${
          option === "delete" ? "delete" : "logout from"
        } your account?`}
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={option === "delete" ? handleDelete : handleLogout}
        submitBtnText={`Yes, ${option === "delete" ? "Delete" : "Logout"}`}
        warningMsg={
          option === "delete"
            ? "By Deleting this Account, you won't be able to access it again."
            : "By Logging out, you will be logged out of the website."
        }
      />

      {/* Main Layout */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="relative grid gap-6 sm:grid-cols-1 md:grid-cols-4">

          {/* Background blobs */}
          <div className="absolute -top-12 -left-12 w-40 h-40 bg-purple-500 opacity-20 rounded-full blur-3xl z-0"></div>
          <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-indigo-500 opacity-20 rounded-full blur-3xl z-0"></div>

          {/* Sidebar */}
          <ul className="md:col-span-1 w-full flex flex-row md:flex-col bg-white p-4 sm:p-6 rounded-3xl shadow-lg space-y-0 md:space-y-4 space-x-4 md:space-x-0 overflow-x-auto md:overflow-visible z-10">
            {allOptions.map((opt) =>
              optionRenderer(opt.label, opt.value, option, setOption, navigate)
            )}
          </ul>

          {/* Main Content */}
          <div className="md:col-span-3 w-full bg-white p-4 sm:p-6 rounded-3xl shadow-xl border-4 border-gray-300 z-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-indigo-700 mb-4 text-center">
              Profile Details
            </h2>
            <div className="border-t-4 border-purple-500 w-24 mx-auto mb-6"></div>
            {renderer(option)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
