import { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../pages/Admin/Sidebar";

const Support = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <div className="flex-1 p-8 text-black flex justify-center items-center">
        <div className="bg-white shadow-lg rounded-3xl border border-orange-500 p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-orange-600 mb-4">Support</h1>
          <p className="text-center text-gray-700 mb-6">Need help? Reach out to us!</p>
          {submitted ? (
            <p className="text-green-600 text-center">Thank you! We'll get back to you soon.</p>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-400"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-400"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <textarea
                placeholder="Your Message"
                className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-400"
                id="message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold shadow-md hover:bg-orange-600 transition"
              >
                Submit
              </button>
            </form>
          )}
          <div className="text-center mt-4">
            <Link to="/" className="text-orange-600 font-semibold hover:underline">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
