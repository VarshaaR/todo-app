import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/todo-app/",
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // This condition splits node_modules into individual chunks for each package
          if (id.includes('node_modules')) {
            return id.split('node_modules/')[1].split('/')[0]; // Creates a chunk for each package in node_modules
          }
        }
      }
    }
  }
});
