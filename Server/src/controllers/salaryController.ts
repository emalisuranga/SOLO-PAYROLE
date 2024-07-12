import { Request, Response } from 'express';

export const getSalaries = (req: Request, res: Response) => {
  res.send('GET request to the salary route');
};

export const addSalary = (req: Request, res: Response) => {
  res.send('POST request to the salary route');
};