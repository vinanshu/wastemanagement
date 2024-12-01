import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css";
import { useNotification } from "./NotificationContext"; // Importing the context

function HomePage() {
  const [user, setUser] = useState(null);
  const [showHistory, setShowHistory] = useState(false); // State to toggle history view
  const navigate = useNavigate();
  const { notification, notificationHistory } = useNotification(); // Access notification state

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/"); // Redirect to login if no user is found
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/"); // Redirect to login
  };

  const handleNavigation = (page) => {
    navigate(`/${page}`);
  };

  const toggleHistory = () => {
    setShowHistory((prevState) => !prevState); // Toggle the history view
  };

  return (
    <div className="homepage-container">
      <header className="header">
        <h1>Hello, {user?.username || "Guest"}!</h1>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </header>
      <main>
        <h2>Welcome to Your Clean Scape Dashboard!</h2>
        <p>
          Thank you for being a part of Clean Scape! Your involvement is vital
          in our mission to keep our community clean and beautiful.
        </p>
        <p>
          If you come across any piles of trash or litter in your area, simply
          snap a picture and upload it using the submission feature. Together,
          we can make a difference!
        </p>
      </main>

      {/* Notification Popup */}
      {notification && (
        <div className="notification-popup">
          {notification}
        </div>
      )}

      {/* Show Notification History if toggled */}
      {showHistory && (
        <div className="notification-history">
          <h3>Notification History</h3>
          <ul>
            {notificationHistory.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Footer with navigation buttons */}
      <footer className="footer">
        <button className="footer-btn" onClick={() => handleNavigation("home")}>Home</button>
        <button className="footer-btn" onClick={() => handleNavigation("capture")}>Capture</button>
        <button className="footer-btn" onClick={toggleHistory}>Notification</button>
      </footer>
    </div>
  );
}

export default HomePage;
