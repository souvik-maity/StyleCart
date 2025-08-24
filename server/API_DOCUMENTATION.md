# StyleCart API Documentation

## Base URL
```
http://localhost:5000
```

## API Endpoints Overview

### 🔧 System Endpoints
- `GET /` - Server status
- `GET /health` - Health check

### 👤 User Routes (`/api/users`)
- `POST /api/users/login` - User login
- `POST /api/users/register` - User registration  
- `POST /api/users/forgot-password` - Password reset
- `GET /api/users/dashboard` - User dashboard (Auth Required)
- `GET /api/users/wishlist` - Get wishlist (Auth Required)
- `POST /api/users/wishlist` - Add to wishlist (Auth Required)
- `DELETE /api/users/wishlist/:id` - Remove from wishlist (Auth Required)
- `GET /api/users/profile` - Get profile (Auth Required)
- `PUT /api/users/profile` - Update profile (Auth Required)
- `GET /api/users/orders` - Order history (Auth Required)
- `GET /api/users/notifications` - Get notifications (Auth Required)
- `PUT /api/users/notifications/:id/read` - Mark notification as read (Auth Required)

### 🛍️ Product Routes (`/api/products`)
- `GET /api/products` - Get all products with filters
- `GET /api/products/:id` - Get single product
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/search/:query` - Search products
- `GET /api/products/offers` - Get special offers
- `GET /api/products/categories` - Get all categories
- `GET /api/products/featured` - Get featured products

### 🛒 Cart & Checkout Routes (`/api/cart`)
- `GET /api/cart` - Get cart (supports temp cart)
- `POST /api/cart/items` - Add item to cart
- `PUT /api/cart/items/:itemId` - Update cart item
- `DELETE /api/cart/items/:itemId` - Remove cart item
- `DELETE /api/cart` - Clear cart
- `POST /api/cart/merge` - Merge temp cart with user cart (Auth Required)
- `POST /api/cart/initiate` - Start checkout (Auth Required)
- `POST /api/cart/shipping` - Set shipping info (Auth Required)
- `POST /api/cart/payment` - Process payment (Auth Required)
- `POST /api/cart/complete` - Complete order (Auth Required)
- `GET /api/cart/thank-you/:orderId` - Order confirmation (Auth Required)

### ⚙️ Admin Routes (`/api/admin`) - All require Admin Auth
- `GET /api/admin` - Admin dashboard
- `GET /api/admin/products` - Manage products
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product
- `GET /api/admin/orders` - Manage orders
- `GET /api/admin/orders/:id` - Get order details
- `PUT /api/admin/orders/:id/status` - Update order status
- `GET /api/admin/users` - Manage users
- `PUT /api/admin/users/:id` - Update user
- `GET /api/admin/reports` - Sales reports
- `GET /api/admin/reports/export` - Export reports

### 📦 Support Routes (`/api/support`)
- `GET /api/support/terms` - Terms of Service
- `GET /api/support/privacy` - Privacy Policy
- `GET /api/support/about` - About Us
- `GET /api/support/contact` - Contact info
- `POST /api/support/contact` - Submit contact form
- `GET /api/support/faq` - FAQ
- `POST /api/support/faq/:id/helpful` - Rate FAQ
- `GET /api/support/status` - System status

## Authentication

### Mock Authentication Token
For testing protected routes, use this mock token in the Authorization header:
```
Authorization: Bearer valid-token
```

### Admin Authentication
For admin routes, the mock auth middleware checks for the token `valid-token` and assigns admin role.

## Sample Request Bodies

### User Login
```json
{
    "message": "Login successful",
    "token": "mock-jwt-token-1",
    "user": {
        "id": "1",
        "email": "test@gmail.com",
        "name": "John Doe"
    }
}
```

### User Registration
```json
{
    "message": "User registered successfully",
    "user": {
        "id": "2",
        "name": "Yash Saini",
        "email": "yashsaini@gmail.com"
    }
}
```

### Forget Password
```json
{
    "message": "Password reset email sent successfully",
    "email": "test@gmail.com",
    "resetToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwicHVycG9zZSI6InBhc3N3b3JkLXJlc2V0IiwiaWF0IjoxNzUwNjk2OTA0LCJleHAiOjE3NTA2OTc4MDR9.kMI9cR2AbW2HgWIuPXKzzpE3j_84eeWEDi4waSi6nRk"
}
```

```json
{
    "message": "Password reset email sent successfully",
    "email": "test@gmail.com",
    "resetToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwicHVycG9zZSI6InBhc3N3b3JkLXJlc2V0IiwiaWF0IjoxNzUwNjk3MDQwLCJleHAiOjE3NTA2OTc5NDB9.ogh6Rte_Dez8Yw-VQqo7vROitr-j0Zj5BHpjr_ggJwk"
}
```

### User Dashboard
```json
{
    "message": "Dashboard data",
    "user": {
        "id": "1750699938086",
        "email": "yashsaini@gmail.com",
        "iat": 1750699938,
        "exp": 1750786338
    },
    "stats": {
        "totalOrders": 12,
        "wishlistItems": 5,
        "recentActivity": "Last login: 2 hours ago"
    }
}
```

### User Wishlist
```json
{
    "message": "Wishlist retrieved",
    "wishlist": [
        {
            "id": "1",
            "productName": "Wireless Headphones",
            "price": 99.99
        },
        {
            "id": "2",
            "productName": "Smart Watch",
            "price": 199.99
        }
    ]
}
```

### Mark Notification as Read
```json
{
    "message": "Notification marked as read",
    "notificationId": "NOT001"
}
```

## Error Codes
- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error
