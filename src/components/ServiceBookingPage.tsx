import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Container, Typography, Grid, Paper, Button,
  TextField, MenuItem, Stack, Chip, Divider
} from '@mui/material';
import Swal from 'sweetalert2';
import SendIcon from '@mui/icons-material/Send';
import { useServiceStore } from '../store/useServiceStore';
import { useAppointmentStore } from '../store/appointments';

const ServiceBookingPage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { services } = useServiceStore();
  const { addAppointment } = useAppointmentStore();

  const service = services.find((s) => s.id === Number(serviceId));

  // State initialization
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'Online'>('Online');
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    phone: '',
    age: '',
    gender: '',
    email: '',
  });

  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Form check
  const isFormIncomplete =
    !patientInfo.name ||
    !patientInfo.phone ||
    !patientInfo.age ||
    !patientInfo.gender ||
    !selectedDate ||
    !selectedTime;

  const handleBooking = () => {
    if (isFormIncomplete || !service) {
      Swal.fire({
        icon: 'warning',
        title: 'Fields missing!',
        text: 'Please fill all patient details, date and time.',
        confirmButtonColor: '#00A684',
      });
      return;
    }

    const newAppointment = {
      patientName: patientInfo.name,
      age: patientInfo.age,
      gender: patientInfo.gender,
      phone: patientInfo.phone,
      email: patientInfo.email || undefined,
      serviceId: service.id,
      serviceTitle: service.title,
      doctor: "Lab / Diagnostic Center",
      specialty: "Diagnostic Services",
      fee: service.amount,
      date: selectedDate,
      time: selectedTime,
      status: 'Pending' as const,
      createdAt: new Date().toISOString(),
      paymentMethod,
    };

    addAppointment(newAppointment);

    Swal.fire({
      title: 'Success!',
      text: `${service.title} scheduled for ${selectedDate} at ${selectedTime}`,
      icon: 'success',
      timer: 2200,
      showConfirmButton: false,
    }).then(() => {
      navigate('/');
    });
  };
///
const availableDates = Array.from({ length: 5 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() + i);
  return date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
});



  // Guard Clause: Agar service nahi mili toh yahin se return ho jao
  if (!service) {
    return (
      <Box sx={{ p: 5, textAlign: 'center' }}>
        <Typography variant="h5" color="error">Service Not Found!</Typography>
        <Button sx={{ mt: 3 }} variant="contained" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: '#F8FBFB', minHeight: '100vh', py: { xs: 2, md: 5 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          
          {/* LEFT SIDE */}
          <Grid size={{xs:12 ,md:6}}>
            <Box sx={{ position: { md: 'sticky' }, top: 20 }}>
              <Paper elevation={0} sx={{ borderRadius: '32px', overflow: 'hidden', border: '1px solid #E0F2F0', p: 1, bgcolor: '#fff' }}>
                <Box 
                  component="img" 
                  src={service.image} 
                  alt={service.title}
                  sx={{ width: '100%', height: { xs: '300px', md: '350px' }, objectFit: 'contain', borderRadius: '24px' }}
                />
              </Paper>
            </Box>
          </Grid>

          {/* RIGHT SIDE */}
          <Grid size={{xs:12 ,md:6}}>
            <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: '32px', border: '1px solid #E0F2F0', bgcolor: '#fff' }}>
              
              <Typography variant="h3" sx={{ fontWeight: 500, color: '#135D54', mb: 1, fontSize: { xs: '1.8rem', md: '2.5rem' } }}>
                {service.title}
              </Typography>
              
              <Box sx={{ bgcolor: '#F0F9F7', p: 2, borderRadius: '16px', mb: 3 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 500, color: '#135D54', mb: 0.5 }}>📋 About This Service</Typography>
                <Typography variant="body2" sx={{ color: '#555', lineHeight: 1.6 }}>
                  Professional diagnostic testing for {service.title} with 100% accurate results.
                </Typography>
              </Box>

              <Typography variant="h4" sx={{ color: '#00D2C1', fontWeight: 500, mb: 3 }}>Rs: {service.amount}</Typography>

              {/* Patient Form */}
              <Typography variant="subtitle1" sx={{ fontWeight: 500, color: '#135D54', mb: 2 }}>📞 Patient Details</Typography>
              <Grid container spacing={2}>
                <Grid  size={{xs:12 ,sm:6}}>
                  <TextField size='small' fullWidth label="Full Name *" onChange={(e) => setPatientInfo({ ...patientInfo, name: e.target.value })} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
                </Grid>
                <Grid  size={{xs:12 ,sm:6}}>
                  <TextField size='small' fullWidth label="Mobile Number *" onChange={(e) => setPatientInfo({ ...patientInfo, phone: e.target.value })} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
                </Grid>
                <Grid  size={{xs:6}}>
                  <TextField size='small' fullWidth label="Age *" onChange={(e) => setPatientInfo({ ...patientInfo, age: e.target.value })} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
                </Grid>
                <Grid  size={{xs:6}}>
                  <TextField size='small' select fullWidth label="Gender *" value={patientInfo.gender} onChange={(e) => setPatientInfo({ ...patientInfo, gender: e.target.value })} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </TextField>
                </Grid>
              </Grid>

              {/* Selection Sections */}
              <Typography sx={{ fontWeight: 500, color: '#135D54', mt: 4, mb: 1.5 }}>Payment Method</Typography>
              <Stack direction="row" spacing={1.5}>
                {(['Cash', 'Online'] as const).map((method) => (
                  <Chip key={method} label={method} onClick={() => setPaymentMethod(method)}
                    sx={{ 
                      px: 2, py: 2.5, borderRadius: '50px', fontWeight: 600, border: '1px solid #00A684', cursor: 'pointer',
                      bgcolor: paymentMethod === method ? '#00A684' : 'transparent', 
                      color: paymentMethod === method ? '#fff' : '#00A684' 
                    }} 
                  />
                ))}
              </Stack>

             {/* Date Selection */}
<Typography sx={{ fontWeight: 500, color: '#135D54', mt: 4, mb: 1.5 }}>
  Select Date * 
</Typography>
<Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
  {availableDates.map((date) => {
    // Thora better dikhane ke liye date format change (e.g., Feb 21)
    const displayDate = new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });

    return (
      <Chip 
        key={date} 
        label={displayDate} 
        onClick={() => setSelectedDate(date)}
        sx={{ 
          borderRadius: '12px', 
          fontWeight: 500, 
          border: '1px solid #00A684',
          bgcolor: selectedDate === date ? '#00A684' : 'transparent', 
          color: selectedDate === date ? '#fff' : '#00A684',
          mb: 1
        }} 
      />
    );
  })}
</Stack>
{/* Time Selection */}
<Typography sx={{ fontWeight: 500, color: '#135D54', mt: 3, mb: 1.5 }}>Select Time *</Typography>
<Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
  {['10:00 AM', '11:00 AM', '02:00 PM', '09:00 PM'].map((time) => {
    // 1. Current Date aur Time nikalna
    const now = new Date();
    const isToday = selectedDate === now.toISOString().split('T')[0];

    // 2. Chip ke time ko compare karne ke liye parse karna
    // Example: "10:00 AM" ko aaj ki date ke sath combine karna
    const [timeStr, modifier] = time.split(' ');
    let [hours, minutes] = timeStr.split(':').map(Number);
    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;

    const chipTime = new Date();
    chipTime.setHours(hours, minutes, 0, 0);

    // 3. Condition: Agar aaj ki date hai aur time guzar gaya hai toh disable
    const isPastTime = isToday && chipTime < now;

    return (
      <Chip 
        key={time} 
        label={time} 
        disabled={isPastTime} // <--- Guzra hua waqt disable ho jayega
        onClick={() => !isPastTime && setSelectedTime(time)} 
        sx={{ 
          borderRadius: '12px', 
          fontWeight: 500, 
          border: isPastTime ? '1px solid #ccc' : '1px solid #00A684',
          bgcolor: selectedTime === time ? '#00A684' : 'transparent', 
          color: selectedTime === time ? '#fff' : (isPastTime ? 'black' : '#00A684'),
          cursor: isPastTime ? 'not-allowed' : 'pointer',
          mb: 1
        }} 
      />
    );
  })}
</Stack>
              {/* Summary */}
              <Box sx={{ mt: 5, p: 2, borderRadius: '24px', bgcolor: '#F0F9F7', border: '1px dashed #00D2C1' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 500, color: '#135D54', mb: 2 }}>Booking Summary</Typography>
                <Stack spacing={1}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2">Patient Name:</Typography>
                    <Typography variant="body2" fontWeight={500}>{patientInfo.name || '---'}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2">Date & Time:</Typography>
                    <Typography variant="body2" fontWeight={500}>{selectedDate ? `${selectedDate} | ${selectedTime || '...'}` : '---'}</Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6">Total Payable:</Typography>
                    <Typography variant="h6" color="#00A684" fontWeight={700}>Rs {service.amount}</Typography>
                  </Box>
                </Stack>
              </Box>

              <Button 
                fullWidth variant="contained" 
                startIcon={<SendIcon />} 
                onClick={handleBooking} 
                disabled={isFormIncomplete}
                sx={{ 
                  mt: 4, borderRadius: '50px', p: 1.5, fontSize: '1.1rem',
                  bgcolor: isFormIncomplete ? '#E0E0E0' : '#00D2C1',
                  '&:hover': { bgcolor: '#135D54' } 
                }}
              >
                Confirm Booking 
              </Button>

            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ServiceBookingPage;