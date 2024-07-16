import { create } from 'zustand';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

const useEmployeeStore = create((set) => ({
  employees: [],
  employee: null,
  loading: false,
  error: null,
  fetchEmployees: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get('/employees');
      set({ employees: response.data.data || [], loading: false });
    } catch (error) {
      console.error('Error fetching data:', error);
      set({ error: 'Error fetching data', loading: false });
    }
  },
  fetchEmployeeDetails: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await api.get(`/employees/${id}`);
      set({ employee: response.data.data, loading: false });
    } catch (error) {
      console.error('Error fetching employee details:', error);
      set({ error: 'Error fetching employee details', loading: false });
    }
  },
}));

export default useEmployeeStore;