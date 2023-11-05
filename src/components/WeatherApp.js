import React, { useState } from "react";
import axios from "axios";

function WeatherApp() {
  const [weatherData, setWeatherData] = useState({});
  const [location, setLocation] = useState("");

  const API_KEY = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=2e65cf6c94c3187338339a22d39e734d`;

  const searchLocation = event => {
    if (event.key === "Enter") {
      axios.get(API_KEY).then(response => {
        console.log(response.data);
        setWeatherData(response.data);
      });
      setLocation("");
    }
  };

  const changeLocation = e => {
    setLocation(e.target.value);
  };

  const current = new Date();
  const time = current.toLocaleString() + "";

  const convertFahrenheitToCelsius = fahrenheit => {
    return ((fahrenheit - 32) * 5) / 9;
  };

  return (
    <div className="container">
      <input
        type="text"
        onKeyPress={searchLocation}
        value={location}
        onChange={changeLocation}
        className="search-input"
        placeholder="Enter city name"
      />
      <div className="searched-result mx-auto p-5">
        <div>
          <p>
            The weather information for {weatherData.name}
            <span> at</span>
          </p>
          <div className="d-flex" style={{ justifyContent: "space-between" }}>
            <div>
              <p>Time: {time}</p>
            </div>
            <div className="location">
              <p>
                Country:{" "}
                {weatherData.sys ? (
                  <span>{weatherData.sys.country}</span>
                ) : null}
              </p>
            </div>
          </div>
          <div className="location">
            <p>Location: {weatherData.name}</p>
          </div>
          <div className="temp">
            <p>Temperature:</p>
            {weatherData.main ? (
              <p>
                {convertFahrenheitToCelsius(weatherData.main.temp).toFixed(1)}
                <span>&#8451;</span>
              </p>
            ) : null}
          </div>
          {weatherData.name !== undefined && (
            <div className="bottom">
              <div className="description">
                <p>Description:</p>
                {weatherData.weather ? (
                  <p>{weatherData.weather[0].main}</p>
                ) : null}
              </div>

              <div className="description1">
                <div className="feels">
                  {weatherData.main ? (
                    <p className="text-center">
                      {convertFahrenheitToCelsius(weatherData.main.feels_like).toFixed(1)}
                      <span>&#8451;</span>{" "}
                    </p>
                  ) : null}
                  <p className="text-center">Feels like</p>
                </div>
                <div className="humidity">
                  {weatherData.main ? (
                    <p className="text-center">
                      {weatherData.main.humidity.toFixed()}%
                    </p>
                  ) : null}
                  <p>Humidity</p>
                </div>
                <div className="wind">
                  <p>{weatherData.wind.speed}MPH</p>
                  <p className="text-center">Wind Speed</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}

export default WeatherApp;
