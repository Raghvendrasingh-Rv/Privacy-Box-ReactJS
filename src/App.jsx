import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './Component/Dashboard'
import Register from './Component/Register'
import Login from './Component/Login'
import HomePage from './Component/Homepage';
import UserProfile from './Component/UserProfile';
import SharedEntry from './Component/SharedEntry';
import ShowEntry from './Component/ShowEntry';
import OpenEntry from './Component/OpenEntry';
import ContactPage from './Component/ContactPage';
import GoogleLoginSuccessPage from './Component/GoogleLoginSuccessPage';
import ChatbotPage from './Component/ChatbotPage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/profile" element={<UserProfile/>} />
        <Route path="/sharedEntry" element={<SharedEntry/>} />
        <Route path="/showEntry" element={<ShowEntry/>} />
        <Route path="/openEntry" element={<OpenEntry/>} />
        <Route path="/contactPage" element={<ContactPage/>} />
        <Route path="/googleLoginSuccessPage" element={<GoogleLoginSuccessPage/>} />
        <Route path="/chatbot" element={<ChatbotPage/>} />
      </Routes>
    </Router>
  )
}

export default App;
