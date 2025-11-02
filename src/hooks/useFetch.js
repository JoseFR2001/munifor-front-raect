const useFetch = () => {
  // GET con token y soporte para AbortController
  const getFetchData = async (url) => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.replace("/login");
      return;
    }
    try {
      const response = await fetch(url, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Error de red o respuesta no válida");
      }
      const data = await response.json();
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
      const response = await fetch(`${url}/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Error de red o respuesta no válida");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      throw error;
    }
  };

  // POST JSON
  const postFetch = async (url, payload) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Error de red o respuesta no válida");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al enviar datos:", error);
      throw error;
    }
  };

  // POST JSON con token
  const postFetchDataLocalStorage = async (url, payload) => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.replace("/login");
      return;
    }
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Error de red o respuesta no válida");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al enviar datos:", error);
      throw error;
    }
  };

  // PUT JSON con token
  const putFetch = async (url, payload) => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.replace("/login");
      return;
    }
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Error de red o respuesta no válida");
      }
      const data = await response.json();
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
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Error de red o respuesta no válida");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al modificar datos:", error);
      throw error;
    }
  };

  // DELETE con token
  const deleteFetch = async (url) => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.replace("/login");
      return;
    }
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Error de red o respuesta no válida");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al eliminar datos:", error);
      throw error;
    }
  };

  return {
    getFetchData,
    postFetch,
    postFetchDataLocalStorage,
    putFetch,
    patchFetch,
    deleteFetch,
    getByIdFetch,
  };
};

export default useFetch;
