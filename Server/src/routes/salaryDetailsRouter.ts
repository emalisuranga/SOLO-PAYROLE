import { Router } from 'express';
import { addSalaryDetailsHandler } from '../controllers/salaryController';

const router = Router();

router.post('/save', addSalaryDetailsHandler);

export default router;