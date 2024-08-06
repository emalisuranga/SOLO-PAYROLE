import { PrismaClient } from '@prisma/client';
import { SocialInsuranceCalculation } from '../types/socialInsuranceCalculation'; // Assuming the type is defined in a separate file

const prisma = new PrismaClient();

/**
 * Fetch social insurance calculation details by employee ID and social insurance calculation ID.
 * @param employeeId - The ID of the employee
 * @param socialInsuranceCalculationId - The ID of the social insurance calculation
 * @returns The social insurance calculation details
 */
export const getSocialInsuranceCalculationDetails = async () => {
  return await prisma.socialInsuranceCalculation.findFirst();
}
/**
 * Insert new data into SocialInsuranceCalculation.
 * @param data - The data to be inserted
 * @returns The newly created social insurance calculation record
 */
export const createOrUpdateSocialInsuranceCalculation = async (data: SocialInsuranceCalculation) => {
  const existingRecord = await prisma.socialInsuranceCalculation.findFirst();

  if (existingRecord) {
    return await prisma.socialInsuranceCalculation.update({
      where: { id: existingRecord.id },
      data: {
        ...data,
      },
    });
  } else {
    return await prisma.socialInsuranceCalculation.create({
      data: {
        ...data,
      },
    });
  }
};

/**
 * Update social insurance calculation details.
 * @param socialInsuranceCalculationId - The ID of the social insurance calculation
 * @param data - The data to be updated
 * @returns The updated social insurance calculation record
 */
export const updateSocialInsuranceCalculation = async (socialInsuranceCalculationId: number, data: SocialInsuranceCalculation) => {
  const existingRecord = await prisma.socialInsuranceCalculation.findUnique({
    where: { id: socialInsuranceCalculationId },
  });

  if (!existingRecord) {
    throw new Error('Record not found');
  }

  return await prisma.socialInsuranceCalculation.update({
    where: { id: socialInsuranceCalculationId },
    data: {
      ...data,
    },
  });
};
