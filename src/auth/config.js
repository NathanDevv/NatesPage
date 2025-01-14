// src/auth/config.js
export default {
  providers: [
    {
      name: "GitHub",
      clientId: "YOUR_GITHUB_CLIENT_ID",
      clientSecret: "YOUR_GITHUB_CLIENT_SECRET",
    },
    {
      name: "Google",
      clientId: "YOUR_GOOGLE_CLIENT_ID",
      clientSecret: "YOUR_GOOGLE_CLIENT_SECRET",
    },
    // Otros proveedores que quieras usar
  ],
  session: {
    strategy: "jwt", // Puedes usar JWT para manejar las sesiones
  },
  // Opciones adicionales de configuración si es necesario
};
