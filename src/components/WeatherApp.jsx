import sunny from "../assets/images/sunny.png";
import cloudy from "../assets/images/cloudy.png";
import rainy from "../assets/images/rainy.png";
import snowy from "../assets/images/snowy.png";
import axios from 'axios';
import { useState } from "react";

const WeatherApp = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState('London');
  const [weatherImage, setWeatherImage] = useState(sunny); 
  const API_KEY = '7bfeb9208311e2c93cde53841d5b8d99';

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`);
      
      const weatherData = response.data;
      setData(weatherData);

      const weatherMain = weatherData.weather[0].main.toLowerCase();
      
      // Postavljanje slike na osnovu vrste vremena
      switch (weatherMain) {
        case 'clear':
          setWeatherImage(sunny);
          break;
        case 'clouds':
          setWeatherImage(cloudy);
          break;
        case 'rain':
          setWeatherImage(rainy);
          break;
        case 'snow':
          setWeatherImage(snowy);
          break;
        default:
          setWeatherImage(sunny); // Default slika ako API vrati neočekivani uslov
          break;
      }

    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchWeatherData();
    }
  };

  return (
    <div className='container'>
      <div className='weather-app'>
        <div className='search'>
          <div className='search-top'>
            <i className="fa-solid fa-location-dot"></i>
            <div className='location'>{data ? data.name : 'Location'}</div>
          </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder='Enter Location'
              value={location}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <i className="fa-solid fa-magnifying-glass" onClick={fetchWeatherData}></i>
          </div>
        </div>
        {data && (
          <>
            <div className="weather">
              <img src={weatherImage} alt="weather" />
              <div className="weather-type">{data.weather ? data.weather[0].main : null}</div>
              <div className="temp">{data.main ? `${Math.floor(data.main.temp)}°` : null}</div>
            </div>
            <div className="weather-date">
              <p>{new Date(data.dt * 1000).toLocaleDateString()}</p>
            </div>
            <div className="weather-data">
              <div className="humidity">
                <div className="data-name">Humidity</div>
                <i className="fa-solid fa-droplet"></i>
                <div className="data">{data.main.humidity}%</div>
              </div>
              <div className="wind">
                <div className="data-name">Wind</div>
                <i className="fa-solid fa-wind"></i>
                <div className="data">{data.wind.speed} km/h</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
