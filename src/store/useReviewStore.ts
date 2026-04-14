import { create } from 'zustand';

// Sirf Patient Review ka structure
interface Review {
  idReview: number;
  name: string;
  role: string; // "Patient"
  rating: number;
  text: string;
}

interface ReviewState {
  patients: Review[];
  // Actions
  setPatients: (pat: Review[]) => void;
  addPatientReview: (review: Review) => void;
}

export const useReviewStore = create<ReviewState>((set) => ({
  patients: [],

  // Initial patients load karne ke liye
  setPatients: (pat) => set({ patients: pat }),

  // Naya review add karne aur LocalStorage mein save karne ke liye
  addPatientReview: (review) =>
    set((state) => {
      const updatedPatients = [review, ...state.patients];
      
      // LocalStorage update karein taake refresh par data na jaye
      localStorage.setItem('local_patient_reviews', JSON.stringify(updatedPatients));
      
      return { patients: updatedPatients };
    }),
}));