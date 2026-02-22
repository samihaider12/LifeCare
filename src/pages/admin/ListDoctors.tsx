import React, { useState } from 'react';
import {
    Box, Typography, Container, Grid, Paper, Avatar,
    Button, Stack, TextField, InputAdornment, Chip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import StarIcon from '@mui/icons-material/Star';
import { useMedicalStore } from '../../store/useMedicalStore';
import Swal from 'sweetalert2';
const ListDoctors: React.FC = () => {
    const { doctors, deleteDoctor } = useMedicalStore();
    const [searchTerm, setSearchTerm] = useState("");

    // Filter Logic
    const filteredDoctors = doctors.filter(dr =>
        dr.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dr.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleDelete = (id: string) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you really want to delete this doctor? This action cannot be undone.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33', // Delete button red color
        cancelButtonColor: '#3085d6', // Cancel button blue color
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it',
        reverseButtons: true // Buttons ki position swap karne ke liye
    }).then((result) => {
        if (result.isConfirmed) {
            // Delete action perform karein
            deleteDoctor(id);

            // Success message show karein
            Swal.fire({
                title: 'Deleted!',
                text: 'The doctor record has been removed.',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            });
        }
    });
};

    return (
        <Container maxWidth="xl" sx={{ mt: 4, pb: 8 }}>
            {/* Header Section */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 500, color: '#1A5F7A' }}>
                    Medical Team List
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Manage your doctors, view profiles, or remove them from the system.
                </Typography>
            </Box>

            {/* Search Bar */}
            <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
                <TextField
                    placeholder="Search by name or specialization..."
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{
                        width: '400px',
                        '& .MuiOutlinedInput-root': { borderRadius: '50px', bgcolor: '#fff' }
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: '#00D2C1' }} />
                            </InputAdornment>
                        ),
                    }}
                />
                <Button
                    variant="contained"
                    onClick={() => setSearchTerm("")}
                    sx={{ bgcolor: '#00D2C1', borderRadius: '50px', px: 3, textTransform: 'none' }}
                >
                    Clear
                </Button>
            </Box>

            {/* Doctors Grid */}
            <Grid container spacing={3}>
                {filteredDoctors.map((dr) => (
                    <Grid size={{ xs: 12, md: 6, lg: 4 }} key={dr.id}>
                        <Paper elevation={0} sx={{
                            p: 2.5,
                            borderRadius: '20px',
                            border: '1px solid #E0F2F1',
                            transition: '0.3s',
                            '&:hover': { boxShadow: '0px 10px 25px rgba(0,0,0,0.05)' }
                        }}>
                            <Stack direction="row" spacing={2} alignItems="flex-start">
                                {/* Doctor Image */}
                                <Avatar
                                    src={dr.image}
                                    sx={{ width: 80, height: 80, borderRadius: '15px', border: '1px solid #eee' }}
                                />

                                <Box sx={{ flexGrow: 1 }}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography variant="h6" sx={{ fontWeight: 500, color: '#1A5F7A' }}>
                                            {dr.name}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', color: '#FFB400' }}>
                                            <StarIcon fontSize="small" />
                                            <Typography variant="caption" sx={{ ml: 0.5, fontWeight: 700 }}>
                                                {dr.rating || '4.5'}
                                            </Typography>
                                        </Box>
                                    </Stack>

                                    <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                                        {dr.specialty} • {dr.experience || '5 years'}
                                    </Typography>

                                    <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                                        <Chip
                                            label={dr.available || 'Available'}
                                            size="small"
                                            sx={{ bgcolor: '#E0F7FA', color: '#00D2C1', fontWeight: 600 }}
                                        />
                                        <Typography variant="subtitle2" sx={{ color: '#1A5F7A' }}>
                                            Fees: Rs.{dr.fee}
                                        </Typography>
                                    </Stack>

                                    <Stack direction="row" spacing={1}>
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            startIcon={<DeleteOutlineIcon />}
                                            onClick={() => handleDelete(dr.id)}
                                            sx={{
                                                borderRadius: '10px',
                                                color: '#FF5252',
                                                borderColor: '#FF5252',
                                                textTransform: 'none',
                                                '&:hover': { bgcolor: '#FFF5F5', borderColor: '#FF5252' }
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </Stack>
                                </Box>
                            </Stack>
                        </Paper>
                    </Grid>
                ))}

                {filteredDoctors.length === 0 && (
                    <Box sx={{ textAlign: 'center', width: '100%', py: 10 }}>
                        <Typography color="textSecondary">No doctors found in the medical team.</Typography>
                    </Box>
                )}
            </Grid>
        </Container>
    );
};

export default ListDoctors;