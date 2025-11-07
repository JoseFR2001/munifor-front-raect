import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import getIconByType from "../../utils/getIconByType";
import useFetch from "../../hooks/useFetch";
import useFilter from "../../hooks/useFilter";
import { useEffect, useState } from "react";
import AsideFilterMap from "./AsideFilterMap";

const GlobalLeafletMap = () => {
  const [allData, setAllData] = useState({
    reports: [],
    tasks: [],
    progress: [],
  });
  const [filters, setFilters] = useState({ dataType: "report" });
  const { getFetchData } = useFetch();
  const { filterForMap } = useFilter();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFetchData("/map/data");
      console.log("Fetched map data:", data);
      setAllData({
        reports: data.reports || [],
        tasks: data.tasks || [],
        progress: data.progress || [],
      });
    };
    fetchData();
  }, []);

  const handleApplyFilters = (newFilters) => {
    console.log("Filtros aplicados: ", newFilters);
    setFilters(newFilters);
  };

  // Aplicar filtros usando el hook useFilter
  const filteredData = filterForMap(allData, filters);

  return (
    <div className="flex flex-col">
      <aside className="p-4 bg-gray-100 border-b">
        <AsideFilterMap onFilters={handleApplyFilters} />
      </aside>

      <div style={{ height: "100vh", width: "100%" }}>
        <MapContainer
          center={[-26.1849, -58.1731]}
          zoom={15}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://osm.org">OpenStreetMap</a> contributors'
          />

          {filteredData.map((item) => (
            <Marker
              key={item._id}
              position={[item.location.lat, item.location.lng]}
              icon={getIconByType(
                item.report_type?.toLowerCase() ||
                  item.task_type?.toLowerCase() ||
                  "otros"
              )}
            >
              <Popup>
                <div>
                  <b>
                    {(
                      item.report_type ||
                      item.task_type ||
                      "Progreso"
                    ).toUpperCase()}
                  </b>
                  <br />
                  <span>{item.title || item.description}</span>
                  {item.status && (
                    <>
                      <br />
                      <small style={{ color: "#666" }}>
                        Estado: {item.status}
                      </small>
                    </>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default GlobalLeafletMap;
