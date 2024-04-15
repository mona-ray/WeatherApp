import React, { useState } from 'react';
import './forcasting.css';
import Sunny from '../image_source/sunny.png';
import Location from '../image_source/location.png';
import MapDisplay from './MapDisplay';

const api = {
  key: '419529502477484796098f2df3808f4d',
  base: 'https://api.openweathermap.org/data/2.5/weather'
};

export const Forcasting = () => {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [position, setPosition] = useState([51.505, -0.09]); // Default position for map
  const [showMap, setShowMap] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    fetch(`${api.base}?q=${encodeURIComponent(search)}&units=metric&APPID=${api.key}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        console.log("API Response:", data);
        setWeather(data);
        setPosition([data.coord.lat, data.coord.lon]); // Update position based on weather data
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  const handleClickWeatherName = () => {
    setShowMap(true);
  }
  const handleCloseMap = () => {
    setShowMap(false);
  }


  return (
    <div className="background-wrapper">
      <div className="content">
        <form className='text-center mt-3' onSubmit={handleSearch}>
          <input type="text" className="searching border-4 rounded-pill" value={search} onChange={(e) => setSearch(e.target.value)} />
          <button type="submit" className='searchButton border-4 rounded-pill'>Search</button>
        </form>

        <div className="container text-center mt-3">
          <div className="row">
            <div className="col">
              <img className="sunny" src={Sunny} alt="Sunny" />
              {weather.weather && weather.weather.length > 0 && <h2 className='zoom-heading'>{weather.weather[0].main}</h2>}
            </div>
            <div className="col mt-3">
              {weather.main && <h2 className='temperature zoom-heading' >{weather.main.temp}°C</h2>}
              <div>
                <img className="location" src={Location} alt="Location" />
                <h4 className='zoom-heading' onClick={handleClickWeatherName}>{weather.name}</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="container text-center weather">
          <div className="row">
            <div className="col">
              {weather.main && <h1 className='zoom-heading'>Humidity: {weather.main.humidity}%</h1>}
            </div>
            <div className="col">
              {weather.wind && <h1 className='zoom-heading'>Wind Speed: {weather.wind.speed}km/h</h1>}
            </div>
          </div>
        </div>
       
        {showMap && position && (
          
          <div className="map-modal">
            <div className="map-content"> <MapDisplay position={position} />
            <button onClick={handleCloseMap} className="close-button">Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
