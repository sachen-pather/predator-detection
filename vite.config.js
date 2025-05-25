// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Default Vite port
    open: true,
    proxy: {
      // Proxy configuration for Dropbox API
      "/dropbox": {
        target: "https://api.dropboxapi.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dropbox/, ""),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      },
      "/content": {
        target: "https://content.dropboxapi.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/content/, ""),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      },
    },
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          leaflet: ["leaflet", "react-leaflet"],
          dropbox: ["dropbox"],
        },
      },
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom", "leaflet", "react-leaflet", "dropbox"],
  },
});
