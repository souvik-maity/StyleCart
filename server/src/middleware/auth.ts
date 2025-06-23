import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { HTTPStatusCodes } from '../constants/constants';

// Extended Request interface to include user data
export interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        email: string;
        role: string;
    };
}

interface JWTPayload {
    id: string;
    email: string;
    role: string;
    iat?: number;
    exp?: number;
}

// JWT authentication middleware
export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(HTTPStatusCodes.UNAUTHORIZED).json({
            error: 'Authentication required',
            message: 'Please provide a valid token'
        });
    }

    const token = authHeader.substring(7);
    
    try {
        const JWT_SECRET = process.env.JWT_SECRET;
        
        if (!JWT_SECRET) {
            return res.status(HTTPStatusCodes.INTERNAL_SERVER_ERROR).json({
                error: 'Server configuration error',
                message: 'JWT secret not configured'
            });
        }

        const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
        
        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role
        };
        
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(HTTPStatusCodes.UNAUTHORIZED).json({
                error: 'Token expired',
                message: 'Please login again'
            });
        } else if (error instanceof jwt.JsonWebTokenError) {
            return res.status(HTTPStatusCodes.UNAUTHORIZED).json({
                error: 'Invalid token',
                message: 'The provided token is invalid'
            });
        } else {
            return res.status(HTTPStatusCodes.UNAUTHORIZED).json({
                error: 'Authentication failed',
                message: 'Unable to authenticate token'
            });
        }
    }
};

// Admin role authorization middleware
export const authorizeAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
        return res.status(HTTPStatusCodes.UNAUTHORIZED).json({
            error: 'Authentication required',
            message: 'User not authenticated'
        });
    }

    if (req.user.role !== 'admin') {
        return res.status(HTTPStatusCodes.FORBIDDEN).json({
            error: 'Access denied',
            message: 'Admin access required'
        });
    }

    next();
};
