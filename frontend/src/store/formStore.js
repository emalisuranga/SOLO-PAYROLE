import { create } from 'zustand';

const useFormStore = create((set) => ({
  formData: {},
  errors: {},
  setFormData: (newFormData) => set((state) => ({ formData: { ...state.formData, ...newFormData } })),
  clearFormData: () => set({ formData: {} }),
  setErrors: (errors) => set({ errors }),
  clearErrors: () => set({ errors: {} }),
}));

export default useFormStore;