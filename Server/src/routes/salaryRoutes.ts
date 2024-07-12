import { Router } from 'express';
import { getSalaries, addSalary } from '../controllers/salaryController';

const router = Router();

router.get('/', getSalaries);
router.post('/', addSalary);

export default router;