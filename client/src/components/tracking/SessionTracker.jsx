import { useEffect } from "react";

/**
 * SessionTracker Component
 *
 * This component tracks user sessions by generating a unique session ID
 * and storing it in session storage. It sends the session data to the backend
 * when the component mounts and also before the user leaves the page.
 */
const SessionTracker = () => {
  useEffect(() => {
    let sessionId = sessionStorage.getItem("sessionId");

    // If no session ID exists, generate a new one
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem("sessionId", sessionId);
    }

    // Send session data to the backend API
    fetch("http://localhost:5000/api/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    })
      .then(() => console.log("Session tracked:", sessionId))
      .catch((error) => console.error("Error tracking session:", error));

    /**
   * Handles session tracking before the user leaves the page.
   * Uses the `keepalive` option to ensure the request completes.
   */
    const handleBeforeUnload = () => {
      fetch("http://localhost:5000/api/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
        keepalive: true, 
      });
    };

    // Add event listener for session tracking on page unload
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup function to remove event listener on component unmount
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return null;
};

export default SessionTracker;
