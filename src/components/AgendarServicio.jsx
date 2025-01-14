import React, { useState, useEffect, useRef } from "react";
import { authenticate, loadClient, createEvent } from "../utils/googleCalendar";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const AgendarServicio = () => {
  const [formData, setFormData] = useState({
    title: "Servicio exterior",
    description: "",
    date: "",
    time: "",
    address: "",
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMapsLoaded, setIsMapsLoaded] = useState(false);
  const autocompleteRef = useRef(null);
  const [markerPosition, setMarkerPosition] = useState({
    lat: 31.8664,
    lng: -116.5969,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.address) {
      alert("Por favor selecciona una dirección válida en el mapa.");
      return;
    }

    const event = {
      summary: formData.title,
      description: formData.description,
      location: formData.address,
      start: {
        dateTime: `${formData.date}T${formData.time}:00`,
        timeZone: "America/Tijuana",
      },
      end: {
        dateTime: `${formData.date}T${formData.time}:00`,
        timeZone: "America/Tijuana",
      },
    };

    try {
      if (!isAuthenticated) {
        await authenticate();
        setIsAuthenticated(true);
      }

      await loadClient();
      const response = await createEvent(event);
      if (response.status === "confirmed") {
        alert("Evento creado exitosamente en Google Calendar");
      } else {
        alert("Hubo un problema al crear el evento");
      }
    } catch (error) {
      console.error("Error al crear el evento:", error);
      alert("Ocurrió un error al agendar el servicio");
    }
  };

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (window.google && window.google.maps) {
        setIsMapsLoaded(true);
      } else {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${
          import.meta.env.VITE_GOOGLE_API_KEY_MAPS
        }&libraries=places`;
        script.async = true;
        script.onload = () => setIsMapsLoaded(true);
        script.onerror = () => console.error("Error al cargar Google Maps");
        document.head.appendChild(script);
      }
    };

    loadGoogleMapsScript();
  }, []);

  const handleMapClick = (e) => {
    const { latLng } = e;
    const lat = latLng.lat();
    const lng = latLng.lng();
    setMarkerPosition({ lat, lng });

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results[0]) {
        setFormData({
          ...formData,
          address: results[0].formatted_address,
        });
      }
    });
  };

  const center = { lat: 31.8664, lng: -116.5969 };

  return (
    <div
      id="agenda"
      className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg"
    >
      <h2 className="mb-4 text-xl font-semibold">Agendar un Servicio</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        >
          <option value="Servicio exterior">Servicio Exterior</option>
          <option value="Servicio interior">Servicio Interior</option>
          <option value="Servicio completo">Servicio Completo</option>
        </select>
        <textarea
          name="description"
          placeholder="Descripción del servicio"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <div className="w-full">
          {isMapsLoaded ? (
            <LoadScript
              googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY_MAPS}
            >
              <GoogleMap
                mapContainerStyle={{ height: "400px", width: "100%" }}
                center={center}
                zoom={13}
                onClick={handleMapClick}
              >
                <Marker position={markerPosition} />
              </GoogleMap>
            </LoadScript>
          ) : (
            <div>Cargando mapa...</div>
          )}
        </div>
        <input
          type="text"
          value={formData.address}
          disabled
          placeholder="Dirección seleccionada"
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="w-full p-3 text-white bg-blue-500 rounded-md"
        >
          Agendar
        </button>
      </form>
    </div>
  );
};

export default AgendarServicio;
