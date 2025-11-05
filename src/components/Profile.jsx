import userNotImagen from "../assets/img/images.png";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import useFetch from "../hooks/useFetch";

const Profile = () => {
  const { user } = useContext(UserContext);
  const { getFetchData } = useFetch();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!user?._id) return;
      try {
        const data = await getFetchData(`/user/${user._id}`);
        if (data.ok) setUserData(data.user);
      } catch (err) {
        // Puedes mostrar un error si lo deseas
      }
    };
    fetchUser();
  }, [user]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-2">Mi Perfil</h2>
      <p className="text-gray-500 mb-6">
        Gestiona tu información personal y configuración de cuenta
      </p>

      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex flex-col items-center bg-gray-100 rounded-lg p-4 w-full md:w-1/3">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-2">
            <img src={userData?.image || userNotImagen} alt="" />
          </div>
          <p className="font-semibold">
            {userData?.role || "Rol no disponible"}
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Miembro desde: {userData?.created_at || "Fecha no disponible"}
          </p>
        </div>

        <div className="flex-1 bg-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Información Personal</h3>
          <p className="mb-1">
            Nombre:{" "}
            <span className="text-gray-700">
              {userData?.profile?.first_name || "No especificado"}
            </span>
          </p>
          <p className="mb-1">
            Email:{" "}
            <span className="text-gray-700">
              {userData?.email || "No especificado"}
            </span>
          </p>
          <p className="mb-1">
            Teléfono:{" "}
            <span className="text-gray-700">
              {userData?.profile?.phone || "No especificado"}
            </span>
          </p>
          <p className="mb-3">
            Dirección:{" "}
            <span className="text-gray-700">
              {userData?.profile?.address || "No especificada"}
            </span>
          </p>
          <button className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Editar
          </button>
        </div>
      </div>
      <div className="bg-gray-100 rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-2">Seguridad</h3>
        <button className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Cambiar contraseña
        </button>
      </div>
    </div>
  );
};

export default Profile;
