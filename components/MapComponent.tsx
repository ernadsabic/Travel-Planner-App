"use client";
import { Location } from "@/app/generated";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

const customIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface Props {
  itineraries: Location[];
}

const MapComponent = ({ itineraries }: Props) => {
  const defaultCenter: [number, number] = [43.8563, 18.4131];

  const center: [number, number] =
    itineraries.length > 0
      ? [itineraries[0].lat, itineraries[0].lng]
      : defaultCenter;

  const polylinePositions: LatLngExpression[] = itineraries.map((i) => [
    i.lat,
    i.lng,
  ]);
  return (
    <div className="w-full h-125 rounded-md overflow-hidden shadow-md border z-0">
      <MapContainer
        center={center}
        zoom={itineraries.length > 1 ? 12 : 14}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        
        {itineraries.map((loc) => (
          <Marker key={loc.id} position={[loc.lat, loc.lng]} icon={customIcon}>
            <Popup>
              <div className="font-semibold">{loc.locationTitle}</div>
            </Popup>
          </Marker>
        ))}
        <Polyline
          positions={polylinePositions}
          pathOptions={{ color: "#3b82f6", weight: 4, dashArray: "8, 8" }} 
        />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
