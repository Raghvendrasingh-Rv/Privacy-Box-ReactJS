import React, { useState } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const sentimentColors = {
  HAPPY: "text-green-600 bg-green-100",
  SAD: "text-blue-600 bg-blue-100",
  ANGRY: "text-red-600 bg-red-100",
  ANXIOUS: "text-yellow-600 bg-yellow-100",
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
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const token = localStorage.getItem("token");

  const onDelete = async () => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      setIsDeleting(true);
      try {
        await axios.delete(`${BASE_URL}/journal/delete/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        refreshOnSuccess();
      } catch (err) {
        console.error(err);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const onEdit = () => {
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      await axios.put(`${BASE_URL}/journal/update/${id}`, editData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      refreshOnSuccess();
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleReminderToggle = () => {
    setEditData(prev => ({
      ...prev,
      reminderStatus: !prev.reminderStatus
    }));
  };

  return (
    <>
      <div className="relative bg-white shadow-lg rounded-2xl p-6 w-full max-w-md mx-auto border border-gray-200 hover:border-indigo-400 transition-all duration-300 ease-in-out m-4">
        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={onEdit}
            className="text-blue-600 hover:text-blue-800 p-2 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors"
            title="Edit"
            aria-label="Edit entry"
            disabled={isDeleting}
          >
            <FaEdit size={16} />
          </button>
          <button
            onClick={onDelete}
            className="text-red-600 hover:text-red-800 p-2 rounded-full bg-red-50 hover:bg-red-100 transition-colors flex items-center justify-center min-w-[32px] min-h-[32px]"
            title="Delete"
            aria-label="Delete entry"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <div className="animate-spin h-4 w-4 border-2 border-red-600 border-t-transparent rounded-full"></div>
            ) : (
              <FaTrashAlt size={16} />
            )}
          </button>
        </div>

        {/* Rest of the card content remains the same */}
        <div className="mb-4">
          {fileUrl ? (
            fileUrl.match(/\.(jpeg|jpg|png|gif|webp)$/i) ? (
              <img
                src={fileUrl}
                alt="Uploaded content"
                className="w-full h-48 object-cover rounded-lg border border-gray-300"
                loading="lazy"
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
                <p className="ml-2 text-sm">File uploaded (unsupported preview)</p>
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

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <p className="text-xs text-gray-500 mt-1">
            Created: {new Date(date).toLocaleDateString()}
          </p>
        </div>

        <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-4">
          {description}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-2">
          {scheduledTime && (
            <p className="text-xs text-indigo-600 font-medium">
              ⏰ {new Date(scheduledTime).toLocaleString()}
            </p>
          )}
          <span
            className={`inline-block px-3 py-1 text-xs rounded-full font-medium ${
              sentimentColors[sentiment] || "bg-gray-100 text-gray-600"
            }`}
          >
            {sentiment}
          </span>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md border border-gray-200 animate-fade-in">
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Edit Journal Entry
              </h3>

              <div className="space-y-4">
                <input
                  name="title"
                  value={editData.title}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Title"
                />

                <textarea
                  name="description"
                  value={editData.description}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Description"
                  rows={4}
                />

                <input
                  name="scheduledTime"
                  type="datetime-local"
                  value={editData.scheduledTime}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="reminderToggle"
                    checked={editData.reminderStatus || false}
                    onChange={handleReminderToggle}
                    className="mr-2"
                  />
                  <label htmlFor="reminderToggle" className="text-sm text-gray-700">
                    Enable Reminder
                  </label>
                </div>

                <select
                  name="sentiment"
                  value={editData.sentiment}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  <option value="HAPPY">😊 Happy</option>
                  <option value="SAD">😔 Sad</option>
                  <option value="ANGRY">😡 Angry</option>
                  <option value="ANXIOUS">😟 Anxious</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition disabled:opacity-50"
                  disabled={isUpdating}
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center justify-center min-w-[100px] disabled:opacity-50"
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                      Updating...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;