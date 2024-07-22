import { Router } from 'express';
import { addSalaryDetailsHandler, getSalaryDetailsByMonthHandler } from '../controllers/salaryController';

const router = Router();

router.post('/save', addSalaryDetailsHandler);
router.get('/:month/:year', getSalaryDetailsByMonthHandler); 

export default router;