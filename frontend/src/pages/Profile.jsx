import { useEffect, useState } from "react";
import ProfileForm from "./ProfileForm";
import { allOptions } from "../utils/constants/user";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, logout } from "../redux/user/userService";
import useAxios from "../hooks/useAxios";
import { axiosPublic } from "../api/axios";
import MyListings from "../redux/listings/MyListings";
import { STATUS } from "../utils/constants/common";
import ConfirmationModal from "../components/ConfirmationModal";
import { getMyListing } from "../redux/listings/listingService";
import useFile from "../hooks/useFile";

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

const optionRenderer = (label, value, option, setOption) => {
  return (
    <li
      key={label}
      className={`block p-4 cursor-pointer transition-all duration-300 rounded-xl text-lg font-semibold shadow-md text-center 
      ${
        option === value
          ? "bg-gradient-to-r from-purple-600 to-indigo-700 text-white shadow-lg scale-110 border border-white border-opacity-30"
          : "bg-white text-gray-800 hover:bg-gray-100 hover:scale-105"
      }`}
      onClick={() => setOption(value)}
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
  const axios = useAxios(axiosPublic);
  const { handleFileDelete } = useFile();

  useEffect(() => {
    if (status === STATUS.LOADING) return;
    else if (option === "logout" || option === "delete") {
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
        body={`Are you sure you want to ${option === "delete" ? "delete" : "logout from"} your account?`}
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

      {/* Profile Layout */}
      <div className="max-w-screen-xl mx-auto grid grid-cols-10 p-6 gap-6 my-6 bg-gradient-to-r from-indigo-200 to-purple-300 shadow-2xl rounded-3xl relative overflow-hidden">
        <div className="absolute -top-12 -left-12 w-40 h-40 bg-purple-500 opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-indigo-500 opacity-20 rounded-full blur-3xl"></div>

        {/* Profile Content */}
        <div className="order-last col-span-full md:col-span-8 bg-white p-8 rounded-3xl shadow-xl border-4 border-gray-300 transition-all duration-500 hover:shadow-3xl">
          <h2 className="text-3xl font-bold text-indigo-700 mb-4 text-center">Profile Details</h2>
          <div className="border-t-4 border-purple-500 w-24 mx-auto mb-6"></div>
          {renderer(option)}
        </div>

        {/* Sidebar Menu */}
        <ul className="flex md:flex-col font-semibold text-gray-700 col-span-full md:col-span-2 md:order-last bg-white p-6 rounded-3xl shadow-lg space-y-4 transition-all duration-300">
          {allOptions.map((opt) => optionRenderer(opt.label, opt.value, option, setOption))}
        </ul>
      </div>
    </>
  );
};

export default Profile;
