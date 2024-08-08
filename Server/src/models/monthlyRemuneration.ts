import prisma from '../config/prismaClient';
import { cache } from '../cache/cache';
import { MonthlySalaryRange } from '../types/InsuranceCalculationInterfaces';

// const prisma = new PrismaClient();

/**
 * Fetch monthly remuneration details by employee ID and monthly remuneration ID.
 * @param employeeId - The ID of the employee
 * @param monthlyRemunerationId - The ID of the monthly remuneration
 * @returns The monthly remuneration details
 */

export const getMonthlyRemunerationDetails = async (): Promise<MonthlySalaryRange[]> => {
    if (!cache.monthlyRemunerations) {
      const monthlyRemunerations = await prisma.monthlyRemuneration.findMany({
        select: {
          monthlySalary: true,
          remunerationStartSalary: true,
          remunerationEndSalary: true
        },
        orderBy: {
          monthlySalary: 'asc'
        }
      });
  
      cache.monthlyRemunerations = monthlyRemunerations;
    }
  
    return cache.monthlyRemunerations;
  };

/**
 * Insert new data into MonthlyRemuneration.
 * @param data - The data to be inserted
 * @returns The newly created monthly remuneration record
 */ 
export const createMonthlyRemuneration = async (data: any[]) => {
    const createPromises = data.map((item) => prisma.monthlyRemuneration.create({
        data: {
          ...item,
        },
      }));
      return await Promise.all(createPromises);
}