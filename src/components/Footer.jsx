import React from "react";
import "./Footer.css";

const Footer = () => {
  const date = new Date();

  return (
    <>
      <div className="footer">
        <div className="image">
          <span>Powered by </span>
          <a
            className="link"
            href="https://www.weatherapi.com/"
            title="Free Weather API"
          >
            WeatherAPI.com
          </a>
        </div>

        <p>Tomasz Olejniczak® {date.getFullYear()}</p>
      </div>
    </>
  );
};

export default Footer;
