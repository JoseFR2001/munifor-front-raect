import userNotImagen from "../assets/img/images.png";
const Profile = ({ user }) => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-2">Mi Perfil</h2>
      <p className="text-gray-500 mb-6">
        Gestiona tu información personal y configuración de cuenta
      </p>

      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex flex-col items-center bg-gray-100 rounded-lg p-4 w-full md:w-1/3">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-2">
            <img src={user?.image || userNotImagen} alt="" />
          </div>
          <p className="font-semibold">{user?.role || "Rol no disponible"}</p>
          <p className="text-gray-500 text-sm mt-2">
            Miembro desde: {user?.createdAt || "Fecha no disponible"}
          </p>
        </div>

        <div className="flex-1 bg-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Información Personal</h3>
          <p className="mb-1">
            Nombre:{" "}
            <span className="text-gray-700">
              {user?.first_name || "No especificado"}
            </span>
          </p>
          <p className="mb-1">
            Email:{" "}
            <span className="text-gray-700">
              {user?.email || "No especificado"}
            </span>
          </p>
          <p className="mb-1">
            Teléfono:{" "}
            <span className="text-gray-700">
              {user?.phone || "No especificado"}
            </span>
          </p>
          <p className="mb-3">
            Dirección:{" "}
            <span className="text-gray-700">
              {user?.address || "No especificada"}
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
