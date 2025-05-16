
const movieBaseUrl = "https://api.themoviedb.org/3";
const apiKey = "9813ce01a72ca1bd2ae25f091898b1c7";
const path = "/discover/movie?sort_by=popularity.desc";

export async function GET(req) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
  const data = await res.json();
  return Response.json(data);
}
