import React, { useState } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const sentimentColors = {
  Positive: "text-green-600 bg-green-100",
  Negative: "text-red-600 bg-red-100",
  Neutral: "text-gray-600 bg-gray-100",
};

const Card = ({
  id,
  title,
  description,
  scheduledTime,
  sentiment,
  date,
  fileUrl,
  reminderStatus,
  refreshOnSuccess,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    title,
    description,
    sentiment,
    scheduledTime,
    reminderStatus,
  });

  const token = localStorage.getItem("token");

  const onDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/journal/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      refreshOnSuccess();
    } catch (err) {
      console.error(err);
    }
  };

  const onEdit = () => {
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${BASE_URL}/journal/update/${id}`, editData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      refreshOnSuccess();
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleReminderToggle = () => {
  setEditData(prev => {
    const newStatus = !prev.reminderStatus;
    console.log("Updating status to:", newStatus); // Log the new value
    return {
      ...prev,
      reminderStatus: newStatus
    };
  });
};

  return (
    <>
      <div className="relative bg-white shadow-lg rounded-2xl p-6 w-full max-w-md mx-auto border border-gray-200 hover:border-indigo-400 transition-all duration-300 ease-in-out transform hover:scale-[1.02] m-4 group">
        {/* Edit/Delete Buttons */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={onEdit}
            className="text-blue-600 hover:text-blue-800 p-1 rounded-full bg-blue-50 hover:bg-blue-100"
            title="Edit"
          >
            <FaEdit size={16} />
          </button>
          <button
            onClick={onDelete}
            className="text-red-600 hover:text-red-800 p-1 rounded-full bg-red-50 hover:bg-red-100"
            title="Delete"
          >
            <FaTrashAlt size={16} />
          </button>
        </div>

        {/* Media Preview */}
        <div className="mb-4">
          {fileUrl ? (
            fileUrl.match(/\.(jpeg|jpg|png|gif|webp)$/i) ? (
              <img
                src={fileUrl}
                alt="Uploaded"
                className="w-full h-48 object-cover rounded-lg border border-gray-300"
              />
            ) : fileUrl.match(/\.(txt|md|json)$/i) ? (
              <div className="w-full h-48 flex items-center justify-center bg-yellow-50 rounded-lg border border-yellow-300 text-yellow-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h5l5 5v11a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="ml-2 text-sm font-medium">Text file uploaded</p>
              </div>
            ) : (
              <div className="w-full h-48 flex items-center justify-center bg-gray-100 rounded-lg border border-dashed border-gray-300 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 7v4a1 1 0 001 1h1v5a2 2 0 002 2h10a2 2 0 002-2v-5h1a1 1 0 001-1V7a2 2 0 00-2-2H5a2 2 0 00-2 2z"
                  />
                </svg>
                <p className="ml-2 text-sm">
                  File uploaded (unsupported preview)
                </p>
              </div>
            )
          ) : (
            <div className="w-full h-48 flex items-center justify-center bg-gray-100 rounded-lg border border-dashed border-gray-300 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 7v4a1 1 0 001 1h1v5a2 2 0 002 2h10a2 2 0 002-2v-5h1a1 1 0 001-1V7a2 2 0 00-2-2H5a2 2 0 00-2 2z"
                />
              </svg>
              <p className="ml-2 text-sm">No file uploaded</p>
            </div>
          )}
        </div>

        {/* Title and Date */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <p className="text-xs text-gray-400 mt-1">
            {new Date(date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Description */}
        <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-4">
          {description}
        </p>

        {scheduledTime && (
          <p className="text-xs text-indigo-600 mt-1 font-medium">
            ⏰ Scheduled For:{" "}
            {new Date(scheduledTime).toLocaleString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        )}

        {/* Sentiment Tag */}
        <span
          className={`inline-block px-3 py-1 text-xs rounded-full font-medium shadow-sm ${
            sentimentColors[sentiment] || "bg-gray-100 text-gray-600"
          }`}
        >
          {sentiment}
        </span>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50  bg-opacity-30 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-2xl w-full max-w-md border border-gray-200 animate-fade-in">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Edit Journal Entry
            </h3>

            <input
              name="title"
              value={editData.title}
              onChange={handleChange}
              className="w-full mb-3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Title"
            />

            <textarea
              name="description"
              value={editData.description}
              onChange={handleChange}
              className="w-full mb-3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Description"
              rows={4}
            />

            <input
              name="scheduledTime"
              type="datetime-local"
              value={editData.scheduledTime}
              onChange={handleChange}
              className="w-full px-5 py-3 text-base border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label>
              Reminder :
              <input
                type="checkbox"
                checked={editData.reminderStatus || false} // Ensure boolean
                onChange={handleReminderToggle}
              />
              Active
            </label>

            <select
              name="sentiment"
              value={editData.sentiment}
              onChange={handleChange}
              className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="HAPPY">😊 Happy</option>
              <option value="SAD">😔 Sad</option>
              <option value="ANGRY">😡 Angry</option>
              <option value="ANXIOUS">😟 Anxious</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
