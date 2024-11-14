import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';

const authRouter = Router();
const apiRouter = Router();

// Set up authRoutes independently
authRouter.use('/', authRoutes);

// Set up apiRoutes independently
apiRouter.use('/', apiRoutes);

export default {
  authRoutes: authRouter, // Export this for authentication routes
  apiRoutes: apiRouter,   // Export this for main API routes
};


