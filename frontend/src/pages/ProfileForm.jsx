import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "../components/Snackbar";
import useAxios from "../hooks/useAxios";
import { axiosPublic } from "../api/axios";
import { updateUser } from "../redux/user/userService";
import { defaultFormData } from "../utils/constants/user";
import { STATUS } from "../utils/constants/common";

const ProfileForm = () => {
  const [status, setStatus] = useState(STATUS.IDLE);
  const { error, user } = useSelector((store) => store.user);
  const [formData, setFormData] = useState({ ...defaultFormData, ...user });
  const [isEdit, setIsEdit] = useState(false);

  const dispatch = useDispatch();
  const axios = useAxios(axiosPublic);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleClick = async () => {
    if (!isEdit) {
      setIsEdit(true);
      return;
    }
    const obj = {
      username: formData?.username,
      email: formData?.email,
      fullname: formData?.fullname,
      mobileNo: formData?.mobileNo,
    };
    setStatus(STATUS.IDLE);
    dispatch(updateUser({ id: user._id, userData: obj, axios }))
      .unwrap()
      .then(() => setStatus(STATUS.SUCCEEDED))
      .catch(() => setStatus(STATUS.FAILED));
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!formData.password) return;

    setStatus(STATUS.IDLE);
    dispatch(updateUser({ id: user._id, userData: { password: formData?.password }, axios }))
      .unwrap()
      .then(() => {
        setFormData((prev) => ({ ...prev, password: "" }));
        setStatus(STATUS.SUCCEEDED);
      })
      .catch(() => setStatus(STATUS.FAILED));
  };

  const handleSnackbar = () => ({
    message: status === STATUS.FAILED ? error : status === STATUS.SUCCEEDED ? "User Successfully Updated" : "",
    type: status === STATUS.FAILED ? "error" : status === STATUS.SUCCEEDED ? "success" : "none",
    open: status === STATUS.FAILED || status === STATUS.SUCCEEDED,
    onClose: () => setStatus(STATUS.IDLE),
    time: 1500,
  });

  const returnValue = (val) => (val ? val : "-not added-");

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <Snackbar {...handleSnackbar()} />

      <div className="p-6 sm:p-12 max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl border border-gray-200 relative overflow-hidden">
        {/* Background Gradient Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 opacity-10"></div>

        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Profile Details
          </h1>
          <hr className="border-gray-300 my-4" />

          {/* Profile Information Card */}
          <div className="p-6 rounded-lg bg-white shadow-lg border border-gray-300">
            <div className="grid grid-cols-2 gap-4 text-lg">
              <span className="text-gray-700 font-semibold">Full Name:</span>
              {isEdit ? (
                <input
                  type="text"
                  className="border p-2 rounded-lg"
                  id="fullname"
                  value={formData?.fullname}
                  onChange={handleChange}
                />
              ) : (
                <span className="text-gray-900">{returnValue(user?.fullname)}</span>
              )}

              <span className="text-gray-700 font-semibold">Username:</span>
              {isEdit ? (
                <input
                  type="text"
                  className="border p-2 rounded-lg"
                  id="username"
                  value={formData?.username}
                  onChange={handleChange}
                />
              ) : (
                <span className="text-gray-900">{returnValue(user?.username)}</span>
              )}

              <span className="text-gray-700 font-semibold">Email:</span>
              <span className="text-gray-900">{returnValue(user?.email)}</span>

              <span className="text-gray-700 font-semibold">Mobile No.:</span>
              {isEdit ? (
                <input
                  type="text"
                  className="border p-2 rounded-lg"
                  id="mobileNo"
                  value={formData?.mobileNo}
                  onChange={handleChange}
                />
              ) : (
                <span className="text-gray-900">{returnValue(user?.mobileNo)}</span>
              )}
            </div>
          </div>

          {/* Edit Profile Button */}
          <button
            className="w-full mt-6 py-2 text-lg font-medium text-white bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg shadow-lg hover:opacity-90 transition-all"
            onClick={handleClick}
          >
            {isEdit ? "Save Changes" : "Edit Profile"}
          </button>

          <hr className="border-gray-300 my-6" />

          {/* Change Password Form */}
          <form onSubmit={handleChangePassword} className="flex gap-4">
            <input
              type="password"
              placeholder="New Password"
              className="flex-1 border px-4 py-2 rounded-lg shadow-inner focus:ring-2 focus:ring-purple-400"
              id="password"
              value={formData?.password}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="px-6 py-2 text-lg font-medium text-white bg-gradient-to-r from-green-500 to-blue-500 rounded-lg shadow-lg hover:opacity-90 transition-all"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;