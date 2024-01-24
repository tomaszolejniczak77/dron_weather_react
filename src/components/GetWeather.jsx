import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherInfo from "./WeatherInfo";

const GetWeather = ({ coords }) => {
  const [weatherData, setWeatherData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "https://weatherapi-com.p.rapidapi.com/forecast.json",
        params: {
          q: `${coords.latitude}, ${coords.longitude}`,
          days: "3",
        },
        headers: {
          "X-RapidAPI-Key": import.meta.env.RAECT_API_KEY,
          "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        setWeatherData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return <>{weatherData && <WeatherInfo weatherData={weatherData} />}</>;
};

export default GetWeather;
