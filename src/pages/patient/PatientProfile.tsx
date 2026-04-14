import React, { useState } from 'react';
import { 
  Box, Typography, TextField, Button, Paper, 
  MenuItem, Container, Divider, Grid 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

// Updated Interface with Email
interface PatientProfile {
  fullName: string;
  age: string;
  gender: string;
  cnic: string;
  phone: string;
  email: string;  
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
}

const PatientProfileForm = () => {
const navigate = useNavigate();
  const [profile, setProfile] = useState<PatientProfile>({
    fullName: '',
    age: '',
    gender: '',
    cnic: '',
    phone: '',
    email: '', // Initial state reset
    emergencyContact: { name: '', relation: '', phone: '' }
  });

  const [errors, setErrors] = useState<any>({});

  const inputStyle = {
    '& .MuiInputBase-input': { fontSize: '15px', fontWeight: 500 },
    '& .MuiInputLabel-root': { fontSize: '15px', fontWeight: 500 },
    '& .MuiOutlinedInput-root': { borderRadius: '12px' }
  };

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  let { name, value } = e.target;
   
  // --- CNIC SPECIFIC LOGIC ---
  if (name === 'cnic') {
    // 1. Sirf digits nikaalein
    const numbersOnly = value.replace(/\D/g, '');
    
    // 2. 13 digits se zyada allow na karein (CNIC standard)
    if (numbersOnly.length > 13) return;

    // 3. Auto-Dash Formatting
    let formatted = '';
    if (numbersOnly.length <= 5) {
      formatted = numbersOnly;
    } else if (numbersOnly.length <= 12) {
      formatted = `${numbersOnly.slice(0, 5)}-${numbersOnly.slice(5)}`;
    } else {
      formatted = `${numbersOnly.slice(0, 5)}-${numbersOnly.slice(5, 12)}-${numbersOnly.slice(12, 13)}`;
    }
    
    setProfile(prev => ({ ...prev, cnic: formatted }));
    return; // Baaki logic skip karein
  }

  // --- AGE & PHONE LOGIC ---
  if (name === 'age' || name === 'phone' || name === 'emergency_phone') {
    if (!/^\d*$/.test(value)) return;
    if ((name === 'phone' || name === 'emergency_phone') && value.length > 11) return;
  }

  // --- NESTED & NORMAL FIELDS ---
  if (name.startsWith('emergency_')) {
    const field = name.split('_')[1];
    setProfile(prev => ({
      ...prev,
      emergencyContact: { ...prev.emergencyContact, [field]: value }
    }));
  } else {
    setProfile(prev => ({ ...prev, [name]: value }));
  }
};

  const validate = () => {
    let tempErrors: any = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!profile.fullName) tempErrors.fullName = "Name is required";
    if (!profile.age) tempErrors.age = "Age is required";
    if (profile.cnic.length < 15) tempErrors.cnic = "Invalid CNIC";
    if (profile.phone.length < 11) tempErrors.phone = "Invalid Phone";
    
    // Email Validation
    if (!profile.email) {
      tempErrors.email = "Email is required";
    } else if (!emailRegex.test(profile.email)) {
      tempErrors.email = "Invalid email format";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {

     Swal.fire("Saved!", "Profile created successfully", "success");
     navigate("/");
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={0} sx={{ p: 4, borderRadius: '24px', border: '1px solid #E0F7F4' }}>
        <Typography variant="h5" sx={{ fontWeight: 500, color: '#1A5F7A', mb: 3 }}>
          Patient Profile Setup
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField 
                fullWidth label="Full Name" name="fullName" 
                error={!!errors.fullName} helperText={errors.fullName}
                value={profile.fullName} onChange={handleChange} sx={inputStyle} 
              />
            </Grid>
            
            <Grid size={{ xs: 6, md: 3 }}>
              <TextField 
                fullWidth label="Age" name="age" 
                error={!!errors.age} helperText={errors.age}
                value={profile.age} onChange={handleChange} sx={inputStyle} 
              />
            </Grid>

            <Grid size={{ xs: 6, md: 3 }}>
              <TextField 
                fullWidth select label="Gender" name="gender"
                value={profile.gender} onChange={handleChange} sx={inputStyle}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField 
                fullWidth label="CNIC Number" name="cnic"
                error={!!errors.cnic} helperText={errors.cnic}
                value={profile.cnic} onChange={handleChange} sx={inputStyle} 
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField 
                fullWidth label="Phone" name="phone" 
                error={!!errors.phone} helperText={errors.phone}
                value={profile.phone} onChange={handleChange} sx={inputStyle} 
              />
            </Grid>

            {/* Email Field Added Back */}
            <Grid size={{ xs: 12 }}>
              <TextField 
                fullWidth label="Email Address" name="email" type="email"
                error={!!errors.email} helperText={errors.email}
                value={profile.email} onChange={handleChange} sx={inputStyle} 
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Divider sx={{ my: 2 }}>
                <Typography variant="caption" sx={{ fontWeight: 500, color: '#999' }}>EMERGENCY CONTACT</Typography>
              </Divider>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField fullWidth label="Contact Name" name="emergency_name" value={profile.emergencyContact.name} onChange={handleChange} sx={inputStyle} />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField fullWidth label="Relation" name="emergency_relation" value={profile.emergencyContact.relation} onChange={handleChange} sx={inputStyle} />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField fullWidth label="Emergency Phone" name="emergency_phone" value={profile.emergencyContact.phone} onChange={handleChange} sx={inputStyle} />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button 
                  type="submit" variant="contained" 
                  sx={{ bgcolor: '500D2C1', borderRadius: '12px', px: 6, py: 1.5, fontWeight: 500, textTransform: 'none', '&:hover': { bgcolor: '#135D54' } }}
                >
                  Save Profile
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default PatientProfileForm;