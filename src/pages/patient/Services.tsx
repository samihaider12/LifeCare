import { Box, Typography, Container, Grid, Card, CardMedia, Button } from '@mui/material';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { useServiceStore } from '../../store/useServiceStore';
import { useNavigate } from 'react-router-dom'; // 1. Navigate import kiya

const Services = () => {
  const { services } = useServiceStore(); 
  const navigate = useNavigate(); // 2. Hook initialize kiya

  return (
    <Box sx={{ bgcolor: '#F9FEFB', py: 10 }}> 
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" sx={{ fontWeight: 500, color: '#135D54', mb: 1 }}>
            Our Diagnostic Services
          </Typography>
          <Typography variant="body1" sx={{ color: '#555' }}>
            Safe, accurate & reliable testing
          </Typography>
        </Box>

        <Grid container spacing={3} justifyContent="center">
          {services.map((service) => (
            <Grid size={{xs:12 ,sm:6 ,md:3}} key={service.id}>
              <Card sx={{
                borderRadius: '24px',
                p: 4,
                textAlign: 'center',
                boxShadow: '0px 10px 40px rgba(0,0,0,0.04)',
                border: '1px solid #f0f0f0',
                transition: '0.4s ease-in-out',
                '&:hover': { transform: 'translateY(-10px)', boxShadow: '0px 20px 40px rgba(0,210,193,0.1)' }
              }}>
                <CardMedia
                  component="img"
                  image={service.image}
                  alt={service.title}
                  sx={{ 
                    height: 100, 
                    width: 'auto', 
                    mx: 'auto', 
                    mb: 3, 
                    objectFit: 'contain' 
                  }}
                />
                <Typography variant="h6" sx={{ fontWeight: 500, color: '#135D54', mb: 3, minHeight: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {service.title}
                </Typography>
                
                <Button
                  fullWidth
                  variant="contained"
                  // 3. Click handle kiya: ID ke basis par navigate karega
                  onClick={() => navigate(`/service/${service.id}`)} 
                  startIcon={<DoubleArrowIcon sx={{ fontSize: '14px !important' }} />}
                  sx={{
                    bgcolor: '#00D2C1',
                    borderRadius: '12px',
                    textTransform: 'none',
                    py: 1.2,
                    fontWeight: 500,
                    boxShadow: 'none',
                    '&:hover': { bgcolor: '#135D54' }
                  }}
                >
                  Book Now
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Services;