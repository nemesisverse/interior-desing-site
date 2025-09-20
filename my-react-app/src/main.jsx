import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";   // tailwind directives
import "./styles.css";  // your custom hamburger + hero CSS

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
