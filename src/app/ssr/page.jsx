import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Box,
} from "@mui/material";
import axios from "axios";

export default async function  AiringToday() {
    const series = await fetchAiringToday();

  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#000", py: 4, color: "#fff" }}>
      <Typography variant="h4" gutterBottom>
        Airing Today
      </Typography>

      {
        
      series?.length === 0 ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
          <Typography>No series found.</Typography>
        </Box>
      ) : (
        <Grid container spacing={10}>
          {series.slice(0, 8).map((ser) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={ser.id}
              sx={{ height: '550px', width: '300px' }}
            >
              <Card sx={{ backgroundColor: "#5857B0", color: "#fff", height: "100%" }}>
                <CardMedia
                  component="img"
                  sx={{ height: '400px', objectFit: 'fill' }}
                  image={`https://image.tmdb.org/t/p/w500${ser.poster_path}`}
                  alt={ser.name}
                />
                <CardContent>
                  <Typography variant="h6">{ser.name}</Typography>
                  <Typography variant="body2">
                    {ser.overview?.slice(0, 100)}...
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

async function fetchAiringToday() {
    const apiKey = "9813ce01a72ca1bd2ae25f091898b1c7";
    const url = `https://api.themoviedb.org/3/tv/airing_today?api_key=${apiKey}`;
    
    try {
      const response = await axios.get(url);
      return response.data.results || [];
    } catch (error) {
      console.error("Error fetching airing today TV shows:", error);
      return [];
    }
  }
