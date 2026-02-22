import React, { useState } from 'react';
import {
  Box, Typography, Grid, Paper, Stack,
  TextField, MenuItem, Avatar, InputAdornment, Select
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// Zustand store
import { useAppointmentStore } from '../../store/appointments';

const ServicesAppointment: React.FC = () => {
  // Removed updateAppointmentStatus to fix TS6133
  const { appointments } = useAppointmentStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredAppointments = appointments.filter((item) => {
    const matchesSearch = item.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (item.serviceTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Box sx={{ p: 3 }}>
      {/* SEARCH & FILTER BAR */}
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
        <TextField
          placeholder="Search patient or service..."
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: '300px', '& .MuiOutlinedInput-root': { borderRadius: '50px', bgcolor: '#fff' } }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#00D2C1' }} /></InputAdornment>,
          }}
        />
        <Select
          size="small"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          sx={{ borderRadius: '50px', minWidth: '130px', bgcolor: '#fff' }}
        >
          <MenuItem value="All">All Status</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Confirmed">Confirmed</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="Canceled">Canceled</MenuItem>
        </Select>
      </Stack>

      {/* APPOINTMENT CARDS */}
      <Grid container spacing={3}>
        {filteredAppointments.map((item) => (
          <Grid size={{xs:12 ,sm:6 ,lg:3}} key={item.id} sx={{ display: 'flex' }}>
            <Paper elevation={0} sx={{
              p: '20px',
              borderRadius: '15px',
              border: '1px solid #E0F2F1',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <Box>
                {/* Card Header: Avatar and Status Badge */}
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: '15px' }}>
                  <Stack direction="row" spacing="12px" alignItems="center">
                    <Avatar sx={{ bgcolor: '#F0FDF4', color: '#00D2C1', width: '35px', height: '35px' }}>
                      {item.patientName.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography sx={{ fontWeight: 500, color: '#1A5F7A', fontSize: '14px' }}>
                        {item.patientName}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
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
                      px: '12px', py: '4px', borderRadius: '50px'
                    }}>
                      <Typography sx={{ fontSize: '11px', fontWeight: 500 }}>{item.status}</Typography>
                    </Box>
                  </Box>
                </Stack>

                {/* Details List */}
                <Stack spacing="8px">
                  <Stack direction="row" spacing="10px" alignItems="center">
                    <PhoneInTalkIcon sx={{ fontSize: '16px', color: '#00D2C1' }} />
                    <Typography sx={{ fontSize: '13px' }}>{item.phone}</Typography>
                  </Stack>
                  <Stack direction="row" spacing="10px" alignItems="center">
                  <Typography sx={{color: '#00D2C1'}}>Rs</Typography> 
                    <Typography sx={{ fontSize: '13px' }}>:{item.fee}</Typography>
                  </Stack>
                  <Stack direction="row" spacing="10px" alignItems="center">
                    <CalendarTodayIcon sx={{ fontSize: '16px', color: '#00D2C1' }} />
                    <Typography sx={{ fontSize: '13px' }}>{item.date}</Typography>
                  </Stack>
                  <Stack direction="row" spacing="10px" alignItems="center">
                    <AccessTimeIcon sx={{ fontSize: '16px', color: '#00D2C1' }} />
                    <Typography sx={{ fontSize: '13px' }}>{item.time}</Typography>
                  </Stack>
                </Stack>

                <Typography sx={{ fontSize: '12px', mt: 2, color: '#666', fontStyle: 'italic' }}>
                  Service: {item.serviceTitle || 'General Consultation'}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ServicesAppointment;