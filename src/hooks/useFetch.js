const useFetch = () => {
  const hostPort = "http://localhost:3000/api";
  // GET con token y soporte para AbortController
  const getFetchData = async (url) => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.replace("/login");
      return;
    }
    try {
      const response = await fetch(`${hostPort}${url}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.msg || "Error de red o respuesta no válida");
      }
      return data;
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      throw error;
    }
  };

  const getByIdFetch = async (url, id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.replace("/login");
      return;
    }
    try {
      const response = await fetch(`${hostPort}${url}/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.msg || "Error de red o respuesta no válida");
      }
      return data;
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      throw error;
    }
  };

  // POST JSON
  const postFetch = async (url, payload) => {
    try {
      const response = await fetch(`${hostPort}${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data?.msg || "Error de red o respuesta no válida");
      }
      return data;
    } catch (error) {
      console.error("Error al enviar datos:", error);
      throw error;
    }
  };

  // POST JSON con token
  const postFetchLocalStorage = async (url, payload) => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.replace("/login");
      return;
    }
    try {
      const response = await fetch(`${hostPort}${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.msg || "Error de red o respuesta no válida");
      }
      return data;
    } catch (error) {
      console.error("Error al enviar datos:", error);
      throw error;
    }
  };

  // PUT JSON con token
  const putFetch = async (url, id, payload) => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.replace("/login");
      return;
    }
    try {
      const response = await fetch(`${hostPort}${url}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.msg || "Error de red o respuesta no válida");
      }
      return data;
    } catch (error) {
      console.error("Error al actualizar datos:", error);
      throw error;
    }
  };

  const putFetchProfile = async (url, payload) => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.replace("/login");
      return;
    }
    try {
      const response = await fetch(`${hostPort}${url}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.msg || "Error de red o respuesta no válida");
      }
      return data;
    } catch (error) {
      console.error("Error al actualizar datos:", error);
      throw error;
    }
  };

  // PATCH JSON con token
  const patchFetch = async (url, payload) => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.replace("/login");
      return;
    }
    try {
      const response = await fetch(`${hostPort}${url}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data?.msg || data?.message || "Error de red o respuesta no válida"
        );
      }
      return data;
    } catch (error) {
      console.error("Error al modificar datos:", error);
      throw error;
    }
  };

  // DELETE con token
  const deleteFetch = async (url, id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.replace("/login");
      return;
    }
    try {
      const response = await fetch(`${hostPort}${url}/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.msg || "Error de red o respuesta no válida");
      }
      return data;
    } catch (error) {
      console.error("Error al eliminar datos:", error);
      throw error;
    }
  };

  return {
    getFetchData,
    postFetch,
    postFetchLocalStorage,
    putFetch,
    putFetchProfile,
    patchFetch,
    deleteFetch,
    getByIdFetch,
  };
};

export default useFetch;
