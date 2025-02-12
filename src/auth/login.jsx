import React, { useState } from "react";
import axios from "axios";
import pic from "../image/apple.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from "../components/button";
import Notification from "../asset/Notification";

function Login() {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [notification, setNotification] = useState(null);
  const typeqcm = location.state?.typeqcm; // Get typeqcm from location state
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.identifier);
      const isPhone = /^\d+$/.test(formData.identifier);

      const payload = {
        password: formData.password,
      };

      if (isEmail) {
        payload.email = formData.identifier;
      } else if (isPhone) {
        payload.phone = formData.identifier;
      } else {
        payload.username = formData.identifier;
      }

      const BASE_URL_SERVER = process.env.REACT_APP_BASE_URL_SERVER;
      const APP_KEY = process.env.REACT_APP_APP_KEY;

      const response = await axios.post(`${BASE_URL_SERVER}auth/login`, {
          identifier: formData.identifier,
          password: formData.password
      }, {
          headers: { "APP_KEY": APP_KEY },
      });
      

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      setNotification({
        type: "success",
        message: "Login successful! Redirecting...",
      });

      // Redirect based on typeqcm
      if (typeqcm === "Major Recommend") {
        navigate("/major_test");
      } else if (typeqcm === "Personality test") {
        navigate("/personality_test");
      } else {
        navigate("/"); // Default redirect if typeqcm is not specified
      }
    } catch (error) {
      if (error.response) {
        setError(
          typeof error.response.data.errors === "object"
            ? JSON.stringify(error.response.data.errors)
            : error.response.data.errors || "Login failed. Please try again."
        );
      } else {
        setError("An error occurred. Please check your connection and try again.");
      }
      setNotification({
        type: "error",
        message: "Login failed. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeNotification = () => {
    setNotification(null);
  };

  return (
    <main className="min-h-screen">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}
      <div className="absolute p-[2rem]">
        <Button label="Go Back" onClick={() => navigate('/')}>Go Back</Button>
      </div>
      <div className="flex items-center justify-center">
        <div className="p-[2rem] flex flex-col lg:flex-row w-full overflow-hidden">
          <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
            <img src={pic} alt="Login illustration" className="max-w-[600px] object-contain" />
          </div>
          <div className="w-full lg:w-1/2 p-6 text-left">
            <div className="text-center mb-10">
              <h2 className="mt-6 text-2xl md:text-3xl font-bold text-pink dark:text-white">Login</h2>
              <h3 className="mt-6 text-xl md:text-2xl font-bold text-logocolor dark:text-white">Welcome back</h3>
              <p className="mt-2 text-neutral-500 dark:text-neutral-300 text-md">Log in to manage your account</p>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="identifier" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Username or Email/Phone Number</label>
                <input type="text" id="identifier" className="w-full px-4 py-2 mt-1 border rounded-lg" value={formData.identifier} onChange={handleChange} required />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Password</label>
                <input type="password" id="password" className="w-full px-4 py-2 mt-1 border rounded-lg" value={formData.password} onChange={handleChange} required />
              </div>
              <div className="text-left mt-6 flex items-center justify-between">
                <div className="flex items-center">
                  <input type="checkbox" id="rememberMe" className="w-4 h-4 text-pink-600 border-neutral-300 rounded" />
                  <label htmlFor="rememberMe" className="ml-2 text-sm text-neutral-700 dark:text-neutral-300">Remember me</label>
                </div>
                <Link to="/forgot-password" className="text-sm text-blue-500 underline">Forgot password?</Link>
              </div>
              {error && <p className="text-sm text-red-600 text-center">{error}</p>}
              <div className="flex item-center justify-center">
                <Button label="Login" onClick={handleSubmit} disabled={isSubmitting} className={`${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`} />
              </div>
            </form>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <p className="text-sm text-neutral-600 dark:text-neutral-300">Don't have an account?</p>
              <Link to="/signup" className="text-pink font-medium underline">Signup</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;