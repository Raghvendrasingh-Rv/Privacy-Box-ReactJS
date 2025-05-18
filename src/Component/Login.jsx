import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with:", { email, password });

    const body = {
      username: email,
      password: password,
    };
    axios
      .post(`${BASE_URL}/public/loginUser`, body)
      .then((res) => {
        localStorage.setItem("token", res.data);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.error(err.response.data)
        window.alert('❌ Incorrect username or password!');
      });
      
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-100 via-sky-100 to-pink-100 px-4">
  <div className="w-full max-w-md bg-white/70 backdrop-blur-lg border border-gray-200 shadow-xl rounded-2xl p-8 transition-all duration-300">
    <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
      🚀🎉 Welcome Back
    </h2>

    <form onSubmit={handleLogin} className="space-y-5">
      <div>
        <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
          Email Address
        </label>
        <input
          id="email"
          type="text"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition duration-300"
      >
        🔐 Login
      </button>
    </form>

    <p className="mt-6 text-center text-sm text-gray-600">
      Don't have an account?
      <a href="/register" className="text-blue-600 hover:underline ml-1">
        Sign Up
      </a>
    </p>
  </div>
</div>

  );
};

export default Login;
