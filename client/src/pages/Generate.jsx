import React, { useState, useEffect } from "react";
import { FiShare2 } from "react-icons/fi";
import Nav from "../components/Nav.jsx";

function Generate() {
  const [generated, setGenerated] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [shared, setShared] = useState(false);
  const [postMessage, setPostMessage] = useState(""); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (prompt.trim()) {
      try {
        const response = await fetch("http://localhost:5000/api/prompt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: sessionStorage.getItem("sessionId"),
            prompt,
            timestamp: new Date().toISOString(),
          }),
        });

        const data = await response.json();
        console.log("Keywords extracted:", data.keywords);

        await fetch("http://localhost:5000/api/share", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: sessionStorage.getItem("sessionId"),
            shared: false,
          }),
        });

        setGenerated(true);
      } catch (error) {
        console.error("Error submitting prompt:", error);
      }
    }
  };

  const trackShared = async (sharedState) => {
    try {
      const sessionId = sessionStorage.getItem("sessionId");
      await fetch("http://localhost:5000/api/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, shared: sharedState }),
      });

      if (sharedState) {
        setShared(true);
      }
      console.log(`Share action tracked: shared=${sharedState}`);
    } catch (error) {
      console.error("Error tracking share action:", error);
    }
  };

  const handleShare = async () => {
    try {
      const sessionId = sessionStorage.getItem("sessionId");
      const response = await fetch("http://localhost:5000/api/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, shared: true }),
      });

      if (response.ok) {
        setShared(true);
        console.log("Melody shared successfully");
      }
    } catch (error) {
      console.error("Error sharing melody:", error);
    }
  };

  const handlePublicPost = async () => {
    try {
      const sessionId = sessionStorage.getItem("sessionId");
      const response = await fetch("http://localhost:5000/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, publicPost: true, privatePost: false }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setPostMessage(data.message);
      } else {
        setPostMessage(data.error);
      }
  
      setTimeout(() => setPostMessage(""), 3000);
    } catch (error) {
      console.error("Error posting publicly:", error);
      setPostMessage("Failed to post melody publicly.");
      setTimeout(() => setPostMessage(""), 3000);
    }
  };
  
  const handlePrivatePost = async () => {
    try {
      const sessionId = sessionStorage.getItem("sessionId");
      const response = await fetch("http://localhost:5000/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, publicPost: false, privatePost: true }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setPostMessage(data.message);
      } else {
        setPostMessage(data.error);
      }
  
      setTimeout(() => setPostMessage(""), 3000);
    } catch (error) {
      console.error("Error posting privately:", error);
      setPostMessage("Failed to post melody privately.");
      setTimeout(() => setPostMessage(""), 3000);
    }
  };
  
  const handleGenerateMore = () => {
    setGenerated(false);
    setPrompt("");
    setShared(false);
    setPostMessage(""); 
  };

  useEffect(() => {
    const handleUnload = async () => {
      if (!shared) {
        try {
          const sessionId = sessionStorage.getItem("sessionId");
          await fetch("http://localhost:5000/api/share", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sessionId, shared: false }),
          });
          console.log("Tracked unshared melody on session close.");
        } catch (error) {
          console.error("Error tracking unshared melody:", error);
        }
      }
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [shared]);

  return (
    <>
      <Nav />
      {generated && (
        <div className="generate-more">
          <span className="generate-arrow" onClick={handleGenerateMore}>
            Generate More Melodies
          </span>
        </div>
      )}
      <div className="melody-generator">
        {!generated ? (
          <form className="melody-form" onSubmit={handleSubmit}>
            <h1 className="melody-title">Write a prompt and get a melody</h1>
            <p>Describe the mood you envision for your melody.</p>
            <textarea
              id="prompt"
              name="prompt"
              className="melody-input"
              placeholder="A mysterious melody blending delicate high tones with a gracefully slow tempo..."
              required
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              style={{
                resize: "vertical",
                minHeight: "120px",
                maxHeight: "400px",
              }}
            />
            <button type="submit" className="melody-submit">
              Submit
            </button>
          </form>
        ) : (
          <div className="melody-result">
            <h1>Your melody is ready to play</h1>
            <div className="audio-container">
              <audio controls className="audio-player">
                <source src="dummy.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
              <button className="share-button" onClick={handleShare} disabled={shared}>
                <FiShare2 style={{ marginRight: "5px" }} />
                Share
              </button>
            </div>
            <div className="post-buttons">
              <button className="public-post" onClick={handlePublicPost}>
                Public Post
              </button>
              <button className="private-post" onClick={handlePrivatePost}>
                Private Post
              </button>
            </div>
          </div>
        )}
        {postMessage && <div className="post-message">{postMessage}</div>}
      </div>
    </>
  );
}

export default Generate;
