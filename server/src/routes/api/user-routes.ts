import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../../controllers/user-controller.js';

const router = express.Router();

// GET /users - Get all users
router.get('/', (req, res) => {
  console.log('Request received at GET /users');
  getAllUsers(req, res);
});

// GET /users/:id - Get a user by id
router.get('/:id', (req, res) => {
  console.log(`Request received at GET /users/${req.params.id}`);
  getUserById(req, res);
});

// POST /users - Create a new user
router.post('/', (req, res) => {
  console.log('Request received at POST /users');
  createUser(req, res);
});

// PUT /users/:id - Update a user by id
router.put('/:id', (req, res) => {
  console.log(`Request received at PUT /users/${req.params.id}`);
  updateUser(req, res);
});

// DELETE /users/:id - Delete a user by id
router.delete('/:id', (req, res) => {
  console.log(`Request received at DELETE /users/${req.params.id}`);
  deleteUser(req, res);
});

export { router as userRoutes };

