import { Request, Response } from 'express';
import { createEmployee } from '../models/employee';
import { Employee } from '../types/employee';

export const addEmployee = async (req: Request, res: Response) => {
  try {
    const employee: Employee = req.body;
    const result = await createEmployee(employee);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error details:', error);

    if (error instanceof Error) {
      res.status(500).json({
        error: 'Failed to save employee data',
        details: {
          message: error.message,
          stack: error.stack,
          name: error.name,
        },
      });
    } else {
      res.status(500).json({
        error: 'Failed to save employee data',
        details: 'An unknown error occurred',
      });
    }
  }
};