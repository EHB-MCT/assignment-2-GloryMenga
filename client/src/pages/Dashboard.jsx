import React from "react";
import { Link } from "react-router-dom";
import TimeSpentChart from "../components/dashboard/TimeSpentChart";
import WordCloudComponent from "../components/dashboard/WordCloud";
import ShareAnalyticsChart from "../components/dashboard/ShareAnalyticsChart";
import PublicPrivatePostsChart from "../components/dashboard/PublicPrivatePostsChart";
import ConversionRateChart from "../components/dashboard/ConversionRateChart";

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
            <WordCloudComponent />
            <ShareAnalyticsChart />
            <PublicPrivatePostsChart />
            <ConversionRateChart />
        </div>
    );
}

export default Dashboard;