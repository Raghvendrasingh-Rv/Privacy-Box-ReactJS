import React from "react";
import { FiFile, FiDownload, FiCalendar, FiClock } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const OpenEntry = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const journal = location.state?.journal;
  console.log(location.state);
  console.log(journal);

  if (!journal) {
    return <div>No entry found</div>;
  }

  const formatIST = (utcDateString) => {
    const date = new Date(utcDateString);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
    };
  };

  const { date, time } = formatIST(journal.date);

  // Determine file type and icon
  const getFileInfo = () => {
    const extension = journal.fileUrl.split(".").pop().toLowerCase();
    const mimeMap = {
      txt: "text/plain",
      md: "text/markdown",
      json: "application/json",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      gif: "image/gif",
      pdf: "application/pdf",
    };
    const fileType = mimeMap[extension] || "application/octet-stream";
    return { extension, fileType };
  };

  const fileInfo = getFileInfo();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      <div className="flex-grow">
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
                <p>Created at:</p>
                <FiCalendar className="text-gray-400" />
                <span>{date}</span>
                <FiClock className="text-gray-400 ml-2" />
                <span>{time}</span>
              </div>
            </div>

            {/* Main Content */}
            <div className="p-6">
              {/* Title */}
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {journal.title}
              </h1>

              {/* Sentiment Badge */}
              {journal.sentiment && (
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-6 ${
                    journal.sentiment === "HAPPY"
                      ? "bg-green-100 text-green-800"
                      : journal.sentiment === "SAD"
                      ? "bg-blue-100 text-blue-800"
                      : journal.sentiment === "ANGRY"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {journal.sentiment}
                </span>
              )}

              {/* Description */}
              <div className="prose max-w-none mb-8">
                <p className="text-gray-700 whitespace-pre-line">
                  {journal.content}
                </p>
              </div>

              {/* Attached File Section */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                  <FiFile className="mr-2" />
                  Attached Document
                </h3>

                {journal.fileUrl ? (
                  <div className="flex flex-col gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                    {fileInfo.fileType.startsWith("image") ? (
                      <img
                        src={journal.fileUrl}
                        alt="Image"
                        className="max-w-full h-auto rounded-lg shadow"
                      />
                    ) : fileInfo.fileType === "application/pdf" ? (
                      <iframe
                        src={journal.fileUrl}
                        className="w-full h-[500px] border rounded-lg"
                        title="PDF Preview"
                      />
                    ) : fileInfo.fileType.startsWith("text") ||
                      fileInfo.extension === "md" ||
                      fileInfo.extension === "json" ? (
                      <div className="bg-white border p-4 rounded-md overflow-auto max-h-96 font-mono text-sm whitespace-pre-wrap">
                        <iframe
                          src={journal.fileUrl}
                          className="w-full h-96"
                          title="Text File Viewer"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="p-3 bg-white rounded-lg shadow-sm mr-4">
                            {fileInfo?.icon || (
                              <FiFile className="text-gray-500" />
                            )}
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
                          href={journal.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
                        >
                          <FiDownload className="mr-2" />
                          Open File
                        </a>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300 text-gray-500">
                    <FiFile className="mx-auto h-12 w-12" />
                    <p className="mt-2">No file attached to this entry</p>
                  </div>
                )}
              </div>

              {/* Scheduled Time (if exists) */}
              {journal.scheduledTime && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    Scheduled Reminder
                  </h3>
                  <p className="text-gray-600">
                    ⏰ {new Date(journal.scheduledTime).toLocaleString()}
                  </p>
                  <p
                    className={`text-sm mt-1 ${
                      new Date(journal.scheduledTime) > new Date()
                        ? "text-green-600"
                        : "text-gray-500"
                    }`}
                  >
                    {new Date(journal.scheduledTime) > new Date()
                      ? "Upcoming"
                      : "Completed"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OpenEntry;
