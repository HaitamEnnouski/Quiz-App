import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QuizProvider } from "./context/QuizContext.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Provider MUST wrap everything that uses the context */}
    <QuizProvider>
      <App />
    </QuizProvider>
  </React.StrictMode>
);
