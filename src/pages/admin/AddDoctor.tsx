import React, { useState } from 'react';
import {
  Box,
  Typography,
  // Container,
  Grid,
  TextField,
  Button,
  Paper,
  Avatar,
  MenuItem,
  Stack,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { toast } from 'react-toastify';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2'; // SweetAlert2 for warnings
import { useMedicalStore } from '../../store/useMedicalStore';

// Validation Schema (Yup)
const doctorSchema = yup.object().shape({
  name: yup.string().required('Full Name is required'),
  specialty: yup.string().required('Specialization is required'),
  location: yup.string().required('Location is required'),
  experience: yup.string().required('Experience is required'),
  qualifications: yup.string().required('Qualifications are required'),
  fee: yup
    .number()
    .typeError('Fee must be a number')
    .positive('Fee must be positive')
    .required('Consultation Fee is required'),
  rating: yup
    .string()
    .matches(/^(?:[1-4](?:\.\d)?|5(?:\.0)?)$/, 'Rating must be between 1.0 and 5.0')
    .required('Rating is required'),
  patients: yup.string().required('Number of Patients is required'),
  successRate: yup.string().required('Success Rate is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  about: yup.string().required('About section is required'),
  available: yup.string().required('Availability is required'),
  // image: yup.mixed().required('Profile image is required'), // Uncomment agar image required chahiye
});

type DoctorFormData = yup.InferType<typeof doctorSchema> & {
  imageFile?: File; // Extra for file handling
};

const AddDoctor: React.FC = () => {
  const { addDoctor } = useMedicalStore();
  const [showPassword, setShowPassword] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<DoctorFormData>({
    resolver: yupResolver(doctorSchema),
    defaultValues: {
      name: '',
      specialty: '',
      location: '',
      experience: '',
      qualifications: '',
      fee: undefined,
      rating: '',
      patients: '',
      successRate: '',
      email: '',
      password: '',
      about: '',
      available: 'Available',
    },
  });

  const onSubmit = (data: DoctorFormData) => {
    // Agar image nahi upload ki to default placeholder
    const imageUrl = previewImage || 'https://via.placeholder.com/150';

    addDoctor({
      name: data.name,
      specialty: data.specialty,
      location: data.location,
      experience: data.experience,
      qualifications: data.qualifications,
      fee: Number(data.fee),
      rating: data.rating,
      patient: data.patients || "0",
      successRate: data.successRate,
      email: data.email,
      //   password: data.password,
      about: data.about,
      available: data.available,
      image: imageUrl,
      //   id: kuch bhi mat l
    });

    toast.success('Doctor added successfully!', { position: 'top-right' });

    // Form reset + preview clear
    reset();
    setPreviewImage(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Ye permanent string ban jayegi jo reset ke baad bhi store mein rahegi
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Warning show agar validation fail ho (optional, form already errors show karta hai)
  const onError = (_errors: any) => {
    Swal.fire({
      icon: 'warning',
      title: 'Missing Fields',
      text: 'Please fill all required fields correctly.',
      confirmButtonColor: '#00D2C1',
    });
  };

  return (
    <Grid maxWidth="md" size={{ xs: 12, md: 7 }}
      sx={{
        mx: 'auto',
        mt: 4,
        px: { xs: 2, md: 0 }

      }}

    >

      <Stack alignItems="center" spacing={1} sx={{ mb: 4 }}>
        <Avatar sx={{ bgcolor: '#00D2C1', width: 56, height: 56 }}>
          <AddCircleOutlineIcon fontSize="large" />
        </Avatar>
        <Typography variant="h4" sx={{ color: '#1A5F7A', fontWeight: 500, fontSize: "35px" }}>
          Add New Doctor
        </Typography>
      </Stack>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: '30px',
          border: '1px solid #E0F2F1',
          bgcolor: '#fff',
        }}
      >
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <Grid container spacing={3}>
            {/* Image Upload with Preview */}
            <Grid size={{ xs: 12 }}>
              <Typography variant="body2" sx={{ mb: 1, }}>
                Upload Profile Image
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar
                  src={previewImage || 'https://via.placeholder.com/100'}
                  sx={{ width: 100, height: 100, borderRadius: '16px' }}
                />
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
                  sx={{
                    borderRadius: '50px',
                    textTransform: 'none',

                    borderColor: errors.imageFile ? 'error.main' : '#ccc',
                  }}
                >
                  Choose Image
                  <input type="file" hidden accept="image/*" onChange={handleImageChange} />
                </Button>
              </Box>
              {/* {errors.imageFile && <Typography color="error">{errors.imageFile.message}</Typography>} */}
            </Grid>

            {/* Other Fields with Controller for better MUI integration */}
            {[
              { label: 'Full Name', name: 'name' as const },
              { label: 'Specialization', name: 'specialty' as const },
              { label: 'Location', name: 'location' as const },
              { label: 'Experience (years)', name: 'experience' as const },
              { label: 'Qualifications', name: 'qualifications' as const },
              { label: 'Consultation Fee', name: 'fee' as const, type: 'number' },
              { label: 'Rating (1.0 - 5.0)', name: 'rating' as const },
              { label: 'Patients Treated', name: 'patients' as const },
              { label: 'Success Rate ', name: 'successRate' as const },
              { label: 'Doctor Email', name: 'email' as const, type: 'email' },
            ].map((field) => (
              <Grid size={{ xs: 12, sm: 6 }} key={field.name}>
                <Typography>
                  {field.label}
                </Typography>
                <Controller
                  name={field.name}
                  control={control}

                  render={({ field: { onChange, value } }) => (

                    <TextField
                      fullWidth
                      size="small"
                      placeholder={field.label}
                      type={field.type || 'text'}
                      value={value ?? ''}
                      onChange={onChange}
                      error={!!errors[field.name]}
                      helperText={errors[field.name]?.message}
                      sx={{
                        '& .MuiOutlinedInput-root': { borderRadius: '8px' },
                      }}
                    />
                  )}
                />
              </Grid>
            ))}

            {/* Password */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography>
                Password
              </Typography>
              <Controller
                name="password"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Doctor Password"
                    type={showPassword ? 'text' : 'password'}
                    value={value ?? ''}
                    onChange={onChange}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                  />
                )}
              />
            </Grid>

            {/* Available */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography>
                Availablety
              </Typography>
              <Controller
                name="available"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    select
                    fullWidth
                    size='small'
                    value={value ?? 'Available'}
                    onChange={onChange}
                    error={!!errors.available}
                    helperText={errors.available?.message}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                  >
                    <MenuItem value="Available">Available</MenuItem>
                    <MenuItem value="Not Available">Not Available</MenuItem>
                  </TextField>
                )}
              />
            </Grid>

            {/* About */}
            <Grid size={{ xs: 12 }}>
              <Typography>
                Doctor About
              </Typography>
              <Controller
                name="about"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    fullWidth
                    size="small"
                    multiline
                    rows={4}
                    placeholder="About doctor"
                    value={value ?? ''}
                    onChange={onChange}
                    error={!!errors.about}
                    helperText={errors.about?.message}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px', bgcolor: '#FAFEFD' } }}
                  />
                )}
              />
            </Grid>

            {/* Submit */}
            <Grid size={{ xs: 12 }} sx={{ textAlign: 'center', mt: 4 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: '#00BCD4',
                  py: 1.5,
                  px: 8,
                  borderRadius: '8px',
                  fontWeight: 500,
                  fontSize: "16px",
                  textTransform: 'none',
                  '&:hover': { bgcolor: '#00ACC1' },
                }}
              >
                Add Doctor to Team
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
};

export default AddDoctor;