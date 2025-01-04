import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.svg";

/**
 * Nav Component
 *
 * This component represents the website's navigation bar.
 * - Provides links to the main sections: Home, Generate, Community.
 * - Includes authentication buttons for logging in and signing up.
 */
function Nav(){

    return(
        <nav>
            <ul>
                <div className="left-nav">
                    <Link to="/">
                        <img src={Logo} alt="Logo" width="50px" height="50px"/> 
                    </Link>
                    <Link to="/">
                        Home
                    </Link>
                    <Link to="/generate">
                        Generate
                    </Link>
                    <Link to="/community">
                        Community
                    </Link>
                </div>
                <div className="right-nav">
                    <Link to="/" className="log-in-button">
                        Log in
                    </Link>
                    <Link to="/" className="sign-up-button">
                        Sign up
                    </Link>
                </div>
            </ul>
        </nav>
    );

}

export default Nav;