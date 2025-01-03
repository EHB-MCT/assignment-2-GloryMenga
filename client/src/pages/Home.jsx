import React from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav.jsx";
function Home(){

    return(
        <div className="container">
            <Nav />
            <div className="intro-home">
                <h1>Welcome to Melody Generator</h1>
            </div>
            <div className="description">
                <div className="home-buttons"> 
                    <Link to="/generate" className="get-started">
                    <button>Get started</button>
                    </Link>
                    <Link to="/community" className="learn-more">
                    <button>Learn more</button>
                    </Link>
                </div>
                <div className="description-information">
                    <p>The Melody Generating Page is the core feature of the Melody Generator application. It allows users to create unique melodies based on custom text prompts. The process is simple and interactive</p>
                </div>
            </div>
            <div className="more-information">
                <div className="image-more-information">
                </div> 
                <div className="text-more-information">
                <p>
                Melody Generator is an interactive web application that allows users to generate unique melodies based on custom text prompts. The platform leverages data aggregation techniques to track user engagement, analyze prompt keywords, and monitor sharing behavior. Users can either share their melodies publicly on the community page or save them privately.

This project not only focuses on AI-powered music generation but also emphasizes user interaction analytics, helping developers understand how users engage with the tool.
                </p>
                </div>   
            </div>
        </div>
    );

}

export default Home;