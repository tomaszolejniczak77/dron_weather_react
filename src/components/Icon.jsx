import React from "react";
import { useState, useEffect } from "react";

const Icon = ({ iconInfo, current }) => {
  const currentWeatherCode = current.condition.code;
  const currentIcon = iconInfo.filter(
    ({ code }) => code === currentWeatherCode
  );

  const iconNumber = currentIcon[0].icon;

  const [icon, setIcon] = useState("");

  useEffect(() => {
    const getIcon = () => {
      import(
        `../image/weather/${
          current.is_day === 1 ? "day" : "night"
        }/${iconNumber}.png`
      ).then((image) => setIcon(image.default));
    };
    getIcon();
  }, [currentWeatherCode]);

  return (
    <>
      <div>{!icon ? "Chwila!" : <img src={icon} alt="Weather icon" />}</div>
    </>
  );
};

export default Icon;
