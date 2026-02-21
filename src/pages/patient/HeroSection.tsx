import { Box, Typography, Button, Grid, Stack, Container, Rating } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ShieldIcon from '@mui/icons-material/Shield';
import PeopleIcon from '@mui/icons-material/People';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
// ////
 
 
const Hero = () => {
    return (
        <Container maxWidth="lg" sx={{ mt: 2 }}>
            <Box
                sx={{
                    border: '2px solid #00D2C1', // Image wala green border
                    borderRadius: '18px',
                    p: { xs: 4, md: 5 },
                    position: 'relative',
                    backgroundColor: '#fff',
                    overflow: 'hidden',
                }}
            >
                <Grid container spacing={4} alignItems="center">
                    {/* Left Side Content */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Stack spacing={2}>
                            {/* Logo/Icon + Brand Name */}
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Box sx={{
                                    borderRadius: '50%',
                                    display: 'flex',
                                    color: '#fff'
                                }}>
                                    <Box
                                        component="img"
                                        src="/src/assets/logo.jpg" // Apni image ka path yahan dein
                                        alt="Doctors"
                                        sx={{
                                            width: '40px',
                                            maxWidth: '40px',
                                            height: 'auto',
                                            objectFit: "cover"
                                        }}
                                    />
                                </Box>
                                <Typography variant="h3" sx={{ fontWeight: 500, fontSize: "30px", color: '#1A2E35' }}>
                                    LifeCare+
                                </Typography>
                            </Stack>

                            {/* Stars */}
                            <Rating value={5} readOnly sx={{ color: '#FFD700' }} />

                            {/* Headlines */}
                            <Box>
                                <Typography variant="h4" sx={{ color: '#777', fontSize: "30px", fontWeight: 200 }}>
                                    Premium Healthcare
                                </Typography>
                                <Typography variant="h3" sx={{ color: '#00D2C1', fontSize: "18px", fontWeight: 500 }}>
                                    At Your Fingertips
                                </Typography>
                            </Box>

                            {/* Feature Tags (Grid 2x2) */}
                            <Grid container spacing={2} sx={{ mt: 2 }}>
                                {[
                                    { text: 'Certified Specialists', icon: <CheckCircleIcon fontSize="small" /> },
                                    { text: '24/7 Availability', icon: <AccessTimeIcon fontSize="small" /> },
                                    { text: 'Safe & Secure', icon: <ShieldIcon fontSize="small" /> },
                                    { text: '500+ Doctors', icon: <PeopleIcon fontSize="small" /> },
                                ].map((item, index) => (
                                    <Grid size={{ xs: 6 }} key={index}>
                                        <Box
                                            sx={{
                                                background: 'linear-gradient(90deg, #5EE7B7 0%, #A7F3D0 100%)', // Image ka gradient
                                                p: 1.5,
                                                borderRadius: '20px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 1,
                                                boxShadow: '0px 4px 10px rgba(0,0,0,0.05)'
                                            }}
                                        >
                                            <Box sx={{ color: '#059669', display: 'flex' }}>{item.icon}</Box>
                                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#065F46' }}>
                                                {item.text}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>

                            {/* Action Buttons */}
                            <Stack direction="row" spacing={3} sx={{ mt: 4 }}>
                                <Button
                                    variant="contained"
                                    startIcon={<CalendarMonthIcon />}
                                    sx={{
                                        bgcolor: '#00D2C1',
                                        borderRadius: '20px',
                                        px: 4,
                                        py: 2,
                                        textTransform: 'none',
                                        fontSize: 15,
                                        fontWeight: 500,
                                        boxShadow: '0px 8px 20px rgba(0, 210, 193, 0.3)',
                                        '&:hover': { bgcolor: '#00b0a2' }
                                    }}
                                >
                                    Book Appointment Now
                                </Button>

                                <Button
                                    variant="contained"
                                    startIcon={<LocalPhoneIcon />}
                                    sx={{
                                        bgcolor: '#FFA1A1', // Image ka light red/pink color
                                        color: '#B91C1C',
                                        borderRadius: '20px',
                                        px: 4,
                                        py: 2,
                                        textTransform: 'none',
                                        fontSize: '15',
                                        fontWeight: 500,
                                        boxShadow: '0px 8px 20px rgba(255, 161, 161, 0.3)',
                                        '&:hover': { bgcolor: '#ff8a8a' }
                                    }}
                                >
                                    Emergency Call
                                </Button>
                            </Stack>
                        </Stack>
                    </Grid>

                    {/* Right Side Image */}
                    <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Box
                            component="img"
                            src="/src/assets/dr.webp" // Apni image ka path yahan dein
                            alt="Doctors"
                            sx={{
                                width: '100%',
                                maxWidth: '550px',
                                height: 'auto',
                                borderRadius: '20px',
                                // Image ko cut hone se bachane ke liye object-fit use karein
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Hero;