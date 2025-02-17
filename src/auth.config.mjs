import { defineConfig } from "auth-astro";
import Google from "@auth/core/providers/google";

// src/auth/config.js
export default defineConfig({
  providers: [
    Google({
      clientId: import.meta.env.GOOGLE_CLIENT_ID,
      clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
});
