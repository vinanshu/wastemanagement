import React, { createContext, useState, useContext, useCallback } from "react";

// Create the context
const NotificationContext = createContext();

// Custom hook to use the notification context
export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);
  const [notificationHistory, setNotificationHistory] = useState([]); // To store all past notifications

  // Array of predefined notification messages
  const messages = [
    "We received your complaint! Thank you for trusting us. You will be updated in {time} minute(s).",
    "Your complaint is being processed. Please be patient. Updates will be provided in {time} minute(s).",
    "Thank you for reporting. We are reviewing your complaint and will update you soon in {time} minute(s).",
    "We've received your submission. A response will be sent to you in {time} minute(s).",
    "Your complaint has been logged. We will update you in {time} minute(s)."
  ];

  // Trigger notification and store it in the history
  const triggerNotification = useCallback(() => {
    const randomTime = Math.floor(Math.random() * 4) + 1; // Random number between 1 and 4
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    // Replace `{time}` placeholder with the actual random time
    const finalMessage = randomMessage.replace("{time}", randomTime);

    setNotification(finalMessage); // Set the current notification
    setNotificationHistory((prevHistory) => [...prevHistory, finalMessage]); // Add to the history

    // Automatically hide the notification after 5 seconds
    setTimeout(() => {
      setNotification(null); // Clear the notification after 5 seconds
    }, 5000);
  }, []);

  return (
    <NotificationContext.Provider value={{ notification, notificationHistory, triggerNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
