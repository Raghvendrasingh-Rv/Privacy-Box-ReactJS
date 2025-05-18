import React from "react";
import { Link } from "react-router-dom";
import boy from '../assets/boy.svg';
import bg from '../assets/bg.svg'; // Assuming routing is set up

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white text-gray-800">
      {/* Hero Section */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-between px-6 py-12 max-w-7xl mx-auto">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl font-extrabold mb-4">
            Welcome to <span className="text-indigo-600">Revisor</span>
          </h1>
          <p className="text-lg mb-6">
            Master your learning with focused revision. Retain more, forget less.
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <Link
              to="/register"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg shadow"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="border border-indigo-600 text-indigo-600 hover:bg-indigo-100 font-semibold px-6 py-3 rounded-lg"
            >
              Login
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 mb-8 md:mb-0">
          <img
            src={bg}
            alt="Revisor Graphic"
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Why Revision Section */}
      <section className="bg-white py-12 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Why is Revision Important?</h2>
          <p className="text-gray-600 text-lg mb-6">
            Revision strengthens memory retention and deepens understanding.
            It transforms passive reading into active learning and helps you
            identify weak areas. With Revisor, track your progress and optimize
            your study routine effectively.
          </p>
          <img
            src={boy}
            alt="Importance of Revision"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 text-sm">
        © {new Date().getFullYear()} Revisor. All rights reserved.
      </footer>
    </div>
  );
}
 
export default HomePage;
