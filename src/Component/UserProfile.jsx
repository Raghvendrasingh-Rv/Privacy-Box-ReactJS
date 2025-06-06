import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
import profilePicture from "../assets/profile.svg"

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    avatar: profilePicture,
    bio: "Digital designer and frontend developer. Creating beautiful interfaces that people love to use.",
    location: "San Francisco, CA",
    joined: "Joined September 2022",
  });

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsEditing(false);
    const body = {
      username: user.name,
    };
    try {
      const res = await axios.put(`${BASE_URL}/user/updateUser`, body, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const newUser = res.data.user;
      const newToken = res.data.token;
      localStorage.setItem("token", newToken);
      setData(newUser);
    } catch (err) {
      console.log(err);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/userInfo`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Success:", res);
    } catch (err) {
      if (err.response?.data) {
        console.log("Data (from error response):", err.response.data);
        setData(err.response.data);
      } else {
        console.error("Real error:", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      getUserDetails();
    }
  }, [navigate]);

  useEffect(() => {
    console.log("data updated (in useEffect):", { data });
    user.name = data.username;
    user.email = data.email;
  }, [data]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      <div className="flex-grow">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-48 w-full"></div>

        {/* Main Content */}
        {loading ? (
          <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-50 mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">Loading your profile...</p>
            </div>
          </div>
        ) : (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-20">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Profile Header */}
              <div className="px-8 py-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row items-start sm:items-center">
                  <div className="relative -mt-20 mb-4 sm:mb-0 sm:mr-6">
                    <img
                      src={user.avatar}
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    {isEditing && (
                      <button className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-blue-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h1 className="text-2xl font-bold text-gray-900">
                        {isEditing ? (
                          <input
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={handleInputChange}
                            className="w-full px-3 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          user.name
                        )}
                      </h1>
                      <div className="flex space-x-3">
                        {isEditing ? (
                          <>
                            <button
                              onClick={handleSave}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition shadow-sm"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setIsEditing(false)}
                              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => setIsEditing(true)}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition shadow-sm"
                            >
                              Edit Profile
                            </button>
                            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                              </svg>
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    <p className="text-gray-600 mt-1">
                      {isEditing ? (
                        <input
                          type="text"
                          name="location"
                          value={user.location}
                          onChange={handleInputChange}
                          className="w-full px-3 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        user.location
                      )}
                    </p>
                    <p className="text-gray-400 text-sm mt-1">{user.joined}</p>
                  </div>
                </div>
              </div>

              {/* Profile Details */}
              <div className="px-8 py-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    About
                  </h2>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={user.bio}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-700">{user.bio}</p>
                  )}
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Contact Information
                  </h2>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={user.email}
                          onChange={handleInputChange}
                          className="w-full px-3 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="text-gray-700">{user.email}</p>
                      )}
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="phone"
                          value={user.phone || ""}
                          onChange={handleInputChange}
                          placeholder="Add phone number"
                          className="w-full px-3 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="text-gray-700">
                          {user.phone || "Not provided"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Sections */}
              <div className="px-8 py-6 border-t border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Activity
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">
                      {data.journalEntries?.length}
                    </p>
                    <p className="text-gray-500">Posts</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">3.2K</p>
                    <p className="text-gray-500">Followers</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">487</p>
                    <p className="text-gray-500">Following</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">56</p>
                    <p className="text-gray-500">Projects</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default UserProfile;
