import { useMapEvents } from "react-leaflet";

const MapClickHandler = ({ onClickPosition }) => {
  const map = useMapEvents({
    click(e) {
      onClickPosition([e.latlng.lat, e.latlng.lng]);
      map.flyTo(e.latlng, map.getZoom());
    },
  });
  return null; // Este componente no renderiza nada
};
export default MapClickHandler;
