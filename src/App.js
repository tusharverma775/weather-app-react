import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

// Replace this with your OpenWeatherMap API key
const OPENWEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  // Function to get coordinates from city name
  const getCoordinates = async (cityName) => {
    try {
      const geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${OPENWEATHER_API_KEY}`;
      const response = await axios.get(geoURL);
      if (response.data.length > 0) {
        return {
          lat: response.data[0].lat,
          lon: response.data[0].lon,
        };
      }
      throw new Error('City not found');
    } catch (error) {
      console.error('Error fetching coordinates:', error.response || error.message);
      throw error;
    }
  };

  // Function to get current weather data using Open-Meteo API
  const getWeather = async (lat, lon) => {
    const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
    const response = await axios.get(weatherURL);
    return response.data.current_weather;
  };

  // Function to handle fetching weather data
  const fetchWeather = async () => {
    setError('');
    setWeather(null);

    if (!city) {
      setError('Please enter a city name');
      return;
    }

    try {
      // Get the coordinates for the city
      const { lat, lon } = await getCoordinates(city);

      // Get the current weather using the coordinates
      const currentWeather = await getWeather(lat, lon);

      // Update state with the fetched weather data
      setWeather(currentWeather);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
    }
  };

  return (
    <div className="app">
      <h1>Weather Now</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      {/* Search Button */}
      <button onClick={fetchWeather}>Get Weather</button>

      {/* Display Error Message */}
      {error && <p className="error">{error}</p>}

      {/* Weather Card */}
      {weather && (
        <div className="weather-card">
          <h2>Weather in {city}</h2>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Wind Speed: {weather.windspeed} km/h</p>
          <p>Weather Code: {weather.weathercode}</p>
        </div>
      )}
    </div>
  );
}

export default App;
