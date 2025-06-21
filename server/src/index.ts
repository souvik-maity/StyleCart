import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { HTTPMethods } from "./constants/constants";

const app = express();
const PORT = process.env.PORT || 5000;

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

// Basic route
app.get("/", (req, res) => {
  res.json({
    message: "StyleCart Server is running!",
    port: PORT,
    timestamp: new Date().toISOString(),
  });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is healthy",
    uptime: process.uptime(),
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Route not found",
    message: `The route ${req.originalUrl} does not exist on this server`,
  });
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err);
  res.status(500).json({
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
