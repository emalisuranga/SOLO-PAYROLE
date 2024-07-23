import { Request, Response } from 'express';
import { addSalaryDetails, getSalaryDetailsByMonth, getSalaryDetailsByPaymentId, updateSalaryDetails } from '../models/salary';
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

export const getSalaryDetailsByMonthHandler = async (req: Request, res: Response) => {
  const { month, year } = req.params;

  try {
      const parsedMonth = parseInt(month, 10);
      const parsedYear = parseInt(year, 10);

      if (isNaN(parsedMonth) || isNaN(parsedYear)) {
          return res.status(400).json({ status: 'error', message: 'Invalid month or year parameter' });
      }

      const salaryDetails = await getSalaryDetailsByMonth(parsedMonth, parsedYear);
      res.json({ status: 'success', data: salaryDetails });
  } catch (error) {
      console.error("Error fetching salary details by month:", error);
      res.status(500).json({ status: 'error', message: 'Failed to fetch salary details', error });
  }
};

export const getSalaryDetailsByPaymentIdHandler = async (req: Request, res: Response) => {
  const { paymentId } = req.params;

  try {
    const salaryDetails = await getSalaryDetailsByPaymentId(Number(paymentId));

    if (!salaryDetails) {
      return res.status(404).json({ status: 'error', message: 'No salary details found for the specified payment ID.' });
    }

    res.json({ status: 'success', data: salaryDetails });
  } catch (error) {
    console.error('Error fetching salary details by payment ID:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch salary details', error });
  }
};

export const updateSalaryDetailsHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const salaryData = req.body;

  try {
      const updatedSalary = await updateSalaryDetails(parseInt(id), salaryData);
      res.json({ status: 'success', data: updatedSalary });
  } catch (error) {
      console.error('Error updating salary details:', error);
      res.status(500).json({ status: 'error', message: 'Failed to update salary details', error });
  }
};