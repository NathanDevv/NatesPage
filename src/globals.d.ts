declare global {
  interface Window {
    gapi: typeof gapi; // Usar el tipo de gapi directamente
    google: typeof google; // Asegúrate de que la API de Google Maps esté disponible
  }
}

export {};
