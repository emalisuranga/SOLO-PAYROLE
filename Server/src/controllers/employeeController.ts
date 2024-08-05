import { Request, Response } from 'express';
import { createEmployee,getAllEmployees,getEmployeeById,updateEmployee,deleteEmployee, getEmployeeNamesAndIds, softDeleteEmployee } from '../models/employee';
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

export const getEmployeeByIdHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const employee = await getEmployeeById(parseInt(id, 10));
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    sendSuccessResponse(res, employee, 'Employee retrieved successfully');
  } catch (error) {
    sendErrorResponse(res, error, 'Failed to fetch employee');
  }
};

export const updateEmployeeHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const employee: Employee = req.body;
  try {
    const result = await updateEmployee(parseInt(id, 10), employee);
    sendSuccessResponse(res, result, 'Employee updated successfully');
  } catch (error) {
    console.error('Error updating employee:', error);
    sendErrorResponse(res, error, 'Failed to update employee data');
  }
};

export const deleteEmployeeHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await deleteEmployee(parseInt(id, 10));
    sendSuccessResponse(res, result, 'Employee deleted successfully');
  } catch (error) {
    console.error('Error deleting employee:', error);
    sendErrorResponse(res, error, 'Failed to delete employee');
  }
};

export const getEmployeeNamesAndIdsHandler = async (_req: Request, res: Response) => {
  try {
    const result = await getEmployeeNamesAndIds()
    sendSuccessResponse(res, result, 'Employees retrieved successfully');
  } catch (error) {
    console.error('Error details:', error);
    sendErrorResponse(res, error, 'Failed to retrieve employee data');
  }
};

export const softDeleteEmployeeHandler = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const employee = await softDeleteEmployee(id);
    sendSuccessResponse(res, employee, 'Employee soft deleted successfully');
  } catch (error) {
    console.error('Error details:', error);
    sendErrorResponse(res, error, 'Failed to soft delete employee');
  }
};