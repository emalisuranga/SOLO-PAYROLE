import { Router } from 'express';
import { addEmployee,getEmployees, updateEmployeeHandler, getEmployeeByIdHandler,deleteEmployeeHandler } from '../controllers/employeeController';

const router = Router();

router.post('/save', addEmployee);
router.get('/', getEmployees);
router.get('/:id', getEmployeeByIdHandler);
router.put('/:id', updateEmployeeHandler);
router.delete('/:id', deleteEmployeeHandler);


export default router;