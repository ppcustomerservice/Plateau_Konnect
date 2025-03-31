import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "../components/Snackbar";
import useAxios from "../hooks/useAxios";
import { axiosPublic } from "../api/axios";
import { updateUser } from "../redux/user/userService";
import { defaultFormData } from "../utils/constants/user";
import { STATUS } from "../utils/constants/common";
import { FiMenu, FiX } from "react-icons/fi";

const ProfileForm = () => {
  const [status, setStatus] = useState(STATUS.IDLE);
  const { error, user } = useSelector((store) => store.user);
  const [formData, setFormData] = useState({ ...defaultFormData, ...user });
  const [isEdit, setIsEdit] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const dispatch = useDispatch();
  const axios = useAxios(axiosPublic);

  useEffect(() => {
    setFormData({ ...defaultFormData, ...user });
  }, [user]);

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
    <div className="min-h-screen flex flex-col sm:flex-row bg-gray-100">
      <div className="sm:hidden flex justify-between items-center p-4 bg-white shadow-md">
        <h1 className="text-lg font-bold text-gray-800">PlateauKonnect</h1>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      <div className={`fixed sm:static inset-y-0 left-0 w-64 bg-white shadow-lg p-4 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0 transition-transform`}> 
        <h2 className="text-xl font-bold mb-4">Menu</h2>
        <ul className="space-y-4">
          <li className="p-2 bg-purple-600 text-white rounded-lg">Profile</li>
          <li className="p-2 bg-gray-200 rounded-lg">My Listings</li>
          <li className="p-2 bg-gray-200 rounded-lg">Logout</li>
        </ul>
      </div>

      <div className="flex-1 p-6 sm:p-8 bg-white rounded-lg shadow-lg border border-gray-300 mx-auto max-w-2xl">
        <Snackbar {...handleSnackbar()} />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6">Profile Details</h1>
        <hr className="border-gray-300 my-4" />

        <div className="p-4 sm:p-6 rounded-lg bg-white shadow-md border border-gray-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-base sm:text-lg">
            <label className="text-gray-700 font-semibold">Full Name:</label>
            {isEdit ? (
              <input type="text" className="border p-2 rounded-lg w-full" id="fullname" value={formData?.fullname} onChange={handleChange} />
            ) : (
              <span className="text-gray-900 break-words">{returnValue(user?.fullname)}</span>
            )}

            <label className="text-gray-700 font-semibold">Username:</label>
            {isEdit ? (
              <input type="text" className="border p-2 rounded-lg w-full" id="username" value={formData?.username} onChange={handleChange} />
            ) : (
              <span className="text-gray-900 break-words">{returnValue(user?.username)}</span>
            )}
          </div>
        </div>

        <button className="w-full mt-6 py-2 text-lg font-medium text-white bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg shadow-md hover:opacity-90 transition-all" onClick={handleClick}>
          {isEdit ? "Save Changes" : "Edit Profile"}
        </button>
      </div>
    </div>
  );
};

export default ProfileForm;