// astro.config.mjs
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import auth from "auth-astro";

export default defineConfig({
  integrations: [
    tailwind(),
    react(),
    auth({
      configFile: "./src/auth/config.js", // Asegúrate de tener este archivo con la configuración de Auth
    }),
  ],
  adapter: { name: "node" }, // Asegura que el adaptador de Node.js esté configurado
});
