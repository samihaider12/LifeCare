import React, { useState } from 'react';
import {
  Box, Typography, Container, Grid, Paper, Stack,
  TextField, MenuItem, Avatar, InputAdornment, Button, Select
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import type { SelectChangeEvent } from '@mui/material';

// Zustand store
import { useAppointmentStore } from '../../store/appointments'; // path adjust

const ServicesAppointment: React.FC = () => {
  const { appointments, updateAppointmentStatus } = useAppointmentStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredAppointments = appointments.filter((item) => {
    const matchesSearch = item.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.serviceTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);

    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (id: number, event: SelectChangeEvent<string>) => {
    const newStatus = event.target.value as 'Pending' | 'Confirmed' | 'Completed' | 'Canceled';
    updateAppointmentStatus(id, newStatus);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: '30px', pb: '50px' }}>
      {/* HEADER */}
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: '30px' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 500, color: '#1A5F7A' }}>Appointments</Typography>
          <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 500 }}>
            Manage patient bookings — quick search & status controls
          </Typography>
        </Box>
        <Stack direction="row" spacing="15px" alignItems="center">
          <TextField
            placeholder="Search by patient or service..."
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: '280px', '& .MuiOutlinedInput-root': { borderRadius: '50px', bgcolor: '#fff' } }}
            InputProps={{
              startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#00D2C1' }} /></InputAdornment>,
            }}
          />
          <Select
            size="small"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            sx={{ borderRadius: '50px', minWidth: '100px', bgcolor: '#fff' }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Confirmed">Confirmed</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Canceled">Canceled</MenuItem>
          </Select>
        </Stack>
      </Stack>

      <Typography variant="caption" sx={{ display: 'block', mb: '10px', fontWeight: 500, color: '#666' }}>
        {filteredAppointments.length} results
      </Typography>

      {/* APPOINTMENT CARDS */}
      <Grid container spacing={3} alignItems="stretch">
        {filteredAppointments.length === 0 ? (
          <Grid size={12}>
            <Paper sx={{ p: 4, textAlign: 'center', borderRadius: '15px' }}>
              <Typography color="text.secondary">No bookings found</Typography>
            </Paper>
          </Grid>
        ) : (
          filteredAppointments.map((item) => (
            <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={item.id} sx={{ display: 'flex' }}>
              <Paper elevation={0} sx={{
                p: '20px',
                borderRadius: '15px',
                border: '1px solid #E0F2F1',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative'
              }}>
                <Box>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: '15px' }}>
                    <Stack direction="row" spacing="12px" alignItems="center">
                      <Avatar sx={{ bgcolor: '#F0FDF4', color: '#00D2C1', width: '35px', height: '35px' }}>
                        <Typography sx={{ fontSize: '14px' }}>{item.patientName.charAt(0)}</Typography>
                      </Avatar>
                      <Box>
                        <Typography sx={{ fontWeight: 500, color: '#1A5F7A', fontSize: '14px' }}>
                          {item.patientName}
                        </Typography>
                        <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 500 }}>
                          {item.gender} • {item.age}
                        </Typography>
                      </Box>
                    </Stack>

                    <Box sx={{ textAlign: 'right' }}>
                      <Box sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        bgcolor: item.status === 'Completed' ? '#E3F2FD' : item.status === 'Canceled' ? '#FFEBEE' : '#FFF3E0',
                        color: item.status === 'Completed' ? '#1976D2' : item.status === 'Canceled' ? '#D32F2F' : '#F57C00',
                        px: '12px', py: '4px', borderRadius: '50px', mb: '5px'
                      }}>
                        <Typography sx={{ fontSize: '11px', fontWeight: 500 }}>{item.status}</Typography>
                      </Box>
                      <Select
                        size="small"
                        value={item.status}
                        onChange={(e) => handleStatusChange(item.id, e)}
                        sx={{
                          height: '25px', fontSize: '11px', borderRadius: '5px', width: '90px',
                          '& .MuiSelect-select': { py: '2px' }
                        }}
                      >
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Confirmed">Confirmed</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                        <MenuItem value="Canceled">Canceled</MenuItem>
                      </Select>
                    </Box>
                  </Stack>

                  <Stack spacing="10px" sx={{ mb: '15px' }}>
                    <Stack direction="row" spacing="10px" alignItems="center">
                      <PhoneInTalkIcon sx={{ fontSize: '16px', color: '#00D2C1' }} />
                      <Typography sx={{ fontSize: '13px', fontWeight: 500 }}>{item.phone}</Typography>
                    </Stack>
                    <Stack direction="row" spacing="10px" alignItems="center">
                      <CurrencyRupeeIcon sx={{ fontSize: '16px', color: '#00D2C1' }} />
                      <Typography sx={{ fontSize: '13px', fontWeight: 500 }}>Fees: ₹{item.fee}</Typography>
                    </Stack>
                    <Stack direction="row" spacing="10px" alignItems="center">
                      <CalendarTodayIcon sx={{ fontSize: '16px', color: '#00D2C1' }} />
                      <Typography sx={{ fontSize: '13px', fontWeight: 500 }}>Date: {item.date}</Typography>
                    </Stack>
                    <Stack direction="row" spacing="10px" alignItems="center">
                      <AccessTimeIcon sx={{ fontSize: '16px', color: '#00D2C1' }} />
                      <Typography sx={{ fontSize: '13px', fontWeight: 500 }}>Time: {item.time}</Typography>
                    </Stack>
                  </Stack>

                  <Typography sx={{ fontSize: '13px', fontWeight: 500, color: '#666' }}>
                    Service: <span style={{ color: '#004D40' }}>{item.serviceTitle || 'General Consultation'}</span>
                  </Typography>
                </Box>

                <Stack direction="row" spacing="8px" sx={{ mt: '20px' }}>
                  <Button variant="outlined" fullWidth sx={{ borderRadius: '8px', textTransform: 'none', fontSize: '12px', fontWeight: 500, color: '#666', borderColor: '#E0E0E0', bgcolor: '#F5F5F5' }}>
                    Reschedule
                  </Button>
                  <Button variant="outlined" fullWidth sx={{ borderRadius: '8px', textTransform: 'none', fontSize: '12px', fontWeight: 500, color: '#666', borderColor: '#E0E0E0', bgcolor: '#F5F5F5' }}>
                    Cancel
                  </Button>
                </Stack>
              </Paper>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default ServicesAppointment;