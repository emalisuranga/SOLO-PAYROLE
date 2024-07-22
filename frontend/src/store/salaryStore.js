import { create } from "zustand";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

const useSalaryStore = create((set) => ({
  salaries: [],
  salary: null,
  loading: false,
  error: null,
  fetchSalaries: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get("/salary-details");
      set({ salaries: response.data.data || [], loading: false });
    } catch (error) {
      set({ error: "Error fetching data", loading: false });
    }
  },
  fetchSalaryDetails: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await api.get(`/salary-details/${id}`);
      set({ salary: response.data.data, loading: false });
      return response.data.data;
    } catch (error) {
      console.error("Error fetching salary details:", error);
      set({ error: "Error fetching salary details", loading: false });
    }
  },
  saveSalary: async (data) => {
    try {
      const response = await api.post("/salary-details/save", data);
      return response.data;
    } catch (error) {
      console.error("Error saving salary data:", error);
      throw error;
    }
  },
  updateSalary: async (data) => {
    try {
      const response = await api.put(`/salary-details/${data.id}`, data);
      return response.data;
    } catch (error) {
      console.error("Error updating salary data:", error);
      throw error;
    }
  },
  deleteSalary: async (id) => {
    try {
      const response = await api.delete(`/salary-details/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting salary data:", error);
      throw error;
    }
  },
}));

export default useSalaryStore;