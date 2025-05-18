import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import Footer from "./Footer";
import Navbar from "./Navbar";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const token = localStorage.getItem("token");
  const [blankEnable, setBlankEnable] = useState(false);

  const fetchUserFiles = async () => {
    
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await axios.get("http://localhost:8080/journal/getAll", {
        headers: { Authorization: `Bearer ${token}` },
      })
      console.log("Success:", res);
      setFiles(res.data);
    } catch (err) {
      if (err.response?.data) {
        console.log("Data (from error response):", err.response.data);
        // setFiles(err.response.data); // Use the data anyway
      } else {
        console.error("Real error:", err);
        if(err.response?.status === 404){
          setBlankEnable(true);
        }
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
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

  return (
    <div>
      <Navbar />
      
      <AddNote refreshOnSuccess={fetchUserFiles}/>
      <div className="divider"></div>

      {
        blankEnable?<div className="flex justify-center">No content Available</div>:
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {files.map(
          (i) => (
            <Card
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
          )
        )}
      </div>
}
      <Footer/>
    </div>
  );
}

export default Dashboard;
