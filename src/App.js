import React, { useState } from 'react';
import { fetchWeatherData } from './services/weatherAPI';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!city) {
      setError('Please enter a city name');
      return;
    }

    try {
      setError('');
      const { currentWeather, forecast } = await fetchWeatherData(city);
      setWeather(currentWeather);
      setForecast(forecast);
    } catch (err) {
      setError('City not found. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div
      style={{
        fontFamily: 'Roboto, Arial, sans-serif',
        backgroundImage: `url(${process.env.PUBLIC_URL + '/sky.png'})`, // Background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#E7E7EB',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      {/* Search Bar Section */}
      <div
        style={{
          width: '100%',
          maxWidth: '600px',
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '30px',
        }}
      >
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          style={{
            padding: '10px',
            borderRadius: '20px',
            border: '1px solid #E7E7EB',
            width: '250px',
            fontSize: '16px',
            outline: 'none',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: '10px 20px',
            borderRadius: '20px',
            backgroundColor: '#6200EE',
            color: '#FFFFFF',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'transform 0.3s ease',
          }}
          onMouseEnter={(e) => (e.target.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
        >
          Search
        </button>
      </div>

      {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}

      <div style={{ width: '100%', maxWidth: '900px', display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {/* Left Section - Current Day */}
        {weather && (
          <div
            style={{
              flex: 1,
              backgroundColor: 'rgba(31, 31, 31, 0.8)', // Semi-transparent card
              borderRadius: '15px',
              padding: '20px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
              minWidth: '250px',
            }}
          >
            <h2 style={{ fontSize: '24px', marginBottom: '10px', fontWeight: 'bold' }}>
              {new Date(weather.dt_txt).toLocaleDateString('en-US', { weekday: 'long' })}
            </h2>
            <p style={{ fontSize: '16px', marginBottom: '20px' }}>{formatDate(weather.dt_txt)}</p>
            <h1 style={{ fontSize: '64px', margin: '0', fontWeight: 'bold' }}>{Math.round(weather.main.temp)}°C</h1>
            <p style={{ fontSize: '20px', marginBottom: '20px', textTransform: 'capitalize', color: '#B0BEC5' }}>
              {weather.weather[0].description}
            </p>
            <p style={{ fontSize: '16px', margin: '0', fontWeight: '500', color: '#B0BEC5' }}>{city}</p>
          </div>
        )}

        {/* Right Section - Weather Details and Forecast */}
        {weather && (
          <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '20px', minWidth: '250px' }}>
            {/* Weather Details */}
            <div
              style={{
                backgroundColor: 'rgba(31, 31, 31, 0.8)', // Semi-transparent card
                borderRadius: '15px',
                padding: '20px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
              }}
            >
              <p>Predictability: {Math.round(weather.pop * 100)}%</p>
              <p>Humidity: {weather.main.humidity}%</p>
              <p>Wind: {weather.wind.speed} km/h</p>
              <p>Air Pressure: {weather.main.pressure} mb</p>
              <p>Max Temp: {weather.main.temp_max}°C</p>
              <p>Min Temp: {weather.main.temp_min}°C</p>
            </div>

            {/* 5-Day Forecast */}
            {forecast.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '10px',
                  backgroundColor: 'rgba(31, 31, 31, 0.8)', // Semi-transparent card
                  padding: '20px',
                  borderRadius: '15px',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
                }}
              >
                {forecast.map((day, index) => (
                  <div
                    key={index}
                    style={{
                      textAlign: 'center',
                      color: '#E7E7EB',
                      flex: 1,
                      transition: 'transform 0.3s ease',
                    }}
                    onMouseEnter={(e) => (e.target.style.transform = 'scale(1.1)')}
                    onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                  >
                    <h4 style={{ marginBottom: '10px', fontWeight: '500' }}>
                      {new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'short' })}
                    </h4>
                    <img
                      src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                      alt="weather icon"
                      style={{ width: '50px', height: '50px', marginBottom: '10px' }}
                    />
                    <p style={{ fontWeight: 'bold', fontSize: '18px' }}>{Math.round(day.main.temp)}°C</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
