import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { HTTPMethods, HTTPStatusCodes } from "./constants/constants";
import { SecretKeys } from "./constants/environment";
import userRoutes from './routes/user';
import productRoutes from './routes/product';
import cartRoutes from './routes/cart';
import adminRoutes from './routes/admin';
import supportRoutes from './routes/support';

const app = express();
const PORT = SecretKeys.PORT;

// CORS configuration - allowing only port 3000
const corsOptions = {
  origin: "http://localhost:3000",
  methods: [
    HTTPMethods.GET,
    HTTPMethods.POST,
    HTTPMethods.PUT,
    HTTPMethods.DELETE,
  ],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route mounting with API prefix
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/admin', adminRoutes);
app.use('/support', supportRoutes);

// Basic route
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "StyleCart Server is running!",
    port: PORT,
    timestamp: new Date().toISOString(),
    apiEndpoint: "/api"
  });
});

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.status(HTTPStatusCodes.OK).json({
    status: "OK",
    message: "Server is healthy",
    uptime: process.uptime(),
  });
});

// 404 handler
app.use("*", (req: Request, res: Response) => {
  res.status(HTTPStatusCodes.NOT_FOUND).json({
    error: "Route not found",
    message: `The route ${req.originalUrl} does not exist on this server`,
    availableEndpoints: ["/api", "/health"]
  });
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err);
  res.status(HTTPStatusCodes.INTERNAL_SERVER_ERROR).json({
    error: "Internal Server Error",
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Something went wrong",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 StyleCart Server is running on port ${PORT}`);
  console.log(`📍 Server URL: http://localhost:${PORT}`);
  console.log(`🌐 CORS enabled for: http://localhost:3000`);
});

export default app;
