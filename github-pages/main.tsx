import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import Portfolio from "../app/components/Portfolio";
import "../app/globals.css";

hydrateRoot(
  document.getElementById("root")!,
  <StrictMode>
    <Portfolio />
  </StrictMode>,
);
