const ProfileDetails = ({ user, showActions = false, onAccept, onReject }) => {
  if (!user) return null;

  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-200 w-full">
      <h3 className="text-lg font-semibold text-indigo-700 mb-4">
        {user.profile?.first_name} {user.profile?.last_name}
      </h3>

      {/* Información de cuenta */}
      <div className="mb-4">
        <h4 className="font-semibold text-gray-700 mb-2">
          Información de cuenta
        </h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Usuario:</span>
            <span className="text-sm font-medium">{user.username}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Email:</span>
            <span className="text-sm font-medium">{user.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Rol:</span>
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                user.role === "Administrador"
                  ? "bg-red-100 text-red-700"
                  : user.role === "Operador"
                  ? "bg-blue-100 text-blue-700"
                  : user.role === "Trabajador"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {user.role}
            </span>
          </div>
        </div>
      </div>

      {/* Datos personales */}
      <div className="mb-4">
        <h4 className="font-semibold text-gray-700 mb-2">Datos personales</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">DNI:</span>
            <span className="text-sm font-medium">{user.profile?.dni}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Edad:</span>
            <span className="text-sm font-medium">{user.profile?.age}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Sexo:</span>
            <span className="text-sm font-medium">{user.profile?.sex}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Teléfono:</span>
            <span className="text-sm font-medium">{user.profile?.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Dirección:</span>
            <span className="text-sm font-medium">{user.profile?.address}</span>
          </div>
        </div>
      </div>

      {/* Estados */}
      <div className="mb-4">
        <h4 className="font-semibold text-gray-700 mb-2">Estado</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Cuenta activa:</span>
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                user.is_active
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {user.is_active ? "Sí" : "No"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Disponible:</span>
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                user.is_available
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {user.is_available ? "Sí" : "No"}
            </span>
          </div>
        </div>
      </div>

      {/* Fecha de registro */}
      <div className="mb-4">
        <span className="text-sm text-gray-600">Fecha de registro:</span>
        <p className="text-sm font-medium mt-1">
          {new Date(user.created_at).toLocaleString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      {/* ID */}
      <div className="mb-4">
        <span className="text-sm text-gray-600">ID:</span>
        <p className="text-xs text-gray-700 font-mono mt-1">{user._id}</p>
      </div>

      {/* Botones de acción (solo si showActions es true) */}
      {showActions && (
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => onAccept(user._id)}
            className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition font-medium"
          >
            Aceptar
          </button>
          <button
            onClick={() => onReject(user._id)}
            className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-medium"
          >
            Rechazar
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDetails;
