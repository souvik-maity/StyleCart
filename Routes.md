# 🧭 Application Routes - StyleCart

This document outlines the **categorized route structure** for the StyleCart application. It is designed to help contributors understand the flow of pages and assist in implementing React Router effectively.

---

## 👤 User Routes

| Route              | Page            | Description                          | Auth Required |
| ------------------ | --------------- | ------------------------------------ | ------------- |
| `/login`           | Login           | User login page                      | ❌             |
| `/register`        | Register        | New user registration                | ❌             |
| `/forgot-password` | Forgot Password | Reset credentials via email          | ❌             |
| `/dashboard`       | User Dashboard  | Shows user info, orders, and profile | ✅             |
| `/wishlist`        | Wishlist        | User's saved/favorite items          | ✅             |
| `/profile/edit`    | Edit Profile    | Update user info and password        | ✅             |
| `/orders`          | Order History   | View past orders                     | ✅             |
| `/notifications`   | Notifications   | Alerts and messages for the user     | ✅             |

---

## 🛍️ Product Routes

| Route                   | Page            | Description                                | Dynamic | Auth Required |
| ----------------------- | --------------- | ------------------------------------------ | ------- | ------------- |
| `/`                     | Home            | Main landing page with featured products   | ❌       | ❌             |
| `/products`             | Product Listing | All products with category & price filters | ❌       | ❌             |
| `/product/:id`          | Product Detail  | View details of a single product           | ✅       | ❌             |
| `/categories/:category` | Category Page   | List products in a specific category       | ✅       | ❌             |
| `/search/:query`        | Search Results  | Search results based on keywords           | ✅       | ❌             |
| `/offers`               | Offers Page     | Special deals and discounts                | ❌       | ❌             |

---

## 🛒 Cart & Checkout Routes

| Route        | Page          | Description                                | Auth Required  |
| ------------ | ------------- | ------------------------------------------ | -------------- |
| `/cart`      | Cart          | Shows user's selected items                | ✅ or Temp Cart |
| `/checkout`  | Checkout      | Enter address, choose shipping and payment | ✅              |
| `/thank-you` | Order Confirm | Post-order confirmation screen             | ✅              |

---

## ⚙️ Admin Routes (Protected)

| Route             | Page               | Description                           | Role  |
| ----------------- | ------------------ | ------------------------------------- | ----- |
| `/admin`          | Admin Dashboard    | Overview of metrics and management    | Admin |
| `/admin/products` | Product Management | CRUD operations for products          | Admin |
| `/admin/orders`   | Order Management   | Manage user orders                    | Admin |
| `/admin/users`    | User Management    | View and update user info             | Admin |
| `/admin/reports`  | Sales Reports      | Revenue, traffic, inventory analytics | Admin |

---

## 📦 Utility/Support Pages

| Route      | Page             | Description                        | Auth Required |
| ---------- | ---------------- | ---------------------------------- | ------------- |
| `/terms`   | Terms of Service | Legal policies                     | ❌             |
| `/privacy` | Privacy Policy   | Data and user privacy policy       | ❌             |
| `/about`   | About Us         | About the brand                    | ❌             |
| `/contact` | Contact Us       | User inquiries and support         | ❌             |
| `/faq`     | FAQ              | Frequently asked questions         | ❌             |
| `*`        | 404 Not Found    | Route fallback for undefined paths | ❌             |

---

## 📌 Notes

* ✅: Authentication required
* ❌: Public route
* `:param`: Dynamic route parameter
* These routes can be protected using `<PrivateRoute />` wrappers or role-based guards.

---

This document is **evolving**. Contributors are encouraged to update this file when new pages are added.

Let’s build a scalable and organized app together! 🚀
