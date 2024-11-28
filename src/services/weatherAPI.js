import axios from 'axios';

const BASE_URL = 'http://api.openweathermap.org/data/2.5/forecast';

export const fetchWeatherData = async (city) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: process.env.REACT_APP_API_KEY,
        units: 'metric',
      },
    });

    // Extract current weather and 5-day forecast
    const currentWeather = response.data.list[0];
    const forecast = response.data.list.filter((entry, index) => index % 8 === 0); // 5 days at 3-hour intervals
    return { currentWeather, forecast };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
