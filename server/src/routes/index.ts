import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// Use the authentication middleware for API routes
router.use('/auth', authRoutes);
router.use('/api', authenticateToken, apiRoutes); // Protect API routes with authentication

export default router;
