// api/index.ts

import { Router } from 'express';
import { ticketRoutes } from './ticket-routes.js';
import { userRoutes } from './user-routes.js';

const router = Router();

router.use('/tickets', (_req, _res, next) => {
  console.log('Request received at /api/tickets');
  next();
}, ticketRoutes);

router.use('/users', (_req, _res, next) => {
  console.log('Request received at /api/users');
  next();
}, userRoutes);

export default router;


