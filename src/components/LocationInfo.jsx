import React from "react";
import "./LocationInfo.css";

const LocationInfo = ({ location, forecastday }) => {
  return (
    <>
      <p className="location">
        {location.name} / {location.country} / {location.localtime}
      </p>
    </>
  );
};

export default LocationInfo;
