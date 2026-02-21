import { create } from 'zustand';

interface Review {
  id: number;
  name: string;
  role: string;
  rating: number;
  img: string;
  text: string;
}

interface ReviewState {
  professionals: Review[];
  patients: Review[];
  setReviews: (pro: Review[], pat: Review[]) => void;
}

export const useReviewStore = create<ReviewState>((set) => ({
  professionals: [],
  patients: [],
  setReviews: (pro, pat) => set({ professionals: pro, patients: pat }),
}));