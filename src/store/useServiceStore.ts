// store/services.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';  // ← yeh import add karo

export interface Service {
  id: number;
  title: string;
  amount: number;
  image: string;
  description?: string;
  instructions?: string[];
  status?: 'Available' | 'Unavailable';
}

interface ServiceState {
  services: Service[];
  addService: (service: Omit<Service, 'id'>) => void;
  updateService: (id: number, updates: Partial<Service>) => void;
  deleteService: (id: number) => void;
  setServices: (services: Service[]) => void;
}

let nextId = 12; // dummy data ke baad se shuru

export const useServiceStore = create<ServiceState>()(
  persist(   // ← yeh wrapper add kar diya
    (set, _get) => ({
      services: [
        // { id: 1, title: "Eye Check-Up", amount: "250", image: "...", status: "Available" },
{ id: 1, title: "Eye Check-Up",            amount:250 , image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-A8xFt88ol_IFFPfvHwDX7BRHggrjdNlJ3A&s",status: "Available" },
{ id: 2, title: "X-Ray Scan",           amount:300 , image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpELz9ZFRW1OANYWpc7wbI_EaUTuQxvmfh8w&s",status: "Available" },
{ id: 3, title: "Blood Pressure Check",           amount:100 , image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWOmtDXkc5LdDcHOOyzq8LKF7ayjj44STLuA&s",status: "Available" },
{ id: 4, title: "Full Blood Count",           amount:200 , image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT69nxk426GLPjAWMdpA7cfM46PhKN9skYGEA&s",status: "Available" },
{ id: 5, title: "Blood Sugar Test",           amount:150 , image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEKoxJQjDQdLUeE_t6QIrU7rrR706QBsUxMA&s",status: "Available" },
{ id: 6, title: "MRI Scan",           amount:550 , image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6qZ0YWN1wAzhQnFVqjpWr-hrdbgHH4UxDBg&s",status: "Available" },
{ id: 7, title: "ECG / EKG",            amount:650 , image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjB0LzPBabFUv88_WXfqEjcftHnkxGlGy9eA&s",status: "Available" },
{ id: 8, title: "Dental Checkup",           amount:400 , image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIHQUmoXyoNLQbZySBgvCSFi01HwQIcMwkUg&s",status: "Available" },
{ id: 9, title: "Ultrasound",           amount:200 , image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7dNXyN66puVEY6Vw4kPpio22k-KcuDDdTpw&s",status: "Available" },
{ id: 10, title: "Covid-19 Testing",            amount:100 , image: "https://cdn-icons-png.flaticon.com/512/2913/2913584.png",status: "Available" },
{ id: 11, title: "Urinalysis",            amount:250 , image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTykAIrbVf_m8oEsIjUOwWA21zYCaUZanH0oA&s",status: "Available" }
      ],

      addService: (newService) =>
        set((state) => {
          const id = nextId++;
          return {
            services: [
              ...state.services,
              { id, ...newService, status: newService.status ?? 'Available' },
            ],
          };
        }),

      updateService: (id, updates) =>
        set((state) => ({
          services: state.services.map((s) =>
            s.id === id ? { ...s, ...updates } : s
          ),
        })),

      deleteService: (id) =>
        set((state) => ({
          services: state.services.filter((s) => s.id !== id),
        })),

      setServices: (services) => set({ services }),
    }),

    {
      name: 'doctor-services-storage',          // ← localStorage key (browser mein yeh naam se save hoga)
      storage: createJSONStorage(() => localStorage), // ya sessionStorage bhi use kar sakte ho
      partialize: (state) => ({ services: state.services }), // sirf services save karo
      // version: 1, // agar structure change ho to version badha dena
    }
  )
);