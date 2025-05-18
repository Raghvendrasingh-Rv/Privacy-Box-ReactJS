import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    sentimentAnalysis: false
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log('Registering:', formData);

    const body = {
      username: formData.name,
      password: formData.password,
      email: formData.email,
      sentimentAnalysis: formData.sentimentAnalysis
    };

    console.log(body)
    
    axios
      .post("http://localhost:8080/public/signupUser", body,{
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        navigate('/login');
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-blue-100 to-indigo-100 px-4">
  <div className="w-full max-w-md bg-white/70 backdrop-blur-lg border border-gray-200 shadow-2xl rounded-2xl p-8 transition-all duration-300">
    <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
      👤 Create Your Account
    </h2>

    <button
      
      className="w-full flex items-center justify-center gap-3 py-3 border border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-100 transition mb-6"
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
          className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white"
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
          className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white"
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
          className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white"
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
          className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white"
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
              className="form-radio h-4 w-4 text-blue-600"
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
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span>Enabled</span>
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition duration-300"
      >
        ✨ Register
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
