import { Box, Typography, Button, Paper, Avatar, Stack,Container } from '@mui/material';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import GroupIcon from '@mui/icons-material/Group';
import EventNoteIcon from '@mui/icons-material/EventNote';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
    { label: 'Add Doctor', icon: <PersonAddAlt1Icon />, path: '/admin/addDoctor' },
    { label: 'List Doctors', icon: <GroupIcon />, path: '/admin/listDoctors' },
    { label: 'Appointments', icon: <EventNoteIcon />, path: '/admin/appointments' },
    { label: 'Service Dashboard', icon: <MedicalServicesIcon />, path: '/admin/serviceDashboard' },
    { label: 'Add Service', icon: <AddCircleIcon />, path: '/admin/addService' },
    { label: 'List Services', icon: <ListAltIcon />, path: '/admin/servicesList' },
    { label: 'Service Appointments', icon: <AssignmentTurnedInIcon />, path: '/admin/servicesAppointment' },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F1FBF3', pt: 2 }}>
      {/* --- TOP HEADER SECTION --- */}
      <Container maxWidth="xl">
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar src="/src/assets/logo.jpg" sx={{ width: 40, height: 40 }} />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 500, color: '#1A5F7A', lineHeight: 1 }}>
                LifeCare
              </Typography>
              <Typography variant="caption" color="textSecondary">Healthcare Solutions</Typography>
            </Box>
          </Box>

          {/* --- PILL NAVBAR --- */}
          <Paper 
            elevation={0} 
            sx={{ 
              display: 'flex', 
              gap: 1, 
              px: 3, 
              py: 1, 
              borderRadius: '50px', 
              border: '1px solid #E0E0E0',
              bgcolor: '#FFFFFF'
            }}
          >
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Box
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer',
                    minWidth: '80px',
                    color: isActive ? '#00D2C1' : '#666',
                    transition: '0.3s',
                    '&:hover': { color: '#00D2C1' }
                  }}
                >
                  <Box sx={{ fontSize: '20px' }}>{item.icon}</Box>
                  <Typography sx={{ fontSize: '10px', fontWeight: isActive ? 600 : 400 }}>
                    {item.label}
                  </Typography>
                  {isActive && (
                    <Box sx={{ width: '4px', height: '4px', bgcolor: '#00D2C1', borderRadius: '50%', mt: 0.5 }} />
                  )}
                </Box>
              );
            })}
          </Paper>

          <Button 
            variant="contained" 
            sx={{ bgcolor: '#FFA500', borderRadius: '20px', textTransform: 'none', px: 3 }}
            onClick={() => navigate('/login')}
          >
            Sign Out
          </Button>
        </Stack>
      </Container>

      {/* --- DYNAMIC CONTENT AREA --- */}
      <Box sx={{ px: 4 }}>
        <Outlet /> 
      </Box>
    </Box>
  );
};

export default AdminLayout;