import React from "react";

const Icon = ({ iconInfo, current }) => {
  const currentWeatherCode = current.condition.code;
  const currentIcon = iconInfo.filter(
    ({ code }) => code === currentWeatherCode
  );

  const iconNumber = currentIcon[0].icon;

  return (
    <>
      <div>
        <img
          src={`/src/image/weather/${
            current.is_day === 1 ? "day" : "night"
          }/${iconNumber}.png`}
          alt="weather icon"
        />
      </div>
    </>
  );
};

export default Icon;
