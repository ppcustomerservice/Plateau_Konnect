import { useState } from "react";
import { Link } from "react-router-dom";
import { axiosPublic } from "../api/axios";
import { ErrorHandler } from "../utils/helpers/asyncHandlers";
import Snackbar from "../components/Snackbar";
import Loader from "../components/Loader";
import { motion } from "framer-motion";

const defaultError = { message: "", type: "" };
const defaultInput = { email: "", otp: "", password: "", confirmPassword: "" };
const STEPS = { SENDOTP: "SENDOTP", VERIFYOTP: "VERIFYOTP", UPDATEPASSWORD: "UPDATEPASSWORD" };

const Input = ({ input, setInput, type, placeholder, id, field }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full border px-4 py-3 outline-none rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
      id={id}
      value={input[field]}
      onChange={(e) => setInput((prev) => ({ ...prev, [field]: e.target.value }))}
      autoComplete="off"
      required
    />
  );
};

const ForgotPassword = () => {
  const [input, setInput] = useState(defaultInput);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(defaultError);
  const [step, setStep] = useState(STEPS.SENDOTP);

  const forgotPasswordRequest = async (data, nextStep) => {
    try {
      const response = await axiosPublic.post(`/api/auth/forgot-password?step=${step}`, data);
      setError({ message: response?.data?.message, type: "success" });
      setStep(nextStep);
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(defaultError);
    setLoading(true);
    try {
      if (step === STEPS.SENDOTP) {
        await forgotPasswordRequest({ email: input.email }, STEPS.VERIFYOTP);
      } else if (step === STEPS.VERIFYOTP) {
        await forgotPasswordRequest({ otp: input.otp }, STEPS.UPDATEPASSWORD);
      } else if (step === STEPS.UPDATEPASSWORD) {
        if (input.password !== input.confirmPassword) {
          setError({ message: "Passwords do not match!", type: "error" });
          return;
        }
        await forgotPasswordRequest({ password: input.password }, STEPS.SENDOTP);
      }
    } catch (error) {
      const { message } = ErrorHandler(error);
      setError({ message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div className="max-w-md mx-auto mt-12 bg-white p-6 rounded-xl shadow-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Snackbar message={error.message} type={error.type} open={error.message.length} onClose={() => setError(defaultError)} time={5000} />
      {loading && <Loader />}
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Forgot Password?</h2>
      <p className="text-gray-500 text-center mb-6">No worries! Enter your email and follow the steps to reset your password.</p>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {step === STEPS.SENDOTP ? (
          <Input input={input} setInput={setInput} type="email" placeholder="Enter your email" field="email" id="email" />
        ) : step === STEPS.VERIFYOTP ? (
          <Input input={input} setInput={setInput} type="number" placeholder="Enter OTP" field="otp" id="otp" />
        ) : (
          <>
            <Input input={input} setInput={setInput} type="password" placeholder="New Password" field="password" id="password" />
            <Input input={input} setInput={setInput} type="password" placeholder="Confirm Password" field="confirmPassword" id="confirmPassword" />
          </>
        )}
        <motion.button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 disabled:opacity-70" whileTap={{ scale: 0.95 }}>
          {step === STEPS.SENDOTP ? "Get OTP" : step === STEPS.VERIFYOTP ? "Verify OTP" : "Update Password"}
        </motion.button>
      </form>
      {step !== STEPS.SENDOTP && (
        <button className="text-red-500 mt-4 underline" onClick={() => setStep(STEPS.SENDOTP)}>Go Back</button>
      )}
      <div className="flex justify-center gap-2 mt-5">
        <p className="text-gray-600">Remember your password?</p>
        <Link to="/sign-in" className="text-blue-600 font-semibold hover:text-blue-400">Sign In</Link>
      </div>
    </motion.div>
  );
};

export default ForgotPassword;
