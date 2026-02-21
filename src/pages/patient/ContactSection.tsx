import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Paper, 
  TextField, 
  MenuItem, 
  Button 
} from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const ContactSection = () => {
  // Form state for WhatsApp logic
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    service: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppSubmit = () => {
    const phoneNumber = "918299431275"; //
    const text = `Hello! I am ${formData.name}. 
    Phone: ${formData.phone}
    Department: ${formData.department}
    Message: ${formData.message}`;
    
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, '_blank');
  };

  return (
    <Box sx={{ bgcolor: '#F9FEFB', py: 10 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          
          {/* Left Side: Contact Form */}
          <Grid  size={{xs:12 ,md:7}}>
            <Paper elevation={0} sx={{ 
              p: { xs: 3, md: 5 }, 
              borderRadius: '30px', 
              border: '1px solid #E0F7F4',
              boxShadow: '0px 10px 40px rgba(0,0,0,0.02)'
            }}>
              <Typography variant="h4" sx={{ fontWeight: 500, color: '#135D54', mb: 1 }}>
                Contact Our Clinic
              </Typography>
              <Typography variant="body2" sx={{ color: '#00D2C1', mb: 4, fontWeight: 500 }}>
                Fill the form - we'll open WhatsApp so you can connect with us instantly.
              </Typography>
              
              <Grid container spacing={2}>
                <Grid  size={{xs:12 ,sm:6}}>
                  <TextField 
                    fullWidth label="Full Name" name="name"
                    variant="outlined" onChange={handleChange}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px' } }} 
                  />
                </Grid>
                <Grid  size={{xs:12 ,sm:6}}>
                  <TextField 
                    fullWidth label="Email" name="email"
                    variant="outlined" onChange={handleChange}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px' } }}
                  />
                </Grid>
                <Grid  size={{xs:12 ,sm:6}}>
                  <TextField 
                    fullWidth label="Phone" name="phone"
                    variant="outlined" onChange={handleChange}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px' } }}
                  />
                </Grid>
                <Grid  size={{xs:12 ,sm:6}}>
                  <TextField 
                    select fullWidth label="Department" name="department"
                    value={formData.department} onChange={handleChange as any}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px' } }}
                  >
                    <MenuItem value="Cardiology">Cardiology</MenuItem>
                    <MenuItem value="Dental">Dental</MenuItem>
                    <MenuItem value="Radiology">Radiology</MenuItem>
                    <MenuItem value="Neurology">Neurology</MenuItem>
                  </TextField>
                </Grid>
                <Grid  size={{xs:12 }}>
                  <TextField 
                    select fullWidth label="Service" name="service"
                    value={formData.service} onChange={handleChange as any}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px' } }}
                  >
                    <MenuItem value="Checkup">General Checkup</MenuItem>
                    <MenuItem value="BloodTest">Blood Test</MenuItem>
                    <MenuItem value="XRay">X-Ray Scan</MenuItem>
                  </TextField>
                </Grid>
                <Grid  size={{xs:12 }}>
                  <TextField 
                    fullWidth multiline rows={4} label="Message" name="message"
                    variant="outlined" onChange={handleChange}
                    placeholder="Describe your concern briefly..."
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px' } }}
                  />
                </Grid>
              </Grid>
              
              <Button 
                variant="contained" 
                onClick={handleWhatsAppSubmit}
                startIcon={<WhatsAppIcon />}
                sx={{ 
                  mt: 4, 
                  bgcolor: '#00D2C1', 
                  borderRadius: '50px', 
                  px: 4, py: 1.5, 
                  textTransform: 'none',
                  fontSize: '16px',
                  fontWeight: 500,
                  boxShadow: '0px 8px 20px rgba(0,210,193,0.3)',
                  '&:hover': { bgcolor: '#135D54' } 
                }}
              >
                Send via WhatsApp
              </Button>
            </Paper>
          </Grid>

          {/* Right Side: Info & Map */}
          <Grid   size={{xs:12 ,md:5}}>
            {/* Contact Info Card */}
            <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: '20px', border: '1px solid #E0F7F4' }}>
              <Typography variant="h6" sx={{ fontWeight: 500, color: '#135D54', mb: 1 }}>
                Visit Our Clinic
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                DHA Phase-3 Lahore
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: '#135D54' }}>
                📞 8299431275
              </Typography>
              <Typography variant="body2" color="textSecondary">
                ✉️ info@lifecare.com
              </Typography>
            </Paper>

            {/* Google Map Box */}
          <Box sx={{ 
  borderRadius: '25px', 
  overflow: 'hidden', 
  height: '280px', 
  border: '4px solid #fff',
  boxShadow: '0px 10px 30px rgba(0,0,0,0.05)'
}}>
  <iframe 
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.325608796!2d74.3168!3d31.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919045a27329b37%3A0x6335198448f2b7a4!2sLife%20Care%20Hospital%20Lahore!5e0!3m2!1sen!2s!4v1700000000000" 
    width="100%" 
    height="100%" 
    style={{ border: 0 }} 
    allowFullScreen 
    loading="lazy" 
  />
</Box>

            {/* Clinic Hours Card */}
            <Paper elevation={0} sx={{ 
              p: 3, mt: 3, 
              bgcolor: '#E0F7F4', 
              borderRadius: '20px',
              border: '1px solid rgba(0,210,193,0.2)'
            }}>
              <Typography sx={{ fontWeight: 500, color: '#135D54', mb: 0.5 }}>
                Clinic timing
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500, color: '#135D54' }}>
              24/7 Availability
              </Typography>
            </Paper>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};

export default ContactSection;