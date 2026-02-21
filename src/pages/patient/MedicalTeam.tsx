// MedicalTeam.tsx  → updated version

import { useEffect } from 'react';
import {
  Container, Typography, Grid, Card, CardContent, Box,
  CardMedia, Button, Chip
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useMedicalStore } from '../../store/useMedicalStore';
import medicalData from '../../data/data.json';
import { useNavigate } from 'react-router-dom';

const MedicalTeam = () => {          // ← props doctors hata do
  const navigate = useNavigate();
  const { doctors, setDoctors } = useMedicalStore();   // ← direct store se le lo

  useEffect(() => {
    if (doctors.length === 0 && medicalData.doctors?.length > 0) {
      setDoctors(medicalData.doctors);
    }
  }, [doctors.length, setDoctors]);   // dependency sahi rakho

 

  if (doctors.length === 0) {
    return (
      <Box sx={{ py: 10, textAlign: 'center', color: "black" }}>
        <Typography variant="h5" color="textSecondary">
          No Doctors Found. Please check back later.
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        {doctors.map((doctor) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={doctor.id.toString()}>
            <Card sx={{
              borderRadius: '16px',
              boxShadow: '0px 10px 30px rgba(0,0,0,0.05)',
              border: '1px solid rgba(0, 210, 193, 0.1)',
              transition: '0.3s',
              '&:hover': { transform: 'translateY(-10px)' }
            }}>
              <CardMedia
                component="img"
                height="280"
                image={doctor.image || "https://via.placeholder.com/300x280"}
                alt={doctor.name}
                sx={{
                  objectFit: 'cover',
                  objectPosition: 'top',
                }}
              />
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 500, color: '#1A2E35', mb: 0.5 }}>
                  {doctor.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'black', fontWeight: 500, mb: 1.5 }}>
                  <i>{doctor.specialty}</i>
                </Typography>

                <Chip
                  label={doctor.experience || "Experience N/A"}
                  sx={{
                    bgcolor: 'rgba(0, 210, 193, 0.1)',
                    color: 'black',
                    fontWeight: 500,
                    borderRadius: '10px',
                    height: "30px",
                    mb: 2,
                    fontSize: '10px'
                  }}
                />

                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => navigate(`/doctor/${doctor.id.toString()}`)}
                  endIcon={<ArrowForwardIosIcon />}
                  sx={{ bgcolor: '#00D2C1', borderRadius: '15px' }}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MedicalTeam;