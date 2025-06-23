import express, { Request, Response } from 'express';
import { HTTPStatusCodes } from '../constants/constants';
import { authenticate, AuthenticatedRequest } from '../middleware/auth';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { mock } from 'node:test';

const router = express.Router();

// 👤 User Authentication Routes

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// POST /api/users/register - User registration
router.post('/register', async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    
    try {
        // Input validation
        if (!name || !email || !password) {
            return res.status(HTTPStatusCodes.BAD_REQUEST).json({
                error: 'Validation failed',
                message: 'Name, email, and password are required'
            });
        }

        // Mock database check for existing users
        const mockUsers = [
            { id: '1', email: 'test@gmail.com', password: 'password123', name: 'John Doe' },
            { id: '2', email: 'admin@stylecart.com', password: 'admin123', name: 'Admin User' },
            { id: '3', email: 'user@example.com', password: 'user456', name: 'Jane Smith' },
            { id: '4', email: 'yash@gmail.com', password: 'hash-yash123', name: 'Yash Saini' }
        ];

        // Check if email already exists
        const existingUser = mockUsers.find(u => u.email === email);
        if (existingUser) {
            return res.status(HTTPStatusCodes.FORBIDDEN).json({
                error: 'Email already exists',
                message: 'An account with this email already exists'
            });
        }

        // Hash password with bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Mock user creation with hashed password
        const newUser = {
            id: Date.now().toString(),
            name: name,
            email: email,
            password: hashedPassword
        };

        // Generate JWT token
        const token = jwt.sign(
            { id: newUser.id, email: newUser.email }, 
            JWT_SECRET, 
            { expiresIn: '24h' }
        );

        res.status(HTTPStatusCodes.CREATED).json({
            message: 'User registered successfully',
            token: token,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            }
        });
    } catch (error) {
        res.status(HTTPStatusCodes.INTERNAL_SERVER_ERROR).json({
            error: 'Server error',
            message: 'An error occurred during registration'
        });
    }
});

// POST /api/users/login - User login
router.post('/login', async (req: Request, res: Response) => {
    const { email, password, token } = req.body;
    
    try {
        // If token is provided, verify it instead of email/password
        if (token) {
            try {
                const decoded = jwt.verify(token, JWT_SECRET) as any;
                
                // Mock user lookup by ID from token
                const mockUsers = [
                    { id: '1', email: 'test@gmail.com', password: 'hashed-password123', name: 'John Doe' },
                    { id: '2', email: 'admin@stylecart.com', password: 'hashed-admin123', name: 'Admin User' },
                    { id: '3', email: 'user@example.com', password: 'hashed-user456', name: 'Jane Smith' },
                    { id: '4', email: 'yash@gmail.com', password: 'hash-yash123', name: 'Yash Saini' },
                    { id: '5', email: 'yashsaini@gmail.com', password: 'hash-yash123', name: 'Yash K Saini' }

                ];

                const user = mockUsers.find(u => u.email === email);
                if (!user) {
                    return res.status(HTTPStatusCodes.UNAUTHORIZED).json({
                        error: 'Invalid token',
                        message: 'User not found'
                    });
                }
                // Successful token verification
                return res.status(HTTPStatusCodes.OK).json({
                    message: 'Token login successful',
                    token: token,
                    user: {
                        id: user.id,
                        email: user.email,
                        name: user.name
                    }
                });
            } catch (tokenError) {
                return res.status(HTTPStatusCodes.UNAUTHORIZED).json({
                    error: 'Invalid token',
                    message: 'Token verification failed'
                });
            }
        }
        
        // Email/password login
        if (!email || !password) {
            return res.status(HTTPStatusCodes.BAD_REQUEST).json({
                error: 'Validation failed',
                message: 'Email and password are required'
            });
        }
        
        // Mock database search - replace with actual DB query
        const mockUsers = [
            { id: '1', email: 'test@gmail.com', password: await bcrypt.hash('password123', 10), name: 'John Doe' },
            { id: '2', email: 'admin@stylecart.com', password: await bcrypt.hash('admin123', 10), name: 'Admin User' },
            { id: '3', email: 'user@example.com', password: await bcrypt.hash('user456', 10), name: 'Jane Smith' }
        ];
        
        // Search for user in mock database
        const foundUser = mockUsers.find(u => u.email === email);
        
        if (!foundUser) {
            return res.status(HTTPStatusCodes.UNAUTHORIZED).json({
                error: 'Invalid credentials',
                message: 'Email not found'
            });
        }
        
        // Compare password with bcrypt
        const passwordMatch = await bcrypt.compare(password, foundUser.password);
        
        if (!passwordMatch) {
            return res.status(HTTPStatusCodes.UNAUTHORIZED).json({
                error: 'Invalid credentials',
                message: 'Incorrect password'
            });
        }
        
        // Generate JWT token
        const newToken = jwt.sign(
            { id: foundUser.id, email: foundUser.email }, 
            JWT_SECRET, 
            { expiresIn: '24h' }
        );
        
        // Successful login
        res.status(HTTPStatusCodes.OK).json({
            message: 'Login successful',
            token: newToken,
            user: {
                id: foundUser.id,
                email: foundUser.email,
                name: foundUser.name
            }
        });
        
    } catch (error) {
        res.status(HTTPStatusCodes.INTERNAL_SERVER_ERROR).json({
            error: 'Server error',
            message: 'An error occurred during login'
        });
    }
});

// POST /api/users/forgot-password - Reset password via email
router.post('/forgot-password', async (req: Request, res: Response) => {
  const { email } = req.body;
  
  try {
    if (!email) {
      return res.status(HTTPStatusCodes.BAD_REQUEST).json({
        error: 'Email required',
        message: 'Please provide your email address'
      });
    }

    // Mock database check for existing users
    const mockUsers = [
      { id: '1', email: 'test@gmail.com', password: 'hashed-password123', name: 'John Doe' },
      { id: '2', email: 'admin@stylecart.com', password: 'hashed-admin123', name: 'Admin User' },
      { id: '3', email: 'user@example.com', password: 'hashed-user456', name: 'Jane Smith' }
    ];

    // Check if user exists
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      return res.status(HTTPStatusCodes.NOT_FOUND).json({
        error: 'User not found',
        message: 'No account found with this email address'
      });
    }

    // Generate password reset token (JWT with short expiration)
    const resetToken = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        purpose: 'password-reset' 
      }, 
      JWT_SECRET, 
      { expiresIn: '15m' } // 15 minutes expiration for security
    );

    // In real implementation, you would:
    // 1. Save the reset token to database with expiration
    // 2. Send email with reset link containing the token
    // For now, we'll return the token (in production, never expose this)
    
    res.status(HTTPStatusCodes.OK).json({
      message: 'Password reset email sent successfully',
      email: email,
      // Remove this in production - only for testing
      resetToken: resetToken
    });

  } catch (error) {
    res.status(HTTPStatusCodes.INTERNAL_SERVER_ERROR).json({
      error: 'Server error',
      message: 'An error occurred while processing password reset request'
    });
  }
});

// POST /api/users/reset-password - Reset password with token
router.post('/reset-password', async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;
  
  try {
    if (!token || !newPassword) {
      return res.status(HTTPStatusCodes.BAD_REQUEST).json({
        error: 'Validation failed',
        message: 'Reset token and new password are required'
      });
    }

    // Verify the reset token
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as any;
    } catch (tokenError) {
      return res.status(HTTPStatusCodes.UNAUTHORIZED).json({
        error: 'Invalid or expired token',
        message: 'Password reset token is invalid or has expired'
      });
    }

    // Check if token purpose is for password reset
    if (decoded.purpose !== 'password-reset') {
      return res.status(HTTPStatusCodes.UNAUTHORIZED).json({
        error: 'Invalid token',
        message: 'Token is not valid for password reset'
      });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // In real implementation, update the password in database
    // For now, we'll just simulate the update
    
    res.status(HTTPStatusCodes.OK).json({
      message: 'Password reset successfully',
      email: decoded.email
    });

  } catch (error) {
    res.status(HTTPStatusCodes.INTERNAL_SERVER_ERROR).json({
      error: 'Server error',
      message: 'An error occurred while resetting password'
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
  // DB and user req to be add later, for now a mock setup showing response
  
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

  // Improve the code by adding type annotations and error handling and making sure that we get info from the db
  try {
    const userId = req.user?.id as string;
    
    if (!userId) {
      return res.status(HTTPStatusCodes.UNAUTHORIZED).json({
        error: 'User not found',
        message: 'Unable to retrieve user information'
      });
    }

    // Mock database lookup by user ID
    const mockUsers = [
      { id: '1', email: 'test@gmail.com', name: 'John Doe', phone: '+1234567890', address: '123 Main St, City, State', dateJoined: '2024-01-15' },
      { id: '2', email: 'admin@stylecart.com', name: 'Admin User', phone: '+0987654321', address: '456 Admin Ave, Admin City', dateJoined: '2024-01-01' },
      { id: '3', email: 'user@example.com', name: 'Jane Smith', phone: '+1122334455', address: '789 User Blvd, User Town', dateJoined: '2024-01-10' },
      { id: '4', email: 'yash@gmail.com', name: 'Yash Saini', phone: '+1555666777', address: '321 Dev Street, Code City', dateJoined: '2024-01-12' }
    ];

    const userProfile = mockUsers.find(user => user.id === userId);

    if (!userProfile) {
      return res.status(HTTPStatusCodes.NOT_FOUND).json({
        error: 'Profile not found',
        message: 'User profile could not be retrieved'
      });
    }

    res.status(HTTPStatusCodes.OK).json({
      message: 'Profile retrieved successfully',
      profile: {
        id: userProfile.id,
        name: userProfile.name,
        email: userProfile.email,
        phone: userProfile.phone,
        address: userProfile.address,
        dateJoined: userProfile.dateJoined
      }
    });
  } catch (error) {
    res.status(HTTPStatusCodes.INTERNAL_SERVER_ERROR).json({
      error: 'Server error',
      message: 'An error occurred while retrieving profile'
    });
  }
});

// PUT /api/users/profile - Update user profile
router.put('/profile', authenticate, (req: AuthenticatedRequest, res: Response) => {

  // Add proper update logic and error handling to the profile update endpoint
  const { name, phone, address } = req.body;

  if (!name || !phone || !address) {
    return res.status(HTTPStatusCodes.BAD_REQUEST).json({
      error: 'Invalid input',
      message: 'Please provide all required fields'
    });
  }

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

  // Improve the code by adding type annotations and error handling
  const { id } = req.params;
  
  res.status(HTTPStatusCodes.OK).json({
    message: 'Notification marked as read',
    notificationId: id
  });
});

export default router;