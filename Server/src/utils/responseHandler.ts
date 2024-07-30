import { Response } from 'express';
import { CustomError } from '../errors/customError';

export const sendSuccessResponse = (
  res: Response,
  data: any,
  message: string = 'Success'
) => {
  return res.status(200).json({
    status: 'success',
    message,
    data,
  });
};
  
export const sendErrorResponse = (
  res: Response,
  error: any,
  message: string = 'Error'
) => {
  return res.status(500).json({
    status: 'error',
    message,
    error,
  });
};

export const handleErrorResponse = (error: any, res: Response) => {
  if (error instanceof CustomError) {
      res.status(error.statusCode).json({ status: 'error', message: error.message });
  } else {
      console.error('Error:', error);
      res.status(500).json({ status: 'error', message: 'Internal Server Error', error: error.message });
  }
};