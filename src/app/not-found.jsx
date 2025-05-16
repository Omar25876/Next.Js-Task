"use client"
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <Box
      sx={{
        backgroundColor: 'black',
        color: 'white',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        px: 2,
      }}
    >
      <Typography variant="h1" fontWeight="bold" color="error" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ maxWidth: 400, mb: 4 }}>
        The page you are looking for doesn’t exist or has been moved.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push('/')}
      >
        Go Home
      </Button>
    </Box>
  );
}

 