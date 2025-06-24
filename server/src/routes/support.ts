import express, { Request, Response } from 'express';
import { HTTPStatusCodes } from '../constants/constants';

const router = express.Router();

// 📦 Utility/Support Pages Routes

// GET /api/support/terms - Terms of Service
router.get('/terms', (req: Request, res: Response) => {
  const termsOfService = {
    title: 'Terms of Service',
    lastUpdated: '2024-01-15T00:00:00Z',
    version: '1.0',
    sections: [
      {
        title: 'Acceptance of Terms',
        content: 'By accessing and using StyleCart, you accept and agree to be bound by the terms and provision of this agreement.'
      },
      {
        title: 'Use License',
        content: 'Permission is granted to temporarily download one copy of the materials on StyleCart for personal, non-commercial transitory viewing only.'
      },
      {
        title: 'Disclaimer',
        content: 'The materials on StyleCart are provided on an "as is" basis. StyleCart makes no warranties, expressed or implied.'
      },
      {
        title: 'Limitations',
        content: 'In no event shall StyleCart or its suppliers be liable for any damages arising out of the use or inability to use the materials.'
      },
      {
        title: 'Privacy Policy',
        content: 'Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information.'
      }
    ],
    contactInfo: {
      email: 'legal@stylecart.com',
      address: '123 Legal St, Business City, BC 12345'
    }
  };

  res.status(HTTPStatusCodes.OK).json({
    message: 'Terms of Service retrieved successfully',
    terms: termsOfService
  });
});

// GET /api/support/privacy - Privacy Policy
router.get('/privacy', (req: Request, res: Response) => {
  const privacyPolicy = {
    title: 'Privacy Policy',
    lastUpdated: '2024-01-15T00:00:00Z',
    version: '1.0',
    sections: [
      {
        title: 'Information We Collect',
        content: 'We collect information you provide directly to us, information we collect automatically, and information from third parties.'
      },
      {
        title: 'How We Use Your Information',
        content: 'We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.'
      },
      {
        title: 'Information Sharing',
        content: 'We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.'
      },
      {
        title: 'Data Security',
        content: 'We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.'
      },
      {
        title: 'Your Rights',
        content: 'You have the right to access, update, or delete your personal information. You can also opt-out of certain communications.'
      },
      {
        title: 'Cookies',
        content: 'We use cookies and similar technologies to enhance your experience, analyze usage patterns, and personalize content.'
      }
    ],
    contactInfo: {
      email: 'privacy@stylecart.com',
      phone: '+1-800-PRIVACY'
    }
  };

  res.status(HTTPStatusCodes.OK).json({
    message: 'Privacy Policy retrieved successfully',
    privacy: privacyPolicy
  });
});

// GET /api/support/about - About Us
router.get('/about', (req: Request, res: Response) => {
  const aboutUs = {
    title: 'About StyleCart',
    founded: '2024',
    mission: 'To provide the best online shopping experience with quality products, competitive prices, and exceptional customer service.',
    vision: 'To become the most trusted and preferred e-commerce platform globally.',
    values: [
      'Customer First',
      'Quality Products',
      'Innovation',
      'Sustainability',
      'Trust & Transparency'
    ],
    story: 'StyleCart was founded with a simple mission: to make online shopping enjoyable, secure, and accessible to everyone. What started as a small team with big dreams has grown into a trusted platform serving thousands of customers worldwide.',
    team: {
      totalEmployees: 150,
      offices: ['New York', 'San Francisco', 'London', 'Tokyo'],
      departments: ['Engineering', 'Design', 'Marketing', 'Customer Support', 'Operations']
    },
    achievements: [
      '1M+ Happy Customers',
      '50K+ Products',
      '99.9% Uptime',
      'Award-winning Customer Service'
    ],
    socialResponsibility: 'We are committed to sustainable practices and giving back to our community through various initiatives and partnerships.',
    contact: {
      headquarters: '123 Commerce Ave, Business District, BD 12345',
      email: 'info@stylecart.com',
      phone: '+1-800-STYLECART'
    }
  };

  res.status(HTTPStatusCodes.OK).json({
    message: 'About Us information retrieved successfully',
    about: aboutUs
  });
});

// GET /api/support/contact - Contact Us information
router.get('/contact', (req: Request, res: Response) => {
  const contactInfo = {
    title: 'Contact Us',
    description: 'We\'re here to help! Reach out to us through any of the following channels.',
    contactMethods: [
      {
        type: 'Customer Support',
        phone: '+1-800-SUPPORT',
        email: 'support@stylecart.com',
        hours: 'Monday - Friday: 9 AM - 8 PM EST, Saturday - Sunday: 10 AM - 6 PM EST'
      },
      {
        type: 'Sales Inquiries',
        phone: '+1-800-SALES',
        email: 'sales@stylecart.com',
        hours: 'Monday - Friday: 8 AM - 6 PM EST'
      },
      {
        type: 'Technical Support',
        email: 'tech@stylecart.com',
        hours: '24/7 Email Support'
      },
      {
        type: 'Business Partnerships',
        email: 'partnerships@stylecart.com',
        hours: 'Monday - Friday: 9 AM - 5 PM EST'
      }
    ],
    addresses: [
      {
        type: 'Headquarters',
        address: '123 Commerce Ave, Business District, BD 12345',
        city: 'New York',
        country: 'USA'
      },
      {
        type: 'West Coast Office',
        address: '456 Tech Blvd, Innovation Park, IP 67890',
        city: 'San Francisco',
        country: 'USA'
      }
    ],
    socialMedia: {
      facebook: 'https://facebook.com/stylecart',
      twitter: 'https://twitter.com/stylecart',
      instagram: 'https://instagram.com/stylecart',
      linkedin: 'https://linkedin.com/company/stylecart'
    },
    responseTime: {
      email: '24 hours',
      phone: 'Immediate',
      socialMedia: '2-4 hours'
    }
  };

  res.status(HTTPStatusCodes.OK).json({
    message: 'Contact information retrieved successfully',
    contact: contactInfo
  });
});

// POST /api/support/contact - Submit contact form
router.post('/contact', (req: Request, res: Response) => {
  const { name, email, subject, message, category } = req.body;
  
  if (!name || !email || !subject || !message) {
    return res.status(HTTPStatusCodes.BAD_REQUEST).json({
      error: 'Validation failed',
      message: 'Name, email, subject, and message are required'
    });
  }

  // Mock contact form submission
  const submissionResult = {
    ticketId: `TICKET_${Date.now()}`,
    name: name,
    email: email,
    subject: subject,
    category: category || 'General Inquiry',
    status: 'received',
    submittedAt: new Date().toISOString(),
    expectedResponse: 'within 24 hours'
  };

  res.status(HTTPStatusCodes.CREATED).json({
    message: 'Your message has been sent successfully. We will get back to you soon!',
    submission: submissionResult
  });
});

// GET /api/support/faq - Frequently Asked Questions
router.get('/faq', (req: Request, res: Response) => {
  const { category } = req.query;
  
  const faqData = {
    categories: [
      'Orders & Shipping',
      'Returns & Refunds',
      'Account & Payment',
      'Products',
      'Technical Support'
    ],
    faqs: [
      {
        id: 'FAQ001',
        category: 'Orders & Shipping',
        question: 'How long does shipping take?',
        answer: 'Standard shipping takes 5-7 business days, Express shipping takes 2-3 business days, and Overnight delivery takes 1 business day.',
        helpful: 156,
        notHelpful: 12
      },
      {
        id: 'FAQ002',
        category: 'Orders & Shipping',
        question: 'Can I track my order?',
        answer: 'Yes! Once your order ships, you\'ll receive a tracking number via email. You can also track your order in your account dashboard.',
        helpful: 234,
        notHelpful: 8
      },
      {
        id: 'FAQ003',
        category: 'Returns & Refunds',
        question: 'What is your return policy?',
        answer: 'We offer a 30-day return policy for most items. Items must be in original condition with tags attached. Some restrictions apply to certain categories.',
        helpful: 189,
        notHelpful: 15
      },
      {
        id: 'FAQ004',
        category: 'Returns & Refunds',
        question: 'How do I return an item?',
        answer: 'You can initiate a return from your account dashboard or by contacting customer service. We\'ll provide a prepaid return label for eligible items.',
        helpful: 145,
        notHelpful: 7
      },
      {
        id: 'FAQ005',
        category: 'Account & Payment',
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards, PayPal, Apple Pay, Google Pay, and Buy Now Pay Later options through Klarna and Afterpay.',
        helpful: 267,
        notHelpful: 5
      },
      {
        id: 'FAQ006',
        category: 'Account & Payment',
        question: 'How do I reset my password?',
        answer: 'Click on "Forgot Password" on the login page and enter your email address. You\'ll receive a password reset link within a few minutes.',
        helpful: 178,
        notHelpful: 9
      },
      {
        id: 'FAQ007',
        category: 'Products',
        question: 'Are your products authentic?',
        answer: 'Yes, all our products are 100% authentic and sourced directly from authorized retailers and brand partners.',
        helpful: 298,
        notHelpful: 3
      },
      {
        id: 'FAQ008',
        category: 'Technical Support',
        question: 'The website is not loading properly. What should I do?',
        answer: 'Try clearing your browser cache and cookies, or try accessing the site from a different browser. If the issue persists, contact our technical support team.',
        helpful: 89,
        notHelpful: 21
      }
    ]
  };

  // Filter by category if specified
  let filteredFaqs = faqData.faqs;
  if (category) {
    filteredFaqs = faqData.faqs.filter(faq => 
      faq.category.toLowerCase() === (category as string).toLowerCase()
    );
  }

  res.status(HTTPStatusCodes.OK).json({
    message: 'FAQ retrieved successfully',
    categories: faqData.categories,
    faqs: filteredFaqs,
    totalFaqs: filteredFaqs.length,
    filterApplied: category || 'none'
  });
});

// POST /api/support/faq/:id/helpful - Mark FAQ as helpful
router.post('/faq/:id/helpful', (req: Request, res: Response) => {
  const { id } = req.params;
  const { helpful } = req.body; // true for helpful, false for not helpful
  
  res.status(HTTPStatusCodes.OK).json({
    message: 'Thank you for your feedback!',
    faqId: id,
    feedback: helpful ? 'helpful' : 'not helpful',
    timestamp: new Date().toISOString()
  });
});

// GET /api/support/status - System status and health
router.get('/status', (req: Request, res: Response) => {
  const systemStatus = {
    status: 'operational',
    lastChecked: new Date().toISOString(),
    services: {
      website: { status: 'operational', uptime: '99.9%' },
      api: { status: 'operational', uptime: '99.8%' },
      payments: { status: 'operational', uptime: '100%' },
      shipping: { status: 'operational', uptime: '99.5%' },
      database: { status: 'operational', uptime: '99.9%' }
    },
    incidents: [],
    maintenance: {
      scheduled: false,
      nextWindow: '2024-02-01T02:00:00Z - 2024-02-01T04:00:00Z',
      description: 'Routine maintenance and updates'
    },
    metrics: {
      responseTime: '< 200ms',
      errorRate: '< 0.1%',
      availabilityTarget: '99.9%'
    }
  };

  res.status(HTTPStatusCodes.OK).json({
    message: 'System status retrieved successfully',
    status: systemStatus
  });
});

export default router;
