import { useMapEvents } from "react-leaflet";

const MapClickHandler = ({ onClickPosition }) => {
  const map = useMapEvents({
    click(e) {
      // Al hacer clic, actualizamos la posición del marcador
      onClickPosition([e.latlng.lat, e.latlng.lng]);
      // Opcional: centrar el mapa en la nueva posición
      map.flyTo(e.latlng, map.getZoom());
    },
  });
  return null; // Este componente no renderiza nada
};
export default MapClickHandler;
