import React from "react";
import { useGeolocated } from "react-geolocated";
import { Map } from "./Map";
import GetWeather from "./GetWeather";

const GetLocation = () => {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  return (
    <>
      <Map
        coords={coords}
        isGeolocationAvailable={isGeolocationAvailable}
        isGeolocationEnabled={isGeolocationEnabled}
      />

      {coords && <GetWeather coords={coords} />}
    </>
  );
};

export default GetLocation;
