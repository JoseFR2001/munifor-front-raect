import { useState } from "react";

const ImageUploader = ({ onFilesChange, maxFiles = 5, maxSizeMB = 15 }) => {
  const [previews, setPreviews] = useState([]);
  const [errors, setErrors] = useState([]);

  const allowedFormats = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
  ];
  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = [];
    const newErrors = [];

    // Validar cantidad
    if (files.length > maxFiles) {
      newErrors.push(`Máximo ${maxFiles} imágenes permitidas`);
      setErrors(newErrors);
      return;
    }

    // Validar cada archivo
    files.forEach((file, index) => {
      // Validar formato
      if (!allowedFormats.includes(file.type)) {
        newErrors.push(
          `${file.name}: formato no permitido (solo jpg, png, gif, webp)`
        );
        return;
      }

      // Validar tamaño
      if (file.size > maxSizeBytes) {
        newErrors.push(
          `${file.name}: tamaño excede ${maxSizeMB}MB (${(
            file.size /
            1024 /
            1024
          ).toFixed(2)}MB)`
        );
        return;
      }

      validFiles.push(file);
    });

    setErrors(newErrors);

    if (validFiles.length > 0) {
      // Crear previews
      const newPreviews = validFiles.map((file) => ({
        file,
        url: URL.createObjectURL(file),
        name: file.name,
      }));

      setPreviews(newPreviews);
      onFilesChange(validFiles);
    }
  };

  const handleRemoveImage = (index) => {
    const newPreviews = previews.filter((_, i) => i !== index);
    setPreviews(newPreviews);

    const newFiles = newPreviews.map((p) => p.file);
    onFilesChange(newFiles);

    // Limpiar URL para liberar memoria
    URL.revokeObjectURL(previews[index].url);
  };

  const handleClearAll = () => {
    previews.forEach((p) => URL.revokeObjectURL(p.url));
    setPreviews([]);
    setErrors([]);
    onFilesChange([]);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Imágenes (opcional - máx. {maxFiles})
        </label>

        <input
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
          multiple
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
            cursor-pointer"
        />

        <p className="mt-1 text-xs text-gray-500">
          Formatos: JPG, PNG, GIF, WEBP. Máximo {maxSizeMB}MB por imagen.
        </p>
      </div>

      {/* Errores */}
      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-sm font-semibold text-red-800 mb-1">Errores:</p>
          <ul className="list-disc list-inside space-y-1">
            {errors.map((error, index) => (
              <li key={index} className="text-sm text-red-700">
                {error}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Previews */}
      {previews.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-700">
              Imágenes seleccionadas ({previews.length})
            </p>
            <button
              type="button"
              onClick={handleClearAll}
              className="text-xs text-red-600 hover:text-red-800 font-medium"
            >
              Eliminar todas
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {previews.map((preview, index) => (
              <div key={index} className="relative group">
                <img
                  src={preview.url}
                  alt={preview.name}
                  className="w-full h-24 object-cover rounded-md border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center
                    opacity-0 group-hover:opacity-100 transition-opacity duration-200
                    hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  aria-label="Eliminar imagen"
                >
                  ×
                </button>
                <p
                  className="text-xs text-gray-600 mt-1 truncate"
                  title={preview.name}
                >
                  {preview.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
