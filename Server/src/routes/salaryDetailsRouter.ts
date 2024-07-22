import { Router } from 'express';
import { addSalaryDetailsHandler, getSalaryDetailsByMonthHandler, getSalaryDetailsByPaymentIdHandler } from '../controllers/salaryController';

const router = Router();

router.post('/save', addSalaryDetailsHandler);
router.get('/payment/:paymentId', getSalaryDetailsByPaymentIdHandler);
router.get('/:month/:year', getSalaryDetailsByMonthHandler); 

export default router;