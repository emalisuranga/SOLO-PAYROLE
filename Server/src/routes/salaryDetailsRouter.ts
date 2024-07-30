import { Router } from 'express';
import { addSalaryDetailsHandler, getSalaryDetailsByMonthHandler, getSalaryDetailsByPaymentIdHandler, updateSalaryDetailsHandler } from '../controllers/salaryController';

const router = Router();

router.post('/save', addSalaryDetailsHandler);
router.get('/payment/:paymentId', getSalaryDetailsByPaymentIdHandler);
router.get('/:month/:year', getSalaryDetailsByMonthHandler); 
router.put('/payment/:id', updateSalaryDetailsHandler);

export default router;