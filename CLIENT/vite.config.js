import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://restcountries.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // Rewrite to remove the /api prefix
        secure: true, // Ensure secure connection is established
      },
    },
  },
});
