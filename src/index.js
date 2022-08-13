import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import App from "./pages/Home/App";
import Form from "./pages/TipForm/Form";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="Form" element={<Form />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
