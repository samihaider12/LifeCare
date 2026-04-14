import React, { useState } from 'react';
import {
  Box, Typography, Container, Grid, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Avatar, TextField, InputAdornment, Button,
  Chip,
  Stack
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useMedicalStore } from '../../store/useMedicalStore';
import { useAppointmentStore } from '../../store/appointments';

const AdminDashboard: React.FC = () => {
  const { doctors } = useMedicalStore();
  const { appointments } = useAppointmentStore();

  const [searchTerm, setSearchTerm] = useState("");

  // ── Only doctor appointments (very important!)
  const doctorAppointments = appointments.filter(a => a.category === 'doctor');

  // ── Global stats
  const completedAppointments = doctorAppointments.filter(a => a.status === 'Completed');
  const cancelledAppointments = doctorAppointments.filter(a => a.status === 'Canceled');

  const totalEarnings = completedAppointments.reduce((sum, a) => sum + (a.fee || 0), 0);
  const totalAppointments = doctorAppointments.length;
  const totalCompleted = completedAppointments.length;
  const totalCancelled = cancelledAppointments.length;
 

  const doctorStats = doctors.map((dr) => {
    const appsForThisDoctor = doctorAppointments.filter(
      a => a.doctor === dr.name
    );
    const completedForThisDoctor = appsForThisDoctor.filter(a => a.status === 'Completed');
    const cancelledForThisDoctor = appsForThisDoctor.filter(a => a.status === 'Canceled');

    return {
      ...dr,
      totalAppointments: appsForThisDoctor.length,
      completed: completedForThisDoctor.length,
      cancelled: cancelledForThisDoctor.length,
      earnings: completedForThisDoctor.reduce((sum, a) => sum + (a.fee || 0), 0),
    };
  });

  const filteredDoctors = doctorStats.filter(dr =>
    dr.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dr.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statsCards = [
    { label: 'Total Doctors', value: doctors.length, icon: <PeopleAltIcon />, color: 'white' },
    { label: 'Total Appointments', value: totalAppointments, icon: <CalendarMonthIcon />, color: 'white' },
    { label: 'Completed', value: totalCompleted, icon: <CheckCircleOutlineIcon />, color: 'white' },
    { label: 'Cancelled', value: totalCancelled, icon: <CancelIcon />, color: 'white' },
    {
      label: 'Total Earnings',
      value: `Rs ${totalEarnings}`,
      icon: <AccountBalanceWalletIcon />,
      color: 'white'
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ mt: 3, pb: 6 }}>
      {/* Title */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 500, color: '#0D4F5E' }}>
          Admin Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
          Overview of doctors performance & appointments
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={2.5} sx={{ mb: 5 }}>
        {statsCards.map((stat, idx) => (
          <Grid size={{ xs: 6, sm: 6, md: 3, lg: 2.4 }} key={idx}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                border: '1px solid #e0f0ef',
                bgcolor: stat.color,
                textAlign: 'center',
                transition: 'all 0.25s',
                '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 12px 32px rgba(0,0,0,0.08)' }
              }}
            >
              <Chip
                icon={React.cloneElement(stat.icon, { sx: { fontSize: 28, color: '#0D4F5E' } })}
                label={stat.value}
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
              <Typography variant="body2" sx={{ mt: 1.5, color: '#555', fontWeight: 500 }}>
                {stat.label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Search */}
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            placeholder="Search doctor name or specialty..."
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: { xs: '100%', sm: 400 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#00BFA5' }} />
                </InputAdornment>
              ),
              sx: { borderRadius: 50, bgcolor: 'white' }
            }}
          />
          <Button
            variant="outlined"
            onClick={() => setSearchTerm("")}
            sx={{ borderRadius: 50, px: 4 }}
          >
            Clear
          </Button>
        </Stack>
      </Box>

      {/* Doctors Table */}
      <Paper sx={{ borderRadius: 3, overflow: 'hidden', border: '1px solid #e0f0ef' }}>
        <Box sx={{ p: 3, bgcolor: '#f8fdfc', borderBottom: '1px solid #e0f0ef' }}>
          <Typography variant="h6" sx={{ fontWeight: 500, color: '#0D4F5E' }}>
            Doctors Performance
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Showing {filteredDoctors.length} of {doctors.length} doctors
          </Typography>
        </Box>

        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: '#f0f9f8' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 500, color: '#0D4F5E' }}>Doctor</TableCell>
                <TableCell sx={{ fontWeight: 500, color: '#0D4F5E' }}>Specialty</TableCell>
                <TableCell sx={{ fontWeight: 500, color: '#0D4F5E' }}>Fee</TableCell>
                <TableCell sx={{ fontWeight: 500, color: '#0D4F5E' }}>Appointments</TableCell>
                <TableCell sx={{ fontWeight: 500, color: '#0D4F5E' }}>Completed</TableCell>
                <TableCell sx={{ fontWeight: 500, color: '#0D4F5E' }}>Cancelled</TableCell>
                <TableCell sx={{ fontWeight: 500, color: '#0D4F5E' }}>Earnings</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDoctors.map((dr) => (
                <TableRow key={dr.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar src={dr.image} sx={{ width: 48, height: 48 }} />
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                          {dr.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          ID: {dr.id}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{dr.specialty}</TableCell>
                  <TableCell>Rs {dr.fee?.toLocaleString() || '—'}</TableCell>
                  <TableCell align="center">{dr.totalAppointments}</TableCell>
                  <TableCell align="center" sx={{ color: '#00BFA5', fontWeight: 500 }}>
                    {dr.completed}
                  </TableCell>
                  <TableCell align="center" sx={{ color: '#FF5252', fontWeight: 500 }}>
                    {dr.cancelled}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 500, color: '#0D4F5E' }}>
                    Rs {dr.earnings.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
              {filteredDoctors.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                    <Typography color="text.secondary">No doctors match your search</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default AdminDashboard;