'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Stack,
  Chip,
  Button,
  CircularProgress,
  Alert,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';

const imgPath = 'https://image.tmdb.org/t/p/w500';

export default function MovieDetails() {
  const { Id } = useParams(); 
  const router = useRouter();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (!Id) return;

    const fetchMovie = async () => {
      try {
        const res = await axios.get(`/api/movies/${Id}`);
        setMovie(res.data);
      } catch (err) {
        setError('Failed to fetch movie details.');
        console.error('Error fetching movie details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [Id]);

  const handleEdit = () => {
    router.push(`/movies/edit/${Id}`);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this movie?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/movies/${Id}`);
      alert('Movie deleted successfully.');
      router.push('/');
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete movie.');
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
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        backgroundImage: `url(${imgPath}${movie.backdrop_path || movie.poster_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 4,
        py: 6,
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0.85), rgba(0,0,0,0.6))',
          zIndex: 1,
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '1100px',
          width: '100%',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: 6,
        }}
      >
        <Box
          component="img"
          src={`${imgPath}${movie.poster_path}`}
          alt={movie.title}
          sx={{
            width: isMobile ? '100%' : '300px',
            borderRadius: 4,
            objectFit: 'cover',
          }}
        />
        <Box>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#f5c518' }}>
            {movie.title}
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap" mb={2}>
            <Chip label={`IMDB: ${movie.vote_average}`} color="warning" />
            <Chip label={`Votes: ${movie.vote_count}`} color="primary" />
            <Chip label={`Released: ${movie.release_date}`} color="info" />
          </Stack>
          <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
            {movie.overview}
          </Typography>
          <Box mt={3}>
            <Button variant="contained" color="warning" sx={{ mr: 2 }}>
              Watch Now
            </Button>
            <Button variant="outlined" color="info" sx={{ mr: 2 }}>
              Watch Trailer
            </Button>
            <Button variant="contained" color="success" sx={{ mr: 2 }} onClick={handleEdit}>
              Edit
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}