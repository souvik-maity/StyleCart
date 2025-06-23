import express, { Request, Response } from 'express';
import { HTTPStatusCodes } from '../constants/constants';
import { authenticate, authorizeAdmin, AuthenticatedRequest } from '../middleware/auth';

const router = express.Router();

// Apply authentication and admin authorization to all admin routes
router.use(authenticate);
router.use(authorizeAdmin);

// ⚙️ Admin Dashboard Routes

// GET /api/admin - Admin dashboard overview
router.get('/', (req: AuthenticatedRequest, res: Response) => {
  // Mock dashboard metrics
  const dashboardData = {
    metrics: {
      totalUsers: 1247,
      totalOrders: 3891,
      totalProducts: 456,
      totalRevenue: 125847.50,
      newUsersToday: 23,
      ordersToday: 89,
      revenueToday: 4567.89
    },
    recentOrders: [
      {
        id: 'ORD001',
        customerName: 'John Doe',
        total: 299.99,
        status: 'Processing',
        date: new Date().toISOString()
      }
    ],
    lowStockProducts: [
      {
        id: 'PROD001',
        name: 'Wireless Headphones',
        currentStock: 5,
        minimumStock: 10
      }
    ],
    topSellingProducts: [
      {
        id: 'PROD002',
        name: 'Smart Watch',
        unitsSold: 145,
        revenue: 28955.55
      }
    ]
  };

  res.status(HTTPStatusCodes.OK).json({
    message: 'Admin dashboard data retrieved successfully',
    dashboard: dashboardData
  });
});

// 📦 Product Management Routes

// GET /api/admin/products - Get all products for management
router.get('/products', (req: AuthenticatedRequest, res: Response) => {
  const { page = 1, limit = 20, search, category, status } = req.query;
  
  // Mock products data for admin
  const mockProducts = [
    {
      id: 'PROD001',
      name: 'Wireless Headphones',
      category: 'Electronics',
      price: 99.99,
      stock: 45,
      status: 'active',
      createdAt: '2024-01-15T10:00:00Z',
      lastModified: '2024-01-20T14:30:00Z'
    },
    {
      id: 'PROD002',
      name: 'Smart Watch',
      category: 'Electronics',
      price: 199.99,
      stock: 30,
      status: 'active',
      createdAt: '2024-01-10T09:00:00Z',
      lastModified: '2024-01-18T11:45:00Z'
    }
  ];

  res.status(HTTPStatusCodes.OK).json({
    message: 'Products retrieved for management',
    products: mockProducts,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total: mockProducts.length,
      pages: Math.ceil(mockProducts.length / Number(limit))
    },
    filters: { search, category, status }
  });
});

// POST /api/admin/products - Create new product
router.post('/products', (req: AuthenticatedRequest, res: Response) => {
  const { name, description, price, category, stock, images } = req.body;
  
  if (!name || !price || !category) {
    return res.status(HTTPStatusCodes.BAD_REQUEST).json({
      error: 'Validation failed',
      message: 'Name, price, and category are required'
    });
  }

  // Mock product creation
  const newProduct = {
    id: `PROD_${Date.now()}`,
    name,
    description,
    price,
    category,
    stock: stock || 0,
    images: images || [],
    status: 'active',
    createdBy: req.user?.id,
    createdAt: new Date().toISOString()
  };

  res.status(HTTPStatusCodes.CREATED).json({
    message: 'Product created successfully',
    product: newProduct
  });
});

// PUT /api/admin/products/:id - Update product
router.put('/products/:id', (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const { name, description, price, category, stock, status } = req.body;
  
  // Mock product update
  const updatedProduct = {
    id,
    name,
    description,
    price,
    category,
    stock,
    status,
    lastModifiedBy: req.user?.id,
    lastModified: new Date().toISOString()
  };

  res.status(HTTPStatusCodes.OK).json({
    message: 'Product updated successfully',
    product: updatedProduct
  });
});

// DELETE /api/admin/products/:id - Delete product
router.delete('/products/:id', (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  
  res.status(HTTPStatusCodes.OK).json({
    message: 'Product deleted successfully',
    deletedProductId: id,
    deletedBy: req.user?.id,
    deletedAt: new Date().toISOString()
  });
});

// 📋 Order Management Routes

// GET /api/admin/orders - Get all orders for management
router.get('/orders', (req: AuthenticatedRequest, res: Response) => {
  const { page = 1, limit = 20, status, dateFrom, dateTo } = req.query;
  
  // Mock orders data for admin
  const mockOrders = [
    {
      id: 'ORD001',
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      total: 299.99,
      status: 'processing',
      itemCount: 3,
      shippingAddress: '123 Main St, City, State',
      paymentMethod: 'Credit Card',
      orderDate: '2024-01-20T10:30:00Z',
      lastUpdated: '2024-01-20T14:00:00Z'
    },
    {
      id: 'ORD002',
      customerName: 'Jane Smith',
      customerEmail: 'jane@example.com',
      total: 149.99,
      status: 'shipped',
      itemCount: 2,
      shippingAddress: '456 Oak Ave, Town, State',
      paymentMethod: 'PayPal',
      orderDate: '2024-01-19T15:45:00Z',
      lastUpdated: '2024-01-20T09:30:00Z'
    }
  ];

  res.status(HTTPStatusCodes.OK).json({
    message: 'Orders retrieved for management',
    orders: mockOrders,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total: mockOrders.length,
      pages: Math.ceil(mockOrders.length / Number(limit))
    },
    filters: { status, dateFrom, dateTo }
  });
});

// GET /api/admin/orders/:id - Get order details
router.get('/orders/:id', (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  
  // Mock detailed order data
  const orderDetails = {
    id,
    customerInfo: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890'
    },
    items: [
      {
        productId: 'PROD001',
        productName: 'Wireless Headphones',
        quantity: 2,
        unitPrice: 99.99,
        subtotal: 199.98
      }
    ],
    pricing: {
      subtotal: 199.98,
      tax: 18.00,
      shipping: 9.99,
      total: 227.97
    },
    addresses: {
      billing: '123 Main St, City, State 12345',
      shipping: '123 Main St, City, State 12345'
    },
    payment: {
      method: 'Credit Card',
      transactionId: 'TXN_123456',
      status: 'completed'
    },
    timeline: [
      { event: 'Order Placed', timestamp: '2024-01-20T10:30:00Z' },
      { event: 'Payment Confirmed', timestamp: '2024-01-20T10:32:00Z' },
      { event: 'Processing Started', timestamp: '2024-01-20T14:00:00Z' }
    ]
  };

  res.status(HTTPStatusCodes.OK).json({
    message: 'Order details retrieved',
    order: orderDetails
  });
});

// PUT /api/admin/orders/:id/status - Update order status
router.put('/orders/:id/status', (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const { status, notes } = req.body;
  
  const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'];
  
  if (!status || !validStatuses.includes(status)) {
    return res.status(HTTPStatusCodes.BAD_REQUEST).json({
      error: 'Invalid status',
      message: `Status must be one of: ${validStatuses.join(', ')}`
    });
  }

  res.status(HTTPStatusCodes.OK).json({
    message: 'Order status updated successfully',
    orderId: id,
    newStatus: status,
    notes: notes,
    updatedBy: req.user?.id,
    updatedAt: new Date().toISOString()
  });
});

// 👥 User Management Routes

// GET /api/admin/users - Get all users for management
router.get('/users', (req: AuthenticatedRequest, res: Response) => {
  const { page = 1, limit = 20, search, role, status } = req.query;
  
  // Mock users data for admin
  const mockUsers = [
    {
      id: 'USER001',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user',
      status: 'active',
      totalOrders: 12,
      totalSpent: 1247.89,
      joinDate: '2024-01-15T10:00:00Z',
      lastLogin: '2024-01-20T14:30:00Z'
    },
    {
      id: 'USER002',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'user',
      status: 'active',
      totalOrders: 8,
      totalSpent: 892.45,
      joinDate: '2024-01-10T09:00:00Z',
      lastLogin: '2024-01-19T16:45:00Z'
    }
  ];

  res.status(HTTPStatusCodes.OK).json({
    message: 'Users retrieved for management',
    users: mockUsers,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total: mockUsers.length,
      pages: Math.ceil(mockUsers.length / Number(limit))
    },
    filters: { search, role, status }
  });
});

// PUT /api/admin/users/:id - Update user details
router.put('/users/:id', (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const { name, email, role, status } = req.body;
  
  const validRoles = ['user', 'admin'];
  const validStatuses = ['active', 'suspended', 'inactive'];
  
  if (role && !validRoles.includes(role)) {
    return res.status(HTTPStatusCodes.BAD_REQUEST).json({
      error: 'Invalid role',
      message: `Role must be one of: ${validRoles.join(', ')}`
    });
  }
  
  if (status && !validStatuses.includes(status)) {
    return res.status(HTTPStatusCodes.BAD_REQUEST).json({
      error: 'Invalid status',
      message: `Status must be one of: ${validStatuses.join(', ')}`
    });
  }

  res.status(HTTPStatusCodes.OK).json({
    message: 'User updated successfully',
    userId: id,
    updatedFields: { name, email, role, status },
    updatedBy: req.user?.id,
    updatedAt: new Date().toISOString()
  });
});

// 📊 Sales Reports Routes

// GET /api/admin/reports - Get sales reports and analytics
router.get('/reports', (req: AuthenticatedRequest, res: Response) => {
  const { type = 'overview', period = '30d', startDate, endDate } = req.query;
  
  // Mock reports data
  const reportsData = {
    overview: {
      totalRevenue: 125847.50,
      totalOrders: 3891,
      averageOrderValue: 32.35,
      conversionRate: 2.4,
      period: period
    },
    salesTrend: [
      { date: '2024-01-20', revenue: 4567.89, orders: 89 },
      { date: '2024-01-19', revenue: 3892.45, orders: 76 },
      { date: '2024-01-18', revenue: 5123.67, orders: 102 }
    ],
    topProducts: [
      { productId: 'PROD002', name: 'Smart Watch', revenue: 28955.55, unitsSold: 145 },
      { productId: 'PROD001', name: 'Wireless Headphones', revenue: 24567.23, unitsSold: 247 }
    ],
    topCategories: [
      { category: 'Electronics', revenue: 65432.10, percentage: 52 },
      { category: 'Clothing', revenue: 38291.45, percentage: 30 }
    ],
    customerSegments: {
      newCustomers: 1247,
      returningCustomers: 2644,
      vipCustomers: 89
    }
  };

  res.status(HTTPStatusCodes.OK).json({
    message: 'Sales reports retrieved successfully',
    reportType: type,
    period: period,
    data: reportsData
  });
});

// GET /api/admin/reports/export - Export reports data
router.get('/reports/export', (req: AuthenticatedRequest, res: Response) => {
  const { format = 'csv', type = 'sales', period = '30d' } = req.query;
  
  // Mock export functionality
  const exportData = {
    exportId: `EXPORT_${Date.now()}`,
    format: format,
    type: type,
    period: period,
    downloadUrl: `/api/admin/downloads/export_${Date.now()}.${format}`,
    generatedBy: req.user?.id,
    generatedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
  };

  res.status(HTTPStatusCodes.OK).json({
    message: 'Export generated successfully',
    export: exportData
  });
});

export default router;
