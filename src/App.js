import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Capture from "./components/Capture";
import { NotificationProvider } from "./components/NotificationContext"; // Import NotificationProvider

function App() {
  return (
    <NotificationProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/capture" element={<Capture />} />
        </Routes>
      </Router>
    </NotificationProvider>
  );
}

export default App;
