// app/api/movies/route.js
import { NextResponse } from 'next/server';

const movieBaseUrl = "https://api.themoviedb.org/3";
const apiKey = "9813ce01a72ca1bd2ae25f091898b1c7";

export async function GET(req) {
  try {
    const res = await fetch(`${movieBaseUrl}/movie/popular?api_key=${apiKey}`);
    const data = await res.json();
    return NextResponse.json(data.results); // return only the list
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch movies' }, { status: 500 });
  }
}


 
let movies = [];

export async function POST(req) {
  try {
    const newMovie = await req.json();

    
    newMovie.id = Date.now().toString();

    movies.push(newMovie);

    return NextResponse.json({ message: 'Movie created', movie: newMovie }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create movie' }, { status: 500 });
  }
}

