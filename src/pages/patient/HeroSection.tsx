import { Box, Typography, Grid, Stack, Container, Rating } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ShieldIcon from '@mui/icons-material/Shield';
import PeopleIcon from '@mui/icons-material/People'; 
// ////
 import logoImg from "../../assets/logo.jpg"
 import drImg from "../../assets/dr.webp"
 
const Hero = () => {
    return (
        <Container maxWidth="lg" sx={{ mt: 2 }}>
            <Box
                sx={{
                    border: '2px solid #00D2C1', // Image wala green border
                    borderRadius: '18px',
                    p: { xs: "8px", md: "17px" },
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
                                        src={logoImg} // Apni image ka path yahan dein
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
{/* <Stack alignItems="center" sx={{ textAlign: 'center', mt: 4, px: 2 }}> */}
    
    {/* 1. Feature Info Cards */}
    <Grid container spacing={2} sx={{ maxWidth: '450px'}}>
        {[
            { text: 'Certified Specialists', icon: <CheckCircleIcon fontSize="small" /> },
            { text: '24/7 Availability', icon: <AccessTimeIcon fontSize="small" /> },
            { text: 'Safe & Secure', icon: <ShieldIcon fontSize="small" /> },
            { text: '500+ Doctors', icon: <PeopleIcon fontSize="small" /> },
        ].map((item, index) => (
            <Grid  size={{xs:12, md:6}} key={index}>
                <Box
                    sx={{
                        background: 'linear-gradient(90deg, #4ADE80 0%, #BBF7D0 100%)',
                        p: 1.8,
                        borderRadius: '8px', // Full rounded like image
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center', // Text center karne ke liye
                        gap: 1.5,
                        boxShadow: '0px 4px 12px rgba(74, 222, 128, 0.2)',
                    }}
                >
                    <Box sx={{ color: '#065F46', display: 'flex' }}>{item.icon}</Box>
                    <Typography variant="body1" sx={{ fontWeight: 500, color: '#064E3B' }}>
                        {item.text}
                    </Typography>
                </Box>
            </Grid>
        ))}
    </Grid>
 {/* </Stack> */}
</Stack>
</Grid>

                    {/* Right Side Image */}
                    <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Box
                            component="img"
                            src={drImg} // Apni image ka path yahan dein
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