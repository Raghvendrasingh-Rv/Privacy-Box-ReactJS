import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const GoogleLoginSuccessPage = () => {
  const navigate = useNavigate();
  const hasRun = useRef(false); 

  useEffect(() => {
    // Parse token from cookie
    if (hasRun.current) return;
    hasRun.current = true;

    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (token) {
      localStorage.setItem("token", token);
      console.log("Token saved from cookie to localStorage");
      // Optional: clear the cookie after saving
      document.cookie = "token=; Max-Age=0; path=/";

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } else {
      console.warn("Token not found in cookie.");

      // Only run this if token is truly missing
      setTimeout(() => {
        window.alert("Unable to login, retry...");
        navigate("/register");
      }, 3000);
    }
  }, [navigate]);

  return (
    <div className="absolute inset-0 bg-white/70 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-3"></div>
        <p className="text-indigo-600 font-medium">Log in...</p>
      </div>
    </div>
  );
};

export default GoogleLoginSuccessPage;
