import L from "leaflet";
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

export default getIconByType;
