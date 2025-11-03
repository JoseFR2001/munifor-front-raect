import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

const RegistrationRequests = () => {
  const { getFetchData, postFetchData } = useFetch();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getFetchData("/user/requests"); // Endpoint para solicitudes pendientes
        setRequests(Array.isArray(data?.requests) ? data.requests : []);
      } catch (error) {
        setRequests([]);
      }
    };
    fetchRequests();
  }, []);

  const handleAction = async (id, action) => {
    setLoading(true);
    try {
      await postFetchData(`/user/request/${id}/${action}`); // Endpoint para aceptar/rechazar
      // Refrescar lista
      const data = await getFetchData("/user/requests");
      setRequests(Array.isArray(data?.requests) ? data.requests : []);
    } catch (error) {
      // Manejo de error
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 max-w-4xl mx-auto w-full py-8">
      <h1 className="text-2xl font-bold text-gray-700 mb-8">
        Registration Requests
      </h1>
      {requests.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8">
          <span className="text-gray-500">No pending requests</span>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {requests.map((req, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow p-4 flex justify-between items-center border border-gray-200 w-full"
            >
              <div>
                <span className="block text-base font-semibold text-gray-800">
                  {req.name} ({req.role})
                </span>
                <span className="block text-sm text-gray-500">
                  DNI: {req.dni}
                </span>
                <span className="block text-sm text-gray-500">
                  Email: {req.email}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  onClick={() => handleAction(req._id, "accept")}
                  disabled={loading}
                >
                  Accept
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  onClick={() => handleAction(req._id, "reject")}
                  disabled={loading}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RegistrationRequests;
