// src/utils/googleCalendar.js

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

// Cargar dinámicamente la Google API si no está presente
export async function loadGoogleAPI() {
  return new Promise((resolve, reject) => {
    if (!window.gapi) {
      const script = document.createElement("script");
      script.src = "https://apis.google.com/js/api.js";
      script.onload = resolve;
      script.onerror = () => reject(new Error("Error al cargar Google API."));
      document.body.appendChild(script);
    } else {
      resolve();
    }
  });
}

// Inicializar GAPI
export async function initializeGAPI() {
  return new Promise((resolve, reject) => {
    if (window.gapi) {
      gapi.load("client:auth2", async () => {
        try {
          await gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            scope: SCOPES,
          });
          resolve();
        } catch (error) {
          reject(
            new Error("Error al inicializar Google API: " + error.message)
          );
        }
      });
    } else {
      reject(new Error("Google API no se ha cargado correctamente."));
    }
  });
}

// Autenticar al usuario
export async function authenticate() {
  try {
    const authInstance = gapi.auth2.getAuthInstance();
    if (authInstance) {
      await authInstance.signIn();
    } else {
      throw new Error("Google Auth no está disponible.");
    }
  } catch (error) {
    throw new Error("Error de autenticación: " + error.message);
  }
}

// Cargar el cliente de Google Calendar
export async function loadClient() {
  try {
    await gapi.client.load(
      "https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest"
    );
  } catch (error) {
    throw new Error(
      "Error al cargar el cliente de Google Calendar: " + error.message
    );
  }
}

// Crear un evento en el calendario
export async function createEvent(event) {
  try {
    const response = await gapi.client.calendar.events.insert({
      calendarId: "primary",
      resource: event,
    });
    return response.result;
  } catch (error) {
    throw new Error("Error al crear el evento: " + error.message);
  }
}

// Función para inicializar todo el flujo
export async function initializeCalendarAPI() {
  try {
    await loadGoogleAPI(); // Cargar la Google API dinámicamente
    await initializeGAPI(); // Inicializar la API
    await authenticate(); // Autenticar al usuario
    await loadClient(); // Cargar el cliente de Google Calendar
  } catch (error) {
    throw new Error(
      "Error durante la inicialización de Calendar API: " + error.message
    );
  }
}
