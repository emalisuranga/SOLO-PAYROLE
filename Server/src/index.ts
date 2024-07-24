import express from 'express';
import bodyParser from 'body-parser';
import employeeRoutes from './routes/employeeRoutes';
import salaryDetailsRouter from './routes/salaryDetailsRouter';
import salarySlipRoutes from './routes/salarySlip';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/api/employees', employeeRoutes);
app.use('/api/salary-details', salaryDetailsRouter);
app.use('/api/salary-slip', salarySlipRoutes);
app.get('/', (req, res) => {
    res.send('Hello World!');
  });

export default app;