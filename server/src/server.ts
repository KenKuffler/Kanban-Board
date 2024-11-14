import express from 'express';
import routes from './routes/index.js';
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
  allowedHeaders: ['Content-Type'],
}));

app.use(express.static(path.join(path.resolve(), '../client/dist')));
app.use(express.json());

// Apply separated routes
app.use('/auth', routes.authRoutes); // Attach authentication routes
app.use('/api', routes.apiRoutes);   // Attach API routes with required authentication

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});



