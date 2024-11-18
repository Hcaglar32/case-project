import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Tailwind CSS veya global CSS dosyası

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
