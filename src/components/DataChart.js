import React from 'react';

function DataChart({ temperature, humidity, moistureLevel }) {
    // Check if the required data is available before rendering
    if (temperature === undefined || humidity === undefined || moistureLevel === undefined) {
        return <p>Loading data...</p>;
    }

    return (
        <div className="data-chart">
            <h2>Data Chart</h2>
            <p>Temperature: {temperature}°C</p>
            <p>Humidity: {humidity}%</p>
            <p>Moisture Level: {moistureLevel}%</p>
        </div>
    );
}

export default DataChart;
