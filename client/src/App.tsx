import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import HeroSection from "./components/HeroSection";
import "./App.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

import Dashboard from "./pages/Dashboard";
import Wishlist from "./pages/Wishlist";
import EditProfile from "./pages/EditProfile";
import Orders from "./pages/Orders";
import Notifications from "./pages/Notifications";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import CategoryPage from "./pages/CategoryPage";
import SearchResults from "./pages/SearchResults";
import OffersPage from "./pages/OffersPage";

import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ThankYou from "./pages/ThankYou";

import AdminDashboard from "./pages/admin/AdminDashboard";
import ProductManagement from "./pages/admin/ProductManagement";
import OrderManagement from "./pages/admin/OrderManagement";
import UserManagement from "./pages/admin/UserManagement";
import Reports from "./pages/admin/Reports";

import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";

import type { AppRoute } from "../types/route";

const routeMap: AppRoute[] = [
  { path: "/login", component: Login, allowedRoles: [] },
  { path: "/register", component: Register, allowedRoles: [] },
  { path: "/forgot-password", component: ForgotPassword, allowedRoles: [] },

  { path: "/dashboard", component: Dashboard, allowedRoles: ["user", "admin"] },
  { path: "/wishlist", component: Wishlist, allowedRoles: ["user", "admin"] },
  { path: "/profile/edit", component: EditProfile, allowedRoles: ["user", "admin"] },
  { path: "/orders", component: Orders, allowedRoles: ["user", "admin"] },
  { path: "/notifications", component: Notifications, allowedRoles: ["user", "admin"] },

  { path: "/", component: Home, allowedRoles: [] },
  { path: "/products", component: Products, allowedRoles: [] },
  { path: "/product/:id", component: ProductDetail, allowedRoles: [] },
  { path: "/categories/:category", component: CategoryPage, allowedRoles: [] },
  { path: "/search/:query", component: SearchResults, allowedRoles: [] },
  { path: "/offers", component: OffersPage, allowedRoles: [] },

  { path: "/cart", component: Cart, allowedRoles: ["user", "admin"] },
  { path: "/checkout", component: Checkout, allowedRoles: ["user", "admin"] },
  { path: "/thank-you", component: ThankYou, allowedRoles: ["user", "admin"] },

  { path: "/admin", component: AdminDashboard, allowedRoles: ["admin"] },
  { path: "/admin/products", component: ProductManagement, allowedRoles: ["admin"] },
  { path: "/admin/orders", component: OrderManagement, allowedRoles: ["admin"] },
  { path: "/admin/users", component: UserManagement, allowedRoles: ["admin"] },
  { path: "/admin/reports", component: Reports, allowedRoles: ["admin"] },

  { path: "/terms", component: Terms, allowedRoles: [] },
  { path: "/privacy", component: Privacy, allowedRoles: [] },
  { path: "/about", component: About, allowedRoles: [] },
  { path: "/contact", component: Contact, allowedRoles: [] },
  { path: "/faq", component: FAQ, allowedRoles: [] },

  { path: "*", component: NotFound, allowedRoles: [] },
];

function App() {
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