import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";

// GitHub Pages serves this project from /turk-innovation/.
// Keep local development at the root while using the repository base in production.
export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/turk-innovation/" : "/",
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
