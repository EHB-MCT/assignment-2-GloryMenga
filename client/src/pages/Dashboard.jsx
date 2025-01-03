import React from "react";
import { Link } from "react-router-dom";
import TimeSpentChart from "../components/TimeSpentChart";

function Dashboard(){

    return(
        <div className="dashboard-container">
            <div className="back-button">
                <Link to="/">
                    Back to Home
                </Link>
            </div>
            <div className="title-dashboard">
                <h1>Data overview</h1>
            </div>
            <TimeSpentChart />
            <div className="prompt-keyword">

            </div>

            <div className="number-shares">

            </div>
            <div className="posts">

            </div>
            <div className="conversion-rate">
            </div>
        </div>
    );
}

export default Dashboard;