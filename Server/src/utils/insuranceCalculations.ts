import { PrismaClient } from '@prisma/client';
import { InsuranceCalculationRates, MonthlySalaryRange, InsuranceDeductions, InsuranceCalculationCache } from '../types/InsuranceCalculationInterfaces';

const prisma = new PrismaClient();

const cache: InsuranceCalculationCache = {
  socialInsuranceCalculation: null,
  monthlyRemunerations: null,
  deductions: {}
};

// Function to clear the cache every 15 minutes
const clearCache = () => {
  cache.deductions = {};
  cache.socialInsuranceCalculation = null;
  cache.monthlyRemunerations = null;
  console.log('Cache cleared');
};

// Schedule cache clearing every 15 minutes
setInterval(clearCache, 15 * 60 * 1000);

const fetchSocialInsuranceCalculation = async (): Promise<InsuranceCalculationRates> => {
  if (!cache.socialInsuranceCalculation) {
    const insuranceCalculation = await prisma.socialInsuranceCalculation.findFirst({
      select: {
        healthInsurancePercentage: true,
        longTermInsurancePercentage: true,
        employeePensionPercentage: true,
        regularEmployeeInsurancePercentage: true,
        specialEmployeeInsurancePercentage: true,
        pensionStartMonthlySalary: true,
        pensionEndMonthlySalary: true,
        pensionStartSalary: true,
        pensionEndSalary: true
      }
    });

    if (!insuranceCalculation) {
      throw new Error('Insurance calculation data not found');
    }

    cache.socialInsuranceCalculation = insuranceCalculation;
  }

  return cache.socialInsuranceCalculation;
};

// Function to fetch and cache monthly remunerations data
const fetchMonthlyRemunerations = async (): Promise<MonthlySalaryRange[]> => {
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

// Function to calculate health insurance
const calculateHealthInsurance = (monthlySalary: number, percentage: number): number => {
  return (monthlySalary * percentage) / 2;
};


// Function to calculate employee pension insurance
const calculateEmployeePensionInsurance1 = (monthlySalary: number, percentage: number): number => {
  return (monthlySalary * percentage) / 2;
};

const calculateEmployeePensionInsurance = (
  monthlySalary: number,
  pensionStartSalary: number,
  pensionEndSalary: number,
  pensionStartMonthlySalary: number,
  pensionEndMonthlySalary: number,
  percentage: number
): number => {
  if (monthlySalary > pensionStartSalary) {
    return (pensionStartMonthlySalary * percentage) / 2;
  } else if (monthlySalary < pensionEndSalary) {
    return (pensionEndMonthlySalary * percentage) / 2;
  } else {
    return 0; // Default value if neither condition is met
  }
};

// Function to calculate long-term care insurance
const calculateLongTermCareInsurance = (monthlySalary: number, percentage: number): number => {
  return (monthlySalary * percentage) / 2;
};

// Function to calculate employment insurance
const calculateEmploymentInsurance = (monthlySalary: number, percentage: number): number => {
  return (monthlySalary * percentage);
};

const calculateAge = (dateOfBirth: string): number => {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

// Main function to calculate all insurance deductions
export const calculateInsuranceDeductions = async (basicSalary: number, dateOfBirth: string): Promise<InsuranceDeductions> => {
  // Check if the result is in the cache
  if (cache.deductions && cache.deductions[basicSalary]) {
    return cache.deductions[basicSalary];
  }

  const {
    healthInsurancePercentage,
    longTermInsurancePercentage,
    employeePensionPercentage,
    regularEmployeeInsurancePercentage,
    specialEmployeeInsurancePercentage,
    pensionStartSalary,
    pensionEndSalary,
    pensionStartMonthlySalary,
    pensionEndMonthlySalary
  } = await fetchSocialInsuranceCalculation();

  const monthlyRemunerations = await fetchMonthlyRemunerations();

  let healthInsurance = 0;
  let employeePensionInsurance = 0;
  let longTermCareInsurance = 0;
  let employmentInsurance = 0;
  const age = calculateAge(dateOfBirth);

  for (const remuneration of monthlyRemunerations) {
    if (basicSalary >= remuneration.remunerationStartSalary && basicSalary <= remuneration.remunerationEndSalary) {
      healthInsurance = calculateHealthInsurance(remuneration.monthlySalary, healthInsurancePercentage);
      employeePensionInsurance = calculateEmployeePensionInsurance(remuneration.monthlySalary, pensionStartSalary, pensionEndSalary, pensionStartMonthlySalary, pensionEndMonthlySalary, employeePensionPercentage);
      if (age > 40) {
        longTermCareInsurance = calculateLongTermCareInsurance(remuneration.monthlySalary, longTermInsurancePercentage);
      }
      employmentInsurance = calculateEmploymentInsurance(remuneration.monthlySalary, regularEmployeeInsurancePercentage);
      break;
    }
  }

  const result: InsuranceDeductions = {
    healthInsurance,
    employeePensionInsurance,
    longTermCareInsurance,
    employmentInsurance
  };

  // Store the result in the cache
  cache.deductions[basicSalary] = result;

  return result;
};