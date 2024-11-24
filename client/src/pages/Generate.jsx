import React, { useState } from "react";
import { FiShare2 } from "react-icons/fi";
import Nav from "../components/Nav.jsx";

function Generate() {
  const [generated, setGenerated] = useState(false);
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim()) {
      setGenerated(true); 
    }
  };

  const handleGenerateMore = () => {
    setGenerated(false); 
    setPrompt(""); 
  };

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
