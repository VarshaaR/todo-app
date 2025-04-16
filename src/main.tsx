import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App";

createRoot(document.getElementById("todo-list-container")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
