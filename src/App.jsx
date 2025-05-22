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
      </Routes>
    </Router>
  )
}

export default App;
