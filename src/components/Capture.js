import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Capture.css";
import { useNotification } from "./NotificationContext"; // Importing the context

function Capture() {
  const [user, setUser] = useState(null);
  const [isFront, setIsFront] = useState(true); // To toggle front/back camera
  const videoRef = useRef(null);
  const canvasRef = useRef(null); // Canvas reference to capture image
  const navigate = useNavigate();
  const [stream, setStream] = useState(null); // To store the camera stream
  const [isModalOpen, setIsModalOpen] = useState(false); // To control modal visibility
  const [capturedImage, setCapturedImage] = useState(null); // Store captured image
  const [isNotificationGlowing, setIsNotificationGlowing] = useState(false); // To control the glowing effect

  // Using the notification context
  const { triggerNotification } = useNotification();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/"); // Redirect to login if no user is found
    }
  }, [navigate]);

  // Function to start the camera
  const startCamera = useCallback(async () => {
    const constraints = {
      video: {
        facingMode: isFront ? "user" : "environment", // Toggle front and back cameras
      },
    };

    try {
      // Stop previous stream if exists before starting a new one
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }

      const newStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(newStream); // Store the new stream
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  }, [isFront]);

  // Start the camera initially and whenever `isFront` changes
  useEffect(() => {
    startCamera();
    return () => {
      // Cleanup on component unmount
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [startCamera]); // We only need `startCamera` as a dependency, not `stream`

  const toggleCamera = () => {
    setIsFront(prevState => !prevState); // Toggle between front and back camera
  };

  const handleNavigation = (page) => {
    navigate(`/${page}`); // Navigate to the selected page
  };

  const handleComplain = () => {
    // Capture the current frame of the video
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    // Convert canvas to image
    const imageData = canvas.toDataURL("image/png");
    setCapturedImage(imageData); // Store the captured image

    setIsModalOpen(true); // Open the complain modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the complain modal
  };

  const handleSubmitComplain = () => {
    if (capturedImage) {
      // Handle captured image (for now, just log the image)
      console.log("Captured image:", capturedImage);
      alert("Complain submitted!");

      // Trigger the notification
      triggerNotification("New complaint submitted!");

      // Set a random timer (1, 2, or 3 minutes)
      const randomTime = Math.floor(Math.random() * 3) + 1; // Random time between 1 and 3 minutes
      const timer = randomTime * 60 * 1000; // Convert to milliseconds

      // Set the notification to glow after the random time
      setTimeout(() => {
        setIsNotificationGlowing(true); // Make the notification button glow
      }, timer);
    } else {
      alert("Please capture an image!");
    }
    setIsModalOpen(false); // Close modal after submission
  };

  return (
    <div className="capture-container">
      <header className="capture-header">
        <h1>Hello, {user?.username || "Guest"}!</h1>
      </header>
      <main className="capture-main">
        <video ref={videoRef} autoPlay playsInline></video>
        <canvas ref={canvasRef} style={{ display: "none" }} width="640" height="480"></canvas> {/* Hidden canvas for capturing */} 
      </main>

      {/* Complain Button in the center */}
      <button className="complain-btn" onClick={handleComplain}>
        Complain
      </button>

      {/* Camera Toggle Button at Top Right */}
      <button className="toggle-camera-btn" onClick={toggleCamera}>
        Toggle Camera
      </button>

      {/* Footer with navigation buttons */}
      <footer className="footer">
        <button className="footer-btn" onClick={() => handleNavigation("home")}>
          Home
        </button>
        <button className="footer-btn" onClick={() => handleNavigation("capture")}>
          Capture
        </button>
      </footer>

      {/* Complain Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Submit Your Complain</h2>
            <p>Please describe your complaint below.</p>
            
            {/* Display the captured image */}
            {capturedImage && <img src={capturedImage} alt="Captured" className="captured-image" />}
            
            <textarea placeholder="Describe your complaint..." rows="4"></textarea>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={handleCloseModal}>
                Cancel
              </button>
              <button className="submit-btn" onClick={handleSubmitComplain}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Capture;
