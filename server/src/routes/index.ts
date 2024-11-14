// routes/index.ts

import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';

const router = Router();

// Use the authentication middleware for API routes
router.use('/auth', authRoutes);
router.use('/api', apiRoutes);

export { authRoutes, apiRoutes };





