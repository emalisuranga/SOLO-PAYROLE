import { Request, Response } from 'express';
import { addSalaryDetails } from '../models/salary';
import { Salary } from '../types/salary';

export const addSalaryDetailsHandler = async (req: Request, res: Response) => {
  const salary: Salary = req.body;

  try {
    const createdSalary = await addSalaryDetails(salary);
    res.status(201).json({ status: 'success', data: createdSalary });
  } catch (error) {
    console.error('Error adding salary details:', error);
    res.status(500).json({ status: 'error', message: 'Failed to add salary details', error });
  }
};