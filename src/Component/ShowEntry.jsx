import React from "react";
import { FiFile, FiDownload, FiCalendar, FiClock } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ShowEntry = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const entry = location.state?.entry;
  console.log(location.state);
  console.log(entry);

  if (!entry) {
    return <div>No entry found</div>;
  }

  const entryDate = new Date(entry.journalId.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC", // Add this line
  });

  const entryTime = new Date(entry.journalId.date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC", // Add this line
  });

  // Determine file type and icon
  const getFileInfo = () => {
    if (!entry.journalId.fileUrl) return null;

    const extension = entry.journalId.fileUrl.split(".").pop().toLowerCase();
    let fileType = "Document";
    let icon = <FiFile className="text-gray-500" />;

    if (["jpg", "jpeg", "png", "gif", "webp"].includes(extension)) {
      fileType = "Image";
      icon = <FiFile className="text-blue-500" />;
    } else if (["pdf"].includes(extension)) {
      fileType = "PDF";
      icon = <FiFile className="text-red-500" />;
    } else if (["doc", "docx"].includes(extension)) {
      fileType = "Word";
      icon = <FiFile className="text-blue-600" />;
    }

    return { extension, fileType, icon };
  };

  const fileInfo = getFileInfo();

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
          {/* Header with back button */}
          <div className="border-b border-gray-200 p-4 flex justify-between items-center">
            <button
              onClick={() => navigate(-1)}
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              ← Back to entry
            </button>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <FiCalendar className="text-gray-400" />
              <span>{entryDate}</span>
              <FiClock className="text-gray-400 ml-2" />
              <span>{entryTime}</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6">
            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {entry.journalId.title}
            </h1>

            {/* Sentiment Badge */}
            {entry.journalId.sentiment && (
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-6 ${
                  entry.journalId.sentiment === "HAPPY"
                    ? "bg-green-100 text-green-800"
                    : entry.journalId.sentiment === "SAD"
                    ? "bg-blue-100 text-blue-800"
                    : entry.journalId.sentiment === "ANGRY"
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {entry.journalId.sentiment}
              </span>
            )}

            {/* Description */}
            <div className="prose max-w-none mb-8">
              <p className="text-gray-700 whitespace-pre-line">
                {entry.journalId.content}
              </p>
            </div>

            {/* Attached File Section */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                <FiFile className="mr-2" />
                Attached Document
              </h3>

              {entry.journalId.fileUrl ? (
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center">
                    <div className="p-3 bg-white rounded-lg shadow-sm mr-4">
                      {fileInfo?.icon || <FiFile className="text-gray-500" />}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        Document.{fileInfo?.extension || "file"}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {fileInfo?.fileType || "File"} Attachment
                      </p>
                    </div>
                  </div>
                  <a
                    href={entry.journalId.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    <FiDownload className="mr-2" />
                    Open File
                  </a>
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300 text-gray-500">
                  <FiFile className="mx-auto h-12 w-12" />
                  <p className="mt-2">No file attached to this entry</p>
                </div>
              )}
            </div>

            {/* Scheduled Time (if exists) */}
            {entry.journalId.scheduledTime && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  Scheduled Reminder
                </h3>
                <p className="text-gray-600">
                  ⏰ {new Date(entry.journalId.scheduledTime).toLocaleString()}
                </p>
                <p
                  className={`text-sm mt-1 ${
                    new Date(entry.journalId.scheduledTime) > new Date()
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  {new Date(entry.journalId.scheduledTime) > new Date()
                    ? "Upcoming"
                    : "Completed"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShowEntry;
