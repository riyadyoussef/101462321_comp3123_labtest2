import React, { useState } from 'react';
import { fetchWeatherData } from './services/weatherAPI';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        try {
            setError('');
            const data = await fetchWeatherData(city);
            setWeather(data);
        } catch (err) {
            setError('City not found. Please try again.');
        }
    };

    return (
        <div>
            <h1>Weather App</h1>
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name"
            />
            <button onClick={handleSearch}>Search</button>
            {error && <p>{error}</p>}
            {weather && (
                <div>
                    <h2>{weather.name}</h2>
                    <p>{weather.weather[0].description}</p>
                    <p>Temperature: {weather.main.temp}°C</p>
                    <img
                        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt="weather icon"
                    />
                </div>
            )}
        </div>
    );
};

export default Weather;

