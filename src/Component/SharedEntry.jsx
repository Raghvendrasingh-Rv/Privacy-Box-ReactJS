import React, { useEffect, useState } from "react";
import { FiSend, FiInbox, FiChevronDown, FiChevronUp } from "react-icons/fi";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const SharedEntry = () => {
  const [activeTab, setActiveTab] = useState("sent");
  const [expandedSent, setExpandedSent] = useState(true);
  const [expandedReceived, setExpandedReceived] = useState(true);

  // Sample data - replace with your actual data
  const [sentEntries, setSentEntries] = useState([]);
  const [receivedEntries, setReceivedEntries] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const getEntries = async() =>{
      try{
        const response = await axios.get("http://localhost:8080/shared/getReceiverEntry",
          {headers: {Authorization: `Bearer ${token}`}
        });
        console.log("Success"+ response);
      }catch(err){
      if(err.response?.data){
        console.log("Data (from error response):", err.response.data);
        setReceivedEntries(err.response.data);
      }else{
        console.error("Real error:", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token"); 
          navigate("/login");
        }
      }
    }

    try{
        const response = await axios.get("http://localhost:8080/shared/getSenderEntry",
          {headers: {Authorization: `Bearer ${token}`}
        });
        console.log("Success"+ response);
      }catch(err){
      if(err.response?.data){
        console.log("Data (from error response):", err.response.data);
        setSentEntries(err.response.data);
      }else{
        console.error("Real error:", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token"); 
          navigate("/login");
        }
      }
    }
  }

  useEffect(() => {
    if (!token) {
      return;
    }else{
      getEntries();
    }
  }, []);

  return (
    <>
    <Navbar/>
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header with Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            className={`flex-1 py-4 px-6 font-medium text-center transition-colors ${
              activeTab === "sent"
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("sent")}
          >
            <div className="flex items-center justify-center gap-2">
              <FiSend className="text-lg" />
              <span>SENT ENTRIES</span>
            </div>
          </button>
          <button
            className={`flex-1 py-4 px-6 font-medium text-center transition-colors ${
              activeTab === "received"
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("received")}
          >
            <div className="flex items-center justify-center gap-2">
              <FiInbox className="text-lg" />
              <span>RECEIVED ENTRIES</span>
            </div>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {/* Sent Entries Section */}
          <div className={`mb-8 ${activeTab !== "sent" && "hidden"}`}>
            <div
              className="flex items-center justify-between cursor-pointer mb-4"
              onClick={() => setExpandedSent(!expandedSent)}
            >
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <FiSend className="text-indigo-500" />
                SENT ENTRIES
              </h2>
              {expandedSent ? <FiChevronUp /> : <FiChevronDown />}
            </div>

            {expandedSent && (
              <div className="space-y-4">
                {sentEntries.length > 0 ? (
                  sentEntries.map((entry) => (
                    <div
                      onClick={()=>navigate('/showEntry', { state: { entry: entry } })}
                      key={entry.id}
                      className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors border border-gray-200"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-800">
                            {entry.journalId
.title}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            To: {entry.receiverId}
                          </p>
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            entry.status === "Delivered"
                              ? "bg-blue-100 text-blue-800"
                              : entry.status === "Read"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {entry.status}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <p className="text-xs text-gray-400">
                          {new Date(entry.date).toLocaleString()}
                        </p>
                        {/* <button className="text-xs text-indigo-600 hover:text-indigo-800" onClick={()=>navigate('/showEntry', { state: { entry: entry } })}>
                          View Details
                        </button> */}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No sent entries found
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Received Entries Section */}
          <div className={`${activeTab !== "received" && "hidden"}`}>
            <div
              className="flex items-center justify-between cursor-pointer mb-4"
              onClick={() => setExpandedReceived(!expandedReceived)}
            >
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <FiInbox className="text-indigo-500" />
                RECEIVED ENTRIES
              </h2>
              {expandedReceived ? <FiChevronUp /> : <FiChevronDown />}
            </div>

            {expandedReceived && (
              <div className="space-y-4">
                {receivedEntries.length > 0 ? (
                  receivedEntries.map((entry) => (
                    <div
                      onClick={()=>navigate('/showEntry', { state: { entry: entry } })}
                      key={entry.id}
                      className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors border border-gray-200"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-800">
                            {entry.journalId
.title}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            From: {entry.sender}
                          </p>
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            entry.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : entry.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {entry.status}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <p className="text-xs text-gray-400">
                          {new Date(entry.date).toLocaleString()}
                        </p>
                        {/* <div className="flex gap-2">
                          <button className="text-xs bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition">
                            Accept
                          </button>
                          <button className="text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300 transition">
                            Decline
                          </button>
                        </div> */}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No received entries found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default SharedEntry;
