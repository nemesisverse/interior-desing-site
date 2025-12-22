import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
   // tailwind directives
import "./styles.css";  // your custom hamburger + hero CSS
import "./hero.css";
import "./KnowUs.css";
import "./Project1.css";
import { BrowserRouter } from 'react-router-dom'
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    
      <App />
    
  </React.StrictMode>
);
