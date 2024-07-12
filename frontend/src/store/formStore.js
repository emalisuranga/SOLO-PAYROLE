import { create } from 'zustand';

const useFormStore = create((set) => ({
  formData: {},
  setFormData: (newFormData) => set((state) => ({ formData: { ...state.formData, ...newFormData } })),
  clearFormData: () => set({ formData: {} }),
  errors: {},
  setErrors: (errors) => set({ errors }),
}));

export default useFormStore;