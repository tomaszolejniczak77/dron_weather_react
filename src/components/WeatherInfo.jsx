import React from "react";
import "./WeatherInfo.css";
import { Nav } from "./Nav";
import LocationInfo from "./LocationInfo";
import Kp from "./Kp";
import GetIcon from "./GetIcon";
import Icon from "./Icon";
import LineChart from "./LineChart";
import { useState } from "react";

const WeatherInfo = ({ weatherData }) => {
  const {
    current,
    location,
    forecast: { forecastday },
  } = weatherData;

  const { kp } = Kp();

  const [searchData, setSearchData] = useState("temp_c");
  const [label, setLabel] = useState("Temperatura - °C");

  const convertTime = (timeStr) => {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":");
    if (hours === "12") {
      hours = "00";
    }
    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }
    return `${hours}:${minutes}`;
  };

  const sunRise = convertTime(forecastday[0].astro.sunrise);
  const sunSet = convertTime(forecastday[0].astro.sunset);

  const { isLoading, iconInfo } = GetIcon();

  const tiles = [
    {
      tile: "Temperatura",
      extraTile: "odczuwalna",
      value: `${current.temp_c}°C`,
      extraValue: `${current.feelslike_c}°C`,
      badCondition: current.temp_c < 0 ? true : false,
      withClick: true,
      dataName: "temp_c",
      label: "Temperatura - °C",
      isActive: true,
    },
    {
      tile: "Zachmurzenie",
      extraTile: "opady",
      value: `${current.cloud} %`,
      extraValue: `${current.precip_mm} mm`,
      badCondition: current.precip_mm > 0 ? true : false,
      withClick: true,
      dataName: "cloud",
      label: "Zachmurzenie - %",
      isActive: false,
    },
    {
      tile: "Wiatr",
      value: `${current.wind_kph} km/h`,
      badCondition: current.wind_kph > 30 ? true : false,
      withClick: true,
      dataName: "wind_kph",
      label: "Wiatr - km/h",
      isActive: false,
    },
    {
      tile: "Ciśnienie",
      value: `${current.pressure_mb} hPa`,
      dataName: "pressure_mb",
      label: "Ciśnienie - hPa",
      withClick: true,
      isActive: false,
    },
    {
      tile: "Porywy wiatru",
      value: `${current.gust_kph} km/h`,
      badCondition: current.gust_kph > 30 ? true : false,
      withClick: true,
      dataName: "gust_kph",
      label: "Porywy wiatru - km/h",
      isActive: false,
    },
    {
      tile: "Kierunek wiatru",
      value: current.wind_dir,
      withClick: false,
      isActive: false,
    },
    {
      tile: "Wschód słońca",
      extraTile: "Zachód słońca",
      value: `${sunRise}`,
      extraValue: `${sunSet}`,
      withClick: false,
      isActive: false,
    },
  ];

  const [currentTiles, setCurrentTiles] = useState(tiles);

  function changeActiveTile(i) {
    const newTiles = currentTiles.map((key, indx) =>
      indx === i ? { ...key, isActive: true } : { ...key, isActive: false }
    );

    setCurrentTiles(newTiles);
  }

  function handleDataForChart(i) {
    if (i <= 4) {
      setSearchData(tiles[i].dataName);
      setLabel(tiles[i].label);
      changeActiveTile(i);
    }
  }

  return (
    <>
      <Nav title={"Pogoda dla dronów"} />
      <LocationInfo location={location} forecastday={forecastday} />
      <section>
        <>
          <div className="tile">
            {isLoading
              ? "Chwila!"
              : iconInfo && <Icon iconInfo={iconInfo} current={current} />}
          </div>
        </>
        {currentTiles.map((el, i) => (
          <div
            onClick={() => handleDataForChart(i)}
            className={
              el.badCondition && el.isActive && el.withClick
                ? "tile withClick active badCondition"
                : el.badCondition && el.withClick
                ? "tile withClick badCondition"
                : el.withClick && el.isActive
                ? "tile withClick active"
                : el.withClick
                ? "tile withClick"
                : "tile"
            }
            key={i}
          >
            <p>{el.tile}</p>
            <p className="value">{el.value}</p>
            <p className="extraTile">{el.extraTile}</p>
            <p className="extraTile">{el.extraValue}</p>
          </div>
        ))}
        <div className={kp > 4 ? "tile badCondition" : "tile"}>
          <p>KP</p>
          {!kp ? "Czekaj" : <p>{kp}</p>}
        </div>
      </section>
      <LineChart
        forecastday={forecastday}
        location={location}
        searchData={searchData}
        label={label}
      />
    </>
  );
};

export default WeatherInfo;
