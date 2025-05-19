import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    sentimentAnalysis: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setError(null);
    setIsLoading(true);

    const body = {
      username: formData.name,
      password: formData.password,
      email: formData.email,
      sentimentAnalysis: formData.sentimentAnalysis
    };

    try {
      const response = await axios.post(`${BASE_URL}/public/signupUser`, body, {
        withCredentials: true,
      });
      console.log("Registration successful:", response.data);
      navigate('/login');
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-blue-100 to-indigo-100 px-4">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-lg border border-gray-200 shadow-2xl rounded-2xl p-8 transition-all duration-300 relative">
        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-3"></div>
              <p className="text-indigo-600 font-medium">Creating account...</p>
            </div>
          </div>
        )}

        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          👤 Create Your Account
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
            <p>{error}</p>
          </div>
        )}

        <button
          className="w-full flex items-center justify-center gap-3 py-3 border border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-100 transition mb-6 disabled:opacity-50"
          disabled={isLoading}
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="font-medium">Continue with Google</span>
        </button>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-3 text-gray-500 text-sm">or register with</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="text"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white disabled:bg-gray-100"
            />
          </div>

          <div>
            <span className="block text-gray-700 font-medium mb-2">Sentiment Analysis</span>
            <div className="flex gap-6">
              <label className="flex items-center space-x-2 text-gray-600">
                <input
                  type="radio"
                  name="sentimentAnalysis"
                  value="false"
                  checked={formData.sentimentAnalysis === false}
                  onChange={() => handleChange({ target: { name: "sentimentAnalysis", value: false } })}
                  disabled={isLoading}
                  className="form-radio h-4 w-4 text-blue-600 disabled:opacity-50"
                />
                <span>Disabled</span>
              </label>
              <label className="flex items-center space-x-2 text-gray-600">
                <input
                  type="radio"
                  name="sentimentAnalysis"
                  value="true"
                  checked={formData.sentimentAnalysis === true}
                  onChange={() => handleChange({ target: { name: "sentimentAnalysis", value: true } })}
                  disabled={isLoading}
                  className="form-radio h-4 w-4 text-blue-600 disabled:opacity-50"
                />
                <span>Enabled</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg rounded-xl font-semibold transition duration-300 flex items-center justify-center ${
              isLoading ? "opacity-75 cursor-not-allowed" : "hover:from-blue-700 hover:to-indigo-700"
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating account...
              </>
            ) : (
              "✨ Register"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-700">
          Already have an account?
          <a href="/login" className="text-blue-600 hover:underline ml-1">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;