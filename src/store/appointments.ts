// store/appointments.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Appointment = {
  id: number;                
  patientName: string;
  age: string;
  gender: string;
  phone: string;
  serviceId: number;             
  serviceTitle: string;           
  doctor: string;                  
  specialty: string;
  fee: number;
  date: string;
  time: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Canceled';
  createdAt: string;
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