const forceDatabaseRefresh = false;

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';
import cors from 'cors';

console.log('JWT_SECRET:', process.env.JWT_SECRET_KEY); // This should print the secret key to confirm it’s loaded

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration
const allowedOrigins = [process.env.CLIENT_URL || 'http://localhost:3000'];
app.use(cors({
  origin: allowedOrigins,
  credentials: true, // If using cookies or other credentials
}));

// Serves static files in the entire client's dist folder
app.use(express.static('../client/dist'));

app.use(express.json());
app.use(routes);

sequelize.sync({force: forceDatabaseRefresh}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
