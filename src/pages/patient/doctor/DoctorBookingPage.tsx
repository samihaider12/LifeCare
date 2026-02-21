import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Container, Typography, Grid, Paper, Avatar,
  Button, TextField, MenuItem, Chip, Stack
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Swal from 'sweetalert2';
import { useMedicalStore } from '../../../store/useMedicalStore';
import { useAppointmentStore } from '../../../store/appointments'; // ← import yeh add karo

const DoctorBookingPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // ← type specify kar diya

  const { doctors } = useMedicalStore();
  const { addAppointment } = useAppointmentStore();

  // doctor ko safely find karo (undefined handle)
  const doctor = doctors.find((d) => String(d.id) === id);

  // Agar doctor nahi mila to early return
  if (!doctor) {
    return (
      <Container sx={{ mt: 10, textAlign: 'center' }}>
        <Typography variant="h5" color="error">
          Doctor Not Found
        </Typography>
        <Button variant="contained" sx={{ mt: 3 }} onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Container>
    );
  }

  // States
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'Online'>('Cash');
  const [onlineProvider, setOnlineProvider] = useState<string>('');
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    age: '',
    phone: '',
    gender: '',
    email: '',
  });
  const [availableDates, setAvailableDates] = useState<any[]>([]);

  const timeSlots = ["10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM"];

  useEffect(() => {
    window.scrollTo(0, 0);

    const dates = [];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for (let i = 0; i < 5; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      dates.push({
        full: d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }),
        dayName: days[d.getDay()],
        dayNum: d.getDate(),
        month: d.toLocaleString('en-US', { month: 'short' })
      });
    }
    setAvailableDates(dates);
  }, []);

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || !patientInfo.name || !patientInfo.phone || !patientInfo.age) {
      Swal.fire({
        html: `<div style="display:flex; align-items:center; gap:10px;">
              <span style="color:#f44336; font-size:20px;">⚠️</span>
              <span>Please fill all patient details!</span>
            </div>`,
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000
      });
      return;
    }

    if (paymentMethod === 'Online' && !onlineProvider) {
      Swal.fire({
        icon: 'warning',
        text: 'Please select an Online Payment Provider (Easypaisa/Jazzcash/Bank)',
        confirmButtonColor: '#00A684'
      });
      return;
    }

    // Appointment object – serviceId ko NUMBER mein convert kiya
    const newAppointment = {
      patientName: patientInfo.name,
      age: patientInfo.age,
      gender: patientInfo.gender,
      phone: patientInfo.phone,
      serviceId: Number(doctor.id),           // ← string se number convert
      serviceTitle: doctor.name,
      doctor: doctor.name,
      specialty: doctor.specialty,
      fee: doctor.fee,
      date: selectedDate,
      time: selectedTime,
      status: 'Pending' as const,
      createdAt: new Date().toISOString(),
    };

    // Store mein add
    addAppointment(newAppointment);

    Swal.fire({
      title: 'Success!',
      text: `Appointment booked via ${paymentMethod === 'Online' ? onlineProvider : 'Cash'}`,
      icon: 'success',
      timer: 2000,
      showConfirmButton: false,
    }).then(() => {
      navigate('/');
      // Reset form
      setSelectedDate(null);
      setSelectedTime(null);
      setPatientInfo({ name: '', age: '', phone: '', gender: '', email: '' });
    });
  };

  return (
    <Box sx={{ bgcolor: '#F4FBF9', minHeight: '100vh', py: 2, position: 'relative' }}>
      <Container maxWidth="lg">
        {/* TOP NAV */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Button
            onClick={() => navigate(-1)}
            startIcon={<ArrowBackIcon />}
            sx={{ border: '1px solid #00A684', color: '#00A684', borderRadius: '50px', px: 2, textTransform: 'none' }}
          >
            Back
          </Button>
          <Typography variant="h5" sx={{ color: '#006B5E', fontWeight: 500 }}>Doctor Profile</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <StarIcon sx={{ color: '#FFB400' }} />
            <Typography sx={{ fontWeight: 500, color: '#FFB400' }}>4.4</Typography>
          </Box>
        </Box>

        {/* PROFILE CARD */}
        <Paper elevation={0} sx={{ p: 4, borderRadius: '24px', mb: 3, border: '1px solid #E0F2F0' }}>
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: 'center' }}>
              <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <Box sx={{ position: 'absolute', top: -10, left: -10, right: -10, bottom: -10, borderRadius: '50%', background: 'radial-gradient(circle, #00D2C133 0%, transparent 70%)' }} />
                <Avatar src={doctor.image} sx={{ width: 200, height: 200, border: '2px solid #00D2C1' }} />
              </Box>

              <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 3 }}>
                {[{ i: '❤️', l: '96%', s: 'Success' }, { i: '🎖️', l: doctor.experience, s: 'Experience' }, { i: '👥', l: '54k+', s: 'Patients' }].map((item, idx) => (
                  <Box key={idx} sx={{ p: 1, textAlign: 'center', bgcolor: '#fff', borderRadius: '12px', border: '1px solid #F0F0F0', minWidth: '75px' }}>
                    <Typography sx={{ color: '#E91E63', fontSize: '14px' }}>{item.i}</Typography>
                    <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>{item.l}</Typography>
                    <Typography variant="caption" color="textSecondary">{item.s}</Typography>
                  </Box>
                ))}
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 8 }}>
              <Typography variant="h4" sx={{ fontWeight: 500, color: '#006B5E' }}>{doctor.name}</Typography>

              <Typography component="div" variant="body1">
                <Box sx={{ width: 8, height: 8, bgcolor: '#00D2C1', borderRadius: '50%', display: 'inline-block', mr: 1 }} />
                {doctor.specialty}
              </Typography>

              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid size={{ xs: 6 }}>
                  <Box sx={{ p: 1.5, border: '1px solid #F0F0F0', borderRadius: '50px', display: 'flex', gap: 1 }}>
                    <Typography variant="body2" color="primary">🎓</Typography>
                    <Typography variant="body2"><b>Qualifications:</b> {doctor.qualifications}</Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Box sx={{ p: 1.5, border: '1px solid #F0F0F0', borderRadius: '50px', display: 'flex', gap: 1 }}>
                    <Typography variant="body2" color="primary">📍</Typography>
                    <Typography variant="body2"><b>Location:</b> LifeCare</Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Box sx={{ p: 1.5, border: '1px solid #F0F0F0', borderRadius: '50px', display: 'flex', gap: 1 }}>
                    <Typography variant="body2" color="primary">🕒</Typography>
                    <Typography variant="body2"><b>Consultation Fee:</b> <span style={{ color: '#E91E63' }}>₹{doctor.fee}</span></Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Box sx={{ p: 1.5, border: '1px solid #F0F0F0', borderRadius: '50px', display: 'flex', gap: 1 }}>
                    <Typography variant="body2" color="primary">🛡️</Typography>
                    <Typography variant="body2"><b>Availability:</b> Available</Typography>
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ mt: 3, p: 2, border: '1px solid #F0F0F0', borderRadius: '15px' }}>
                <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 500, color: '#006B5E' }}>
                  <span style={{ color: '#00D2C1' }}>ℹ️</span> About Doctor
                </Typography>
                <Typography variant="body2" sx={{ color: '#666', mt: 1 }}>{doctor.about}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* BOOKING SECTION */}
        <Paper elevation={0} sx={{ p: 3, borderRadius: '24px', border: '1px solid #E0F2F0' }}>
          <Typography sx={{ fontWeight: 500, color: '#006B5E', mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
            <CalendarTodayIcon sx={{ fontSize: 20 }} /> Book Your Appointment
          </Typography>

          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 500, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <CalendarTodayIcon sx={{ fontSize: 16 }} /> Select Date
              </Typography>
              <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                {availableDates.map((d, i) => (
                  <Box
                    key={i}
                    onClick={() => setSelectedDate(d.full)}
                    sx={{
                      minWidth: '70px',
                      height: '100px',
                      p: 1,
                      textAlign: 'center',
                      borderRadius: '50px',
                      cursor: 'pointer',
                      border: '1px solid #E0F2F0',
                      bgcolor: selectedDate === d.full ? '#00A684' : '#fff',
                      color: selectedDate === d.full ? '#fff' : '#555',
                      transition: '0.3s'
                    }}
                  >
                    <Typography variant="caption">{d.dayName}</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 500 }}>{d.dayNum}</Typography>
                    <Typography variant="caption">{d.month}</Typography>
                  </Box>
                ))}
              </Stack>

              <Box sx={{ p: 3, border: '1px solid #F0F0F0', borderRadius: '20px' }}>
                <Typography sx={{ fontWeight: 500, color: '#006B5E', mb: 2 }}>Patient Details</Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 7 }}>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Full Name"
                      value={patientInfo.name}
                      onChange={(e) => setPatientInfo({ ...patientInfo, name: e.target.value })}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                    />
                  </Grid>
                  <Grid size={{ xs: 5 }}>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Age"
                      value={patientInfo.age}
                      onChange={(e) => setPatientInfo({ ...patientInfo, age: e.target.value })}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                    />
                  </Grid>
                  <Grid size={{ xs: 7 }}>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Mobile Number"
                      value={patientInfo.phone}
                      onChange={(e) => setPatientInfo({ ...patientInfo, phone: e.target.value })}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                    />
                  </Grid>
                  <Grid size={{ xs: 5 }}>
                    <TextField
                      select
                      fullWidth
                      size="small"
                      value={patientInfo.gender}
                      onChange={(e) => setPatientInfo({ ...patientInfo, gender: e.target.value })}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </TextField>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 500, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <AccessTimeIcon sx={{ fontSize: 16 }} /> Available Time Slots
              </Typography>
              {!selectedDate ? (
                <Typography variant="caption" color="textSecondary">No time slots for this date.</Typography>
              ) : (
                <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                  {timeSlots.map((t) => (
                    <Chip
                      key={t}
                      icon={<AccessTimeIcon sx={{ fontSize: '16px !important' }} />}
                      label={t}
                      onClick={() => setSelectedTime(t)}
                      sx={{
                        p: 2.5,
                        borderRadius: '50px',
                        fontWeight: 500,
                        bgcolor: selectedTime === t ? '#00D2C1' : '#fff',
                        color: selectedTime === t ? '#fff' : '#006B5E',
                        border: '1px solid #00D2C1'
                      }}
                    />
                  ))}
                </Stack>
              )}

              <Box sx={{ p: 3, bgcolor: '#F4FBF9', borderRadius: '20px', border: '1px solid #E0F2F0' }}>
                <Stack spacing={1.5}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="textSecondary">Selected Doctor:</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#006B5E' }}>{doctor.name}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="textSecondary">Selected Date:</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#006B5E' }}>{selectedDate || 'Not selected'}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="textSecondary">Selected Time:</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#006B5E' }}>{selectedTime || 'Not selected'}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="textSecondary">Consultation Fee:</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 900, color: '#E91E63' }}>₹{doctor.fee}</Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                    <Typography variant="caption">Payment:</Typography>
                    <Chip
                      label="Cash"
                      onClick={() => setPaymentMethod('Cash')}
                      sx={{
                        bgcolor: paymentMethod === 'Cash' ? '#00A684' : '#fff',
                        color: paymentMethod === 'Cash' ? '#fff' : '#00A684',
                        border: '1px solid #00A684'
                      }}
                      size="small"
                    />
                    <Chip
                      label="Online"
                      onClick={() => setPaymentMethod('Online')}
                      sx={{
                        bgcolor: paymentMethod === 'Online' ? '#00A684' : '#fff',
                        color: paymentMethod === 'Online' ? '#fff' : '#00A684',
                        border: '1px solid #00A684'
                      }}
                      size="small"
                    />
                  </Box>

                  {paymentMethod === 'Online' && (
                    <TextField
                      select
                      fullWidth
                      size="small"
                      label="Select Provider"
                      value={onlineProvider}
                      onChange={(e) => setOnlineProvider(e.target.value)}
                      sx={{ mt: 1 }}
                    >
                      <MenuItem value="Easypaisa">Easypaisa</MenuItem>
                      <MenuItem value="Jazzcash">Jazzcash</MenuItem>
                    </TextField>
                  )}

                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleBooking}
                    sx={{
                      mt: 2,
                      py: 1.5,
                      borderRadius: '50px',
                      textTransform: 'none',
                      fontWeight: 700,
                      bgcolor: selectedDate && selectedTime ? '#00D2C1' : '#D1D5DB',
                      boxShadow: 'none'
                    }}
                  >
                    Confirm Booking
                  </Button>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default DoctorBookingPage;