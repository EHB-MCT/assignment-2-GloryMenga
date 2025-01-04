import React, { useEffect, useState } from "react";

/**
 * TimeSpentChart Component
 * 
 * This component displays the average time users spend on the website.
 * Instead of a line chart, it shows the formatted average time with a fade-in effect.
 * 
 * Key Insights:
 * - Helps track user engagement trends.
 * - Determines whether users find the platform interesting.
 * - Assists in making UI/UX improvements.
 */
const TimeSpentChart = () => {
    // State to store the average time spent on the website
    const [averageTime, setAverageTime] = useState(null);
    // State to control the fade-in animation
    const [fadeIn, setFadeIn] = useState(false);

    // Fetch the average time spent data when the component mounts
    useEffect(() => {
        fetch("http://localhost:5000/api/timeSpentSummary")
            .then(response => response.json())
            .then(data => {
                if (data.averageTimeSpent !== undefined) { 
                    setAverageTime(data.averageTimeSpent);
                    setTimeout(() => setFadeIn(true), 300);
                }
            })
            .catch(error => console.error("Error fetching time spent data:", error));
    }, []);

    /**
     * Formats time from seconds to a readable string.
     * - If below 60 seconds, display only seconds.
     * - If above 60 seconds, display minutes and seconds.
     * 
     * @param {number} seconds - The time duration in seconds.
     * @returns {string} - Formatted time string.
     */
    const formatTime = (seconds) => {
        if (seconds < 60) {
            return `${Math.round(seconds)} seconds`;
        }
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.round(seconds % 60);
        return `${minutes} min ${remainingSeconds} sec`;
    };

    return (
        <div className="chart-container">
            <h2>Time Spent on Website</h2>
            {averageTime !== null ? (
                <h1 className={`average-time ${fadeIn ? "fade-in" : ""}`}>
                    {formatTime(averageTime)}
                </h1>
            ) : (
                <p>Loading...</p>
            )}
            
            <p className="chart-description">
                <strong>This statistic represents the average time users spend on the website.</strong> 
                It helps track engagement trends by showing how long visitors interact with the platform. 
                A higher average time spent suggests strong user interest, while a lower time may indicate 
                areas for improvement.
            </p>

            <ul className="chart-key-points">
                <li>If the <strong>average time spent increases</strong>, users find the website engaging.</li>
                <li>If the <strong>average time spent decreases</strong>, improvements may be needed (e.g., better UI, more features).</li>
                <li>Helps determine the <strong>impact of new features</strong> on user retention.</li>
            </ul>
        </div>
    );
};

export default TimeSpentChart;
