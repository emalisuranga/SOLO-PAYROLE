import { Router } from 'express';
import { saveEmployee } from '../controllers/employeeController';

const router = Router();

router.post('/save', saveEmployee);

export default router;