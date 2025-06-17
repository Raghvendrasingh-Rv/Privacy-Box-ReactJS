import {
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaUser,
} from "react-icons/fa";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import emailjs from '@emailjs/browser';
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const PUBLIC_KEY_ID = import.meta.env.VITE_PUBLIC_KEY;

const ContactPage = () => {
  const contactInfo = {
    displayName: "Raghvendra Singh", // Separate display name
    phone: "+91 88602 85330",
    email: "rv.singh.s.5330@gmail.com",
    location: "Delhi, India",
    linkedin: "www.linkedin.com/in/raghvendra-singh-sengar",
    github: "https://github.com/Raghvendrasingh-Rv",
    instagram: "https://instagram.com/_sengar.rv_",
    status: "Open for opportunities",
    timezone: "IST (UTC+5:30)",
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${contactInfo.name}
TEL:${contactInfo.phone}
EMAIL:${contactInfo.email}
ADR:;;${contactInfo.location}
URL:${contactInfo.linkedin}
END:VCARD`;

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    const templateParams = {
      user_name: formData.name,
      user_email: formData.email,
      message: formData.message,
    };

    emailjs.send(`${SERVICE_ID}`, `${TEMPLATE_ID}`, templateParams, `${PUBLIC_KEY_ID}`)
      .then((result) => {
        console.log('Message sent:', result.text);
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' }); // Reset form
      })
      .catch((error) => {
        console.error('Failed to send message:', error.text);
        alert('Failed to send message.');
      });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="pt-15 flex-grow">
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Get In Touch
              </h1>
              <p className="text-lg text-gray-600">
                Feel free to reach out for collaborations or just a friendly
                hello!
              </p>
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-6 mt-12 mb-12">
              <a
                href={contactInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition"
              >
                <FaLinkedin className="text-indigo-600 text-xl" />
              </a>
              <a
                href={contactInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition"
              >
                <FaGithub className="text-gray-800 text-xl" />
              </a>
              <a
                href={contactInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition"
              >
                <FaInstagram className="text-pink-600 text-xl" />
              </a>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Contact Info */}
              <div className="bg-white rounded-xl shadow-xl p-8">
                {/* Name Section */}
                <div className="flex items-center mb-6">
                  <div className="bg-indigo-100 p-3 rounded-full mr-4">
                    <FaUser className="text-indigo-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Name</h3>
                    <p className="text-xl font-bold text-black">
                      {contactInfo.displayName}
                    </p>
                  </div>
                </div>

                {/* Location Section */}
                <div className="flex items-center mb-6">
                  <div className="bg-indigo-100 p-3 rounded-full mr-4">
                    <FaMapMarkerAlt className="text-indigo-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Location
                    </h3>
                    <p className="text-lg font-medium text-black">
                      {contactInfo.location}
                    </p>
                  </div>
                </div>

                {/* Contact Details */}
                <div className="space-y-6 mb-8">
                  <div className="flex items-center">
                    <div className="bg-indigo-100 p-3 rounded-full mr-4">
                      <FaPhone className="text-indigo-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Phone
                      </h3>
                      <p className="text-lg font-medium text-black">{contactInfo.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="bg-indigo-100 p-3 rounded-full mr-4">
                      <FaEnvelope className="text-indigo-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Email
                      </h3>
                      <p className="text-lg font-medium break-all text-black">
                        {contactInfo.email}
                      </p>
                    </div>
                  </div>

                  {/* Time and Availability */}
                  <div className="flex items-center">
                    <div className="bg-indigo-100 p-3 rounded-full mr-4">
                      <FaClock className="text-indigo-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Local Time
                      </h3>
                      <p className="text-lg font-medium text-black">
                        {currentTime.toLocaleTimeString("en-IN")} (
                        {contactInfo.timezone})
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="bg-indigo-100 p-3 rounded-full mr-4">
                      <FaCalendarAlt className="text-indigo-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Status
                      </h3>
                      <p className="text-lg font-medium text-black">
                        <span className="inline-block h-3 w-3 rounded-full bg-green-500 mr-2"></span>
                        {contactInfo.status}
                      </p>
                    </div>
                  </div>
                </div>

                {/* QR Code */}
                <div className="border-t pt-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-3">
                    Save My Contact
                  </h3>
                  <div className="flex justify-center">
                    <div className="p-2 bg-white border rounded-lg">
                      <QRCodeSVG
                        value={vCard}
                        size={128}
                        level="H"
                        includeMargin={true}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-center text-gray-500 mt-2">
                    Scan to save as vCard
                  </p>
                </div>
              </div>

              {/* Right Column - Contact Form */}
              <div className="bg-gradient-to-br from-blue-200 to-indigo-300 rounded-xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Send Me a Message
                </h2>
                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border text-black"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border text-black"
                      placeholder="Enter your email address"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border text-black"
                      placeholder="Type your message here..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    onClick={sendEmail}
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
