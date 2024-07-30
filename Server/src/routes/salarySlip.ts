import { Router } from 'express';
import { fetchSalarySlipDetailHandler } from '../controllers/salarySlipController';

const router = Router();

router.get('/:employeeId/:paymentDetailsId', fetchSalarySlipDetailHandler);

export default router;