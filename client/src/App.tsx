import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import "./App.css";
import { routeMap } from "./routes";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="app-layout">
        {!sidebarOpen && (
          <button
            className="hamburger"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open Sidebar"
          >
            <span />
            <span />
            <span />
          </button>
        )}

        {sidebarOpen && (
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        )}

        <Routes>
          {routeMap.map(({ path, component: Component }, index) => (
            <Route key={index} path={path} element={<Component />} />
          ))}
        </Routes>
      </div>
    </BrowserRouter>
  );
}
