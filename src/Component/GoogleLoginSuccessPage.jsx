import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const GoogleLoginSuccessPage = () => {
  const navigate = useNavigate();
  const hasRun = useRef(false); 

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      console.log("Token saved from cookie to localStorage");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } else {
      console.warn("Token not found in cookie.");
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
