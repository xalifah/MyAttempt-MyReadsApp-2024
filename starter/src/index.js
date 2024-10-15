import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/index.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* BrowserRouter provides routing functionality */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root") // Mount the app to the DOM element with id "root"
);
