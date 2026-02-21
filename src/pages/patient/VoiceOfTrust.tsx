import { useEffect } from 'react';
import { Box, Typography, Grid, Card, Avatar, Stack, Rating, Container } from '@mui/material';
import { useReviewStore } from '../../store/useReviewStore';
import reviewsData from '../../data/reviewsData.json';

const VoiceOfTrust = () => {
  const { professionals, patients, setReviews } = useReviewStore();

  useEffect(() => {
    setReviews(reviewsData.professionals, reviewsData.patients);
  }, [setReviews]);

  const renderCard = (item: any, color: string, index: number) => (
    <Card key={`${item.id}-${color}-${index}`} sx={{ 
      p: 1.5, mb: 1.5, 
      borderRadius: '12px', 
      borderLeft: `5px solid ${color}`, 
      boxShadow: '0px 2px 8px rgba(0,0,0,0.06)',
      bgcolor: '#fff',
      mx: 1.5 // Horizontal margin taaki container se na chipke
    }}>
      <Stack direction="row" spacing={1.5} alignItems="flex-start">
        <Avatar src={item.img} sx={{ width: 42, height: 42 }} />
        <Box sx={{ flex: 1 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 700, color: '#1976D2', fontSize: '0.85rem' }}>
                {item.name}
              </Typography>
              <Typography variant="caption" sx={{ color: '#777', fontWeight: 500, display: 'block' }}>
                {item.role}
              </Typography>
            </Box>
            <Rating value={item.rating} size="small" readOnly sx={{ fontSize: '0.9rem', color: '#FFB400' }} />
          </Stack>
          <Typography variant="caption" sx={{ 
            mt: 0.8, color: '#444', fontSize: '0.78rem', lineHeight: 1.3, display: 'block', fontStyle: 'italic' 
          }}>
            "{item.text}"
          </Typography>
        </Box>
      </Stack>
    </Card>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <style>
        {`
          @keyframes scrollUp { 0% { transform: translateY(0); } 100% { transform: translateY(-50%); } }
          @keyframes scrollDown { 0% { transform: translateY(-50%); } 100% { transform: translateY(0); } }
        `}
      </style>

      <Typography variant="h3" align="center" sx={{ fontWeight: 500, color: '#1A5F7A', mb: 1 }}>
        Voices of <span style={{ color: '#00D2C1' }}>Trust</span>
      </Typography>
      <Typography variant="body2" align="center" sx={{ color: '#666', mb: 5 }}>
        Real stories from doctors and patients sharing their positive experiences with our healthcare platform.
      </Typography>

      <Grid container spacing={3} sx={{ height: '350px', overflow: 'hidden' }}>
        
        {/* Medical Professionals Column */}
       <Grid size={{ xs: 12, md: 6 }}>
  <Box
    sx={{
      bgcolor: '#E3F2FD',
      borderRadius: '15px',
      height: '100%',
      overflow: 'hidden',
      border: '1px solid #D1E9FF',
      position: 'relative', // Parent ko relative rakha
    }}
  >
    {/* Header Section - Isay zIndex de kar fix kiya taaki cards iske piche se jayein */}
    <Box
      sx={{
        bgcolor: '#D1E9FF',
        p: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1,
        position: 'relative', // Position dena zaroori hai zIndex ke liye
        zIndex: 10, // Sabse upar rahega
        boxShadow: '0px 2px 5px rgba(0,0,0,0.05)', // Halki si shadow taaki depth lage
      }}
    >
      <Typography sx={{ fontWeight: 600, color: '#1976D2', fontSize: '15px' }}>
        👩‍⚕️ Medical Professionals
      </Typography>
    </Box>

    {/* Scroll Box - Iski zIndex kam rakhi taaki ye header ke niche rahe */}
    <Box
      sx={{
        position: 'relative',
        zIndex: 1, // Header (10) se niche rahega
        mt: 1, // Thoda sa gap header se
        animation: 'scrollUp 35s linear infinite',
        '&:hover': { animationPlayState: 'paused' },
      }}
    >
      {[...professionals, ...professionals].map((item, i) =>
        renderCard(item, '#1976D2', i)
      )}
    </Box>
  </Box>
</Grid>

        {/* Patients Column */}
       <Grid size={{ xs: 12, md: 6 }}>
  <Box
    sx={{
      bgcolor: '#E8F5E9', // Light Green background
      borderRadius: '15px',
      height: '100%',
      overflow: 'hidden',
      border: '1px solid #C8E6C9',
      position: 'relative', // Context for absolute/sticky children
    }}
  >
    {/* Fixed Green Header Section */}
    <Box
      sx={{
        bgcolor: '#C8E6C9',
        p: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1,
        position: 'sticky', // Isse header apni jagah fix rahega
        top: 0,
        zIndex: 10, // Cards hamesha iske niche se jayenge
        boxShadow: '0px 2px 4px rgba(0,0,0,0.05)', // Clean look ke liye thodi shadow
      }}
    >
      <Typography sx={{ fontWeight: 700, color: '#2E7D32', fontSize: '15px' }}>
        🧑‍💼 Patients
      </Typography>
    </Box>

    {/* Scrollable Area */}
    <Box
      sx={{
        p: 1.5, // Padding taaki cards container ki walls se na chipkein
        animation: 'scrollDown 35s linear infinite',
        '&:hover': { animationPlayState: 'paused' },
      }}
    >
      {[...patients, ...patients].map((item, i) =>
        renderCard(item, '#2E7D32', i)
      )}
    </Box>
  </Box>
</Grid>
      </Grid>
    </Container>
  );
};

export default VoiceOfTrust;