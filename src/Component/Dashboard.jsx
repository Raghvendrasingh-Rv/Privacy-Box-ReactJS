import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import Footer from "./Footer";
import Navbar from "./Navbar";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Dashboard() {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const token = localStorage.getItem("token");
  const [blankEnable, setBlankEnable] = useState(false);
  const [loading, setLoading] = useState(true); // loading state

  const fetchUserFiles = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await axios.get(`${BASE_URL}/journal/getAll`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Success:", res);
      setFiles(res.data);
    } catch (err) {
      if (err.response?.data) {
        console.log("Data (from error response):", err.response.data);
      } else {
        console.error("Real error:", err);
        if (err.response?.status === 404) {
          setBlankEnable(true);
        }
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    } finally {
      setLoading(false); // Hide skeleton after API completes
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
    else {
      fetchUserFiles();
    }
  }, [navigate]);

  useEffect(() => {
    console.log("Files updated (in useEffect):", files);
  }, [files]);

  // Skeleton placeholder (3 cards)
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
    <div>
      <Navbar />
      <AddNote refreshOnSuccess={fetchUserFiles} />
      <div className="divider"></div>

      {blankEnable ? (
        <div className="flex justify-center">No content Available</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {loading
            ? skeletonCards
            : files.map((i) => (
                <Card
                  key={i.id}
                  id={i.id}
                  title={i.title}
                  description={i.content}
                  sentiment={i.sentiments}
                  scheduledTime={i.scheduledTime}
                  date={i.date}
                  fileUrl={i.fileUrl}
                  reminderStatus={i.reminderStatus}
                  refreshOnSuccess={fetchUserFiles}
                />
              ))}
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Dashboard;
