import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import macrosPlugin from "vite-plugin-babel-macros";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), macrosPlugin()],

  server: {
    port: 3000,
  },
  build: {
    outDir: "build",
    sourcemap: true,
  },
});
