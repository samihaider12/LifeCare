import React, { useState } from 'react';
import {
  Box, Typography, Grid, Paper, Stack,
  TextField, MenuItem, Avatar, InputAdornment, Select, Button,
  Chip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk'; 
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import type { SelectChangeEvent } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import { useAppointmentStore } from '../../store/appointments';

const ServicesAppointment: React.FC = () => {
  const { appointments, updateAppointmentStatus } = useAppointmentStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const serviceAppointments = appointments.filter(app => app.category === 'service');

  const filteredAppointments = serviceAppointments.filter((item) => {
    const matchesSearch =
      item.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.serviceTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);

    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleReset = () => {
    setSearchTerm('');
    setStatusFilter('All');
  };

  const handleStatusChange = (id: number, event: SelectChangeEvent<string>) => {
    const newStatus = event.target.value as 'Pending' | 'Confirmed' | 'Completed' | 'Canceled';
    updateAppointmentStatus(id, newStatus);
  };

  return (
    <Box >
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4, flexWrap: 'wrap' }}>
        <TextField
          placeholder="Search patient or service..."
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: { xs: '100%', sm: 320 }, '& .MuiOutlinedInput-root': { borderRadius: '50px', bgcolor: '#fff' } }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#00D2C1' }} /></InputAdornment>,
          }}
        />
        <Select
          size="small"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          sx={{ borderRadius: '50px', minWidth: 140, bgcolor: '#fff' }}
        >
          <MenuItem value="All">All Status</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Confirmed">Confirmed</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="Canceled">Canceled</MenuItem>
        </Select>
      </Stack>

      <Grid container spacing={3}>
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((item) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item.id}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: '16px',
                  border: '1px solid #E0F2F1',
                  height: '83%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar sx={{ bgcolor: '#E0F7FA', color: '#00ACC1' }}>
                      {item.patientName.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight={500} color="#1A5F7A">
                        {item.patientName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {item.gender} • {item.age} yrs
                      </Typography>
                    </Box>
                  </Stack>

                  <Chip
                    label={item.status}
                    size="small"
                    color={
                      item.status === 'Completed' ? 'success' :
                      item.status === 'Canceled' ? 'error' :
                      item.status === 'Confirmed' ? 'primary' : 'default'
                    }
                    variant="outlined"
                  />
                </Stack>

                <Stack spacing={1.5} sx={{  flexGrow: 0 }}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <PhoneInTalkIcon fontSize="small" sx={{ color: '#00D2C1' }} />
                    <Typography variant="body2">{item.phone}</Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" spacing={1}>
                    <MedicalServicesIcon fontSize="small" sx={{ color: '#00D2C1' }} />
                    <Typography variant="body2" fontWeight={500}>
                      {item.serviceTitle || 'Service'}
                    </Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" spacing={1}>
                    <AccountBalanceWalletIcon fontSize="small" sx={{ color: '#00D2C1' }} />
                    <Typography variant="body2">Rs {item.fee?.toLocaleString() || '—'}</Typography>
                  </Stack>

                  {/* Date & Time – uncomment & adjust if you want */}
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <CalendarTodayIcon fontSize="small" sx={{ color: '#00D2C1' }} />
                    <Typography variant="body2">{item.date}</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <AccessTimeIcon fontSize="small" sx={{ color: '#00D2C1' }} />
                    <Typography variant="body2">{item.time}</Typography>
                  </Stack>
                </Stack>

                {/* Status Controls */}
                <Stack direction="row" spacing={1.5} sx={{ mt: '22px',width:"100px", }}>
                  <Select
                    size="small"
                    value={item.status}

                    onChange={(e) => handleStatusChange(item.id, e)}
                    sx={{ flex: 1, borderRadius: '8px',
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
        ) : (
          <Grid size={12}>
            <Paper
              elevation={0}
              sx={{
                p: 8,
                textAlign: 'center',
                borderRadius: '16px',
                bgcolor: '#F9FAFB',
                border: '1px dashed #e0f2f1',
              }}
            >
              <SearchOffIcon sx={{ fontSize: 64, color: '#B2DFDB', mb: 2 }} />
              <Typography variant="h6" color="#1A5F7A">
                No service appointments found
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Try changing search or filter
              </Typography>
              {(searchTerm || statusFilter !== 'All') && (
                <Button
                  sx={{ mt: 3, color: '#00D2C1' }}
                  onClick={handleReset}
                >
                  Clear Filters
                </Button>
              )}
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ServicesAppointment;