import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function AddNote({ refreshOnSuccess }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fileType, setFileType] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const sentiments = "ANGRY";
  const [uploadNoteFile, setUploadNoteFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAddingEntry, setIsAddingEntry] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const oneWeekLaterISO = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 16);

  const [scheduledTime, setScheduledTime] = useState(oneWeekLaterISO);

  const handleAddCard = async (e) => {
    if (title !== "" && description !== "" && sentiments !== "") {
      e.preventDefault();
      await addEntry();
    } else {
      console.log("missing entry item");
    }
  };

  const addEntry = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    setIsAddingEntry(true);
    const body = {
      title: title,
      content: description,
      fileType: fileType,
      fileUrl: fileUrl,
      scheduledTime: scheduledTime,
      reminderStatus: true,
      sentiments: sentiments,
    };

    try {
      const res = await axios.post(`${BASE_URL}/journal/createEntry`, body, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Success:", res.data);
      refreshOnSuccess();
      setTitle("");
      setDescription("");
      setFileUrl("");
      setFileType("");
      setUploadNoteFile(null);
    } catch (err) {
      console.error("Error adding entry:", err);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } finally {
      setIsAddingEntry(false);
    }
  };

  const handleFileChange = (e) => {
    setUploadNoteFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    if (!uploadNoteFile) return;

    setIsUploading(true);
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
      console.error("Upload error:", err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 p-6">
      <div className="bg-white/60 backdrop-blur-md border border-gray-200 shadow-xl p-8 rounded-2xl mb-6 transition hover:shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">
          📝 Add a New Journal Entry
        </h2>

        <div className="flex flex-col md:flex-row md:space-x-6">
          {/* Left column */}
          <div className="md:w-1/2 space-y-4">
            <label className="block text-gray-900 text-sm font-medium mb-1">
              Title
            </label>
            {/* Title */}
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-5 py-3 text-base border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />

            {/* Sentiment */}
            {/* <div>
              <label className="block text-gray-900 text-sm font-medium mb-1">
                Sentiment
              </label>
              <select
                value={sentiments}
                onChange={(e) => setSentiments(e.target.value)}
                className="w-full px-5 py-3 text-base border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              >
                <option value="HAPPY">😊 Happy</option>
                <option value="SAD">😔 Sad</option>
                <option value="ANGRY">😡 Angry</option>
                <option value="ANXIOUS">😟 Anxious</option>
              </select>
            </div> */}

            {/* Schedule Time */}
            <div>
              <label className="block text-gray-900 text-sm font-medium mb-1">
                Schedule Time
              </label>
              <input
                type="datetime-local"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="w-full px-5 py-3 text-base border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
          </div>

          {/* Right column */}
          <div className="md:w-1/2 space-y-4 mt-6 md:mt-0">
            <label className="block text-gray-900 text-sm font-medium mb-1">
              Description
            </label>
            {/* Description */}
            <textarea
              placeholder="Write your thoughts here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-5 py-3 text-base border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[140px] text-black"
            ></textarea>

            {/* <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
            /> */}

            {/* File Upload */}
            <div>
              <label className="block text-gray-900 text-sm font-medium mb-2">
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
                    disabled={isUploading}
                  />
                </label>

                {isUploading ? (
                  <button
                    className="px-4 py-2 bg-blue-400 text-white rounded-lg shadow-md flex items-center"
                    disabled
                  >
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Uploading...
                  </button>
                ) : fileUrl ? (
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-2 truncate max-w-xs">
                      {uploadNoteFile?.name}
                    </span>
                    <button className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-lg">
                      ✓ Uploaded
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={uploadFile}
                    disabled={!uploadNoteFile}
                    className={`px-4 py-2 rounded-lg shadow-md transition duration-300 ${
                      uploadNoteFile
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
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
            disabled={isAddingEntry}
            className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium py-3 rounded-xl transition duration-300 flex items-center justify-center ${
              isAddingEntry
                ? "opacity-75 cursor-not-allowed"
                : "hover:from-blue-700 hover:to-indigo-700"
            }`}
          >
            {isAddingEntry ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Adding Entry...
              </>
            ) : (
              "➕ Add Entry"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddNote;
