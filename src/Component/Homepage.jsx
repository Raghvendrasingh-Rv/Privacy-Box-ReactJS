import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import boy from "../assets/boy.svg";
import bg from "../assets/bg.svg";
import reminderImg from "../assets/boy.svg";
import vaultImg from "../assets/boy.svg";
import sharingImg from "../assets/boy.svg";
import Navbar from './Navbar'

function HomePage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white text-gray-800">
      {/* Hero Section */}
      <Navbar />
      <motion.div
        className="pt-25 flex flex-col-reverse md:flex-row items-center justify-between px-6 py-10 max-w-5xl mx-auto"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.2 }}
      >
        <motion.div
          className="md:w-1/2 text-center md:text-left"
          variants={fadeInUp}
        >
          <h1 className="text-4xl font-extrabold mb-3 leading-snug">
            Welcome to <span className="text-indigo-600">Revisorr</span>
          </h1>
          <p className="text-md text-gray-600 mb-5">
            Your all-in-one note management tool. Set reminders, store securely, and share notes with friends.
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-3">
            <Link
              to="/register"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-lg shadow transition-transform hover:scale-105"
            >
              🚀 Sign Up
            </Link>
            <Link
              to="/login"
              className="border border-indigo-600 text-indigo-600 hover:bg-indigo-100 font-semibold px-5 py-2.5 rounded-lg transition-transform hover:scale-105"
            >
              🔐 Login
            </Link>
          </div>
        </motion.div>

        <motion.div className="md:w-1/2 mb-8 md:mb-0" variants={fadeInUp}>
          <img src={bg} alt="Hero Graphic" className="w-full h-auto" />
        </motion.div>
      </motion.div>

      {/* Feature: Notes Reminder */}
      <Section
        img={reminderImg}
        title="⏰ Notes Reminder"
        description="Set smart reminders to revise your notes. Build a consistent revision habit and never forget important material again."
        reverse={false}
      />

      {/* Feature: Notes Vault */}
      <Section
        img={vaultImg}
        title="🔐 Notes Vault"
        description="Keep your notes safe in a personal vault. Organize text, images, and PDFs in one secure place, always accessible."
        reverse={true}
      />

      {/* Feature: Notes Sharing */}
      <Section
        img={sharingImg}
        title="🤝 Notes Sharing"
        description="Share your notes with friends and study groups easily. Collaborate and learn together for faster progress."
        reverse={false}
      />

      {/* Footer */}
      <footer className="text-center py-4 text-gray-500 text-sm">
        © {new Date().getFullYear()} Revisorr. All rights reserved.
      </footer>
    </div>
  );
}

const Section = ({ img, title, description, reverse }) => {
  const fadeIn = {
    hidden: { opacity: 0, x: reverse ? 50 : -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.section
      className={`py-10 px-4 ${reverse ? "bg-indigo-50" : "bg-white"}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div
        className={`max-w-6xl mx-auto flex flex-col md:flex-row ${
          reverse ? "md:flex-row-reverse" : ""
        } items-center gap-10`}
      >
        <motion.div
          className="md:w-1/2"
          variants={fadeIn}
        >
          <img src={img} alt={title} className="w-full max-w-md mx-auto" />
        </motion.div>
        <motion.div
          className="md:w-1/2 text-center md:text-left"
          variants={fadeIn}
        >
          <h2 className="text-2xl font-bold text-indigo-700 mb-3">{title}</h2>
          <p className="text-gray-600 text-base">{description}</p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HomePage;
