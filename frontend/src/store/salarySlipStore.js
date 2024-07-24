import { create } from 'zustand';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Adjust the base URL as needed
});

const useSalarySlipStore = create((set) => ({
  salarySlip: null,
  loading: false,
  error: null,
  fetchSalarySlipDetails: async (employeeId, paymentDetailsId) => {
    set({ loading: true, error: null });
    try {
      const response = await api.get(`/salary-slip/${employeeId}/${paymentDetailsId}`);
      set({ salarySlip: response.data.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to fetch salary slip details',
        loading: false,
      });
    }
  },
}));

export default useSalarySlipStore;