import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "../components/Snackbar";
import { signInUser } from "../redux/user/userService";
import { STATUS } from "../utils/constants/common";
import { motion } from "framer-motion";

const ADMIN_SECRET_CODE =
  import.meta.env.VITE_ADMIN_SECRET_CODE || "DEFAULT_CODE";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
    adminCode: "",
  });
  const [status, setStatus] = useState(STATUS.IDLE);
  const [adminError, setAdminError] = useState(false);
  const { error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleToggle = () => {
    setFormData((prev) => ({
      ...prev,
      role: prev.role === "user" ? "admin" : "user",
      adminCode: "",
    }));
    setAdminError(false);
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    if (formData.role === "admin" && formData.adminCode !== ADMIN_SECRET_CODE) {
      setAdminError(true);
      return;
    }
    dispatch(signInUser(formData))
      .unwrap()
      .then((user) => {
        setStatus(STATUS.SUCCEEDED);
        navigate(user.role === "admin" ? "/dashboard" : "/");
      })
      .catch(() => {
        setStatus(STATUS.FAILED);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#8db0ef] via-[#b9c0d3] to-black">
      <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-yellow-500 p-8 w-96">
        {/* Snackbar for Errors */}
        <Snackbar
          {...{
            message: status === STATUS.FAILED ? error : "",
            type: status === STATUS.FAILED ? "error" : "",
            open: status === STATUS.FAILED,
            onClose: () => setStatus(STATUS.IDLE),
            time: 3000,
          }}
        />

        <h1 className="text-3xl font-bold text-center text-black mb-4">
          Welcome Back
        </h1>

        <form className="space-y-5" onSubmit={handleSignIn}>
          <input
            type="email"
            placeholder="Email"
            className="w-full border px-3 py-2 rounded-lg bg-white/30 text-black focus:ring-2 focus:ring-yellow-400 backdrop-blur-md"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border px-3 py-2 rounded-lg bg-white/30 text-black focus:ring-2 focus:ring-yellow-400 backdrop-blur-md"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <div className="flex justify-between items-center py-3">
            <span className="font-semibold text-black">User</span>
            <div
              className="relative w-20 h-10 bg-gray-700 rounded-full cursor-pointer shadow-lg border-2 border-gray-600 hover:shadow-yellow-400"
              onClick={handleToggle}
            >
              <motion.div
                className="absolute top-1 left-1 w-8 h-8 bg-white rounded-full shadow-md"
                animate={{
                  x: formData.role === "admin" ? 40 : 0,
                  backgroundColor:
                    formData.role === "admin" ? "#FFD700" : "#fff",
                  boxShadow:
                    formData.role === "admin"
                      ? "0px 0px 15px #FFD700"
                      : "0px 0px 8px rgba(255,255,255,0.5)",
                }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
              />
            </div>
            <span className="font-semibold text-black">Admin</span>
          </div>

          {formData.role === "admin" && (
            <input
              type="password"
              placeholder="Admin Code"
              className="w-full border px-3 py-2 rounded-lg bg-white/30 text-black focus:ring-2 focus:ring-yellow-400 backdrop-blur-md"
              id="adminCode"
              value={formData.adminCode}
              onChange={handleChange}
              required
            />
          )}
          {adminError && (
            <p className="text-red-500 text-sm mt-1">Incorrect Admin Code</p>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 text-black py-2 rounded-lg font-semibold shadow-md hover:shadow-xl transition"
          >
            Sign In
          </button>
        </form>

        <div className="flex justify-between mt-5 text-sm text-black">
          <div className="flex gap-2">
            <p className="font-bold">Don't have an account?</p>
            <Link to="/sign-up" className="text-blue-500 font-semibold hover:underline">
              Sign Up
            </Link>
          </div>
          <Link to="/forgot-password" className="text-blue-500 font-semibold hover:underline">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
