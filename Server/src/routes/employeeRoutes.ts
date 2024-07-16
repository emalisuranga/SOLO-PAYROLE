import { Router } from 'express';
import { addEmployee,getEmployees, getEmployeeByIdHandler } from '../controllers/employeeController';

const router = Router();

router.post('/save', addEmployee);
router.get('/', getEmployees);
router.get('/:id', getEmployeeByIdHandler);


export default router;