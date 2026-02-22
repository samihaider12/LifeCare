import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Stack,
} from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

// Zustand store import (path adjust kar lena)
import { useServiceStore } from '../../store/useServiceStore'; // ya jo bhi tumhara exact path hai

import { useAppointmentStore } from '../../store/appointments'; // naya store

const ServiceDashboard: React.FC = () => {
  const { services } = useServiceStore();
  const { appointments } = useAppointmentStore();

  // Real calculation – appointments se
  const calculated = React.useMemo(() => {
    const serviceStats = new Map<number, {
      appointments: number;
      completed: number;
      canceled: number;
      earning: number;
    }>();

    // Initialize har service ke liye zero
    services.forEach((s) => {
      serviceStats.set(s.id, { appointments: 0, completed: 0, canceled: 0, earning: 0 });
    });

    // Appointments se count + earning
    appointments.forEach((appt) => {
      const stats = serviceStats.get(appt.serviceId);
      if (stats) {
        stats.appointments += 1;
        if (appt.status === 'Completed') {
          stats.completed += 1;
          stats.earning += appt.fee;
        }
        if (appt.status === 'Canceled') {
          stats.canceled += 1;
        }
      }
    });

    // Totals
    let totalAppointments = 0;
    let totalCompleted = 0;
    let totalCanceled = 0;
    let totalEarnings = 0;

    const serviceWithStats = services.map((service) => {
      const stats = serviceStats.get(service.id) || {
        appointments: 0,
        completed: 0,
        canceled: 0,
        earning: 0,
      };

      totalAppointments += stats.appointments;
      totalCompleted += stats.completed;
      totalCanceled += stats.canceled;
      totalEarnings += stats.earning;

      return {
        ...service,
        ...stats,
      };
    });

    return {
      serviceWithStats,
      totalAppointments,
      totalCompleted,
      totalCanceled,
      totalEarnings,
    };
  }, [services, appointments]); // ← dono change hone pe update

  const {
    serviceWithStats,
    totalAppointments,
    totalCompleted,
    totalCanceled,
    totalEarnings,
  } = calculated;


  const statsCards = [
    {
      label: 'Total Services',
      value: services.length.toString(),
      icon: <MedicalServicesIcon />,
      color: '#E0F2F1',
    },
    {
      label: 'Total Appointments',
      value: totalAppointments.toString(),
      icon: <AssignmentIcon />,
      color: '#E3F2FD',
    },
    {
      label: 'Total Earnings',
      value: `Rs ${totalEarnings.toLocaleString()}`,
      icon: <AccountBalanceWalletIcon />,
      color: '#E8F5E9',
    },
    {
      label: 'Completed',
      value: totalCompleted.toString(),
      icon: <CheckCircleIcon />,
      color: '#F1F8E9',
    },
    {
      label: 'Canceled',
      value: totalCanceled.toString(),
      icon: <CancelIcon />,
      color: '#FFEBEE',
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ mt: 4, pb: 6 }}>
      <Typography variant="h4" sx={{ fontWeight: 500, color: '#1A5F7A', mb: 1 }}>
        Service Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 5 }}>
        Aapke services, appointments aur total kamai ka overview
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {statsCards.map((stat, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              textAlign: "center"
            }}
            key={index}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                 width: '100%',
                maxWidth: { xs: '250px', sm: '100%' },
                flexDirection: 'column', // Icon upar, text neeche
                justifyContent: 'center',
                gap: 1,
                border: '1px solid #e0f2f1',
                transition: 'all 0.2s',
                '&:hover': {
                  boxShadow: '0 6px 24px rgba(0,210,193,0.15)',
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <Avatar
                sx={{
                  bgcolor: stat.color,
                  width: 45,
                  height: 45,
                  color: '#1A5F7A',
                }}
              >
                {stat.icon}
              </Avatar>
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">
                  {stat.label}
                </Typography>
                <Typography variant="h5" fontWeight={500} color="#1A5F7A">
                  {stat.value}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Services Table */}
      <Paper
        sx={{
          borderRadius: '20px',
          overflow: 'hidden',
          border: '1px solid #e0f2f1',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        }}
      >
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: '#F9FEFB' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 500, color: '#1A5F7A', pl: 3 }}>
                  Service
                </TableCell>
                <TableCell sx={{ fontWeight: 500, color: '#1A5F7A' }}>Price</TableCell>
                <TableCell sx={{ fontWeight: 500, color: '#1A5F7A' }}>Appointments</TableCell>
                <TableCell sx={{ fontWeight: 500, color: '#1A5F7A' }}>Completed</TableCell>
                <TableCell sx={{ fontWeight: 500, color: '#1A5F7A' }}>Canceled</TableCell>
                <TableCell sx={{ fontWeight: 500, color: '#1A5F7A' }}>Earning</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {serviceWithStats.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} sx={{ textAlign: 'center', py: 6 }}>
                    <Typography variant="h6" color="text.secondary">
                      Abhi koi service add nahi hui
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                serviceWithStats.map((item) => (
                  <TableRow key={item.id} hover sx={{ '&:last-child td': { border: 0 } }}>
                    <TableCell sx={{ pl: 3 }}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar
                          variant="rounded"
                          src={item.image}
                          sx={{ width: 48, height: 48 }}
                        />
                        <Typography fontWeight={500} color="#1A5F7A">
                          {item.title}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>Rs {item.amount}</TableCell>
                    <TableCell>{item.appointments}</TableCell>
                    <TableCell>
                      <Box component="span" sx={{ color: '#4CAF50', fontWeight: 500 }}>
                        {item.completed}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box component="span" sx={{ color: '#F44336', fontWeight: 500 }}>
                        {item.canceled}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight={500} color="#1A5F7A">
                        Rs {item.earning.toLocaleString()}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Footer note */}
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ mt: 4, display: 'block', textAlign: 'center' }}
      >
        Yeh stats abhi demo ke liye random generate ho rahe hain • Real app mein appointments data se sync honge
      </Typography>
    </Container>
  );
};

export default ServiceDashboard;