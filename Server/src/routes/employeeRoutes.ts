import { Router } from 'express';
import {
    addEmployee,
    getEmployees,
    updateEmployeeHandler,
    getEmployeeByIdHandler,
    deleteEmployeeHandler,
    getEmployeeNamesAndIdsHandler 
} from '../controllers/employeeController';

const router = Router();

router.post('/save', addEmployee);
router.get('/', getEmployees);
router.get('/employee-names-ids', getEmployeeNamesAndIdsHandler); 
router.get('/:id', getEmployeeByIdHandler);
router.put('/:id', updateEmployeeHandler);
router.delete('/:id', deleteEmployeeHandler);

export default router;