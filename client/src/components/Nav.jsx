import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.svg";

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
                    <Link to="/aboutus">
                        About
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