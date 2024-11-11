import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
  
const OPENWEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');


  const getCoordinates = async (cityName) => {
    try {
      const geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${OPENWEATHER_API_KEY}`;
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

    const getWeather = async (lat, lon) => {
    const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
    const response = await axios.get(weatherURL);
    return response.data.current_weather;
  };

  
  const fetchWeather = async () => {
    setError('');
    setWeather(null);

    if (!city) {
      setError('Please enter a city name');
      return;
    }

    try {
      
      const { lat, lon } = await getCoordinates(city);

      
      const currentWeather = await getWeather(lat, lon);

      
      setWeather(currentWeather);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
    }
  };

  return (
    <div className="app">
      <h1>Weather Now</h1>

    
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={fetchWeather}>Get Weather</button>

      {error && <p className="error">{error}</p>}

     
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
