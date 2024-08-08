import { InsuranceCalculationCache } from '../types/InsuranceCalculationInterfaces';

// In-memory cache object
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

export { cache, clearCache };