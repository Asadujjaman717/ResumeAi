import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";

export default defineConfig({
  plugins: [react()],
  server: {
    https: false, // keep false if you want HTTP frontend
    proxy: {
      "/api": {
        target: "https://localhost:44357",
        changeOrigin: true,
        secure: false // allow self-signed certificate
      }
    }
  }
});
