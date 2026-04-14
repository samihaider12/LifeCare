import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme/theme';
import ScrollToTop from './components/ScrollToTop';

// Layouts
import PatientLayout from './components/layouts/PatientLayout'; // Patient Navbar/Footer wrapper
import AdminLayout from './components/layouts/AdminLayout';     // Admin Pill-Navbar wrapper

// Patient Pages
import Home from './pages/patient/Home'; 
import MedicalExpertsHeader from './pages/patient/doctor/MedicalExpertsHeader'; 
import Services from './pages/patient/Services';
import ContactSection from './pages/patient/ContactSection';
import DoctorBookingPage from './pages/patient/doctor/DoctorBookingPage';
import ServiceBookingPage from './components/ServiceBookingPage';
import AppointmentsPatient from './pages/patient/AppointmentsPatient';
 



import { useEffect } from 'react';
import { useMedicalStore } from './store/useMedicalStore';
// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AddDoctor from './pages/admin/AddDoctor'; // Agar page bana liya hai
import ListDoctors from './pages/admin/ListDoctors';
import Appointments from './pages/admin/Appointments';
import ServiceDashboard from './pages/admin/ServiceDashboard';
import AddService from './pages/admin/AddService';
import ServicesAppointment from './pages/admin/ServicesAppointment';
import ServicesList from './pages/admin/ListServices';
import AuthForm from './auth/AuthForm'
import ProtectedRoute from './components/ProtectedRoute';
import PatientProfileForm from './pages/patient/PatientProfile';
function App() {
  const { doctors, setDoctors } = useMedicalStore();

  useEffect(() => {
    if (doctors.length === 0) {
      setDoctors(doctors);
    }
  }, [doctors, setDoctors]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* 1. Auth Route (Public) */}
          <Route path="/login" element={<AuthForm />} />
          <Route path="patient-profile" element={<PatientProfileForm/>} />
          {/* 2. Patient Portal Routes (Public) */}
          <Route element={<PatientLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<MedicalExpertsHeader />} />
            <Route path="/doctor/:id" element={<DoctorBookingPage />} />
            <Route path="/services" element={<Services />} />
            <Route path="/service/:serviceId" element={<ServiceBookingPage />} />
            <Route path="/contact" element={<ContactSection />} />
            <Route path="/appointmentsPatient" element={<AppointmentsPatient />} />
          </Route>

          {/* 3. Admin Protected Routes (Private) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin-2p4" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="addDoctor" element={<AddDoctor />} />
              <Route path="listDoctors" element={<ListDoctors />} />
              <Route path="appointments" element={<Appointments />} />
              <Route path="serviceDashboard" element={<ServiceDashboard />} />
              <Route path="addService" element={<AddService />} />
              <Route path="servicesAppointment" element={<ServicesAppointment />} />
              <Route path="servicesList" element={<ServicesList />} />
            </Route>
          </Route>
          
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;