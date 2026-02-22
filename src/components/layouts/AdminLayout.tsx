import { useState } from 'react';
import { 
  Box, Typography, Button, Paper, Avatar, Stack, Container, 
  IconButton, Drawer, List,ListItem  ,ListItemIcon, ListItemText, useMediaQuery, useTheme, 
  ListItemButton
} from '@mui/material';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import GroupIcon from '@mui/icons-material/Group';
import EventNoteIcon from '@mui/icons-material/EventNote';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
///
import logoImg from "../../assets/logo.jpg"
const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  
  // Check if screen is medium or smaller (Tablets/Mobile)
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Mobile Drawer Content
  const drawer = (
    <Box sx={{ p: 2, height: '100%', bgcolor: '#F1FBF3' }}>
      <Typography variant="h6" sx={{ color: '#1A5F7A', mb: 3, fontWeight: 'bold', textAlign: 'center' }}>
        LifeCare Admin
      </Typography>
      <List>
  {navItems.map((item) => (
    <ListItem key={item.label} disablePadding>
      <ListItemButton 
        onClick={() => { 
          navigate(item.path); 
          setMobileOpen(false); 
        }}
        sx={{ 
          borderRadius: '12px',
          mb: 1,
          mx: 1, // thoda margin side se
          bgcolor: location.pathname === item.path ? '#00D2C120' : 'transparent',
          color: location.pathname === item.path ? '#00D2C1' : '#666',
          '&:hover': {
            bgcolor: '#00D2C110'
          }
        }}
      >
        <ListItemIcon sx={{ color: 'inherit', minWidth: '40px' }}>
          {item.icon}
        </ListItemIcon>
        <ListItemText 
          primary={item.label} 
          primaryTypographyProps={{ fontSize: '14px', fontWeight: 500 }} 
        />
      </ListItemButton>
    </ListItem>
  ))}
</List>
      <Button 
        fullWidth 
        variant="contained" 
        sx={{ mt: 2, bgcolor: '#FFA500', borderRadius: '10px' }}
        onClick={() => navigate('/')}
      >
        Sign Out
      </Button>
    </Box>
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F1FBF3', pt: { xs: 1, md: 2 } }}>
      <Container maxWidth="xl">
        <Stack 
          direction="row" 
          justifyContent="space-between" 
          alignItems="center" 
          sx={{ mb: 3, px: { xs: 1, md: 0 } }}
        >
          {/* LOGO */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar src={logoImg} sx={{ width: { xs: 35, md: 40 }, height: { xs: 35, md: 40 } }} />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1A5F7A', lineHeight: 1, fontSize: { xs: '1rem', md: '1.25rem' } }}>
                LifeCare
              </Typography>
              <Typography variant="caption" color="textSecondary" sx={{ display: { xs: 'none', sm: 'block' } }}>
                Healthcare Solutions
              </Typography>
            </Box>
          </Box>

          {/* DESKTOP PILL NAVBAR (Hidden on Mobile/Tablet) */}
          {!isMobile && (
            <Paper 
              elevation={0} 
              sx={{ 
                display: 'flex', 
                gap: 0.5, 
                px: 2, 
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
                      minWidth: '75px',
                      color: isActive ? '#00D2C1' : '#666',
                      transition: '0.3s',
                      '&:hover': { color: '#00D2C1' }
                    }}
                  >
                    <Box sx={{ fontSize: '20px' }}>{item.icon}</Box>
                    <Typography sx={{ fontSize: '9px', fontWeight: isActive ? 600 : 400, textAlign: 'center' }}>
                      {item.label}
                    </Typography>
                    {isActive && (
                      <Box sx={{ width: '4px', height: '4px', bgcolor: '#00D2C1', borderRadius: '50%', mt: 0.5 }} />
                    )}
                  </Box>
                );
              })}
            </Paper>
          )}

          {/* SIGN OUT & HAMBURGER */}
          <Stack direction="row" spacing={1} alignItems="center">
            {!isMobile && (
              <Button 
                variant="contained" 
                sx={{ bgcolor: '#FFA500', borderRadius: '20px', textTransform: 'none', px: 3, '&:hover': { bgcolor: '#e69500' } }}
                onClick={() => navigate('/')}
              >
                Sign Out
              </Button>
            )}
            
            {isMobile && (
              <IconButton onClick={handleDrawerToggle} sx={{ color: '#1A5F7A' }}>
                <MenuIcon fontSize="large" />
              </IconButton>
            )}
          </Stack>
        </Stack>
      </Container>

      {/* MOBILE DRAWER */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        PaperProps={{ sx: { width: '280px' } }}
      >
        {drawer}
      </Drawer>

      {/* DYNAMIC CONTENT AREA */}
      <Box sx={{ px: { xs: 2, md: 4 }, pb: 4 }}>
        <Outlet /> 
      </Box>
    </Box>
  );
};

export default AdminLayout;