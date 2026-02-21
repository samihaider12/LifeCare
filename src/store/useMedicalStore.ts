import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import medicalData from '../data/data.json'; // JSON ko import kiya

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  fee: number;
  location?: string;
  image: string;
  totalAppointments?: number;
  completed?: number;
  about?: string;
  patient?: string;
  qualifications?: string;
  consultationFee?: number;
  available?: string;
  experience?: string;
  rating?: string;
  successRate?: string;
  email?: string;
}

interface MedicalState {
  doctors: Doctor[];
  nextDoctorId: number;
  setDoctors: (data: Doctor[]) => void;
  addDoctor: (newDoctor: Omit<Doctor, 'id'>) => void;
  deleteDoctor: (id: string) => void;
}

export const useMedicalStore = create<MedicalState>()(
  persist(
    (set, get) => ({
       
      doctors: medicalData.doctors.map((d: any) => ({ ...d, id: d.id.toString() })) || [],
      nextDoctorId: (Math.max(...(medicalData.doctors?.map((d: any) => Number(d.id)) || [0])) + 1),

      setDoctors: (data: Doctor[]) => {
        if (data.length === 0) {
          set({ doctors: data, nextDoctorId: 1 });
          return;
        }
        const maxId = Math.max(...data.map(d => Number(d.id) || 0));
        set({
          doctors: data.map(d => ({ ...d, id: d.id.toString() })),
          nextDoctorId: maxId + 1,
        });
      },

      addDoctor: (newDoctor: Omit<Doctor, 'id'>) => {
        const currentId = get().nextDoctorId;
        const newId = currentId.toString();

        set(state => ({
          doctors: [
            ...state.doctors,
            { ...newDoctor, id: newId }
          ],
          nextDoctorId: currentId + 1,
        }));
      },

      deleteDoctor: (id: string) => {
        set(state => ({
          doctors: state.doctors.filter(doc => doc.id !== id),
        }));
      },
    }),
    {
      name: 'medical-storage',
      
      onRehydrateStorage: () => (state) => {
        if (state && state.doctors.length === 0) {
          console.log("Storage cleared, reloading from JSON...");
          state.setDoctors(medicalData.doctors);
        }
      },
    }
  )
);