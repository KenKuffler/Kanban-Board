const forceDatabaseRefresh = false;

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname for ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('JWT_SECRET:', process.env.JWT_SECRET_KEY); // Debugging to confirm JWT_SECRET is loaded

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration to allow requests from your client’s origin on Render
const allowedOrigins = ['https://kanban-board-1-4b7g.onrender.com'];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Static serving for client build
app.use(express.static(path.join(__dirname, '../../client/dist')));

app.use(express.json());

// Route setup for authentication and API routes
app.use('/auth', routes.authRoutes); // Separate the authentication routes
app.use('/api', routes.apiRoutes); // Protect all API routes with auth middleware in `apiRoutes`

sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});


