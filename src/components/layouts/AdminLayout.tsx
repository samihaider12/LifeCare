import { useEffect, useState } from 'react';
import { 
  Box, Typography, Button, Paper, Avatar, Stack, Container, 
  IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, 
  useMediaQuery, useTheme, ListItemButton
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
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';

// Firebase imports
import { auth } from "../../DataBase/fireBase"; 
import { onAuthStateChanged, signOut } from "firebase/auth";
import logoImg from "../../assets/logo.jpg";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', icon: <DashboardIcon />, path: '/admin-2p4' },
    { label: 'Add Doctor', icon: <PersonAddAlt1Icon />, path: '/admin-2p4/addDoctor' },
    { label: 'List Doctors', icon: <GroupIcon />, path: '/admin-2p4/listDoctors' },
    { label: 'Dr.Appointments', icon: <EventNoteIcon />, path: '/admin-2p4/appointments' },
    { label: 'Service Dashboard', icon: <MedicalServicesIcon />, path: '/admin-2p4/serviceDashboard' },
    { label: 'Add Service', icon: <AddCircleIcon />, path: '/admin-2p4/addService' },
    { label: 'List Services', icon: <ListAltIcon />, path: '/admin-2p4/servicesList' },
    { label: 'Service Appointments', icon: <AssignmentTurnedInIcon />, path: '/admin-2p4/servicesAppointment' },
  ];

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  // Common Auth Button logic
  const renderAuthButton = (fullWidth = false) => (
    user ? (
      <Button 
        fullWidth={fullWidth}
        variant="contained" 
        startIcon={<LogoutIcon />}
        sx={{ bgcolor: '#ff4d4d', borderRadius: '20px', textTransform: 'none', '&:hover': { bgcolor: '#cc0000' } }}
        onClick={handleLogout}
      >
        Logout
      </Button>
    ) : (
      <Button 
        fullWidth={fullWidth}
        variant="contained"
        startIcon={<LoginIcon />}
        sx={{ bgcolor: '#FFA500', borderRadius: '20px', textTransform: 'none', '&:hover': { bgcolor: '#e69500' } }}
        onClick={() => navigate('/login')}
      >
        Login
      </Button>
    )
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F1FBF3', pt: { xs: 1, md: 2 } }}>
      <Container maxWidth="xl">
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          {/* LOGO */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar src={logoImg} sx={{ width: 40, height: 40 }} />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1A5F7A' }}>LifeCare</Typography>
              <Typography variant="caption" color="textSecondary">Healthcare Admin</Typography>
            </Box>
          </Box>

          {/* DESKTOP NAV */}
          {!isMobile && (
            <Paper elevation={0} sx={{ display: 'flex', gap: 0.5, px: 2, py: 1, borderRadius: '50px', border: '1px solid #E0E0E0' }}>
              {navItems.map((item) => (
                <Box key={item.label} onClick={() => navigate(item.path)} sx={{ cursor: 'pointer', minWidth: '75px', textAlign: 'center', color: location.pathname === item.path ? '#00D2C1' : '#666' }}>
                  <Box>{item.icon}</Box>
                  <Typography sx={{ fontSize: '9px' }}>{item.label}</Typography>
                </Box>
              ))}
            </Paper>
          )}

          {/* AUTH & HAMBURGER */}
          <Stack direction="row" spacing={1}>
            {!isMobile && renderAuthButton()}
            {isMobile && (
              <IconButton onClick={handleDrawerToggle} sx={{ color: '#1A5F7A' }}>
                <MenuIcon fontSize="large" />
              </IconButton>
            )}
          </Stack>
        </Stack>
      </Container>

      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
        <Box sx={{ width: 280, p: 2 }}>
          <Typography variant="h6" sx={{ mb: 3, textAlign: 'center' }}>LifeCare Admin</Typography>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton onClick={() => { navigate(item.path); setMobileOpen(false); }}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          {renderAuthButton(true)}
        </Box>
      </Drawer>

      <Box sx={{ px: { xs: 2, md: 4 }, pb: 4 }}><Outlet /></Box>
    </Box>
  );
};

export default AdminLayout;