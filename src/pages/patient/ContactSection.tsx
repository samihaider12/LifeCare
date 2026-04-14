import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Paper, 
  TextField, 
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Zoom
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';

// 1. TypeScript Interface for Form Data
interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const ContactSection: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  // 2. Initial State Variable (Taake reset karna asaan ho)
  const initialFormState: ContactFormData = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  const [formData, setFormData] = useState<ContactFormData>(initialFormState);

  // 3. Handle Change with TypeScript Types
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Yahan aap apni API call (Axios/Fetch) laga saktay hain
    console.log("Form Data Submitted:", formData);

    // Success Modal dikhayein
    setOpenModal(true);

    // 4. Form ko Empty (Reset) karna
    setFormData(initialFormState);

    // 3 seconds baad modal khud band ho jaye
    setTimeout(() => {
      setOpenModal(false);
    }, 3000);
  };

  return (
    <Box sx={{ bgcolor: '#F9FEFB', py: 10 }}>
      <Container maxWidth="lg">
        
        {/* SUCCESS MODAL */}
        <Dialog 
          open={openModal} 
          TransitionComponent={Zoom}
          onClose={() => setOpenModal(false)}
          PaperProps={{
            sx: { borderRadius: '25px', p: 2, textAlign: 'center', maxWidth: '400px' }
          }}
        >
          <IconButton 
            onClick={() => setOpenModal(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent>
            <CheckCircleOutlineIcon sx={{ fontSize: 70, color: '#00D2C1', mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 500, color: '#135D54', mb: 1 }}>
              Message Received!
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Thank you for contacting us. Our team will get back to you shortly.
            </Typography>
          </DialogContent>
        </Dialog>

        <Grid container spacing={4}>
          {/* Form Side */}
          <Grid size={{xs:12 ,md:7}}>
            <Paper 
              component="form" 
              onSubmit={handleSubmit}
              elevation={0} 
              sx={{ 
                p: { xs: 3, md: 5 }, 
                borderRadius: '30px', 
                border: '1px solid #E0F7F4',
                boxShadow: '0px 10px 40px rgba(0,0,0,0.02)'
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 500, color: '#135D54', mb: 1 }}>
                Contact Our Clinic
              </Typography>
              <Typography variant="body2" sx={{ color: '#00D2C1', mb: 4, fontWeight: 500 }}>
                Please fill in your details and we'll contact you.
              </Typography>
              
              <Grid container spacing={2}>
                <Grid size={{xs:12 ,sm:6}}>
                  <TextField 
                    fullWidth label="Full Name" name="name" required 
                    value={formData.name} // <--- Controlled Input
                    onChange={handleChange} 
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px' } }} 
                  />
                </Grid>
                <Grid size={{xs:12 ,sm:6}}>
                  <TextField 
                    fullWidth label="Email" name="email" type="email" required 
                    value={formData.email} // <--- Controlled Input
                    onChange={handleChange} 
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px' } }} 
                  />
                </Grid>
                <Grid size={{xs:12 ,sm:6}}>
                  <TextField 
                    fullWidth label="Phone" name="phone" required 
                    value={formData.phone} // <--- Controlled Input
                    onChange={handleChange} 
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px' } }} 
                  />
                </Grid>
                <Grid size={{xs:12 }}>
                  <TextField 
                    fullWidth multiline rows={4} label="Message" name="message" 
                    value={formData.message} // <--- Controlled Input
                    onChange={handleChange} 
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px' } }} 
                  />
                </Grid>
              </Grid>
              
              <Button 
                type="submit"
                variant="contained" 
                sx={{ 
                  mt: 4, bgcolor: '#00D2C1', borderRadius: '8px', padding: '12px 32px', 
                  textTransform: 'none', fontWeight: 500,
                  boxShadow: '0px 8px 20px rgba(0,210,193,0.3)',
                  '&:hover': { bgcolor: '#135D54' } 
                }}
              >
                Submit Form
              </Button>
            </Paper>
          </Grid>

          {/* Info & Map Side */}
          <Grid size={{xs:12 ,md:5}}>
            <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: '20px', border: '1px solid #E0F7F4' }}>
              <Typography variant="h6" sx={{ fontWeight: 500, color: '#135D54', mb: 1 }}>Visit Our Clinic</Typography>
              <Typography variant="body2" color="textSecondary">DHA Phase-3, Lahore, Pakistan</Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: '#135D54', mt: 1 }}>📞 +92 829 9431275</Typography>
            </Paper>

            <Box sx={{ borderRadius: '25px', overflow: 'hidden', height: '280px', border: '4px solid #fff', boxShadow: '0px 10px 30px rgba(0,0,0,0.05)' }}>
              <iframe 
                title="clinic-location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.551536765455!2d74.37973547530694!3d31.48154487423169!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919060436402287%3A0x868d550085a67675!2sDHA%20Phase%203%2C%20Lahore%2C%20Punjab!5e0!3m2!1sen!2spk!4v1700000000000!5m2!1sen!2spk" 
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" 
              />
            </Box>

            <Paper elevation={0} sx={{ p: 3, mt: 3, bgcolor: '#E0F7F4', borderRadius: '20px', border: '1px solid rgba(0,210,193,0.2)' }}>
              <Typography sx={{ fontWeight: 500, color: '#135D54', mb: 0.5 }}>Clinic Timing</Typography>
              <Typography variant="body2" sx={{ fontWeight: 500, color: '#135D54' }}>24/7 Emergency Support Available</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactSection;