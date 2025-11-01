import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapClickHandler from "./MapClick";

const CitizenLeafletMap = ({ onMarkerChange }) => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      // Obtener la ubicación
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
        },
        (error) => {
          console.error("Error al obtener ubicación:", error);
          // Si el usuario no da permiso, mostramos la Plaza San Martín
          setPosition([-26.18489, -58.17214]);
        }
      );
    } else {
      console.error("La geolocalización no es compatible con este navegador.");
      setPosition([-26.18489, -58.17214]);
    }
  }, []);

  const positionUpdate = (newPosition) => {
    setPosition(newPosition || null);
  };

  useEffect(() => {
    if (onMarkerChange && position) {
      onMarkerChange(position);
    }
  }, [position, onMarkerChange]);

  return (
    <div className="w-96 h-96 mt-4 border rounded-lg overflow-hidden">
      {position && (
        <MapContainer
          center={position}
          zoom={15}
          scrollWheelZoom={true}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              📍 {position[0].toFixed(5)}, {position[1].toFixed(5)} <br />
              Ubicación seleccionada
            </Popup>
          </Marker>
          {/* Componente que maneja los clics */}
          <MapClickHandler onClickPosition={positionUpdate} />
        </MapContainer>
      )}
      {!position && (
        <p className="text-center mt-4 text-gray-500">
          Obteniendo ubicación...
        </p>
      )}
    </div>
  );
};

export default CitizenLeafletMap;
