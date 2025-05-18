import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function AddNote({ refreshOnSuccess }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fileType, setFileType] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [sentiments, setSentiments] = useState("ANGRY");
  const navigate = useNavigate();
  const [uploadNoteFile, setUploadNoteFile] = useState(null);
  const token = localStorage.getItem("token");

  const oneWeekLaterISO = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 16); // 'YYYY-MM-DDTHH:mm' format

  const [scheduledTime, setScheduledTime] = useState(oneWeekLaterISO);

  const handleAddCard = (e) => {
    if (title != "" && description != "" && sentiments != "") {
      e.preventDefault();
      addEntry();
    } else {
      console.log("missing entry item");
    }
  };

  const addEntry = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    const body = {
      title: title,
      content: description,
      fileType: fileType,
      fileUrl: fileUrl,
      scheduledTime: scheduledTime,
      reminderStatus:true,
      sentiments: sentiments,
    };

    try {
      const res = await axios.post(
        `${BASE_URL}/journal/createEntry`,
        body,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Success:", res.data);
      refreshOnSuccess();
      setTitle("");
      setDescription("");
      setFileUrl("");
      setFileType("");
      setUploadNoteFile(null);
    } catch (err) {
      if (err.response?.data) {
        console.log("Data (from error response):", err.response.data);
        // setFiles(err.response.data); // Use the data anyway
      } else {
        console.error("Real error:", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    }
  };

  const handleFileChange = (e) => {
    setUploadNoteFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("file", uploadNoteFile);

    try {
      const res = await fetch(`${BASE_URL}/journal/upload`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const obj = await res.json();
      setFileUrl(obj.fileUrl);
      setFileType(obj.fileType);
    } catch (err) {
      console.log(err);
    }
    // Save journal entry with file URL
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 p-6">
      <div className="bg-white/60 backdrop-blur-md border border-gray-200 shadow-xl p-8 rounded-2xl mb-6 transition hover:shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 tracking-tight">
          📝 Add a New Journal Entry
        </h2>

        <div className="flex flex-col md:flex-row md:space-x-6">
          {/* Left column */}
          <div className="md:w-1/2 space-y-4">
            {/* Title */}
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-5 py-3 text-base border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Sentiment */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Sentiment
              </label>
              <select
                value={sentiments}
                onChange={(e) => setSentiments(e.target.value)}
                className="w-full px-5 py-3 text-base border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="HAPPY">😊 Happy</option>
                <option value="SAD">😔 Sad</option>
                <option value="ANGRY">😡 Angry</option>
                <option value="ANXIOUS">😟 Anxious</option>
              </select>
            </div>

            {/* Schedule Time */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Schedule Time
              </label>
              <input
                type="datetime-local"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="w-full px-5 py-3 text-base border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Right column */}
          <div className="md:w-1/2 space-y-4 mt-6 md:mt-0">
            {/* Description */}
            <textarea
              placeholder="Write your thoughts here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-5 py-3 text-base border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[140px]"
            ></textarea>

            {/* File Upload */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Upload File
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center px-4 py-2 bg-white text-blue-600 rounded-lg shadow-md tracking-wide uppercase border border-blue-600 cursor-pointer hover:bg-blue-600 hover:text-white transition duration-300">
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M16.88 9.94a1 1 0 00-1.41 0l-3.88 3.88V3a1 1 0 00-2 0v10.82l-3.88-3.88a1 1 0 10-1.41 1.41l5.59 5.59a1 1 0 001.41 0l5.59-5.59a1 1 0 000-1.41z" />
                  </svg>
                  <span>Select File</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>

                {fileUrl !== "" ? (
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                    Uploaded
                  </button>
                ) : (
                  <button
                    onClick={uploadFile}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                  >
                    Upload
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Submit button full-width below */}
        <div className="mt-6">
          <button
            onClick={handleAddCard}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition duration-300"
          >
            ➕ Add Entry
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddNote;
