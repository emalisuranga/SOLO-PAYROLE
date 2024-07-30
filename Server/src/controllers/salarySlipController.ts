import { Request, Response } from 'express';
import { getSalarySlipDetails } from '../models/salarySlip';
import { sendSuccessResponse, sendErrorResponse } from '../utils/responseHandler';

/**
 * Get salary slip details for a given employee and payment details ID.
 * @param req - Express request object
 * @param res - Express response object
 */
export const fetchSalarySlipDetailHandler = async (req: Request, res: Response): Promise<void> => {
  const { employeeId, paymentDetailsId } = req.params;

  try {
    const salarySlip = await getSalarySlipDetails(parseInt(employeeId, 10), parseInt(paymentDetailsId, 10));

    if (!salarySlip || salarySlip.employeeId !== parseInt(employeeId, 10)) {
      sendErrorResponse(res, 'Salary slip not found', 'Salary slip not found');
      return;
    }

    sendSuccessResponse(res, salarySlip, 'Salary slip fetched successfully');
  } catch (error: any) {
    console.error('Error fetching salary slip details:', error);
    sendErrorResponse(res, error.message, 'Failed to fetch salary slip details');
  }
};