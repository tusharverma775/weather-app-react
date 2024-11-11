import axios from 'axios';

const OPENWEATHER_API_KEY = 'YOUR_API_KEY_HERE';

export const getCoordinates = async (city) => {
  const geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${OPENWEATHER_API_KEY}`;
  const response = await axios.get(geoURL);
  if (response.data.length > 0) {
    return {
      lat: response.data[0].lat,
      lon: response.data[0].lon,
    };
  }
  throw new Error('City not found');
};

export const getWeather = async (lat, lon) => {
  const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
  const response = await axios.get(weatherURL);
  return response.data.current_weather;
};
