import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// GitHub Pages fallback: restore the original route after 404.html redirects here.
const redirectPath = new URLSearchParams(window.location.search).get("p");
if (redirectPath) {
  window.history.replaceState(null, "", decodeURIComponent(redirectPath));
}

createRoot(document.getElementById("root")!).render(<App />);
