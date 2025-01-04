import React, { useEffect, useState } from "react";
import WordCloud from "react-wordcloud";

/**
 * WordCloudComponent
 *
 * This component visualizes the most frequently used keywords in user prompts using a word cloud.
 * - The larger the word, the more frequently it appears in user prompts.
 * - Helps identify trends, improve recommendations, and enhance search filters.
 */
const WordCloudComponent = () => {
    // State to store the formatted keyword frequency data
    const [keywords, setKeywords] = useState([]);

    /**
     * Fetches keyword frequency data from the backend API.
     * - Transforms the data into a format suitable for the word cloud.
     */
    useEffect(() => {
        fetch("http://localhost:5000/api/keywordFrequency")
            .then(response => response.json())
            .then(data => {
                const formattedData = data.map(item => ({
                    text: item._id,
                    value: item.count,
                }));
                setKeywords(formattedData);
            })
            .catch(error => console.error("Error fetching keyword data:", error));
    }, []);

    // Configuration options for the word cloud
    const options = {
        rotations: 2,
        rotationAngles: [-90, 0],
        fontSizes: [20, 80], 
    };

    return (
        <div className="chart-container">
            <h2>Most Used Prompt Keywords</h2>
            {keywords.length > 0 ? (
                <WordCloud words={keywords} options={options} />
            ) : (
                <p>Loading...</p>
            )}
            
            <p className="chart-description">
                <strong>This word cloud visualizes the most frequently used keywords in user prompts.</strong>
                The larger the word, the more commonly it appears in user generated prompts.
                By analyzing this data, we can identify trends in user preferences and tailor the platform’s features accordingly.
            </p>

            <ul className="chart-key-points">
                <li><strong>Identify popular themes:</strong> Understand the most common musical styles or moods users request.</li>
                <li><strong>Improve recommendations:</strong> Suggest melodies based on frequently used keywords.</li>
                <li><strong>Enhance search filters:</strong> Use these keywords to refine community page search features.</li>
            </ul>
        </div>
    );
};

export default WordCloudComponent;
