import L from "leaflet";
import { ICONS } from "./icons";

export const getIconReport = (type, status) => {
  const typeColorMap = {
    bache: "#e74c3c", // rojo - peligro
    alumbrado: "#f39c12", // naranja - atención
    basura: "#27ae60", // verde - limpieza
    otro: "#9333ea", // violeta - general
  };

  const statusColorMap = {
    pendiente: "#f59e42", // naranja
    revisado: "#3b82f6", // azul
    aceptado: "#22c55e", // verde
    completado: "#10b981", // verde más fuerte
    rechazado: "#ef4444", // rojo
  };

  return L.divIcon({
    html: `
      <div style="position: relative; width: 40px; height: 50px;">
        <div style="background:${typeColorMap[type]}; 
                    width: 40px; 
                    height: 40px;
                    border-radius: 50% 50% 50% 0;
                    transform: rotate(-45deg);
                    display:flex; 
                    align-items:center; 
                    justify-content:center;
                    border:3px solid ${statusColorMap[status]};
                    box-shadow: 0 3px 8px rgba(0,0,0,0.3);">
          <span style="transform: rotate(45deg); display: flex; align-items: center; justify-content: center;">${ICONS[type]}</span>
        </div>
      </div>
    `,
    className: "",
    iconSize: [40, 50],
    iconAnchor: [20, 50],
    popupAnchor: [0, -50],
  });
};

export const getIconTask = (type, priority) => {
  const typeColorMap = {
    reparación: "#e74c3c", // rojo - alta prioridad
    mantenimiento: "#f39c12", // naranja - media prioridad
    recolección: "#27ae60", // verde - baja prioridad
    supervisión: "#9333ea", // violeta - general
  };

  const priorityColorMap = {
    alta: "#e74c3c", // rojo - alta prioridad
    media: "#f39c12", // naranja - media prioridad
    baja: "#27ae60", // verde - baja prioridad
  };

  return L.divIcon({
    html: `
      <div style="position: relative; width: 40px; height: 50px;">
        <div style="background:${typeColorMap[type]}; 
                    width: 40px; 
                    height: 40px;
                    border-radius: 50% 50% 50% 0;
                    transform: rotate(-45deg);
                    display:flex; 
                    align-items:center; 
                    justify-content:center;
                    border:3px solid ${priorityColorMap[priority]};
                    box-shadow: 0 3px 8px rgba(0,0,0,0.3);">
          <span style="transform: rotate(45deg); display: flex; align-items: center; justify-content: center;">${ICONS[type]}</span>
        </div>
      </div>
    `,
    className: "",
    iconSize: [40, 50],
    iconAnchor: [20, 50],
    popupAnchor: [0, -50],
  });
};

export const getIconProgress = (status) => {
  const statusColorMap = {
    pendiente: "#f59e42", // naranja
    "en progreso": "#3b82f6", // azul
    finalizado: "#10b981", // verde más fuerte
  };
  return L.divIcon({
    html: `
      <div style="position: relative; width: 40px; height: 50px;">
        <div style="background:${statusColorMap[status]}; 
                    width: 40px; 
                    height: 40px;
                    border-radius: 50% 50% 50% 0;
                    transform: rotate(-45deg);
                    display:flex; 
                    align-items:center; 
                    justify-content:center;
                    border:3px solid white;
                    box-shadow: 0 3px 8px rgba(0,0,0,0.3);">
          <span style="transform: rotate(45deg); display: flex; align-items: center; justify-content: center;">${ICONS.progress}</span>
        </div>
      </div>
    `,
    className: "",
    iconSize: [40, 50],
    iconAnchor: [20, 50],
    popupAnchor: [0, -50],
  });
};
