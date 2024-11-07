import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import './index.css'
// import App from './App.jsx'
import HeadTitle from "./components/homePage";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HeadTitle />
    {/* <App /> */}
  </StrictMode>
);
