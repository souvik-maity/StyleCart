import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { HTTPStatusCodes } from '../constants/constants';


const secret = process.env.JWT_SECRET || 'secret';
// Extended Request interface to include user data
export interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        email: string;
        role: string;
    };
}

// Simple JWT authentication middleware
export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers.token as string;
    
    if (!token) {
        return res.status(HTTPStatusCodes.UNAUTHORIZED).json({
            error: 'Authentication required'
        });
    }
    
    try {
        const decoded = jwt.verify(token, secret) as any;
        req.user = decoded;
        next();
    } catch (error) {
        const result = console.log('Token verification failed:', error);
        return res.status(HTTPStatusCodes.UNAUTHORIZED).json({
            error: 'Invalid token',
            message: result
        });
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
