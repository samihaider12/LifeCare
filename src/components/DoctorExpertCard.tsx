import { Box, Typography, Button, Paper, Avatar } from '@mui/material';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate

const DoctorExpertCard = ({ doctor }: { doctor: any }) => {
  const navigate = useNavigate(); // 2. Initialize hook

  return (
    <Paper elevation={0} sx={{
      p: 3,
      borderRadius: '24px',
      textAlign: 'center',
      bgcolor: '#FFFFFF',
      transition: '0.3s',
      border: '1px solid #f0f0f0',
      '&:hover': { boxShadow: '0px 20px 40px rgba(0,210,193,0.1)', transform: 'translateY(-5px)' }
    }}>
      {/* Circular Image */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Avatar
          src={doctor.image}
          sx={{
            width: 140,
            height: 140,
            border: '4px solid #00D2C1',
            bgcolor: 'transparent'
          }}
        />
      </Box>

      <Typography variant="h6" sx={{ fontWeight: 500, color: '#1A5F7A', mb: 0.5 }}>
        {doctor.name}
      </Typography>
      
      <Typography variant="body2" sx={{ color: '#00D2C1', fontWeight: 500, mb: 2, fontStyle: 'italic' }}>
        {doctor.specialty}
      </Typography>

      {/* Experience Badge */}
      <Box sx={{ 
        display: 'inline-flex', 
        alignItems: 'center', 
        bgcolor: '#F1FBF3', 
        px: 2, py: 0.5, 
        borderRadius: '20px',
        mb: 3,
        border: '1px solid #00D2C1'
      }}>
        <WorkspacePremiumIcon sx={{ fontSize: 16, color: '#1A5F7A', mr: 1 }} />
        <Typography variant="caption" sx={{ fontWeight: 500, color: '#1A5F7A' }}>
          {doctor.experience} 
        </Typography>
      </Box>

      {/* Rounded Book Now Button - Added Navigation Logic */}
      <Button
        fullWidth
        variant="contained"
        // 3. Navigation path set karein (make sure route match kare)
         onClick={() => navigate(`/doctor/${doctor.id}`)}
        endIcon={<ArrowForwardIosIcon sx={{ fontSize: '12px !important' }} />}
        sx={{
          bgcolor: '#00D2C1',
          color: '#fff',
          borderRadius: '25px',
          textTransform: 'none',
          fontWeight: 500,
          boxShadow: 'none',
          '&:hover': { bgcolor: '#1A5F7A', boxShadow: '0px 4px 15px rgba(0,210,193,0.4)' }
        }}
      >
        Book Now
      </Button>
    </Paper>
  );
};

export default DoctorExpertCard;