import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import DraggableMarker from "./DraggableMarker";
import "./Map.css";

export const Map = ({
  coords,
  isGeolocationAvailable,
  isGeolocationEnabled,
}) => {
  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  return !isGeolocationAvailable ? (
    <div className="info" style={{ color: "red" }}>
      Twoja przeglądarka nie wspiera geolokalizacji
    </div>
  ) : !isGeolocationEnabled ? (
    <div className="info" style={{ color: "red" }}>
      Loklizacja jest wyłączona!
    </div>
  ) : coords ? (
    <MapContainer
      center={[coords.latitude, coords.longitude]}
      zoom={10}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[coords.latitude, coords.longitude]}></Marker>
      {/* <DraggableMarker coords={coords} /> */}
    </MapContainer>
  ) : (
    <div className="info">Pobieranie danych o lokalizacji</div>
  );
};
