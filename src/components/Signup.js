import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";
import Header from "../components/Header";  // Import Header

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save user data to localStorage
    const user = { username, email, password };
    localStorage.setItem("user", JSON.stringify(user));
    console.log("User signed up:", user);

    // Show success message and redirect to login
    setMessage("Sign-up successful! Redirecting to login...");
    setTimeout(() => {
      navigate("/"); // Redirect to login
    }, 3000);
  };

  return (
    <div>
      <Header /> {/* Add Header */}
      <div className="auth-container">
        <h2>Sign Up</h2>
        {message && <p className="success-message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <a href="/">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
