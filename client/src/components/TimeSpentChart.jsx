import React, { useEffect, useState } from "react";

const TimeSpentChart = () => {
    const [averageTime, setAverageTime] = useState(null);
    const [fadeIn, setFadeIn] = useState(false);

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
