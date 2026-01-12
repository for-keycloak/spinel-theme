import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import KcPage from "./login/KcPage";
import type { KcContext } from "./login/KcContext";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {!window.kcContext ? (
      <h1>No Keycloak Context</h1>
    ) : (
      <KcPage kcContext={window.kcContext} />
    )}
  </StrictMode>
);

declare global {
  interface Window {
    kcContext?: KcContext;
  }
}
