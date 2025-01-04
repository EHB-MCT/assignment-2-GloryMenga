import React from "react";
import { Link } from "react-router-dom";
import Nav from "../components/navigation/Nav.jsx";

/**
 * Home Page Component
 *
 * The homepage provides an introduction to the Melody Generator application.
 * - Displays the navigation bar
 * - Offers a brief description of the platform
 * - Provides action buttons for getting started and learning more
 * - Highlights the purpose and features of the application
 */
function Home(){

    return(
        <div className="container">
            {/* Navigation Bar */}
            <Nav />

            {/* Hero Section */}
            <div className="intro-home">
                <h1>Welcome to Melody Generator</h1>
            </div>

            {/* Description Section */}
            <div className="description">
                {/* Call-to-Action Buttons */}
                <div className="home-buttons"> 
                    <Link to="/generate" className="get-started">
                    <button>Get started</button>
                    </Link>
                    <Link to="/community" className="learn-more">
                    <button>Learn more</button>
                    </Link>
                </div>

                {/* Short Description */}
                <div className="description-information">
                    <p>The Melody Generating Page is the core feature of the Melody Generator application. It allows users to create unique melodies based on custom text prompts. The process is simple and interactive</p>
                </div>
            </div>

            {/* Additional Information Section */}
            <div className="more-information">

                {/* Placeholder for Future Image Section */}
                <div className="image-more-information">
                </div> 
                
                {/* Detailed Information about the Application */}
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