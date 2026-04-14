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
  Chip,
} from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import { useServiceStore } from '../../store/useServiceStore';
import { useAppointmentStore } from '../../store/appointments';

const ServiceDashboard: React.FC = () => {
  const { services } = useServiceStore();
  const { appointments } = useAppointmentStore();

  const calculated = React.useMemo(() => {
    // Sirf service category ke appointments
    const serviceAppointments = appointments.filter(app => app.category === 'service');

    const serviceStats = new Map<number, {
      appointments: number;
      completed: number;
      canceled: number;
      earning: number;
    }>();

    // Har service ke liye zero initialize
    services.forEach((s) => {
      serviceStats.set(s.id, { appointments: 0, completed: 0, canceled: 0, earning: 0 });
    });

    // Appointments se count + earning update
    serviceAppointments.forEach((appt) => {
      if (appt.serviceId !== undefined) {
        const stats = serviceStats.get(appt.serviceId);
        if (stats) {
          stats.appointments += 1;
          if (appt.status === 'Completed') {
            stats.completed += 1;
            stats.earning += appt.fee || 0;
          }
          if (appt.status === 'Canceled') {
            stats.canceled += 1;
          }
        }
      }
    });

    // Totals calculate
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
  }, [services, appointments]);  

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
      color: 'white',
    },
    {
      label: 'Total Appointments',
      value: totalAppointments,
      icon: <AssignmentIcon />,
      color: 'white',
    },
    {
      label: 'Completed',
      value: totalCompleted,
      icon: <CheckCircleIcon />,
      color: 'white',
    },
    {
      label: 'Cancelled',
      value: totalCanceled,
      icon: <CancelIcon />,
      color: 'white',
    },
     {
      label: 'Total Earnings',
      value: `Rs ${totalEarnings}`,
      icon: <AccountBalanceWalletIcon />,
      color: 'white',
    }
  ];

  return (
    <Container maxWidth="xl" sx={{ mt: 4, pb: 6 }}>
      <Typography variant="h4" sx={{ fontWeight: 500, color: ' black', mb: 1 }}>
        Service Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 5 }}>
        Overview Service Appointments
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {statsCards.map((stat, index) => (
          <Grid
            size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}
            sx={{ display: 'flex', justifyContent: 'center' }}
            key={index}
          >
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1.5,
                border: '1px solid #e0f2f1',
                width: '100%',
                maxWidth: 280,
                transition: 'all 0.25s',
                '&:hover': {
                  boxShadow: '0 8px 28px rgba(0,210,193,0.18)',
                  transform: 'translateY(-5px)',
                },
              }}
            >
              
               <Chip
                      icon={React.cloneElement(stat.icon, { sx: { fontSize: 28, color: '#0D4F5E' } })}
                      label= {stat.value}
                      sx={{
                        bgcolor: 'transparent',
                        color: '#0D4F5E',
                        fontSize: '17px',
                        fontWeight: 500,
                        height: 'auto',
                        p: '12px 16px',
                        '& .MuiChip-label': { px: 1.5 },
                        '& .MuiChip-icon': { ml: 0, mr: 1.2 }
                      }}
                    />
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                  {stat.label}
                </Typography>
                {/* <Typography variant="h5" fontWeight={500} color=" #555">
                  {stat.value}
                </Typography> */}
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
          boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
        }}
      >
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: '#F9FEFB' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 500, color: '#0D4F5E', pl: 4 }}>Service</TableCell>
                <TableCell sx={{ fontWeight: 500, color: '#0D4F5E' }}>Fee</TableCell>
                <TableCell sx={{ fontWeight: 500, color: '#0D4F5E' }} align="center">Appointments</TableCell>
                <TableCell sx={{ fontWeight: 500, color: '#0D4F5E' }} align="center">Completed</TableCell>
                <TableCell sx={{ fontWeight: 500, color: '#0D4F5E' }} align="center">Canceled</TableCell>
                <TableCell sx={{ fontWeight: 500, color: '#0D4F5E' }} align="right">Earning</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {serviceWithStats.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} sx={{ py: 8, textAlign: 'center' }}>
                    <Typography variant="h6" color="text.secondary">
                      No services or appointments yet
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                serviceWithStats.map((item) => (
                  <TableRow key={item.id} hover>
                    <TableCell sx={{ pl: 4 }}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar variant="rounded" src={item.image} sx={{ width: 52, height: 52 }} />
                       <Box>
                         <Typography fontWeight={500} color=" black">
                          {item.title}
                        </Typography>
                        <Typography variant="caption" color=" black" >
                         ID: {item.id}
                        </Typography>
                       </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>Rs {item.amount?.toLocaleString() || '—'}</TableCell>
                    <TableCell align="center">{item.appointments}</TableCell>
                    <TableCell align="center">
                      <Typography sx={{ color: '#4CAF50', fontWeight: 500 }}>
                        {item.completed}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography sx={{ color: '#F44336', fontWeight: 500 }}>
                        {item.canceled}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography fontWeight={500} color=" black">
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

      
    </Container>
  );
};

export default ServiceDashboard;