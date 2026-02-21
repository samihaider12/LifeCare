import { Box, Container, Grid, Typography, Link, Stack, IconButton, TextField, Button } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn, YouTube, Phone, Email, LocationOn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#F1FBF3', pt: 8, pb: 1, borderTop: '1px solid #e0e0e0' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>

          {/* Column 1: Company Logo & Info */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <img src="/src/assets/logo.jpg" alt="Logo" style={{ width: 40 }} /> {/* Image path set karein */}
                <Typography variant="h6" sx={{ fontWeight: 500, color: '#1A5F7A' }}>LifeCare</Typography>
              </Box>
              <Typography variant="body2" sx={{ color: ' black', lineHeight: 1.6 }}>
                Your trusted partner in healthcare innovation. We're committed to providing exceptional medical care with cutting-edge technology.
              </Typography>
              <Stack spacing={1}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Phone sx={{ color: '#00D2C1', fontSize: "15px" }} />
                  <Typography variant="body2">+91 8299131275</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Email sx={{ color: '#00D2C1', fontSize: "15px" }} />
                  <Typography variant="body2">info@lifecare.com</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOn sx={{ color: '#00D2C1', fontSize: "15px" }} />
                  <Typography variant="body2">Lahore, pakistan</Typography>
                </Box>
              </Stack>
            </Stack>
          </Grid>

          {/* Column 2: Quick Links */}
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 500, fontSize: "18px", mb: 3, color: '#1A5F7A' }}>Quick Links</Typography>
            <Stack spacing={1.5}>
              {['Home', 'Doctors', 'Services', 'Contact', 'Appointments'].map((item) => (
                <Link key={item} href="#" underline="none" sx={{ color: ' black', fontSize: '16px', '&:hover': { color: '#00D2C1' } }}>
                  → {item}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Column 3: Our Services */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography component="div" variant="h6" sx={{ fontWeight: 500, mb: 3, color: '#1A5F7A' }}>Our Services</Typography>
            <Stack spacing={1.5}>
              {['Blood Pressure Check', 'Blood Sugar Test', 'Full Blood Count', 'X-Ray Scan'].map((item) => (
                <Typography component="div" key={item} sx={{ color: ' black', fontSize: '14px', display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box  sx={{ width: 8, height: 8, bgcolor: '#00D2C1', borderRadius: '50%' }} /> {item}
                </Typography>
              ))}
            </Stack>
          </Grid>

          {/* Column 4: Newsletter & Social */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 500, mb: 2, color: '#1A5F7A' }}>Stay Connected</Typography>
            <Typography variant="body2" sx={{ color: ' black', mb: 3 }}>
              Subscribe for health tips, medical updates, and wellness insights delivered to your inbox.
            </Typography>

            {/* Newsletter Input */}
            <Box sx={{ position: 'relative', mb: 4 }}>
              <TextField
                
                fullWidth
                placeholder="Enter your email"
                variant="outlined"
                size="small"
                sx={{
                  bgcolor: '#fff', borderRadius: '30px',
                  '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                  boxShadow: '0px 4px 10px rgba(0,0,0,0.05)'
                }}
              />
              <Button
                variant="contained"
                sx={{
                  position: 'absolute', right: 0, top: 0, height: '100%',
                  borderRadius: '30px', bgcolor: '#00D2C1', textTransform: 'none',
                  '&:hover': { bgcolor: '#1A5F7A' }
                }}
              >
                Subscribe
              </Button>
            </Box>

            {/* Social Icons */}
            <Stack direction="row" spacing={1}>
              {[Facebook, Twitter, Instagram, LinkedIn, YouTube].map((Icon, index) => (
                <IconButton
                  key={index}
                  sx={{
                    bgcolor: '#fff', color: '#00D2C1',
                    boxShadow: '0px 4px 10px rgba(0,0,0,0.08)',
                    '&:hover': { bgcolor: '#00D2C1', color: '#fff' }
                  }}
                >
                  <Icon fontSize="small" />
                </IconButton>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Box sx={{ borderTop: '1px solid #ddd', mt: 8, pt: 1, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Typography variant="caption" sx={{ color: 'black' }}>
            © 2026 LifeCare Healthcare.
          </Typography>

        </Box>
      </Container>
    </Box>
  );
};

export default Footer;