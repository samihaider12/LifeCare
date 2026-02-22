import React, { useState } from 'react';
import { useServiceStore } from '../../store/useServiceStore';
import { useNavigate } from 'react-router-dom';
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
  // IconButton,
  // Tooltip
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import RefreshIcon from '@mui/icons-material/Refresh';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Swal from 'sweetalert2';

const AddService: React.FC = () => {
  const addService = useServiceStore((state) => state.addService);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    amount: '',
    image: '',
    description: '',
    instructions: [''],
    status: 'Available' as 'Available' | 'Unavailable',
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

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
      Toast.fire({ icon: 'success', title: 'Image uploaded successfully' });
    };
    reader.readAsDataURL(file);
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
    setImagePreview(null);
  };

  const handleSubmit = () => {
    if (!form.title.trim() || !form.amount.trim()) {
      Swal.fire({
        html: `<div style="display:flex; align-items:center; gap:10px; font-family: sans-serif;">
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

    const imageUrl = form.image.trim() || 'https://via.placeholder.com/150';

    addService({
      title: form.title.trim(),
      amount: Number(form.amount),
      image: imageUrl,
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
      navigate('/services');
    });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: { xs: 2, md: 4 }, pb: 5 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 4 },
          borderRadius: '30px',
          bgcolor: '#fff',
          border: '1px solid #E0F2F1',
        }}
      >
        {/* Header - Simple and Clean */}
        <Box sx={{ mb: 4, textAlign: { xs: 'center', md: 'left' } }}>
          <Typography variant="h4" sx={{ fontWeight: 500, color: '#1A5F7A', fontSize: { xs: '1.5rem', md: '2.125rem' } }}>
            Add New Service
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Fill in the details to create a new medical service.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Image Upload Section */}
          <Grid size={{xs:12 ,md:4}}>
            <Stack spacing={2}>
              {/* Reset Button placed here for better UX */}
              <Button
                startIcon={<RefreshIcon />}
                variant="text"
                onClick={handleReset}
                sx={{ 
                  color: 'black', 
                  textTransform: 'none', 
                  alignSelf: 'flex-start',
                  '&:hover': { color: '#f44336' } 
                }}
              >
                Reset Form
              </Button>

              <Box
                sx={{
                  border: '2px dashed #B2DFDB',
                  borderRadius: '20px',
                  p: 3,
                  textAlign: 'center',
                  bgcolor: '#F9FEFB',
                  minHeight: '300px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {imagePreview ? (
                  <Avatar
                    src={imagePreview}
                    variant="rounded"
                    sx={{ width: 140, height: 140, mb: 2, border: '3px solid #00D2C1', boxShadow: 3 }}
                  />
                ) : (
                  <CloudUploadIcon sx={{ fontSize: '60px', color: '#00D2C1', mb: 2, opacity: 0.5 }} />
                )}

                <input
                  accept="image/*"
                  id="service-image-upload"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                />

                <label htmlFor="service-image-upload">
                  <Button
                    variant="contained"
                    component="span"
                    sx={{
                      bgcolor: '#00D2C1',
                      borderRadius: '50px',
                      textTransform: 'none',
                      px: 3,
                      '&:hover': { bgcolor: '#00B8A8' },
                    }}
                  >
                    {imagePreview ? 'Change Image' : 'Choose Image'}
                  </Button>
                </label>
                <Typography variant="caption" color="textSecondary" sx={{ mt: 2 }}>
                     (Max 2MB)
                </Typography>
              </Box>
            </Stack>
          </Grid>

          {/* Main Details Section */}
          <Grid size={{xs:12 ,md:8}}>
            <Grid container spacing={3}>
              <Grid size={{xs:12 ,sm:6}}>
                <Typography variant="subtitle2" sx={{ mb: 1, ml: 0.5, color: 'black' }}>Service Name</Typography>
                <TextField
                  fullWidth
                  size="small"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Heart Surgery"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', bgcolor: '#FAFAFA' } }}
                />
              </Grid>

              <Grid size={{xs:12 ,sm:6}}>
                <Typography variant="subtitle2" sx={{ mb: 1, ml: 0.5, color: 'black' }}>Price (PKR)</Typography>
                <TextField
                  fullWidth
                  size="small"
                  name="amount"
                  type="number"
                  value={form.amount}
                  onChange={handleChange}
                  placeholder="e.g. 5000"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', bgcolor: '#FAFAFA' } }}
                />
              </Grid>

              <Grid size={{xs:12 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, ml: 0.5, color: 'black' }}>Status</Typography>
                <TextField
                  select
                  fullWidth
                  size="small"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', bgcolor: '#FAFAFA' } }}
                >
                  <MenuItem value="Available">Available</MenuItem>
                  <MenuItem value="Unavailable">Unavailable</MenuItem>
                </TextField>
              </Grid>

              <Grid size={{xs:12 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, ml: 0.5, color: 'black' }}>About Service</Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={5}
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe the medical service in detail..."
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', bgcolor: '#FAFAFA' } }}
                />
              </Grid>

              {/* Final Submit Button */}
              <Grid size={{xs:12 }} sx={{ mt: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={handleSubmit}
                  sx={{
                    bgcolor: '#1A5F7A',
                    py: 1.8,
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: 500,
                    textTransform: 'none',
                    boxShadow: '0 4px 14px 0 rgba(26, 95, 122, 0.39)',
                    '&:hover': { bgcolor: '#144d63', boxShadow: 'none' },
                  }}
                >
                  Save Service
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default AddService;