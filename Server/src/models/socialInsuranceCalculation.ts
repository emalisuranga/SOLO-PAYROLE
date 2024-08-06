import { PrismaClient } from '@prisma/client';
import { SocialInsuranceCalculation } from '../types/socialInsuranceCalculation'; // Assuming the type is defined in a separate file

const prisma = new PrismaClient();

/**
 * Fetch social insurance calculation details by employee ID and social insurance calculation ID.
 * @param employeeId - The ID of the employee
 * @param socialInsuranceCalculationId - The ID of the social insurance calculation
 * @returns The social insurance calculation details
 */
export const getSocialInsuranceCalculationDetails = async (socialInsuranceCalculationId: number) => {
  return await prisma.socialInsuranceCalculation.findUnique({
    where: { id: socialInsuranceCalculationId },
  });
}
/**
 * Insert new data into SocialInsuranceCalculation.
 * @param data - The data to be inserted
 * @returns The newly created social insurance calculation record
 */
export const createSocialInsuranceCalculation = async (data: SocialInsuranceCalculation) => {
  return await prisma.socialInsuranceCalculation.create({
    data: {
      ...data,
    },
  });
}

/**
 * Update social insurance calculation details.
 * @param socialInsuranceCalculationId - The ID of the social insurance calculation
 * @param data - The data to be updated
 * @returns The updated social insurance calculation record
 */
export const updateSocialInsuranceCalculation = async (socialInsuranceCalculationId: number, data: SocialInsuranceCalculation) => {
  return await prisma.socialInsuranceCalculation.update({
    where: { id: socialInsuranceCalculationId },
    data: {
      ...data,
    },
  });   
}
