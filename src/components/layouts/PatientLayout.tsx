import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
    Box,
    Stack,
    Typography,
    Button,
    Container,
    useTheme,
    useMediaQuery,
    // IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText
} from '@mui/material';
import { auth } from "../../DataBase/fireBase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import LogoutIcon from '@mui/icons-material/Logout';

import LoginIcon from '@mui/icons-material/Login';
// import MenuIcon from '@mui/icons-material/Menu';
import Footer from '../Footer'; // Footer ka sahi path check kar lein
//
import logoImg from "../../assets/logo.jpg"
// Navigation items
const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Doctors', path: '/doctors' },
    { name: 'Services', path: '/services' },
    { name: 'Appointments', path: '/appointmentsPatient' },
    { name: 'Contact', path: '/contact' },
];

const PatientLayout: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    ///
    const [user, setUser] = React.useState<any>(null);
    const navigate = useNavigate();

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/login');  
    };



    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* --- NAVBAR SECTION --- */}
            <Container maxWidth="lg">
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ py: 3 }}
                >
                    {/* 1. LOGO SECTION */}
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1.5}
                        component={NavLink}
                        to="/"
                        sx={{ textDecoration: 'none' }}
                    >
                        <Box sx={{
                            p: 0.8,
                            borderRadius: '50%',
                            display: 'flex',
                            boxShadow: '0px 4px 10px rgba(0, 210, 193, 0.3)'
                        }}>
                            <Box
                                component="img"
                                src={logoImg}
                                alt="Logo"
                                sx={{
                                    width: '45px',
                                    height: 'auto',
                                    objectFit: "cover",
                                    borderRadius: '50%'
                                }}
                            />
                        </Box>
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 500, color: '#1A5F7A', lineHeight: 1 }}>
                                LifeCare
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#86B6BB', fontWeight: 400, letterSpacing: 0.5 }}>
                                Healthcare Solutions
                            </Typography>
                        </Box>
                    </Stack>

                    {/* 2. DESKTOP NAVIGATION */}
                    {!isMobile && (
                        <Box sx={{
                            bgcolor: '#fff',
                            px: 4,
                            py: 1.5,
                            borderRadius: '50px',
                            boxShadow: '0px 10px 30px rgba(0,0,0,0.06)',
                            border: '1px solid rgba(0,0,0,0.02)'
                        }}>
                            <Stack direction="row" spacing={4}>
                                {navItems.map((item) => (
                                    <NavLink
                                        key={item.name}
                                        to={item.path}
                                        style={({ isActive }) => ({
                                            color: isActive ? '#00D2C1' : '#555',
                                            textDecoration: 'none',
                                            fontWeight: 500,
                                            fontSize: '16px',
                                            position: 'relative',
                                            transition: '0.3s'
                                        })}
                                    >
                                        {({ isActive }) => (
                                            <>
                                                {item.name}
                                                {isActive && (
                                                    <Box sx={{
                                                        position: 'absolute',
                                                        bottom: -8,
                                                        left: '50%',
                                                        transform: 'translateX(-50%)',
                                                        width: '6px',
                                                        height: '6px',
                                                        bgcolor: '#00D2C1',
                                                        borderRadius: '50%',
                                                        boxShadow: '0px 2px 5px rgba(0, 210, 193, 0.5)'
                                                    }} />
                                                )}
                                            </>
                                        )}
                                    </NavLink>
                                ))}
                            </Stack>
                        </Box>
                    )}

                    {/* 3. AUTH BUTTONS */}
                    {/* Bottom Buttons in Drawer */}
                    <Stack spacing={2} >
                        {user ? (
                            <Button
                                fullWidth
                                size='small'
                                variant="outlined"
                                color="error"
                                onClick={handleLogout}
                                startIcon={<LogoutIcon />}
                            >
                                Logout
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                size='small'
                                startIcon={<LoginIcon />}
                                component={NavLink}
                                to="/login"
                                fullWidth
                                onClick={handleDrawerToggle}
                                sx={{ borderRadius: '12px', bgcolor: '#00D2C1' }}
                            >
                                Login
                            </Button>
                        )}
                    </Stack>
                </Stack>
            </Container>

            {/* --- 4. DYNAMIC CONTENT (Child Pages) --- */}
            <Box component="main" sx={{ flexGrow: 1 }}>
                <Outlet /> {/* <--- Iske bina child pages show nahi honge */}
            </Box>

            {/* --- 5. FOOTER --- */}
            <Footer />

            {/* --- MOBILE DRAWER --- */}
            <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                PaperProps={{
                    sx: {
                        width: '200px',
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%' // Ensure full height
                    }
                }}
            >
                {/* Header */}
                <Typography component="div" variant="h6" sx={{ mb: 2, color: '#1A5F7A', fontWeight: 500, px: 2 }}>
                    <Box>
                        <Typography component="div" variant="h5" sx={{ fontWeight: 500, color: '#1A5F7A', lineHeight: 1 }}>
                            LifeCare
                        </Typography>
                        <Typography component="div" variant="caption" sx={{ color: '#86B6BB', fontWeight: 400, letterSpacing: 0.5 }}>
                            Healthcare Solutions
                        </Typography>
                    </Box>
                </Typography>

                {/* Navigation Links - Wrapped in a Box with flexGrow to push buttons down */}
                <Box sx={{ flexGrow: 0, overflowY: 'auto' }}>
                    <List>
                        {navItems.map((item) => (
                            <ListItem
                                key={item.name}
                                component={NavLink}
                                to={item.path}
                                onClick={handleDrawerToggle}
                                sx={{
                                    borderRadius: '10px',
                                    color: '#555',
                                    '&.active': { bgcolor: 'rgba(0, 210, 193, 0.1)', color: '#00D2C1' }
                                }}
                            >
                                <ListItemText primary={item.name} primaryTypographyProps={{ fontWeight: 500 }} />
                            </ListItem>
                        ))}
                    </List>
                </Box>

                {/* Bottom Buttons - In a fixed container at the bottom of the drawer */}
                <Stack spacing={2} >

                    const authButton = user ? (
                    <Button
                        variant="outlined"
                        size='small'
                        startIcon={<LogoutIcon />}
                        onClick={handleLogout}
                        sx={{
                            borderRadius: '12px',
                            color: '#ff4d4d',
                            borderColor: '#ff4d4d',
                            '&:hover': { bgcolor: '#fff5f5', borderColor: '#cc0000' },
                            textTransform: 'none',
                            fontWeight: 600,
                            px: 3
                        }}
                    >
                        Logout
                    </Button>
                    ) : (
                    <Button
                        variant="contained"
                        size='small'
                        startIcon={<LoginIcon />}
                        component={NavLink}
                        to="/login"
                        sx={{
                            borderRadius: '12px',
                            bgcolor: '#00D2C1',
                            '&:hover': { bgcolor: '#00b0a2' },
                            textTransform: 'none',
                            fontWeight: 600,
                            px: 4
                        }}
                    >
                        Login
                    </Button>
                    );
                </Stack>
            </Drawer>
        </Box>
    );
};

export default PatientLayout;