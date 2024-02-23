// src/index.js
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App"; // Adjust the import path as necessary
import "../sass/style.scss";

const container = document.getElementById("react-app"); // Make sure this matches your HTML
const root = createRoot(container);
root.render(<App />);

