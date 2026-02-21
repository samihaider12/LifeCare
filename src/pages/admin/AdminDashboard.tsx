import React, { useState } from 'react';
import { 
  Box, Typography, Container, Grid, Paper, Table,Stack, 
  TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Avatar, TextField, InputAdornment, Button 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useMedicalStore } from '../../store/useMedicalStore';
import { useAppointmentStore } from '../../store/appointments';

const AdminDashboard: React.FC = () => {
  const { doctors } = useMedicalStore();
  const { appointments } = useAppointmentStore();

  const [searchTerm, setSearchTerm] = useState("");

  // ── Stats from REAL appointments
  const completedAppointments = appointments.filter(a => a.status === 'Completed');

  const totalEarnings = completedAppointments.reduce((sum, a) => sum + a.fee, 0);
  const totalAppointments = appointments.length;
  const totalCompleted  = completedAppointments.length;

  // Per doctor stats (grouped)
  const doctorStats = doctors.map((dr) => {
    const appsForThisDoctor = appointments.filter(a => a.serviceId === Number(dr.id));
    const completedForThisDoctor = appsForThisDoctor.filter(a => a.status === 'Completed');

    return {
      ...dr,
      totalAppointments: appsForThisDoctor.length,
      completed: completedForThisDoctor.length,
      earnings: completedForThisDoctor.reduce((sum, a) => sum + a.fee, 0),
    };
  });

  const filteredDoctors = doctorStats.filter(dr =>
    dr.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dr.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statsCards = [
    { label: 'Total Doctors',       value: doctors.length,                     icon: <PeopleAltIcon />, color: '#E3F2FD' },
    { label: 'Total Registered Users', value: 76,                           icon: <PeopleAltIcon />, color: '#F1FBF3' }, // ← keep dummy or connect later
    { label: 'Total Appointments',  value: totalAppointments,                  icon: <CalendarMonthIcon />, color: '#FFF3E0' },
    { label: 'Total Earnings',      value: `Rs:${totalEarnings.toLocaleString()}`, icon: <AccountBalanceWalletIcon />, color: '#E8F5E9' },
    { label: 'Completed',           value: totalCompleted,                     icon: <CheckCircleOutlineIcon />, color: '#F3E5F5' },
  ];


  return (
    <Container maxWidth="xl" sx={{ mt: 2, pb: 5 }}>
      {/* Page Title */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 500, color: '#1A2E35', letterSpacing: 1 }}>
          DASHBOARD
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Overview of doctors & appointments
        </Typography>
      </Box>

      {/* Stats Cards Row */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {statsCards.map((stat, index) => (
          <Grid  size={{xs:12 ,sm:6 ,md:2.4}} key={index}>
            <Paper elevation={0} sx={{ 
              p: 2, 
              borderRadius: '25px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1.5,
              bgcolor: '#FFFFFF',
              border: '1px solid #f0f0f0'
            }}>
              <Avatar sx={{ bgcolor: stat.color, color: '#1A2E35', width: 40, height: 40 }}>
                {stat.icon}
              </Avatar>
              <Box>
                <Typography variant="caption" sx={{ color: '#666', fontSize: '11px', fontWeight: 500 }}>
                  {stat.label}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight:500, lineHeight: 1.2 }}>
                  {stat.value}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Search Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>Search doctors</Typography>
        <Stack direction="row" spacing={2}>
          <TextField
            placeholder="Search name ..."
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ 
              width: '350px', 
              '& .MuiOutlinedInput-root': { borderRadius: '50px', bgcolor: '#fff' } 
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#00D2C1' }} />
                </InputAdornment>
              ), 
            }}
          />
          <Button 
            variant="contained" 
            onClick={() => setSearchTerm("")}
            sx={{ bgcolor: '#00D2C1', borderRadius: '50px', px: 3, textTransform: 'none', '&:hover': { bgcolor: '#00b8a9' } }}
          >
            Clear
          </Button>
        </Stack>
      </Box>

      {/* Doctors Table Section */}
      <Paper sx={{ borderRadius: '15px', overflow: 'hidden', border: '1px solid #f0f0f0', boxShadow: 'none' }}>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Doctors</Typography>
          <Typography variant="caption" color="textSecondary">Showing {filteredDoctors.length} of {doctors.length}</Typography>
        </Box>
        
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: '#F9FEFB' }}>
              <TableRow>
                <TableCell sx={{ color: '#666', fontWeight: 500 }}>DOCTOR</TableCell>
                <TableCell sx={{ color: '#666', fontWeight: 500 }}>SPECIALIZATION</TableCell>
                <TableCell sx={{ color: '#666', fontWeight: 500 }}>FEE</TableCell>
                <TableCell sx={{ color: '#666', fontWeight: 500 }}>APPOINTMENTS</TableCell>
                <TableCell sx={{ color: '#666', fontWeight: 500 }}>COMPLETED</TableCell>
                <TableCell sx={{ color: '#666', fontWeight: 500 }}>TOTAL EARNINGS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
             {filteredDoctors.map((dr) => (
    <TableRow key={dr.id}>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar src={dr.image} sx={{ width: 40, height: 40 }} />
          <Box>
            <Typography variant="subtitle2">{dr.name}</Typography>
            <Typography variant="caption" color="textSecondary">ID: {dr.id}</Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell>{dr.specialty}</TableCell>
      <TableCell>Rs:{dr.fee}</TableCell>
      <TableCell>{dr.totalAppointments}</TableCell>
      <TableCell sx={{ color: '#00D2C1', fontWeight: 600 }}>
        {dr.completed}
      </TableCell>
      <TableCell sx={{ fontWeight: 600 }}>
        Rs:{dr.earnings.toLocaleString()}
      </TableCell>
    </TableRow>
  ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default AdminDashboard;