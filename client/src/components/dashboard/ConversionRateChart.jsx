import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ConversionRateChart = () => {
    const [conversionData, setConversionData] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/conversionRateSummary")
            .then(response => response.json())
            .then(data => setConversionData(data))
            .catch(error => console.error("Error fetching conversion rate data:", error));
    }, []);

    const chartData = {
        labels: conversionData.map(entry => entry._id), 
        datasets: [
            {
                label: "Conversion Rate (%)",
                data: conversionData.map(entry => entry.conversionRate),
                borderColor: "#939393",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                tension: 0.3,
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => `${tooltipItem.raw.toFixed(2)}%`,
                }
            }
        },
        scales: {
            y: { 
                beginAtZero: true, 
                title: { display: true, text: "Conversion Rate (%)" } 
            },
            x: { title: { display: true, text: "Date" } }
        }
    };

    return (
        <div className="chart-container">
            <h2>Conversion Rate Over Time</h2>
            <Line data={chartData} options={chartOptions} />
            
            <p className="chart-description">
                <strong>This chart tracks the conversion rate over time.</strong> 
                Conversion rate represents the percentage of users who 'generate a melody' 
                after visiting the website. This helps in analyzing the effectiveness of the platform.
            </p>

            <ul className="chart-key-points">
                <li>A **higher conversion rate' means more users are engaging with melody generation.</li>
                <li>If the 'conversion rate decreases', improvements might be needed in 'UI/UX or content'.</li>
                <li>Helps measure the 'impact of new features' on user engagement.</li>
            </ul>
        </div>
    );
};

export default ConversionRateChart;
