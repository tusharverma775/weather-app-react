import React from 'react';
import './WeatherCard';

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  return (
    <div className="weather-card">
      <h2>Weather Now</h2>
      <p>Temperature: {weather.temperature}°C</p>
      <p>Wind Speed: {weather.windspeed} km/h</p>
      <p>Weather Code: {weather.weathercode}</p>
    </div>
  );
};

export default WeatherCard;
