import express from 'express';
import { authRoutes, apiRoutes } from './routes/index.js'; // Destructure imports for authRoutes and apiRoutes
import { sequelize } from './models/index.js';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = ['https://kanban-board-1-4b7g.onrender.com'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'], // Add Authorization here
}));

app.use(express.static(path.join(path.resolve(), '../client/dist')));
app.use(express.json());

// Apply separated routes
app.use('/auth', authRoutes); // Attach authentication routes
app.use('/api', (req, _res, next) => {
  console.log(`API Request Received: ${req.method} ${req.url}`); // Log API requests
  next();
});
app.use('/api', apiRoutes); // Attach API routes

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});




