// pages/doctor/AddService.tsx
import React, { useState } from 'react';
import { useServiceStore } from '../../store/useServiceStore'; // apna store path adjust kar lena
import { useNavigate } from 'react-router-dom'; // agar routing use kar rahe ho to

import {
  Box,
  Typography,
  Container,
  Grid,
  TextField,
  Button,
  Paper,
  Stack,
  MenuItem,
  Avatar,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import RefreshIcon from '@mui/icons-material/Refresh';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Swal from 'sweetalert2';
 
const AddService: React.FC = () => {
  const addService = useServiceStore((state) => state.addService);
  const navigate = useNavigate();
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
 
  const handleSubmit = () => {
   if (!form.title.trim() || !form.amount.trim()) {
    Swal.fire({
      html: `
        <div style="display:flex; align-items:center; gap:10px; font-family: sans-serif;">
          <span style="color:#f44336; font-size:20px;">⚠️</span>
          <span>Please fill all required service details!</span>
        </div>`,
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000,
      background: '#fff',
    });
    return; 
  }

    const imageUrl = form.image.trim() || 'https://via.placeholder.com/80?text=Service';

   addService({
    title: form.title.trim(),
    amount: form.amount.trim(),
    image: imageUrl || 'https://via.placeholder.com/150', 
    description: form.description.trim() || undefined,
    instructions: form.instructions.filter((i) => i.trim() !== ''),
    status: form.status,
  });

   
  Swal.fire({
    icon: 'success',
    title: 'Service Added!',
    text: 'Your new service has been created successfully.',
    timer: 1500,
    showConfirmButton: false,
  }).then(() => {
    // 4. Sab hone ke baad navigate karein
    navigate('/services');
  });
};
  const handleReset = () => {
    setForm({
      title: '',
      amount: '',
      image: '',
      description: '',
      instructions: [''],
      status: 'Available',
    });
    
  };

const [form, setForm] = useState({
  title: '',
  amount: '',
  image: '',               // ← yeh ab base64 string hoga
  description: '',
  instructions: [''],
  status: 'Available' as 'Available' | 'Unavailable',
});

const [imagePreview, setImagePreview] = useState<string | null>(null);  // ← preview ke liye

const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (!file) return;

  if (!file.type.startsWith('image/')) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid File Type',
      text: 'Please select a valid image file (JPG, PNG, or WebP).',
      confirmButtonColor: '#00D2C1',
    });
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    const base64String = reader.result as string;
    setForm((prev) => ({ ...prev, image: base64String }));
    setImagePreview(base64String); 
    
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
    Toast.fire({
      icon: 'success',
      title: 'Image uploaded successfully'
    });
  };

  reader.onerror = () => {
    Swal.fire({
      icon: 'error',
      title: 'Upload Failed',
      text: 'There was an error reading the file. Please try again.',
      confirmButtonColor: '#00D2C1',
    });
  };

  reader.readAsDataURL(file);
};

  return (
    <Container maxWidth="lg" sx={{ mt: '30px', pb: '50px' }}>
      <Paper
        elevation={0}
        sx={{
          p: '32px',
          borderRadius: '30px',
          bgcolor: '#fff',
          border: '1px solid #E0F2F1',
        }}
      >
        {/* Header */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: '32px' }}
        >
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 500, color: '#1A5F7A' }}>
              Add New Service
            </Typography>
          </Box>
          <Stack direction="row" spacing={2}>
            <Button
              startIcon={<RefreshIcon />}
              variant="outlined"
              onClick={handleReset}
              sx={{ borderRadius: '50px', textTransform: 'none' }}
            >
              Reset
            </Button>
            <Button
              startIcon={<SaveIcon />}
              variant="contained"
              onClick={handleSubmit}
              sx={{
                bgcolor: '#00D2C1',
                borderRadius: '50px',
                px: '24px',
                textTransform: 'none',
              }}
            >
              Save Service
            </Button>
          </Stack>
        </Stack>

        <Grid container spacing={4}>
          {/* Image Upload Section */}
         <Grid size={{xs:12 ,md:4}}>
  <Box
    sx={{
      border: '2px dashed #B2DFDB',
      borderRadius: '20px',
      p: '32px',
      textAlign: 'center',
      bgcolor: '#F9FEFB',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    }}
  >
    {imagePreview ? (
      <>
        <Avatar
          src={imagePreview}
          variant="rounded"
          sx={{
            width: 120,
            height: 120,
            mb: 2,
            border: '3px solid #00D2C1',
          }}
        />
        <Typography variant="body2" color="#00D2C1" sx={{ mb: 1 }}>
          Selected Image
        </Typography>
      </>
    ) : (
      <>
        <CloudUploadIcon sx={{ fontSize: '60px', color: '#00D2C1', mb: '16px' }} />
        <Typography variant="body2" color="textSecondary" sx={{ mb: '16px' }}>
         Upload Service Image 
        </Typography>
      </>
    )}

    {/* Hidden file input */}
    <input
      accept="image/*"                  // sirf images
      id="service-image-upload"
      type="file"
      style={{ display: 'none' }}
      onChange={handleImageChange}
    />

    <label htmlFor="service-image-upload">
      <Button
        variant="contained"
        component="span"
        startIcon={<CloudUploadIcon />}
        sx={{
          bgcolor: '#00D2C1',
          borderRadius: '50px',
          textTransform: 'none',
          px: 4,
          '&:hover': { bgcolor: '#00B8A8' },
        }}
      >
        Choose Image
      </Button>
    </label>

    <Typography variant="caption" color="textSecondary" sx={{ mt: 2 }}>
      ( max 2MB recommended )
    </Typography>
  </Box>
</Grid>
          {/* Main Details */}
          <Grid size={{xs:12 ,md:8}}>
            <Grid container spacing={2}>
              <Grid size={{xs:12 ,sm:6}}>
                <Typography variant="caption" sx={{ ml: '4px', fontWeight: 500,fontSize:"15px" }}>
                  Service Name
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. General Checkup"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                />
              </Grid>

              <Grid size={{xs:12 ,sm:6}}>
                <Typography variant="caption" sx={{ ml: '8px', fontWeight: 500,fontSize:"15px" }}>
                  Price (PKR)
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  placeholder="e.g. 1500"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                />
              </Grid>

              <Grid size={{xs:12 }}>
                <Typography variant="caption" sx={{ ml: '8px', fontWeight: 500,fontSize:"15px" }}>
                  Availability
                </Typography>
                <TextField
                  select
                  fullWidth
                  size="small"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                >
                  <MenuItem value="Available">Available</MenuItem>
                  <MenuItem value="Unavailable">Unavailable</MenuItem>
                </TextField>
              </Grid>

              <Grid size={{xs:12 }}>
                <Typography variant="caption" sx={{ ml: '8px', fontWeight: 500,fontSize:"15px" }}>
                  About Service
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  multiline
                  rows={4}
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Please short detail your services..."
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                />
              </Grid>
            </Grid>
          </Grid>
 
          {/* Final Save Button */}
          <Grid size={{xs:12 }} sx={{ textAlign: 'center', mt: '80px' }}>
            <Button
              variant="contained"
              size="small"
              onClick={handleSubmit}
              sx={{
                bgcolor: '#00BCD4',
                  py: 1.5,
                  px: 8,
                  borderRadius: '8px',
                  fontWeight: 500,
                  fontSize:"16px",
                  textTransform: 'none',
                  '&:hover': { bgcolor: '#00ACC1' }
              }}
            >
              Save Service
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default AddService;