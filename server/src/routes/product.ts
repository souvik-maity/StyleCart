import express, { Request, Response } from 'express';
import { HTTPStatusCodes } from '../constants/constants';

const router = express.Router();

// 🛍️ Product Routes

// GET /api/products - Get all products with filters
router.get('/', (req: Request, res: Response) => {
  const { category, minPrice, maxPrice, search, page = 1, limit = 10 } = req.query;
  
  // Mock product data
  const mockProducts = [
    {
      id: 'PROD001',
      name: 'Wireless Headphones',
      price: 99.99,
      category: 'electronics',
      description: 'High-quality wireless headphones with noise cancellation',
      image: '/images/headphones.jpg',
      stock: 50,
      rating: 4.5
    },
    {
      id: 'PROD002',
      name: 'Smart Watch',
      price: 199.99,
      category: 'electronics',
      description: 'Feature-rich smartwatch with health tracking',
      image: '/images/smartwatch.jpg',
      stock: 30,
      rating: 4.7
    },
    {
      id: 'PROD003',
      name: 'Running Shoes',
      price: 79.99,
      category: 'sports',
      description: 'Comfortable running shoes for all terrains',
      image: '/images/shoes.jpg',
      stock: 100,
      rating: 4.3
    }
  ];

  // Apply filters (mock implementation)
  let filteredProducts = mockProducts;
  
  if (category) {
    filteredProducts = filteredProducts.filter(p => p.category === category);
  }
  
  if (search) {
    const searchTerm = (search as string).toLowerCase();
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm)
    );
  }

  res.status(HTTPStatusCodes.OK).json({
    message: 'Products retrieved successfully',
    products: filteredProducts,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total: filteredProducts.length,
      pages: Math.ceil(filteredProducts.length / Number(limit))
    },
    filters: { category, minPrice, maxPrice, search }
  });
});

// GET /api/products/:id - Get single product by ID
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  
  // Mock product data
  const mockProduct = {
    id: id,
    name: 'Wireless Headphones',
    price: 99.99,
    category: 'electronics',
    description: 'High-quality wireless headphones with advanced noise cancellation technology. Perfect for music lovers and professionals.',
    images: ['/images/headphones1.jpg', '/images/headphones2.jpg'],
    stock: 50,
    rating: 4.5,
    reviews: 127,
    specifications: {
      brand: 'TechBrand',
      model: 'WH-1000XM4',
      connectivity: 'Bluetooth 5.0',
      batteryLife: '30 hours',
      weight: '254g'
    },
    relatedProducts: ['PROD002', 'PROD004', 'PROD005']
  };

  res.status(HTTPStatusCodes.OK).json({
    message: 'Product retrieved successfully',
    product: mockProduct
  });
});

// GET /api/products/category/:category - Get products by category
router.get('/category/:category', (req: Request, res: Response) => {
  const { category } = req.params;
  const { page = 1, limit = 10, sortBy = 'name', order = 'asc' } = req.query;
  
  // Mock category products
  const mockCategoryProducts = [
    {
      id: 'PROD001',
      name: 'Wireless Headphones',
      price: 99.99,
      category: category,
      image: '/images/headphones.jpg',
      rating: 4.5
    },
    {
      id: 'PROD002',
      name: 'Smart Watch',
      price: 199.99,
      category: category,
      image: '/images/smartwatch.jpg',
      rating: 4.7
    }
  ];

  res.status(HTTPStatusCodes.OK).json({
    message: `Products in category '${category}' retrieved successfully`,
    category: category,
    products: mockCategoryProducts,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total: mockCategoryProducts.length,
      pages: Math.ceil(mockCategoryProducts.length / Number(limit))
    },
    sorting: { sortBy, order }
  });
});

// GET /api/products/search/:query - Search products
router.get('/search/:query', (req: Request, res: Response) => {
  const { query } = req.params;
  const { page = 1, limit = 10 } = req.query;
  
  // Mock search results
  const mockSearchResults = [
    {
      id: 'PROD001',
      name: 'Wireless Headphones',
      price: 99.99,
      category: 'electronics',
      image: '/images/headphones.jpg',
      rating: 4.5,
      relevance: 0.95
    }
  ];

  res.status(HTTPStatusCodes.OK).json({
    message: `Search results for '${query}'`,
    query: query,
    results: mockSearchResults,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total: mockSearchResults.length,
      pages: Math.ceil(mockSearchResults.length / Number(limit))
    }
  });
});

// GET /api/products/offers - Get special offers and deals
router.get('/offers', (req: Request, res: Response) => {
  // Mock offers data
  const mockOffers = [
    {
      id: 'OFFER001',
      title: 'Flash Sale - Electronics',
      description: 'Up to 50% off on selected electronics',
      discountPercentage: 50,
      validUntil: '2024-02-01T23:59:59Z',
      products: ['PROD001', 'PROD002'],
      bannerImage: '/images/flash-sale-banner.jpg'
    },
    {
      id: 'OFFER002',
      title: 'Buy 2 Get 1 Free',
      description: 'Sports equipment promotion',
      discountType: 'buy2get1',
      validUntil: '2024-01-31T23:59:59Z',
      products: ['PROD003', 'PROD006'],
      bannerImage: '/images/buy2get1-banner.jpg'
    }
  ];

  res.status(HTTPStatusCodes.OK).json({
    message: 'Current offers retrieved successfully',
    offers: mockOffers,
    totalOffers: mockOffers.length
  });
});

// GET /api/products/categories - Get all product categories
router.get('/categories', (req: Request, res: Response) => {
  const mockCategories = [
    {
      id: 'electronics',
      name: 'Electronics',
      description: 'Gadgets, devices, and electronic accessories',
      productCount: 45,
      image: '/images/categories/electronics.jpg'
    },
    {
      id: 'clothing',
      name: 'Clothing',
      description: 'Fashion and apparel for all occasions',
      productCount: 120,
      image: '/images/categories/clothing.jpg'
    },
    {
      id: 'sports',
      name: 'Sports & Fitness',
      description: 'Sports equipment and fitness gear',
      productCount: 67,
      image: '/images/categories/sports.jpg'
    },
    {
      id: 'home',
      name: 'Home & Garden',
      description: 'Home decor and garden essentials',
      productCount: 89,
      image: '/images/categories/home.jpg'
    }
  ];

  res.status(HTTPStatusCodes.OK).json({
    message: 'Product categories retrieved successfully',
    categories: mockCategories,
    totalCategories: mockCategories.length
  });
});

// GET /api/products/featured - Get featured products
router.get('/featured', (req: Request, res: Response) => {
  const mockFeaturedProducts = [
    {
      id: 'PROD001',
      name: 'Wireless Headphones',
      price: 99.99,
      originalPrice: 149.99,
      discount: 33,
      category: 'electronics',
      image: '/images/headphones.jpg',
      rating: 4.5,
      featured: true,
      badge: 'Best Seller'
    },
    {
      id: 'PROD002',
      name: 'Smart Watch',
      price: 199.99,
      category: 'electronics',
      image: '/images/smartwatch.jpg',
      rating: 4.7,
      featured: true,
      badge: 'New Arrival'
    }
  ];

  res.status(HTTPStatusCodes.OK).json({
    message: 'Featured products retrieved successfully',
    featuredProducts: mockFeaturedProducts,
    totalFeatured: mockFeaturedProducts.length
  });
});

export default router;
