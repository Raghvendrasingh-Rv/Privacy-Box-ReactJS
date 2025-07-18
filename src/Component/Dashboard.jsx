import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import Footer from "./Footer";
import Navbar from "./Navbar";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const LOCAL_BACKEND_BASE_URL = import.meta.env.VITE_LOCAL_BACKEND_ENV;
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FiSearch, FiX } from "react-icons/fi";

function Dashboard() {
  const navigate = useNavigate();
  const [allFiles, setAllFiles] = useState([]); // Stores ALL files from API
  const [displayedFiles, setDisplayedFiles] = useState([]); // Files to display (all or filtered)
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("token");
  const [blankEnable, setBlankEnable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  // const [oneItemLoad, seOneItemLoad] = useState(true);

  const updateFiles = (newFiles) => {
    setAllFiles(newFiles);
    // if(oneItemLoad&&allFiles.length==1){
    //   seOneItemLoad(false);
    //   window.location.reload();
    // }
  };

  const fetchUserFiles = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    //user info
    try {
      const res = await axios.get(`${BASE_URL}/user/userInfo`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Success:", res);
    } catch (err) {
      if (err.response?.data) {
        console.log("Data (from error response):", err.response.data);
        setUser(err.response.data);
      } else {
        console.error("Real error:", err);
      }
    }
    try {
      const res = await axios.get(`${BASE_URL}/journal/getAll`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      updateFiles(res.data);
      setDisplayedFiles(res.data); // Initially show all files
      setBlankEnable(res.data.length === 0);
    } catch (err) {
      if (err.response?.status === 404) {
        setBlankEnable(true);
      } else if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
      console.error("Error fetching files:", err);
    } finally {
      setLoading(false);
    }

  };

  // Filter files based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      // When search is empty, show ALL files
      setDisplayedFiles(allFiles);
    } else {
      // When searching, filter files
      const filtered = allFiles.filter(
        (file) =>
          file.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setDisplayedFiles(filtered);
    }
  }, [searchTerm, allFiles]); // Re-run when searchTerm or allFiles changes

  useEffect(() => {
    if (!token) navigate("/login");
    else fetchUserFiles();
  }, [navigate, token]);

  // Skeleton loader
  const skeletonCards = Array(3)
    .fill(null)
    .map((_, index) => (
      <div
        key={index}
        className="p-4 bg-white rounded-2xl shadow-md flex flex-col gap-3"
      >
        <Skeleton height={20} width={150} borderRadius={8} />
        <Skeleton height={14} count={2} borderRadius={8} />
        <Skeleton height={30} width={100} borderRadius={8} />
      </div>
    ));

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-100 via-blue-100 to-white">
      <Navbar />
      <div className="pt-15 flex-grow">
        <div className="flex-1 px-4 py-6 max-w-7xl mx-auto w-full">
          {/* Modern Centered Search Bar */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-full max-w-xl">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiSearch className="text-black text-lg " />
              </div>
              <input
                type="text"
                placeholder="Search by title"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-black pl-12 pr-10 py-3 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent shadow-sm transition-all duration-200 bg-white"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FiX className="text-lg text-black" />
                </button>
              )}
            </div>
          </div>

          <AddNote refreshOnSuccess={fetchUserFiles} />
          <div className="divider my-6"></div>

          {blankEnable ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No revision found
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading || !user ? (
                skeletonCards
              ) : displayedFiles.length > 0 ? (
                displayedFiles.map((i) => (
                  <Card
                    key={i.id}
                    journal={i}
                    sender={user}
                    refreshOnSuccess={fetchUserFiles}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 text-lg">
                    {searchTerm
                      ? "No matching revision material found!"
                      : "No revision available!"}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
