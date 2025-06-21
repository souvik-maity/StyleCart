import React, { useState, lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import HeroSection from "./components/HeroSection";
import "./App.css";

// Lazy load the Error page
const Error = lazy(() => import("./pages/Error"));

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-layout">
      {/* Hamburger icon */}
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
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Routes */}
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/404" element={<Error />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;