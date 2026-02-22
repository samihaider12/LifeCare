import React, { useState } from 'react';
import { useServiceStore } from '../../store/useServiceStore';
import {
  Box, Typography, Container, Grid, Paper, Stack,
  TextField, InputAdornment, Button, Avatar, Collapse, IconButton
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SearchOffIcon from '@mui/icons-material/SearchOff'; // Naya icon empty state ke liye
import Swal from 'sweetalert2';

const ServicesList: React.FC = () => {
  const { services, deleteService } = useServiceStore();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [search, setSearch] = useState('');

  const filteredServices = services.filter(s =>
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container maxWidth="xl" sx={{ mt: 4, pb: 6 }}>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight={500} color="#1A5F7A">Services</Typography>
          <Typography variant="body2" color="text.secondary">
            Total services: {services.length}
          </Typography>
        </Box>

        <TextField
          placeholder="Search services..."
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: 280 }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
            sx: { borderRadius: '50px', bgcolor: 'white' }
          }}
        />
      </Stack>

      <Grid container spacing={3}>
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <Grid size={{xs:12 ,md:6}} key={service.id}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: '16px',
                  border: '1px solid #e0f2f1',
                  transition: 'all 0.2s',
                  '&:hover': { boxShadow: '0 4px 20px rgba(0,210,193,0.15)' }
                }}
              >
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <Avatar
                    variant="rounded"
                    src={service.image}
                    sx={{ width: 80, height: 80, borderRadius: 3 }}
                  />
                  <Box flexGrow={1}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                      <Box>
                        <Typography variant="h6" color="#1A5F7A">{service.title}</Typography>
                        <Typography variant="body2" color="#00D2C1" fontWeight={500}>
                          Rs:{service.amount}
                        </Typography>
                      </Box>
                      <IconButton onClick={() => setExpandedId(expandedId === service.id ? null : service.id)}>
                        {expandedId === service.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </IconButton>
                    </Stack>

                    <Collapse in={expandedId === service.id}>
                      <Box mt={2} pt={2} borderTop="1px solid #eee">
                        {service.description && (
                          <>
                            <Typography fontWeight={500} color="#1A5F7A" gutterBottom>About</Typography>
                            <Typography variant="body2" color="text.secondary" paragraph>
                              {service.description}
                            </Typography>
                          </>
                        )}

                        {service.instructions && service.instructions.length > 0 && (
                          <>
                            <Typography fontWeight={500} color="#1A5F7A" gutterBottom>Instructions</Typography>
                            <Box component="ul" sx={{ pl: 2, m: 0, mb: 2 }}>
                              {service.instructions.map((inst, i) => (
                                <li key={i}>
                                  <Typography variant="body2" color="#00D2C1">{inst}</Typography>
                                </li>
                              ))}
                            </Box>
                          </>
                        )}

                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          <Button
                            startIcon={<DeleteOutlineIcon />}
                            variant="contained"
                            size="small"
                            color="error"
                            sx={{ borderRadius: '20px' }}
                            onClick={() => {
                              Swal.fire({
                                title: 'Are you sure?',
                                text: "You won't be able to revert this!",
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#d33',
                                cancelButtonColor: '#3085d6',
                                confirmButtonText: 'Yes, delete it!',
                                cancelButtonText: 'No, cancel'
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  deleteService(service.id);
                                  Swal.fire('Deleted!', 'Your service has been deleted.', 'success');
                                }
                              });
                            }}
                          >
                            Delete
                          </Button>
                        </Stack>
                      </Box>
                    </Collapse>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          ))
        ) : (
          /* NO RESULTS FOUND MESSAGE */
          <Grid size={{xs:12}}>
            <Paper
              elevation={0}
              sx={{
                p: 8,
                textAlign: 'center',
                borderRadius: '16px',
                bgcolor: '#F9FAFB',
                border: '1px dashed #e0f2f1'
              }}
            >
              <SearchOffIcon sx={{ fontSize: 60, color: '#B2DFDB', mb: 2 }} />
              <Typography variant="h6" color="#1A5F7A" gutterBottom>
                No services found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                We couldn't find any service matching "{search}". 
                Check your spelling or try a different keyword.
              </Typography>
              {search && (
                <Button 
                  sx={{ mt: 2, color: '#00D2C1' }} 
                  onClick={() => setSearch('')}
                >
                  Clear Search
                </Button>
              )}
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default ServicesList;