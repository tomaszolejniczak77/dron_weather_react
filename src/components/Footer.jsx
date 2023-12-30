import React from "react";
import "./Footer.css";

const Footer = () => {
  const date = new Date();

  return (
    <>
      <div className="footer">
        <div className="image">
          <p>Powered by</p>
          <a href="https://www.weatherapi.com/">
            <img
              src="//cdn.weatherapi.com/v4/images/weatherapi_logo.png"
              alt="Weather data by WeatherAPI.com"
            />
          </a>
        </div>
        <p>Tomasz Olejniczak® {date.getFullYear()}</p>
      </div>
    </>
  );
};

export default Footer;
