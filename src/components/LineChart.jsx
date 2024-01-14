import React, { useState, useEffect } from "react";
import { Chart as ChartJS, scales } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import "./LineChart.css";

const LineChart = ({ forecastday, searchData, label }) => {
  const time = new Date();
  const hourNow = time.getHours();
  const forecastToday = forecastday[0].hour;
  const forecastTomorrow = forecastday[1].hour;

  const [day, setDay] = useState(forecastToday);
  const [titleText, setTitleText] = useState("Dziś (24h)");
  const [todayBtnActive, setTodayBtnActive] = useState(true);
  const [tomorrowBtnActive, setTomorrowBtnActive] = useState(false);
  const [msBtnToogle, setMsBtnToogle] = useState(false);
  const [windDataMs, setWindDataMs] = useState([]);
  const [data, setData] = useState([]);
  const [extraLabel, setExtraLabel] = useState();

  console.log(windDataMs, msBtnToogle, searchData);

  useEffect(() => {
    if (!msBtnToogle) {
      setData(day.map((key) => key[searchData]));
    } else if (
      msBtnToogle &&
      (searchData === "temp_c" ||
        searchData === "cloud" ||
        searchData === "pressure_mb")
    ) {
      setData(day.map((key) => key[searchData]));
      setMsBtnToogle(false);
    } else if (
      msBtnToogle &&
      (searchData === "gust_kph" || searchData === "wind_kph")
    ) {
      transformKmhToMs(day, searchData);
      setExtraLabel("Porywy wiatru - m/s");
      setData(windDataMs.map((v) => v));
    }
  }, [day, searchData, msBtnToogle]);

  const transformKmhToMs = (d, k) => {
    setWindDataMs(d.map((v) => ((v[k] * 1000) / 3600).toFixed(2)));
  };

  const handleClick = (e) => {
    if (e.target.value === "today" && !msBtnToogle) {
      setDay(forecastToday);
      setTitleText("Dziś (24h)");
      setTodayBtnActive(true);
      setTomorrowBtnActive(false);
    } else if (e.target.value === "tomorrow" && !msBtnToogle) {
      setDay(forecastTomorrow);
      setTitleText("Jutro (24h)");
      setTodayBtnActive(false);
      setTomorrowBtnActive(true);
    }
  };

  const handleToogle = (e) => {
    if (e.target.value === "gust_kph") {
      setMsBtnToogle(!msBtnToogle);
      transformKmhToMs(day, searchData);
      setExtraLabel("Porywy wiatru - m/s");
    } else if (e.target.value === "wind_kph") {
      setMsBtnToogle(!msBtnToogle);
      transformKmhToMs(day, searchData);
      setExtraLabel("Wiatr - m/s");
    }
  };

  return (
    <>
      <div className="chartWrapper">
        <div className="chart">
          <Line
            data={{
              labels: forecastToday.map((v, i) =>
                forecastToday[i].time.slice(11, 13)
              ),
              datasets: [
                {
                  label: msBtnToogle ? extraLabel : label,
                  data: data,
                  backgroundColor: "blue",
                  borderColor: data.map((v) =>
                    v > 8.3 && msBtnToogle ? "red" : "blue"
                  ),
                },
              ],
            }}
            options={{
              plugins: {
                title: { display: true, text: titleText, color: "black" },
              },
              datasets: { line: { pointRadius: 0 } },
              scales: {
                x: {
                  ticks: {
                    color: "black",
                    autoSkip: false,
                    font: { size: "9" },
                  },
                  grid: {
                    color: forecastToday.map(
                      (v, i) => i === hourNow && todayBtnActive && "black"
                    ),
                  },
                },
                y: {
                  ticks: {
                    color: "black",
                    autoSkip: false,
                    font: { size: "12" },
                  },
                  grid: {},
                },
              },
            }}
          />
        </div>
      </div>
      <div className="buttons">
        <button
          value={"today"}
          onClick={(e) => handleClick(e)}
          className={todayBtnActive ? "btn active" : "btn"}
        >
          Dziś
        </button>
        <button
          value={"tomorrow"}
          onClick={(e) => handleClick(e)}
          className={tomorrowBtnActive ? "btn active" : "btn"}
        >
          Jutro
        </button>
        <button
          value={searchData}
          onClick={(e) => handleToogle(e)}
          className={msBtnToogle ? "btn active" : "btn "}
        >
          Wiatr m/s
        </button>
      </div>
    </>
  );
};

export default LineChart;
