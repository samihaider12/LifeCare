import { useState } from 'react';
import { Box, Typography, TextField, InputAdornment, Container, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useMedicalStore } from '../../../store/useMedicalStore';
import DoctorExpertCard from '../../../components/DoctorExpertCard';

const MedicalExpertsHeader = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { doctors } = useMedicalStore(); // Store se data liya

  const filteredDoctors = doctors.filter((dr: any) =>
    dr.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dr.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ bgcolor: '#F9FEFB', pb: 10 }}> {/* Light background */}
      <Container sx={{ textAlign: 'center', pt: 8 }}>
        <Typography variant="h3" sx={{ fontWeight: 500, color: '#1A5F7A', mb: 1 }}>
          Our <i>LifeCare</i> <span style={{ color: '#00D2C1' }}>Medical Experts</span>
        </Typography>
        <Typography variant="body1" sx={{ color: '#666', mb: 5 }}>
          Find your ideal doctor by name or specialization
        </Typography>

        {/* Professional Search Bar */}
        <Box sx={{ maxWidth: '600px', mx: 'auto', mb: 8 }}>
          <TextField
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search doctors..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#00D2C1', ml: 1 }} />
                </InputAdornment>
              ),
              sx: { 
                borderRadius: '50px', 
                bgcolor: '#fff', 
                height: '60px',
                boxShadow: '0px 10px 25px rgba(0,0,0,0.05)'
              }
            }}
          />
        </Box>

        {/* New Beautiful Grid */}
        <Grid container spacing={4}>
          {filteredDoctors.map((doctor) => (
            <Grid size={{xs:12 ,sm:6 ,md:3}} key={doctor.id}>
              <DoctorExpertCard doctor={doctor} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default MedicalExpertsHeader;