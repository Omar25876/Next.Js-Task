'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box, Typography, TextField, Button, Stack,
} from '@mui/material';
import axios from 'axios';

const MovieCreate = () => {
  const router = useRouter();

  const [movie, setMovie] = useState({
    title: '',
    overview: '',
    release_date: '',
    vote_average: '',
    // add other fields as needed
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setMovie(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreate = async () => {
    setSaving(true);
    try {
      await axios.post('/api/movies', movie);
      alert('Movie created successfully');
      router.push('/movies'); // redirect after creation
    } catch (err) {
      alert('Failed to create movie');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box p={4} maxWidth="600px" mx="auto" sx={
      {
        backgroundColor : 'white'
      }
    }>
      <Typography variant="h4" mb={2}>Create New Movie</Typography>
      <Stack spacing={2}>
        <TextField
          label="Title"
          name="title"
          value={movie.title}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Overview"
          name="overview"
          multiline
          rows={4}
          value={movie.overview}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Release Date"
          name="release_date"
          value={movie.release_date}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Vote Average"
          name="vote_average"
          type="number"
          value={movie.vote_average}
          onChange={handleChange}
          fullWidth
        />
        {/* Add other fields as needed */}

        <Button
          variant="contained"
          color="primary"
          onClick={handleCreate}
          disabled={saving}
        >
          {saving ? 'Creating...' : 'Create'}
        </Button>
      </Stack>
    </Box>
  );
};

export default MovieCreate;
