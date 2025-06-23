import express, { Request, Response } from 'express';
import { HTTPStatusCodes } from '../constants/constants';
import { authenticate, AuthenticatedRequest } from '../middleware/auth';

const router = express.Router();

// 👤 User Authentication Routes

// POST /api/users/login - User login
router.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  
  // Mock login logic (implement proper authentication)
  if (email && password) {
    res.status(HTTPStatusCodes.OK).json({
      message: 'Login successful',
      token: 'mock-jwt-token',
      user: {
        id: '1',
        email: email,
        name: 'John Doe'
      }
    });
  } else {
    res.status(HTTPStatusCodes.BAD_REQUEST).json({
      error: 'Invalid credentials',
      message: 'Email and password are required'
    });
  }
});

// POST /api/users/register - User registration
router.post('/register', (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  
  // Mock registration logic
  if (name && email && password) {
    res.status(HTTPStatusCodes.CREATED).json({
      message: 'User registered successfully',
      user: {
        id: '2',
        name: name,
        email: email
      }
    });
  } else {
    res.status(HTTPStatusCodes.BAD_REQUEST).json({
      error: 'Validation failed',
      message: 'Name, email, and password are required'
    });
  }
});

// POST /api/users/forgot-password - Reset password via email
router.post('/forgot-password', (req: Request, res: Response) => {
  const { email } = req.body;
  
  if (email) {
    res.status(HTTPStatusCodes.OK).json({
      message: 'Password reset email sent',
      email: email
    });
  } else {
    res.status(HTTPStatusCodes.BAD_REQUEST).json({
      error: 'Email required',
      message: 'Please provide your email address'
    });
  }
});

// 👤 Protected User Routes (require authentication)

// GET /api/users/dashboard - User dashboard
router.get('/dashboard', authenticate, (req: AuthenticatedRequest, res: Response) => {
  res.status(HTTPStatusCodes.OK).json({
    message: 'Dashboard data',
    user: req.user,
    stats: {
      totalOrders: 12,
      wishlistItems: 5,
      recentActivity: 'Last login: 2 hours ago'
    }
  });
});

// GET /api/users/wishlist - User's wishlist
router.get('/wishlist', authenticate, (req: AuthenticatedRequest, res: Response) => {
  res.status(HTTPStatusCodes.OK).json({
    message: 'Wishlist retrieved',
    wishlist: [
      { id: '1', productName: 'Wireless Headphones', price: 99.99 },
      { id: '2', productName: 'Smart Watch', price: 199.99 }
    ]
  });
});

// POST /api/users/wishlist - Add item to wishlist
router.post('/wishlist', authenticate, (req: AuthenticatedRequest, res: Response) => {
  const { productId } = req.body;
  
  if (productId) {
    res.status(HTTPStatusCodes.CREATED).json({
      message: 'Item added to wishlist',
      productId: productId
    });
  } else {
    res.status(HTTPStatusCodes.BAD_REQUEST).json({
      error: 'Product ID required',
      message: 'Please provide a valid product ID'
    });
  }
});

// DELETE /api/users/wishlist/:id - Remove item from wishlist
router.delete('/wishlist/:id', authenticate, (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  
  res.status(HTTPStatusCodes.OK).json({
    message: 'Item removed from wishlist',
    removedItemId: id
  });
});

// GET /api/users/profile - Get user profile
router.get('/profile', authenticate, (req: AuthenticatedRequest, res: Response) => {
  res.status(HTTPStatusCodes.OK).json({
    message: 'Profile retrieved',
    profile: {
      ...req.user,
      phone: '+1234567890',
      address: '123 Main St, City, State',
      dateJoined: '2024-01-15'
    }
  });
});

// PUT /api/users/profile - Update user profile
router.put('/profile', authenticate, (req: AuthenticatedRequest, res: Response) => {
  const { name, phone, address } = req.body;
  
  res.status(HTTPStatusCodes.OK).json({
    message: 'Profile updated successfully',
    updatedFields: { name, phone, address }
  });
});

// GET /api/users/orders - Order history
router.get('/orders', authenticate, (req: AuthenticatedRequest, res: Response) => {
  res.status(HTTPStatusCodes.OK).json({
    message: 'Order history retrieved',
    orders: [
      {
        id: 'ORD001',
        date: '2024-01-20',
        total: 299.99,
        status: 'Delivered',
        items: 3
      },
      {
        id: 'ORD002',
        date: '2024-01-15',
        total: 149.99,
        status: 'Shipped',
        items: 2
      }
    ]
  });
});

// GET /api/users/notifications - User notifications
router.get('/notifications', authenticate, (req: AuthenticatedRequest, res: Response) => {
  res.status(HTTPStatusCodes.OK).json({
    message: 'Notifications retrieved',
    notifications: [
      {
        id: 'NOT001',
        title: 'Order Shipped',
        message: 'Your order #ORD002 has been shipped',
        read: false,
        timestamp: '2024-01-21T10:30:00Z'
      },
      {
        id: 'NOT002',
        title: 'Welcome!',
        message: 'Welcome to StyleCart! Enjoy shopping.',
        read: true,
        timestamp: '2024-01-15T09:00:00Z'
      }
    ]
  });
});

// PUT /api/users/notifications/:id/read - Mark notification as read
router.put('/notifications/:id/read', authenticate, (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  
  res.status(HTTPStatusCodes.OK).json({
    message: 'Notification marked as read',
    notificationId: id
  });
});

export default router;