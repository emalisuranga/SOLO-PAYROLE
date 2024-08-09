import prisma from '../config/prismaClient';
import { getTaxLookupTableA, getTaxLookupTableB } from '../data/lookupTable';

// Cache for lookup tables
const cache = {
  lookupTableA: null as number[][] | null,
  lookupTableB: null as number[][] | null,
};

// Function to fetch and cache lookup tables
const getLookupTableA = async (): Promise<number[][]> => {
  if (!cache.lookupTableA) {
    cache.lookupTableA = await getTaxLookupTableA();
  }
  return cache.lookupTableA;
};

const getLookupTableB = async (): Promise<number[][]> => {
  if (!cache.lookupTableB) {
    cache.lookupTableB = await getTaxLookupTableB();
  }
  return cache.lookupTableB;
};

const getPersonalInfo = async (employeeId: number) => {
  const personalInfo = await prisma.personalInfo.findUnique({
    where: { id: employeeId },
    select: { spouseDeduction: true, dependentDeduction: true },
  });

  if (!personalInfo) {
    throw new Error(`PersonalInfo not found for employeeId ${employeeId}`);
  }

  return personalInfo;
};

// VLOOKUP function
const vlookup = (value: number, table: number[][], colIndex: number): number => {
  for (let i = table.length - 1; i >= 0; i--) {
    if (value >= table[i][0]) {
      return table[i][colIndex - 1];
    }
  }
  return 0;
};

// Calculate tax using a lookup table
const calculateTaxFromLookup = (income: number, lookupTable: number[][]): number => {
  const taxRate = vlookup(income, lookupTable, 2);
  const fixedAmount = vlookup(income, lookupTable, 3);
  return Math.ceil(income * taxRate + fixedAmount);
};

// Calculate total deductions
const calculateTotalDeductions = (spouseDeduction: number, dependentDeduction: number, basicDeductions: number[]): number => {
  return spouseDeduction + dependentDeduction + basicDeductions.reduce((acc, curr) => acc + curr, 0);
};


// Round a number to the nearest ten
const roundToNearestTen = (value: number): number => Math.round(value / 10) * 10;

// Calculate adjusted taxable income
const calculateAdjustedTaxableIncome = async (
  income: number,
  spouseDeduction: number,
  dependentDeduction: number,
  basicDeductions: number[]
): Promise<number> => {
  const lookupTableA = await getLookupTableA();
  const taxFromTable = calculateTaxFromLookup(income, lookupTableA);
  const totalDeductions = calculateTotalDeductions(spouseDeduction, dependentDeduction, basicDeductions);
  return Math.max(income - taxFromTable - totalDeductions, 0);
};

// Calculate income tax
export const calculateIncomeTax = async (taxableIncome: number, employeeId: number): Promise<number> => {
  const { spouseDeduction, dependentDeduction } = await getPersonalInfo(employeeId);
  const basicDeductions = [31667]; // Example value for basic deductions

  const adjustedIncome = await calculateAdjustedTaxableIncome(taxableIncome, spouseDeduction, dependentDeduction, basicDeductions);

  const lookupTableB = await getLookupTableB();
  const taxRate = vlookup(adjustedIncome, lookupTableB, 2);
  const fixedAmount = vlookup(adjustedIncome, lookupTableB, 3);
  const tax = adjustedIncome * taxRate - fixedAmount;

  return roundToNearestTen(tax);
};