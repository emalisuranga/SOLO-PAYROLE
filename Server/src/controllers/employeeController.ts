import { Request, Response } from 'express';
import { createEmployee,getAllEmployees } from '../models/employee';
import { Employee } from '../types/employee';
import { sendSuccessResponse, sendErrorResponse } from '../utils/responseHandler';

export const addEmployee = async (req: Request, res: Response) => {
  try {
    const employee: Employee = req.body;
    const result = await createEmployee(employee);
    sendSuccessResponse(res, result, 'Employee added successfully');
  } catch (error) {
    console.error('Error details:', error);
    sendErrorResponse(res, error, 'Failed to save employee data');
  }
};

export const getEmployees = async (_req: Request, res: Response) => {
  try {
    const result = await getAllEmployees();
    sendSuccessResponse(res, result, 'Employees retrieved successfully');
  } catch (error) {
    console.error('Error details:', error);
    sendErrorResponse(res, error, 'Failed to retrieve employee data');
  }
};