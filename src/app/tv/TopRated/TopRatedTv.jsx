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
import GlobalApi from "@/app/services/GlobalApi"; 

async function fetchTopRatedSeries() {
  try {
    const res = await GlobalApi.getTopRatedTV();
    return res.data.results || [];
  } catch (err) {
    console.error("Failed to fetch top-rated series:", err);
    return [];
  }
}
export default async function TopRated() {
  const series = await fetchPopularSeries();
  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#000", py: 4, color: "#fff" }}>
      <Typography variant="h4" gutterBottom>
        Top Rated
      </Typography>

      {series.length === 0 ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
          <Typography>No data found.</Typography>
        </Box>
      ) : (
        <Grid container spacing={10}>
          {series.slice(0, 8).map((ser) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={ser.id}
              sx={{ height: "550px", width: "300px" }}
            >
              <Card sx={{ backgroundColor: "#5857B0", color: "#fff", height: "100%" }}>
                <CardMedia
                  component="img"
                  sx={{ height: "400px", objectFit: "fill" }}
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


// export async function getStaticProps() {
//   try {
//     const res = await GlobalApi.getTopRatedTV();
//     return {
//       props: {
//         series: res.data.results || [],
//       },
//     };
//   } catch (err) {
//     console.error("Failed to fetch top-rated series:", err);
//     return {
//       props: {
//         series: [],
//       },
//     };
//   }
// }
