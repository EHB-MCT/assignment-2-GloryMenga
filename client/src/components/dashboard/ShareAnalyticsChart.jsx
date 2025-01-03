import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const ShareAnalyticsChart = () => {
    const [shareData, setShareData] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/api/shareSummary")
            .then(response => response.json())
            .then(data => {
                setShareData(data);
            })
            .catch(error => console.error("Error fetching share data:", error));
    }, []);

    if (!shareData) {
        return <p>Loading...</p>;
    }

    const chartData = {
        labels: ["Shared", "Not Shared"],
        datasets: [
            {
                data: [shareData.sharedCount, shareData.notSharedCount],
                backgroundColor: ["#a7a7a7", "#1d1d1d"],
                hoverBackgroundColor: ["#898989", "#000"],
            },
        ],
    };

    const chartOptions = {
        plugins: {
            legend: {
                position: "top",
            },
            datalabels: {
                color: "white",
                font: {
                    weight: "bold",
                    size: 50,
                },
                formatter: (value, context) => {
                    let total = context.dataset.data.reduce((sum, val) => sum + val, 0);
                    let percentage = ((value / total) * 100).toFixed(1);
                    return `${percentage}%`;
                },
            },
        },
    };

    return (
        <div className="chart-container">
            <h2>Melody Sharing Analysis</h2>
            <Pie data={chartData} options={chartOptions} />

            <p className="chart-description">
                <strong>This pie chart illustrates the percentage of users who shared their generated melodies.</strong> 
                It provides insights into user engagement levels. If a significant percentage of users do not share, 
                it may indicate the need for additional features or encouragement to share.
            </p>

            <ul className="chart-key-points">
                <li><strong>High sharing percentage:</strong> Indicates strong engagement and interest in generated melodies.</li>
                <li><strong>Low sharing percentage:</strong> Users might need more motivation or better sharing options.</li>
                <li><strong>Feature improvements:</strong> Implementing direct social media sharing could increase sharing rates.</li>
            </ul>

            <div className="share-stats">
                <p><strong>Shared:</strong> {shareData.sharedPercentage}%</p>
                <p><strong>Not Shared:</strong> {shareData.notSharedPercentage}%</p>
            </div>
        </div>
    );
};

export default ShareAnalyticsChart;
