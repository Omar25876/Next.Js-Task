'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Box,
  TextField,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Stack,
} from '@mui/material';
import axios from 'axios';

export default function EditMovie() {
  const { id } = useParams(); // `id` matches [id] folder
  const router = useRouter();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchMovie = async () => {
      try {
        const res = await axios.get(`/api/movies/${id}`);
        setMovie(res.data);
      } catch (err) {
        setError('Failed to load movie data.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/api/movies/${id}`, movie);
      setSuccess('Movie updated successfully.');
      setError(null);
    } catch (err) {
      setError('Failed to update movie.');
      setSuccess(null);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/movies/${id}`);
      router.push('/'); 
    } catch (err) {
      setError('Failed to delete movie.');
    }
  };

  if (loading) {
    return (
      <Box p={4} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={4}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!movie) return null;

  return (
    <Box p={4} maxWidth={600} mx="auto"
    sx={{
      backgroundColor:'white'
    }}
    >

      <Typography variant="h4" mb={2}>Edit Movie</Typography>

      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Stack spacing={2}>
        <TextField
          label="Title"
          name="title"
          value={movie.title || ''}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Overview"
          name="overview"
          value={movie.overview || ''}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
        />
        <TextField
          label="Vote Average"
          name="vote_average"
          value={movie.vote_average || ''}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Release Date"
          name="release_date"
          value={movie.release_date || ''}
          onChange={handleChange}
          fullWidth
        />
      </Stack>

      <Box mt={4} display="flex" gap={2}>
        <Button variant="contained" color="primary" onClick={handleUpdate}>
          Save Changes
        </Button>
        <Button variant="outlined" color="error" onClick={handleDelete}>
          Delete Movie
        </Button>
      </Box>
    </Box>
  );
}
