import { useEffect } from "react";

const SessionTracker = () => {
  useEffect(() => {
    let sessionId = sessionStorage.getItem("sessionId");

    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem("sessionId", sessionId);
    }

    fetch("http://localhost:5000/api/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    })
      .then(() => console.log("Session tracked:", sessionId))
      .catch((error) => console.error("Error tracking session:", error));

    const handleBeforeUnload = () => {
      fetch("http://localhost:5000/api/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
        keepalive: true, 
      });
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return null;
};

export default SessionTracker;
