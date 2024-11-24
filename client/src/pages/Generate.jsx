import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiShare2 } from "react-icons/fi";
import Nav from "../components/Nav.jsx";

function Generate() {
  const [generated, setGenerated] = useState(false);
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim()) {
      setGenerated(true); // Simulate melody generation
    }
  };

  return (
    <>
      <Nav />
      {generated && (
        <div className="generate-more">
          <Link to="/">
            <span className="generate-arrow">Generate More Melodies</span>
          </Link>
        </div>
      )}
      <div className="melody-generator">
        {!generated ? (
          <form className="melody-form" onSubmit={handleSubmit}>
            <h1 className="melody-title">Write a prompt and get a melody</h1>
            <textarea
              id="prompt"
              name="prompt"
              className="melody-input"
              placeholder="Write your melody prompt here..."
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
              <button className="share-button">
                <FiShare2 style={{ marginRight: "5px" }} />
                Share
              </button>
            </div>
            <div className="post-buttons">
              <button className="public-post">Public Post</button>
              <button className="private-post">Private Post</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Generate;
