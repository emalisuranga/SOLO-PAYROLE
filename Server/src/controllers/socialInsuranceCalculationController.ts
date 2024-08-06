import { Request, Response } from 'express';
import { getSocialInsuranceCalculationDetails, createSocialInsuranceCalculation, updateSocialInsuranceCalculation } from '../models/socialInsuranceCalculation';
import { sendSuccessResponse, sendErrorResponse, handleErrorResponse } from '../utils/responseHandler';

/**
 * Fetch social insurance calculation details by social insurance calculation ID.
 * @param req - Express request object
 * @param res - Express response object
 */ 
export const fetchSocialInsuranceCalculationDetailsHandler = async (req: Request, res: Response): Promise<void> => {
  const { socialInsuranceCalculationId } = req.params;

  try {
    const socialInsuranceCalculation = await getSocialInsuranceCalculationDetails(parseInt(socialInsuranceCalculationId, 10));

    if (!socialInsuranceCalculation) {
      sendErrorResponse(res, 'Social insurance calculation not found', 'Social insurance calculation not found');
      return;
    }

    sendSuccessResponse(res, socialInsuranceCalculation, 'Social insurance calculation fetched successfully');
  } catch (error: any) {
    console.error('Error fetching social insurance calculation details:', error);
    handleErrorResponse(error, res);
  }
}

/**
 * Insert social insurance calculation details.
 * @param req - Express request object
 * @param res - Express response object
 */
export const addSocialInsuranceCalculationHandler = async (req: Request, res: Response): Promise<void> => {
  const socialInsuranceCalculation = req.body;

  try {
    await createSocialInsuranceCalculation(socialInsuranceCalculation);
    sendSuccessResponse(res, socialInsuranceCalculation, 'Social insurance calculation details added successfully');
  } catch (error: any) {
    console.error('Error adding social insurance calculation details:', error);
    handleErrorResponse(error, res);
  } 
}

/**
 * Update social insurance calculation details.
 * @param req - Express request object
 * @param res - Express response object
 */
export const updateSocialInsuranceCalculationHandler = async (req: Request, res: Response): Promise<void> => {
  const { socialInsuranceCalculationId } = req.params;
  const socialInsuranceCalculationData = req.body;

  try {
    const updatedSocialInsuranceCalculation = await updateSocialInsuranceCalculation(parseInt(socialInsuranceCalculationId, 10), socialInsuranceCalculationData);
    sendSuccessResponse(res, updatedSocialInsuranceCalculation, 'Social insurance calculation details updated successfully');
  } catch (error: any) {
    console.error('Error updating social insurance calculation details:', error);
    handleErrorResponse(error, res);
  }
}
