import { Request, Response } from 'express';
import { addSalaryDetails, getSalaryDetailsByMonth } from '../models/salary';
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

  console.log(month)
  console.log(year)

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