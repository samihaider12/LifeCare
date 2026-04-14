import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Stack,
  TextField,
  MenuItem,
  Button,
  InputAdornment,
  Chip,
  Select,
} from '@mui/material';
 import type {SelectChangeEvent,} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

// Zustand store
import { useAppointmentStore } from '../../store/appointments'; // adjust path

const Appointments: React.FC = () => {
  const { appointments, updateAppointmentStatus } = useAppointmentStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [specialty, setSpecialty] = useState('All specialties');

  const doctorAppointments = appointments.filter(app => app.category === 'doctor');

  const filteredAppointments = doctorAppointments.filter((app) => {
    const matchesSearch =
      app.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.doctor || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.specialty || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSpecialty =
      specialty === 'All specialties' || app.specialty === specialty;

    return matchesSearch && matchesSpecialty;
  });

  const handleStatusChange = (id: number, event: SelectChangeEvent<string>) => {
    const newStatus = event.target.value as 'Pending' | 'Confirmed' | 'Completed' | 'Canceled';
    updateAppointmentStatus(id, newStatus);
  };


  return (
    <Container maxWidth="xl" sx={{ mt: 4, pb: 8 }}>
      <Grid container direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="flex-start" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 500, color: '#1A5F7A' }}>
            Doctor Appointments
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Manage upcoming appointments with doctors
          </Typography>
        </Box>

        <Stack direction="row" spacing={2} sx={{ mt: { xs: 2, md: 0 } }}>
          <TextField
            placeholder="Search patient, doctor, specialty..."
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: '300px', bgcolor: '#fff', borderRadius: '8px' }}
            InputProps={{
              startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#00D2C1' }} /></InputAdornment>,
            }}
          />

          <TextField select size="small" value={specialty} onChange={(e) => setSpecialty(e.target.value)}
            sx={{ minWidth: '150px', bgcolor: '#fff', borderRadius: '8px' }}>
            <MenuItem value="All specialties">All specialties</MenuItem>
            <MenuItem value="Ophthalmology">Ophthalmology</MenuItem>
            <MenuItem value="Oncologist">Oncologist</MenuItem>
            {/* add more */}
          </TextField>

          <Button variant="contained" sx={{ bgcolor: '#00D2C1', borderRadius: '8px', px: 3 }}
            onClick={() => { setSearchTerm(''); setSpecialty('All specialties'); }}>
            Clear
          </Button>
        </Stack>
      </Grid>
      
      {/* APPOINTMENTS GRID */}
      <Grid container spacing={3}>
        {filteredAppointments.length === 0 ? (
          <Grid size={12}>
            <Paper sx={{ p: 4, textAlign: 'center', borderRadius: '20px' }}>
              <Typography variant="h6" color="text.secondary">
                No appointments 
              </Typography>
            </Paper>
          </Grid>
        ) : (
          filteredAppointments.map((app) => (
            <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={app.id}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: '20px',
                  border: '1px solid #E0F2F1',
                  bgcolor: '#fff',
                  position: 'relative',
                }}
              >
                {/* Patient Info */}
                <Typography variant="h6" sx={{ color: '#1A5F7A', fontWeight: 600 }}>
                  {app.patientName}
                </Typography>
                <Typography variant="caption" color="textSecondary" sx={{ mb: 2, display: 'block' }}>
                  {app.age ? `${app.age} yrs` : ''} {app.gender ? `: ${app.gender}` : ''} {app.phone ? `: ${app.phone}` : ''}
                </Typography>

                <Typography variant="subtitle2" sx={{ color: '#00D2C1', mb: 0.5 }}>
                  {app.doctor || 'N/A'} {app.specialty ? `: ${app.specialty}` : ''}
                </Typography>

                <Box sx={{ my: 2 }}>
                  <Typography variant="caption" color="textSecondary">Fees</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#333' }}>
                    Rs {app.fee}
                  </Typography>
                </Box>

                {/* Date & Time */}
                <Chip
                  icon={<CalendarMonthIcon sx={{ fontSize: '16px !important', color: '#00D2C1 !important' }} />}
                  label={`${app.date} — ${app.time}`}
                  sx={{
                    bgcolor: '#F1FBF9',
                    color: '#1A5F7A',
                    fontWeight: 500,
                    borderRadius: '50px',
                    mb: 2,
                    width: '100%',
                    justifyContent: 'flex-start',
                    px: 1,
                  }}
                />

                {/* Status + Admin Actions */}
                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                  <Select
                    size="small"
                    value={app.status}
                    onChange={(e) => handleStatusChange(app.id, e)}
                    sx={{
                      borderRadius: '50px',
                      fontSize: '11px',
                      fontWeight: 500,
                      width:"100px",
                      '& .MuiSelect-select': { py: '6px' },
                    }}
                  >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Confirmed">Confirmed</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                    <MenuItem value="Canceled">Canceled</MenuItem>
                  </Select>

                  
                </Stack>
              </Paper>
            </Grid>
          ))
        )}
      </Grid>

      {/* Show More (static for now – baad mein pagination add kar sakte hain) */}
      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Button
          variant="outlined"
          sx={{ borderRadius: '50px', px: 4, py: 1, borderColor: '#E0E0E0', color: '#555', textTransform: 'none' }}
        >
          Show more ({appointments.length - filteredAppointments.length} remaining)
        </Button>
      </Box>
    </Container>
  );
};

export default Appointments;