import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ControlPanel from './components/ControlPanel';
import DataChart from './components/DataChart';
import './App.css';

function App() {
    const [weatherData, setWeatherData] = useState(null);
    const [sensorData, setSensorData] = useState(null);
    const [motorStatus, setMotorStatus] = useState("OFF"); // Initial motor status
    const [loading, setLoading] = useState(true);
    const moistureThreshold = 30; // Threshold for moisture level

    useEffect(() => {
        fetchWeatherData();
        fetchSensorData();
    }, []);

    const fetchWeatherData = async () => {
        try {
            const response = await axios.get(
                'https://api.openweathermap.org/data/2.5/weather',
                {
                    params: {
                        q: 'Kurukshetra',
                        appid: '843cc58d547948cf93c58520914b659a',
                        units: 'metric',
                    },
                }
            );
            setWeatherData({
                temperature: response.data.main?.temp,
                humidity: response.data.main?.humidity,
            });
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const fetchSensorData = async () => {
        try {
            const randomTemperature = (Math.random() * 10 + 20).toFixed(2);
            const randomHumidity = (Math.random() * 40 + 30).toFixed(2);
            const randomMoisture = Math.floor(Math.random() * 100);

            setSensorData({
                temperature: randomTemperature,
                humidity: randomHumidity,
                moistureLevel: randomMoisture,
            });

            // Automatic motor status based on moisture level
            setMotorStatus(randomMoisture < moistureThreshold ? "ON" : "OFF");
        } catch (error) {
            console.error('Error generating sensor data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleMotorOn = () => {
        setMotorStatus("ON");
    };

    const handleMotorOff = () => {
        setMotorStatus("OFF");
    };

    return (
        <div className="App">
            <h1>Smart Plant Watering System</h1>
            {loading ? (
                <p>Loading data...</p>
            ) : sensorData ? (
                <>
                    <DataChart
                        temperature={sensorData.temperature} 
                        humidity={sensorData.humidity}
                        moistureLevel={sensorData.moistureLevel}
                    />
                    <p>Motor Status: {motorStatus}</p> {/* Display motor status */}
                </>
            ) : (
                <p>Error loading sensor data.</p>
            )}
            <ControlPanel 
                onMotorOn={handleMotorOn} 
                onMotorOff={handleMotorOff} 
            />
        </div>
    );
}

export default App;
