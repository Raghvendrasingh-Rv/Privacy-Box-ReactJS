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
  console.log(entry.journal.scheduledTime);

  if (!entry) {
    return <div>No entry found</div>;
  }

  // const entryDate = new Date(entry.journal.date).toLocaleDateString("en-US", {
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric",
  //   timeZone: "UTC", // Add this line
  // });

  // const entryTime = new Date(entry.journal.date).toLocaleTimeString("en-US", {
  //   hour: "2-digit",
  //   minute: "2-digit",
  //   timeZone: "UTC", // Add this line
  // });

  const formatIST = (created) => {
    const date = new Date(created);
    return {
      createdDate: date.toLocaleDateString(),
      createdTime: date.toLocaleTimeString(),
    };
  };

  const { createdDate, createdTime } = formatIST(entry.journal.date);

  const scheduledFormatIST = (scheduled) => {
    const date = new Date(scheduled);

    date.setHours(date.getHours() - 5);
    date.setMinutes(date.getMinutes() - 30);

    return {
      scheduledD: date.toLocaleDateString("en-IN", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      scheduledT: date.toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };
  };

  const { scheduledD, scheduledT } = scheduledFormatIST(
    entry.journal.scheduledTime
  );

  // Determine file type and icon
  const getFileInfo = () => {
    const extension = entry.journal.fileUrl.split(".").pop().toLowerCase();
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
      <div className=" pt-15 flex-grow">
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
            {/* Header with back button */}
            <div className="border-b border-gray-200 p-4 flex justify-between items-center">
              <button
                onClick={() => navigate(-1)}
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                ← Back to main
              </button>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <p>Created at:</p>
                <FiCalendar className="text-gray-400" />
                <span>{createdDate}</span>
                <FiClock className="text-gray-400 ml-2" />
                <span>{createdTime}</span>
              </div>
            </div>

            {/* Main Content */}
            <div className="p-6">
              {/* Title */}
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {entry.journal.title}
              </h1>

              {/* Sentiment Badge */}
              {entry.journal.category ? (
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-6 ${
                    entry.journal.category === "PERSONAL"
                      ? "bg-green-100 text-green-800"
                      : entry.journal.category === "WORK"
                      ? "bg-blue-100 text-blue-800"
                      : entry.journal.category === "ETERTAINMENT"
                      ? "bg-red-100 text-red-800"
                      : entry.journal.category === "STUDY"
                      ? "bg-yellow-100 text-yellow-800"
                      : entry.journal.category === "HEALTH"
                      ? "bg-orange-100 text-orange-800"
                      : entry.journal.category === "SOCIAL"
                      ? "bg-pink-100 text-pink-800"
                      : entry.journal.category === "GOALS"
                      ? "text-purple-600 bg-purple-100"
                      : "bg-blue-100 text-black"
                  }`}
                >
                  {entry.journal.category}
                </span>
              ) : (
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-6 bg-green-100 text-green-800
                  }`}
                >
                  {"PERSONAL"}
                </span>
              )}

              {/* Description */}
              <div className="prose max-w-none mb-8">
                <p className="text-gray-700 whitespace-pre-line">
                  {entry.journal.content}
                </p>
              </div>

              {/* Attached File Section */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                  <FiFile className="mr-2" />
                  Attached Document
                </h3>

                {entry.journal.fileUrl ? (
                  <div className="flex flex-col gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                    {fileInfo.fileType.startsWith("image") ? (
                      <img
                        src={entry.journal.fileUrl}
                        alt="Image"
                        className="max-w-full h-auto rounded-lg shadow"
                      />
                    ) : fileInfo.fileType === "application/pdf" ? (
                      <iframe
                        src={entry.journal.fileUrl}
                        className="w-full h-[500px] border rounded-lg"
                        title="PDF Preview"
                      />
                    ) : fileInfo.fileType.startsWith("text") ||
                      fileInfo.extension === "md" ||
                      fileInfo.extension === "json" ? (
                      <div className="bg-white border p-4 rounded-md overflow-auto max-h-96 font-mono text-sm whitespace-pre-wrap">
                        <iframe
                          src={entry.journal.fileUrl}
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
                          href={entry.journal.fileUrl}
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
                    <p className="mt-2">No file attached to this reminder</p>
                  </div>
                )}
              </div>

              {/* Scheduled Time (if exists) */}
              {entry.journal.scheduledTime && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    Scheduled Reminder
                  </h3>
                  <p className="text-gray-600">
                    ⏰ {scheduledD} {scheduledT}
                  </p>
                  <p
                    className={`text-sm mt-1 ${
                      new Date(entry.journal.scheduledTime) > new Date() &&
                      entry.journal.reminderStatus
                        ? "text-green-600"
                        : new Date(entry.journal.scheduledTime) > new Date() &&
                          !entry.journal.reminderStatus
                        ? "text-red-500"
                        : "text-gray-500"
                    }`}
                  >
                    {new Date(entry.journal.scheduledTime) > new Date() &&
                    entry.journal.reminderStatus
                      ? "Upcoming"
                      : new Date(entry.journal.scheduledTime) > new Date() &&
                        !entry.journal.reminderStatus
                      ? "Off"
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

export default ShowEntry;
