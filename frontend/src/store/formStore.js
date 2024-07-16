import { create } from 'zustand';

const useFormStore = create((set) => ({
  formData: {},
  errors: {},
  setFormData: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),
  clearFormData: () => set({ formData: {} }),
  setErrors: (errors) => set({ errors }),
}));

export default useFormStore;