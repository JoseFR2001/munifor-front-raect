import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  getIconProgress,
  getIconReport,
  getIconTask,
} from "../../utils/getIconMap";
import useFetch from "../../hooks/useFetch";
import useFilter from "../../hooks/useFilter";
import { useEffect, useState } from "react";
import AsideFilterMap from "./AsideFilterMap";
import ReportDetails from "../details/ReportDetails";

const GlobalLeafletMap = () => {
  const [allData, setAllData] = useState({
    reports: [],
    tasks: [],
    progress: [],
  });
  const [filters, setFilters] = useState({ dataType: "report" });
  const { getFetchData } = useFetch();
  const { filterForMap } = useFilter();
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFetchData("/map/data");
      console.log(data.tasks);
      setAllData({
        reports: data.reports || [],
        tasks: data.tasks || [],
        progress: data.progress || [],
      });
    };
    fetchData();
  }, []);

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const filteredData = filterForMap(allData, filters);
  const handleSelectReport = (reporte) => setSelectedReport(reporte);
  const closeModal = () => setSelectedReport(null);

  return (
    <div className="flex h-screen">
      {/* ASIDE IZQUIERDO - Filtros */}
      <aside className="w-1/6 bg-gray-100 border-r border-gray-300 p-4 overflow-y-auto">
        <AsideFilterMap onFilters={handleApplyFilters} />
      </aside>

      {/* MAPA CENTRAL */}
      <main className="flex-1 relative">
        <MapContainer
          center={[-26.1849, -58.1731]}
          zoom={15}
          className="h-full w-full z-0"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://osm.org">OpenStreetMap</a> contributors'
          />
          {filters.dataType === "report"
            ? filteredData.map((item) => (
                <Marker
                  key={item._id}
                  position={[item.location.lat, item.location.lng]}
                  icon={getIconReport(
                    item.report_type?.toLowerCase() || "otros",
                    item.status?.toLowerCase()
                  )}
                  eventHandlers={{
                    click: () => handleSelectReport(item),
                  }}
                >
                  {/* DEBO REVISAR ESTO */}
                  <Popup>
                    <div>
                      <b>{item.report_type?.toUpperCase()}</b>
                      <br />
                      <span>{item.title || item.description}</span>
                      {item.status && (
                        <>
                          <br />
                          <small className="text-gray-600">
                            Estado: {item.status}
                          </small>
                        </>
                      )}
                    </div>
                  </Popup>
                </Marker>
              ))
            : filters.dataType === "task"
            ? filteredData.map((item) => (
                <Marker
                  key={item._id}
                  position={[
                    item.report.location.lat,
                    item.report.location.lng,
                  ]}
                  icon={getIconTask(
                    item.status?.toLowerCase(),
                    item.priority?.toLowerCase()
                  )}
                  eventHandlers={{
                    click: () => handleSelectReport(item),
                  }}
                >
                  <Popup>
                    <div>
                      <b>{item.task_type?.toUpperCase()}</b>
                      <br />
                      <span>{item.title || item.description}</span>
                      <br />
                      <small className="text-gray-600">
                        Estado: {item.status}
                      </small>
                    </div>
                  </Popup>
                </Marker>
              ))
            : filters.dataType === "progress" &&
              filteredData.map((item) => (
                <Marker
                  key={item._id}
                  position={[item.location.lat, item.location.lng]}
                  icon={getIconProgress(item.status?.toLowerCase())}
                  eventHandlers={{
                    click: () => handleSelectReport(item),
                  }}
                >
                  <Popup>
                    <div>
                      <b>PROGRESO</b>
                      <br />
                      <span>{item.worker?.name}</span>
                      <br />
                      <small className="text-gray-600">
                        Estado: {item.status}
                      </small>
                    </div>
                  </Popup>
                </Marker>
              ))}
        </MapContainer>

        {/* PANEL DE DETALLES (ASIDE DERECHO) */}
        {selectedReport && (
          <ReportDetails
            report={selectedReport}
            onClose={closeModal}
            role="Operador"
          />
        )}
      </main>
    </div>
  );
};

export default GlobalLeafletMap;
