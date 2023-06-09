import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import TitleBar from "./components/TitleBar";
import { RouterProvider } from "react-router-dom";
import Router from "@app/routes";
import { invoke } from "@tauri-apps/api/tauri";

try {
  // Idk how react works, but this should show a loading screen or something
  await invoke("init");
} catch (e) {
  // This should show an error alert popup
  console.error(e);
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <TitleBar />
    <RouterProvider router={Router} />
  </React.StrictMode>
);