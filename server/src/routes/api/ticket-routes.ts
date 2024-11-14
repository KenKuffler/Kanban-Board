import express from 'express';
import {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
} from '../../controllers/ticket-controller.js';

const router = express.Router();

// Middleware to log each request to tickets routes
router.use((req, _res, next) => {
  console.log(`Ticket route accessed: ${req.method} ${req.originalUrl}`);
  next();
});

// GET /tickets - Get all tickets
router.get('/', (req, res) => {
  console.log('Request received at GET /tickets');
  getAllTickets(req, res);
});

// GET /tickets/:id - Get a ticket by id
router.get('/:id', (req, res) => {
  console.log(`Request received at GET /tickets/${req.params.id}`);
  getTicketById(req, res);
});

// POST /tickets - Create a new ticket
router.post('/', (req, res) => {
  console.log('Request received at POST /tickets');
  createTicket(req, res);
});

// PUT /tickets/:id - Update a ticket by id
router.put('/:id', (req, res) => {
  console.log(`Request received at PUT /tickets/${req.params.id}`);
  updateTicket(req, res);
});

// DELETE /tickets/:id - Delete a ticket by id
router.delete('/:id', (req, res) => {
  console.log(`Request received at DELETE /tickets/${req.params.id}`);
  deleteTicket(req, res);
});

export { router as ticketRouter };

