import L from "leaflet";
import { ICONS } from "./icons";
const getIconByType = (type) => {
  const colorMap = {
    bache: "#e74c3c", // rojo - peligro
    alumbrado: "#f39c12", // naranja - atención
    basura: "#27ae60", // verde - limpieza
    otros: "#9333ea", // gris - general
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
          <span style="transform: rotate(45deg); display: flex; align-items: center; justify-content: center;">${
            ICONS[type] || ICONS["otros"]
          }</span>
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
