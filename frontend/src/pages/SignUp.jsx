import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "../components/Snackbar";
import { signUpUser } from "../redux/user/userService";
import { defaultFormData } from "../utils/constants/user";
import { STATUS } from "../utils/constants/common";

const SignUp = () => {
  const [formData, setFormData] = useState(defaultFormData);
  const [status, setStatus] = useState(STATUS.IDLE);
  const { error } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    dispatch(signUpUser(formData))
      .unwrap()
      .then(() => {
        setStatus(STATUS.SUCCEEDED);
        setFormData(defaultFormData);
      })
      .catch(() => {
        setStatus(STATUS.SUCCEEDED);
      });
  };

  const handleSnackbar = () => {
    let message =
      status === STATUS.FAILED
        ? error
        : status === STATUS.SUCCEEDED
          ? "User Created Successfully"
          : "";
    let type =
      status === STATUS.FAILED
        ? "error"
        : status === STATUS.SUCCEEDED
          ? "success"
          : "none";
    let open = status === STATUS.FAILED || status === STATUS.SUCCEEDED;
    let onClose = () => {
      status === STATUS.SUCCEEDED ? navigate("/sign-in") : null;
      setStatus(STATUS.IDLE);
    };
    return {
      message,
      type,
      open,
      onClose,
      time: 3000,
    };
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#dfd5f2]">
      <div className="sign-up-container bg-white rounded-lg shadow-[0_14px_28px_rgba(0,0,0,0.25),_0_10px_10px_rgba(0,0,0,0.22)] relative overflow-hidden w-[678px] max-w-full min-h-[400px]">
        <div className="p-3">
          <Snackbar {...handleSnackbar()} />
          <h1 className="text-3xl text-center font-semibold mt-6 mb-4">
            Sign Up
          </h1>
          <form
            className="grid grid-cols-6 gap-2 gap-y-4 p-4 text-base"
            onSubmit={handleSignUp}
          >
            <label
              className="text-sm sm:text-base font-medium col-span-2 flex text-slate-700 items-center"
              htmlFor="username"
            >
              Username *
            </label>
            <input
              type="text"
              placeholder="username"
              className="border px-4 py-2 outline-[#e2e2e2] col-span-4 rounded-md"
              id="username"
              value={formData?.username}
              onChange={handleChange}
              autoComplete="off"
              required
            />
            <label
              className="text-sm sm:text-base font-medium col-span-2 flex text-slate-700 items-center"
              htmlFor="password"
            >
              Password *
            </label>
            <input
              type="password"
              placeholder="password"
              className="border px-4 py-2 outline-[#e2e2e2] col-span-4 rounded-md"
              id="password"
              value={formData?.password}
              onChange={handleChange}
              autoComplete="off"
              required
            />
            <label
              className="text-sm sm:text-base font-medium col-span-2 flex text-slate-700 items-center"
              htmlFor="fullname"
            >
              Full Name
            </label>
            <input
              type="text"
              placeholder="fullname"
              className="border px-4 py-2 outline-[#e2e2e2] col-span-4 rounded-md"
              id="fullname"
              value={formData?.fullname}
              onChange={handleChange}
              autoComplete="off"
            />
             <label
              className="text-sm sm:text-base font-medium col-span-2 flex text-slate-700 items-center"
              htmlFor="role"
            >
              Role *
            </label>
            <input
              type="text"
              placeholder="Broker/Builder/Buyer"
              className="border px-4 py-2 outline-[#e2e2e2] col-span-4 rounded-md"
              id="role"
              value={formData?.role}
              onChange={handleChange}
              autoComplete="off"
              required
            />
            <label
              className="text-sm sm:text-base font-medium col-span-2 flex text-slate-700 items-center"
              htmlFor="email"
            >
              Email *
            </label>
            <input
              type="text"
              placeholder="email"
              className="border px-4 py-2 outline-[#e2e2e2] col-span-4 rounded-md"
              id="email"
              value={formData?.email}
              onChange={handleChange}
              autoComplete="off"
              required
            />
            <label
              className="text-sm sm:text-base font-medium col-span-2 flex text-slate-700 items-center"
              htmlFor="mobileNo"
            >
              Mobile No. *
            </label>
            <input
              type="number"
              placeholder="mobile no."
              className="border px-4 py-2 outline-[#e2e2e2] col-span-4 rounded-md"
              id="mobileNo"
              value={formData?.mobileNo}
              onChange={handleChange}
              autoComplete="off"
              required
            />
            <button
              type="submit"
              disabled={status === STATUS.LOADING}
              className="col-span-full bg-slate-700 text-white p-2 mt-4 rounded uppercase hover:bg-slate-800 disabled:opacity-80 transition-all"
            >
              {status === STATUS.LOADING ? "Loading..." : "Sign Up"}
            </button>
          </form>
          <div className="flex gap-2 px-4 my-2 justify-center">
            <p>Have an account?</p>
            <Link to="/sign-in" className="text-blue-700 hover:text-blue-500">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
