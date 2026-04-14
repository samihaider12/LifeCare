import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type AppointmentCategory = 'doctor' | 'service';

export type Appointment = {
  id: number;
  category: AppointmentCategory;     // required
  // Doctor-specific
  doctor?: string; 
  specialty?: string; 
  // Service-specific
  serviceId?: number;
  serviceTitle?: string;

  fee: number;
  date: string;
  time: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Canceled';
  createdAt: string;
  // cash:number;
};

type AppointmentState = {
  appointments: Appointment[];
  nextId: number;
  addAppointment: (app: Omit<Appointment, 'id'>) => void;
  updateAppointmentStatus: (id: number, status: Appointment['status']) => void;
};

export const useAppointmentStore = create<AppointmentState>()(
  persist(
    (set) => ({
      appointments: [],
      nextId: 1,
      addAppointment: (appData) =>
        set((state) => ({
          appointments: [...state.appointments, { ...appData, id: state.nextId }],
          nextId: state.nextId + 1,
        })),
      updateAppointmentStatus: (id, status) =>
        set((state) => ({
          appointments: state.appointments.map((app) =>
            app.id === id ? { ...app, status } : app
          ),
        })),
    }),
    {
      name: 'appointments-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);