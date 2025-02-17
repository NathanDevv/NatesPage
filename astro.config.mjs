// astro.config.mjs
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import auth from "auth-astro";

import vercel from "@astrojs/vercel";

export default defineConfig({
  integrations: [
    tailwind(),
    react(),
    auth({
      configFile: "./src/auth.config.mjs", // Asegúrate de tener este archivo con la configuración de Auth
    }),
  ],
  adapter: vercel(), // Asegura que el adaptador de Node.js esté configurado
});
