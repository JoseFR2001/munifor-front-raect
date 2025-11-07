import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// === FUNCION PARA CAMBIAR EL ICONO SEGÚN EL TIPO ===
const getIconByType = (type) => {
  const iconUrls = {
    bache: "https://unpkg.com/@mapbox/maki@8.0.1/icons/road-accident.svg", // Baches/accidentes viales
    alumbrado: "https://unpkg.com/@mapbox/maki@8.0.1/icons/attraction.svg", // Alumbrado público
    basura: "https://unpkg.com/@mapbox/maki@8.0.1/icons/waste-basket.svg", // Basura/residuos
    arbol: "https://unpkg.com/@mapbox/maki@8.0.1/icons/park.svg", // Árboles/poda
    semaforo: "https://unpkg.com/@mapbox/maki@8.0.1/icons/danger.svg", // Semáforos rotos
    construccion: "https://unpkg.com/@mapbox/maki@8.0.1/icons/construction.svg", // Obras
    agua: "https://unpkg.com/@mapbox/maki@8.0.1/icons/water.svg", // Pérdidas de agua
    otros: "https://unpkg.com/@mapbox/maki@8.0.1/icons/circle.svg", // General
  };

  const colorMap = {
    bache: "#e74c3c", // rojo - peligro
    alumbrado: "#f39c12", // naranja - atención
    basura: "#27ae60", // verde - limpieza
    arbol: "#16a085", // verde agua - naturaleza
    semaforo: "#c0392b", // rojo oscuro - urgente
    construccion: "#f1c40f", // amarillo - en progreso
    agua: "#3498db", // azul - agua
    otros: "#95a5a6", // gris - general
  };

  return L.divIcon({
    html: `
      <div style="position: relative; width: 40px; height: 50px;">
        <div style="background:${colorMap[type]}; 
                    width: 40px; 
                    height: 40px;
                    border-radius: 50% 50% 50% 0;
                    transform: rotate(-45deg);
                    display:flex; 
                    align-items:center; 
                    justify-content:center;
                    border:3px solid white;
                    box-shadow: 0 3px 8px rgba(0,0,0,0.3);">
          <img src="${iconUrls[type]}" 
               width="20" 
               height="20" 
               style="transform: rotate(45deg); filter: brightness(0) invert(1);" />
        </div>
      </div>
    `,
    className: "",
    iconSize: [40, 50],
    iconAnchor: [20, 50],
    popupAnchor: [0, -50],
  });
};

// === EJEMPLOS DE REPORTES ===
const reports = [
  {
    id: 1,
    type: "bache",
    coords: [-34.6037, -58.3816],
    desc: "Bache en la calle Corrientes",
  },
  {
    id: 2,
    type: "alumbrado",
    coords: [-34.601, -58.383],
    desc: "Luz rota en avenida Callao",
  },
  {
    id: 3,
    type: "basura",
    coords: [-34.605, -58.379],
    desc: "Contenedor lleno en Lavalle",
  },
  {
    id: 4,
    type: "otros",
    coords: [-34.607, -58.382],
    desc: "Cartel caído en la plaza",
  },
];

export default function GlobalLeafletMap() {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={[-34.6037, -58.3816]}
        zoom={14}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://osm.org">OpenStreetMap</a> contributors'
        />

        {reports.map((r) => (
          <Marker key={r.id} position={r.coords} icon={getIconByType(r.type)}>
            <Popup>
              <b>{r.type.toUpperCase()}</b> <br />
              {r.desc}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
