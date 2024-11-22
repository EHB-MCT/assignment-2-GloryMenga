import React from "react";
import { Link } from "react-router-dom";

function Home(){

    return(
        <div>
            <h1>Welcome to Melody Tracker</h1>
            <div style={{ marginTop: "20px" }}>
                <Link to="/generate">
                <button>Generate Melody</button>
                </Link>
                <Link to="/aboutus">
                <button>More information</button>
                </Link>
            </div>
        </div>
    );

}

export default Home;