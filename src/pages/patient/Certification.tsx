import React from 'react';
import { Box, Typography, Container, Grid, Chip, Divider, Stack } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
//
import pic1 from "../../assets/pic1.webp"
 import pic2 from "../../assets/p2.webp"
 import pic3 from "../../assets/p3.webp"
 import pic4 from "../../assets/p4.svg"
 import pic5 from "../../assets/p5.webp"
 import pic6 from "../../assets/p6.webp"
 
// Logos ka data array taaki code clean rahe
const certs = [
    { name: 'Medical Commission', img: pic1 },
    { name: 'Government Approved', img: pic2 },
    { name: 'NABH Accredited', img: pic3 },
    { name: 'Medical Council', img: pic4 },
    { name: 'Quality Healthcare', img: pic5 },
    { name: 'Paramedical Council', img: pic6 },
];

const Certification: React.FC = () => {
    return (
        // <Box sx={{ py: 8, textAlign: 'center', bgcolor: '#fff' }}>
            <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center', bgcolor: '#fff' }}>

                {/* --- Header Section --- */}
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} sx={{ mb: 1 }}>
                    <Divider sx={{ width: '80px', borderColor: '#00D2C1', borderBottomWidth: 2 }} />
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 700,
                            color: '#00D2C1',
                            fontSize: { xs: '1.8rem', md: '3rem' },
                            textTransform: 'uppercase',
                            letterSpacing: 1
                        }}
                    >
                        Certified & Excellence
                    </Typography>
                    <Divider sx={{ width: '80px', borderColor: '#00D2C1', borderBottomWidth: 2 }} />
                </Stack>

                <Typography
                    variant="body1"
                    sx={{ color: '#777', mb: 4, fontWeight: 300, fontSize: '1.1rem' }}
                >
                    Government recognized and internationally accredited healthcare standards
                </Typography>

                {/* --- Green Badge/Chip --- */}
                <Chip
                    icon={<FiberManualRecordIcon sx={{ fontSize: '12px !important', color: '#00D2C1 !important' }} />}
                    label="OFFICIALLY CERTIFIED"
                    variant="outlined"
                    sx={{
                        borderColor: '#00D2C1',
                        color: '#00D2C1',
                        fontWeight: 'bold',
                        borderRadius: '20px',
                        mb: 8,
                        px: 2,
                        bgcolor: 'rgba(0, 210, 193, 0.05)'
                    }}
                />

                {/* --- Logos Grid --- */}
                <Grid container spacing={4} justifyContent="center" alignItems="center" sx={{mb:"38px"}}>
                    {certs.map((cert, index) => (
                        <Grid size={{ xs: 6, sm: 4, md: 2 }} key={index}>
                            <Stack alignItems="center" spacing={2}>
                                <Box
                                    sx={{
                                        width: 80,
                                        height: 80,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: '50%',
                                        boxShadow: '0px 4px 15px rgba(0,0,0,0.08)',
                                        p: 1,
                                        transition: 'transform 0.3s',
                                        '&:hover': { transform: 'scale(1.1)' }
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={cert.img}
                                        alt={cert.name}
                                        sx={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                                    />
                                </Box>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontFamily: '"Playfair Display", serif', // Italic/Fancy look ke liye
                                        fontStyle: 'italic',
                                        fontWeight: 500,
                                        color: '#1A5F7A',
                                        fontSize: '15px'
                                    }}
                                >
                                    {cert.name}
                                </Typography>
                            </Stack>
                        </Grid>
                    ))}
                </Grid>
                 <Box textAlign="center" sx={{ mt: 6 }}>
                    <Typography variant="h3" sx={{ fontWeight: 500, color: '#1A2E35' }}>
                        <i>  Our </i>LifeCare <i><span style={{ color: '#00D2C1' }}> Medical Team</span></i>
                    </Typography>
                    <Typography variant="body1" sx={{fontWeight:400,fontSize:"13px" ,color: 'black', mt: 1 }}>
                        Book appointments quickly with our verified specialists.
                    </Typography>
                </Box>
                
            </Container> 
            
            
         
    );
};

export default Certification;