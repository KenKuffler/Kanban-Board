import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration to allow requests from the client origin
const allowedOrigins = ['https://kanban-board-1-4b7g.onrender.com'];
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Parse incoming requests with JSON payloads
app.use(express.json());

// Serve static files if necessary (adjust path as needed)
app.use(express.static('../client/dist'));

// Mount main router that includes /auth and /api routes
app.use(routes);

// Database synchronization and server startup
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});

