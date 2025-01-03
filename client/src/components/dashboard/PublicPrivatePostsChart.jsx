import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const PublicPrivatePostsChart = () => {
    const [postData, setPostData] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/api/publicPrivateSummary")
            .then(response => response.json())
            .then(data => setPostData(data))
            .catch(error => console.error("Error fetching post data:", error));
    }, []);

    if (!postData) {
        return <p>Loading...</p>;
    }

    const chartData = {
        labels: ["Public Posts", "Private Posts"],
        datasets: [
            {
                label: "Number of Users",
                data: [postData.publicCount, postData.privateCount],
                backgroundColor: ["#a7a7a7", "#1d1d1d"],
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        return `Users: ${tooltipItem.raw}`;
                    }
                }
            },
            datalabels: {
                color: "white", 
                anchor: "center", 
                align: "center", 
                font: {
                    weight: "bold",
                    size: 40
                },
                formatter: (value) => value 
            }
        },
        scales: {
            y: { beginAtZero: true, title: { display: true, text: "Number of Users" } }
        }
    };

    return (
        <div className="chart-container">
            <h2>Public vs. Private Posts</h2>
            <Bar data={chartData} options={chartOptions} />

            <p className="chart-description">
                <strong>This chart visualizes the number of users posting publicly or privately.</strong> 
                It helps track the 'community engagement' and how users prefer to share their melodies.
            </p>

            <ul className="chart-key-points">
                <li>A <strong>higher public percentage</strong> means users are comfortable sharing their melodies openly.</li>
                <li>A <strong>higher private percentage</strong> suggests users prefer to keep their content private.</li>
                <li>Understanding this helps in optimizing the 'community page' and improving user experience.</li>
            </ul>
        </div>
    );
};

export default PublicPrivatePostsChart;
