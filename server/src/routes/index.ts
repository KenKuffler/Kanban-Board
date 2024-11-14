import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';

const router = Router();

// Expose authRoutes and apiRoutes separately for use in server.ts
router.use('/auth', authRoutes);
router.use('/api', apiRoutes);

export default {
  authRoutes: router, // Use this for auth setup in `server.ts`
  apiRoutes: router,   // Use this for API setup in `server.ts`
};

