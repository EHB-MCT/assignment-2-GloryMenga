import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Register Chart.js components and plugins
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

/**
 * PublicPrivatePostsChart Component
 * 
 * This component visualizes the distribution of public vs. private posts.
 * The bar chart displays the number of users who have chosen to post their melodies publicly or privately.
 * Helps in understanding user behavior regarding sharing preferences.
 */
const PublicPrivatePostsChart = () => {
    // State to store public/private post data fetched from the backend
    const [postData, setPostData] = useState(null);

    // Fetch public/private post summary data on component mount
    useEffect(() => {
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
        fetch(`${API_BASE_URL}/api/publicPrivateSummary`)
            .then(response => response.json())
            .then(data => setPostData(data))
            .catch(error => console.error("Error fetching post data:", error));
    }, []);

    // Display loading message while data is being fetched
    if (!postData) {
        return <p>Loading...</p>;
    }

    // Prepare data for the bar chart
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

    // Chart configuration options
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
