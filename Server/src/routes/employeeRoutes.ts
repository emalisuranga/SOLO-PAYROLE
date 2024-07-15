import { Router } from 'express';
import { addEmployee,getEmployees } from '../controllers/employeeController';

const router = Router();

router.post('/save', addEmployee);
router.get('/', getEmployees);

export default router;