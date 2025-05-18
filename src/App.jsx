import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './Component/Dashboard'
import Register from './Component/Register'
import Login from './Component/Login'
import HomePage from './Component/Homepage';
import UserProfile from './Component/UserProfile';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/profile" element={<UserProfile/>} />
      </Routes>
    </Router>
  )
}

export default App;
