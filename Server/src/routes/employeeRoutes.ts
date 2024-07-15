import { Router } from 'express';
import { addEmployee } from '../controllers/employeeController';

const router = Router();

router.post('/save', addEmployee);

export default router;