import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Stack,
  TextField,
  InputAdornment,
  Chip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

// Zustand store
import { useAppointmentStore } from '../../store/appointments';

const AppointmentsPatient: React.FC = () => {
  // Store se data nikalna
  const { appointments } = useAppointmentStore();
  const [searchTerm, setSearchTerm] = useState('');

  // Search Logic (Patient Name, Doctor ya Service ke liye)
  const filteredAppointments = appointments.filter((app) => {
    const search = searchTerm.toLowerCase();
    return (
      app.patientName.toLowerCase().includes(search) ||
      app.serviceTitle.toLowerCase().includes(search) ||
      app.doctor?.toLowerCase().includes(search)
    );
  });

  return (
    <Container maxWidth="xl" sx={{ mt: 4, pb: 8 }}>
      {/* HEADER + SEARCH BAR */}
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 4, gap: 2 }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 500, color: '#1A5F7A' }}>
            Appointments
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Total Bookings: {appointments.length}
          </Typography>
        </Box>

        {/* ONLY SEARCH BAR */}
        <TextField
          placeholder="Search by name or service..."
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ 
            width: { xs: '100%', md: '400px' }, 
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
      </Stack>

      {/* APPOINTMENTS GRID */}
      <Grid container spacing={3}>
        {filteredAppointments.length === 0 ? (
          <Grid size={{xs:12}}>
            <Paper sx={{ p: 10, textAlign: 'center', borderRadius: '20px', border: '1px dashed #ccc' }}>
              <Typography variant="h6" color="text.secondary">
                No matching appointments found
              </Typography>
            </Paper>
          </Grid>
        ) : (
          filteredAppointments.map((app) => (
            <Grid  size={{xs:12 ,sm:6 ,lg:3}} key={app.id}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: '20px',
                  border: '1px solid #E0F2F0',
                  bgcolor: '#fff',
                  transition: '0.3s',
                  '&:hover': { boxShadow: '0 8px 24px rgba(0,0,0,0.05)' }
                }}
              >
                {/* Patient Name & Basic Info */}
                <Typography variant="h6" sx={{ color: '#1A5F7A', fontWeight: 600 }}>
                  {app.patientName}
                </Typography>
                <Typography variant="caption" color="textSecondary" sx={{ mb: 2, display: 'block' }}>
                  {app.age} yrs | {app.gender} | {app.phone}
                </Typography>

                {/* Service/Doctor Info */}
                <Typography variant="subtitle2" sx={{ color: '#00D2C1', mb: 1 }}>
                  {app.serviceTitle}
                </Typography>

                <Box sx={{ my: 2 }}>
                  <Typography variant="caption" color="textSecondary">Fee Amount</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#333' }}>
                    Rs {app.fee}
                  </Typography>
                </Box>

                {/* Date & Time Slot */}
                <Chip
                  icon={<CalendarMonthIcon sx={{ fontSize: '16px !important', color: '#00D2C1 !important' }} />}
                  label={`${app.date} at ${app.time}`}
                  sx={{
                    bgcolor: '#F1FBF9',
                    color: '#1A5F7A',
                    fontWeight: 500,
                    borderRadius: '50px',
                    width: '100%',
                    justifyContent: 'flex-start',
                    px: 1,
                  }}
                />

                {/* Simple Status Indicator */}
                <Box sx={{ mt: 2, textAlign: 'right' }}>
                   <Typography 
                    variant="caption" 
                    sx={{ 
                        fontWeight: 700, 
                        color: app.status === 'Completed' ? '#00A684' : '#FF9800',
                        textTransform: 'uppercase'
                    }}
                   >
                    ● {app.status}
                   </Typography>
                </Box>
              </Paper>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default AppointmentsPatient;