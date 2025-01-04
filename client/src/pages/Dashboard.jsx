import React from "react";
import { Link } from "react-router-dom";
import TimeSpentChart from "../components/dashboard/TimeSpentChart";
import WordCloudComponent from "../components/dashboard/WordCloud";
import ShareAnalyticsChart from "../components/dashboard/ShareAnalyticsChart";
import PublicPrivatePostsChart from "../components/dashboard/PublicPrivatePostsChart";
import ConversionRateChart from "../components/dashboard/ConversionRateChart";

/**
 * Dashboard Page Component
 *
 * This component serves as the **analytics hub** for tracking user engagement and behavior
 * through multiple visualizations, such as:
 * - Time spent on the website
 * - Most used prompt keywords
 * - Share analytics (Shared vs. Not Shared)
 * - Public vs. Private posts
 * - Conversion rate over time
 *
 * Each visualization provides **insights** into how users interact with the platform,
 * helping improve the user experience and functionality.
 */
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

            {/* Visualizations */}
            <TimeSpentChart /> {/* Tracks average time spent per session */}
            <WordCloudComponent /> {/* Shows most used keywords in melody prompts */}
            <ShareAnalyticsChart /> {/* Displays share engagement (Shared vs. Not Shared) */}
            <PublicPrivatePostsChart /> {/* Analyzes how users prefer to share melodies */}
            <ConversionRateChart /> {/* Tracks conversion rates (users who generate melodies) */}
        </div>
    );
}

export default Dashboard;