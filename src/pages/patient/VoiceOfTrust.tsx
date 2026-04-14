import React, { useState} from 'react';
import { 
  Box, Typography, Grid, Card, Stack, 
  Rating, Container, TextField, Button, Paper 
} from '@mui/material';
import { useReviewStore } from '../../store/useReviewStore';
 

const VoiceOfTrust = () => {
  // Store se functions nikaalna
  const { patients,  addPatientReview } = useReviewStore();
  
  const [newReview, setNewReview] = useState({
    
    name: '',
    text: '',
    rating: 5,
    role: 'Patient'
  });
const totalReviews = patients.length;
const averageRating = totalReviews > 0 
  ? (patients.reduce((sum, item) => sum + item.rating, 0) / totalReviews).toFixed(1) 
  : 0;

 


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text) return;

    const reviewToAdd = {
      idReview: Date.now(),
      ...newReview,
      img: 'https://cdn-icons-png.flaticon.com/512/147/147144.png' 
    };

    addPatientReview(reviewToAdd);
    setNewReview({ name: '', text: '', rating: 5, role: 'Patient' });
  };

  const renderCard = (item: any, color: string, index: number) => (
    <Card key={`${item.id}-${index}`} sx={{ 
      p: 2, mb: 2, borderRadius: '15px', 
      borderLeft: `6px solid ${color}`, 
      boxShadow: '0px 4px 12px rgba(0,0,0,0.05)',
      bgcolor: '#fff', mx: 1 
    }}>
      <Stack direction="row" spacing={2} alignItems="flex-start">
         
        <Box sx={{ flex: 1 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 500, color: '#1A5F7A' }}>
                {item.name}
              </Typography>
              <Typography variant="caption" sx={{ color: '#00D2C1', fontWeight: 500 }}>
                {item.role}
              </Typography>
            </Box>
            <Rating value={item.rating} size="small" readOnly />
          </Stack>
          <Typography variant="body2" sx={{ mt: 1, color: '#555', fontStyle: 'italic' }}>
            "{item.text}"
          </Typography>
        </Box>
      </Stack>
    </Card>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <style>
        {`@keyframes scrollDown { 0% { transform: translateY(-50%); } 100% { transform: translateY(0); } }`}
      </style>

      <Typography variant="h3" align="center" sx={{ fontWeight: 500, color: '#1A5F7A', mb: 1 }}>
        Voices of <span style={{ color: '#00D2C1' }}>Trust</span>
      </Typography>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        
        {/* LEFT SIDE: Form (Using size instead of item) */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Paper elevation={0} sx={{ p: 4,py:6.5, borderRadius: '25px', border: '1px solid #E0F7F4', bgcolor: '#fff' }}>
            <Typography variant="h6" sx={{ color: '#1A5F7A', mb: 3, fontWeight: 500 }}>
              Write a Review
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField 
                fullWidth label="Name" sx={{ mb: 2 }}
                size='small'
                value={newReview.name} 
                onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                required
              />
              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="textSecondary">Rating</Typography>
                <Rating 
                  value={newReview.rating} 
                  onChange={(_, val) => setNewReview({...newReview, rating: val || 5})}
                />
              </Box>
              <TextField 
                fullWidth multiline rows={4} label="Your Experience" sx={{ mb: 3 }}
                value={newReview.text}
                size='small'
                onChange={(e) => setNewReview({...newReview, text: e.target.value})}
                required
              />
              <Button 
                type="submit" variant="contained" fullWidth
                sx={{ bgcolor: '#00D2C1', py: 1.5, borderRadius: '12px', fontWeight: 500 }}
              >
                Submit 
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* RIGHT SIDE: List (Using size instead of item) */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Box sx={{ 
            bgcolor: '#F0FDF4', borderRadius: '25px', height: '450px', 
            overflow: 'hidden', border: '1px solid #DCFCE7', position: 'relative' 
          }}>
            <Box sx={{ bgcolor: '#DCFCE7', p: 2, textAlign: 'center', position: 'sticky', top: 0, zIndex: 10 }}>
              <Typography sx={{ fontWeight: 500, color: '#166534' }}>Patient Feedback</Typography>
              <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{ mb: 4 }}>
      <Paper elevation={0} sx={{ px: 3, py: 1, borderRadius: '50px', bgcolor: '#F0FDF4', border: '1px solid #DCFCE7' }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#166534' }}>
            {averageRating}
          </Typography>
          <Rating value={Number(averageRating)} precision={0.1} readOnly size="small" />
          <Typography variant="body2" sx={{ color: '#666', ml: 1 }}>
            ({totalReviews} Reviews)
          </Typography>
        </Stack>
      </Paper>
    </Stack>
            </Box>

            <Box sx={{ 
              p: 2,
              animation: 'scrollDown 40s linear infinite', 
              '&:hover': { animationPlayState: 'paused' } 
            }}>
              {[...patients].map((item, i) => renderCard(item, '#166534', i))}
            </Box>
          </Box>
        </Grid>

      </Grid>
    </Container>
  );
};

export default VoiceOfTrust;