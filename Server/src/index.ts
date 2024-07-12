import express from 'express';
import bodyParser from 'body-parser';
import employeeRoutes from './routes/employeeRoutes';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/employees', employeeRoutes);

export default app;