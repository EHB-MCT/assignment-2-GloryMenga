import React from "react";
import Nav from "../components/navigation/Nav.jsx";
import { FiUser, FiHeart, FiShare2, FiMessageSquare } from "react-icons/fi";

/**
 * Community Page Component
 *
 * This component displays a list of publicly shared melodies with user details, 
 * an audio player, and interaction buttons for likes, comments, and shares.
 */
function Community() {
    // Dummy data representing posts (Replace with real data from an API in the future)
    const posts = [
      {
        id: 1,
        username: "MelodyMaster",
        prompt: "A calm and peaceful melody with piano and soft strings",
        audioUrl: "dummy.mp3",
        likes: 245,
        comments: 12,
        timestamp: "2h ago"
      },
      {
        id: 2,
        username: "SoundExplorer",
        prompt: "An energetic electronic beat with synth waves",
        audioUrl: "dummy.mp3",
        likes: 189,
        comments: 8,
        timestamp: "4h ago"
      },
      {
        id: 3,
        username: "HarmonyCreator",
        prompt: "A mysterious melody with ethereal vocals and ambient sounds",
        audioUrl: "dummy.mp3",
        likes: 312,
        comments: 15,
        timestamp: "6h ago"
      },
      {
        id: 4,
        username: "RhythmicSoul",
        prompt: "A jazzy tune with smooth saxophone and light percussion",
        audioUrl: "dummy.mp3",
        likes: 156,
        comments: 6,
        timestamp: "8h ago"
      }
    ];
  
    return (
      <div className="community-container">
        <Nav />
        <div className="community-content">
          <h1 className="community-title">Melodies Shared Publicly</h1>
          <div className="posts-container">
            {posts.map((post) => (
              <div key={post.id} className="post-card">
                <div className="post-header">
                  <div className="user-info">
                    <div className="user-avatar">
                      <FiUser size={24} />
                    </div>
                    <div className="user-details">
                      <h3>{post.username}</h3>
                      <span className="timestamp">{post.timestamp}</span>
                    </div>
                  </div>
                </div>
                <div className="post-prompt">
                  <p>{post.prompt}</p>
                </div>
                <div className="post-audio">
                  <audio controls className="audio-player">
                    <source src={post.audioUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
                <div className="post-actions">
                  <button className="action-button">
                    <FiHeart /> <span>{post.likes}</span>
                  </button>
                  <button className="action-button">
                    <FiMessageSquare /> <span>{post.comments}</span>
                  </button>
                  <button className="action-button">
                    <FiShare2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  export default Community;