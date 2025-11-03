import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

const AdminProfileSearch = () => {
  const { getFetchData } = useFetch();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getFetchData("/user/all"); // Endpoint para todos los usuarios
        setUsers(Array.isArray(data?.users) ? data.users : []);
      } catch (error) {
        setUsers([]);
      }
    };
    fetchUsers();
  }, []);

  // Filtrar usuarios por nombre, email o DNI
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      (u.dni && u.dni.toString().includes(search))
  );

  return (
    <div className="min-h-screen bg-gray-50 max-w-4xl mx-auto w-full py-8">
      <h1 className="text-2xl font-bold text-gray-700 mb-8">User Directory</h1>
      <input
        type="text"
        placeholder="Search by name, email or DNI..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 px-4 py-2 border border-gray-300 rounded w-full"
      />
      {filteredUsers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8">
          <span className="text-gray-500">No users found</span>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredUsers.map((user, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow p-4 flex justify-between items-center border border-gray-200 w-full"
            >
              <div>
                <span className="block text-base font-semibold text-gray-800">
                  {user.name} ({user.role})
                </span>
                <span className="block text-sm text-gray-500">
                  DNI: {user.dni}
                </span>
                <span className="block text-sm text-gray-500">
                  Email: {user.email}
                </span>
              </div>
              {/* Puedes agregar acciones rápidas aquí si lo deseas */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProfileSearch;
