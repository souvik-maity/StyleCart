import { ROUTES } from "./common/constants";
import About from "./pages/About";
import AdminDashboard from "./pages/admin/AdminDashboard";
import OrderManagement from "./pages/admin/OrderManagement";
import ProductManagement from "./pages/admin/ProductManagement";
import Reports from "./pages/admin/Reports";
import UserManagement from "./pages/admin/UserManagement";
import Cart from "./pages/Cart";
import CategoryPage from "./pages/CategoryPage";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import EditProfile from "./pages/EditProfile";
import FAQ from "./pages/FAQ";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Notifications from "./pages/Notifications";
import OffersPage from "./pages/OffersPage";
import Orders from "./pages/Orders";
import Privacy from "./pages/Privacy";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import Register from "./pages/Register";
import SearchResults from "./pages/SearchResults";
import Terms from "./pages/Terms";
import ThankYou from "./pages/ThankYou";
import Wishlist from "./pages/Wishlist";
import { AppRoute } from "./types/route";

export const routeMap: AppRoute[] = [
  { path: ROUTES.LOGIN, component: Login, allowedRoles: [] },
  { path: ROUTES.REGISTER, component: Register, allowedRoles: [] },
  { path: ROUTES.FORGOT_PASSWORD, component: ForgotPassword, allowedRoles: [] },

  {
    path: ROUTES.DASHBOARD,
    component: Dashboard,
    allowedRoles: ["user", "admin"],
  },
  {
    path: ROUTES.WISHLIST,
    component: Wishlist,
    allowedRoles: ["user", "admin"],
  },
  {
    path: ROUTES.EDIT_PROFILE,
    component: EditProfile,
    allowedRoles: ["user", "admin"],
  },
  { path: ROUTES.ORDERS, component: Orders, allowedRoles: ["user", "admin"] },
  {
    path: ROUTES.NOTIFICATIONS,
    component: Notifications,
    allowedRoles: ["user", "admin"],
  },

  { path: ROUTES.HOME, component: Home, allowedRoles: [] },
  { path: ROUTES.PRODUCTS, component: Products, allowedRoles: [] },
  { path: ROUTES.PRODUCT_DETAILS, component: ProductDetail, allowedRoles: [] },
  { path: ROUTES.CATEGORY, component: CategoryPage, allowedRoles: [] },
  { path: ROUTES.SEARCH, component: SearchResults, allowedRoles: [] },
  { path: ROUTES.OFFERS, component: OffersPage, allowedRoles: [] },

  { path: ROUTES.CART, component: Cart, allowedRoles: ["user", "admin"] },
  {
    path: ROUTES.CHECKOUT,
    component: Checkout,
    allowedRoles: ["user", "admin"],
  },
  {
    path: ROUTES.THANK_YOU,
    component: ThankYou,
    allowedRoles: ["user", "admin"],
  },

  {
    path: ROUTES.ADMIN_DASHBOARD,
    component: AdminDashboard,
    allowedRoles: ["admin"],
  },
  {
    path: ROUTES.ADMIN_PRODUCTS,
    component: ProductManagement,
    allowedRoles: ["admin"],
  },
  {
    path: ROUTES.ADMIN_ORDERS,
    component: OrderManagement,
    allowedRoles: ["admin"],
  },
  {
    path: ROUTES.ADMIN_USERS,
    component: UserManagement,
    allowedRoles: ["admin"],
  },
  { path: ROUTES.ADMIN_REPORTS, component: Reports, allowedRoles: ["admin"] },

  { path: ROUTES.TERMS, component: Terms, allowedRoles: [] },
  { path: ROUTES.PRIVACY, component: Privacy, allowedRoles: [] },
  { path: ROUTES.ABOUT, component: About, allowedRoles: [] },
  { path: ROUTES.CONTACT, component: Contact, allowedRoles: [] },
  { path: ROUTES.FAQ, component: FAQ, allowedRoles: [] },

  { path: ROUTES.NOT_FOUND, component: NotFound, allowedRoles: [] },
];
