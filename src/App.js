import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  faSun,
  faCloudSun,
  faCloud,
  faCloudShowersHeavy,
  faCloudRain,
  faBolt,
  faSnowflake,
  faSmog,
} from "@fortawesome/free-solid-svg-icons";

import "tailwindcss/tailwind.css"; // Import Tailwind CSS

const API_KEY = "6cea6afbcae52070b6964ab412bcdead";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [isFetched, setIsFetched] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const fetchWeather = async () => {
    try {
      setIsFetching(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
      );

      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);
        setIsFetched(true);
        setIsFetching(false);

        // Hide the "Fetched" message after 2 seconds
        setTimeout(() => {
          setIsFetched(false);
        }, 2000);
      } else {
        console.log("Error fetching weather data.");
        setIsFetched(false);
        setIsFetching(false);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setIsFetched(false);
      setIsFetching(false);
    }
  };

  const weatherIcons = {
    "01d": faSun,
    "02d": faCloudSun,
    "03d": faCloud,
    "04d": faCloud,
    "09d": faCloudShowersHeavy,
    "10d": faCloudRain,
    "11d": faBolt,
    "13d": faSnowflake,
    "50d": faSmog,
    default: faCloud,
  };

  return (
    <div className="bg-gray-800 min-h-screen flex flex-col items-center justify-center relative">
      <h1 className="text-5xl font-semibold mb-4 text-white ">Weather App</h1>
      <div className="flex mb-4">
        <input 
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="px-4 py-2 border rounded-l text-sm"
        />
        <button
          onClick={fetchWeather}
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 transition-colors text-sm"
        >
          Get Weather
        </button>
      </div>
      {isFetching && <p className="text-yellow-500 font-bold text-sm">Fetching...</p>}
      {weatherData && (
        <div className="text-center text-white">
          <h2 className="text-xl font-semibold mb-2">
            Weather in {weatherData.city.name}
          </h2>
          <p className="text-sm">Temperature: {weatherData.list[0].main.temp}°C</p>
          <p className="text-sm">Humidity: {weatherData.list[0].main.humidity}%</p>
          <p className="text-sm">Weather: {weatherData.list[0].weather[0].description}</p>
          <FontAwesomeIcon
            icon={weatherIcons[weatherData.list[0].weather[0].icon] || weatherIcons.default}
            className="text-4xl mt-2"
          />
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">5-Day Forecast</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {weatherData.list.filter((forecast, index) => index % 8 === 0).map((forecast, index) => (
                <div
                  key={forecast.dt}
                  className="bg-white p-4 border rounded shadow-md text-black text-center"
                >
                  <p className="font-semibold">
                    {new Date(
                      forecast.dt * 1000  // Convert seconds to milliseconds
                    ).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-sm">Temperature: {forecast.main.temp}°C</p>
                  <p className="text-sm">Humidity: {forecast.main.humidity}%</p>
                  <p className="text-sm">Weather: {forecast.weather[0].description}</p>
                  <FontAwesomeIcon
                    icon={weatherIcons[forecast.weather[0].icon] || weatherIcons.default}
                    className="text-xl mt-2"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {isFetched && (
        <p className="text-green-500 font-bold text-sm absolute top-2 left-1/2 transform -translate-x-1/2">
          Successfully Fetched
        </p>
      )}
    </div>
  );
}

export default App;






