import { Router } from 'express';
import { addEmployee,getEmployees, updateEmployeeHandler, getEmployeeByIdHandler } from '../controllers/employeeController';

const router = Router();

router.post('/save', addEmployee);
router.get('/', getEmployees);
router.get('/:id', getEmployeeByIdHandler);
router.put('/:id', updateEmployeeHandler);


export default router;