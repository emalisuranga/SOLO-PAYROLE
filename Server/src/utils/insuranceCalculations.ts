import { getMonthlyRemunerationDetails } from '../models/monthlyRemuneration';
import { getSocialInsuranceCalculationDetails } from '../models/socialInsuranceCalculation';
import { calculateHealthInsurance, calculateEmployeePensionInsurance, calculateLongTermCareInsurance, calculateEmploymentInsurance } from '../helpers/insuranceCalculations';
import { calculateAge } from '../helpers/ageCalculation';
import { cache } from '../cache/cache';
import { InsuranceDeductions } from '../types/InsuranceCalculationInterfaces';

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
  } = await getSocialInsuranceCalculationDetails();

  const monthlyRemunerations = await getMonthlyRemunerationDetails();

  let healthInsurance = 0;
  let employeePensionInsurance = 0;
  let longTermCareInsurance = 0;
  let employmentInsurance = 0;
  const age = calculateAge(dateOfBirth);

  for (const remuneration of monthlyRemunerations) {
    if (basicSalary >= remuneration.remunerationStartSalary && basicSalary <= remuneration.remunerationEndSalary) {
      healthInsurance = calculateHealthInsurance(remuneration.monthlySalary, healthInsurancePercentage);
      employeePensionInsurance = calculateEmployeePensionInsurance(
        remuneration.monthlySalary,
        pensionStartSalary,
        pensionEndSalary,
        pensionStartMonthlySalary,
        pensionEndMonthlySalary,
        employeePensionPercentage
      );
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