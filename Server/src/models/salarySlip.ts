import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Fetch salary slip details by employee ID and payment details ID.
 * @param employeeId - The ID of the employee
 * @param paymentDetailsId - The ID of the payment details
 * @returns The salary slip details
 */
export const getSalarySlipDetails = async (employeeId: number, paymentDetailsId: number) => {
  return await prisma.paymentDetails.findUnique({
    where: { id: paymentDetailsId },
    include: {
      employee: {
        select: {
          firstName: true,
          lastName: true,
          department: true,
        },
      },
      workDetails: true,
      earnings: true,
      deductions: true,
    },
  });
};