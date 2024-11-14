// api/index.ts

import { Router } from 'express';
import { ticketRouter } from './ticket-routes.js';
import { userRouter } from './user-routes.js';

const router = Router();

router.use('/tickets', (_req, _res, next) => {
  console.log('Request received at /api/tickets');
  next();
}, ticketRouter);

router.use('/users', (_req, _res, next) => {
  console.log('Request received at /api/users');
  next();
}, userRouter);

export default router;


