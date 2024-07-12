import { Request, Response } from 'express';
import { createEmployee } from '../models/employee';

export const saveEmployee = async (req: Request, res: Response) => {
  try {
    const employeeData = req.body;
    const employeeId = await createEmployee(employeeData);
    res.status(200).json({ message: 'Employee data saved successfully!', employeeId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save employee data', details: error });
  }
};