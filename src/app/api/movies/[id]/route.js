// app/api/movies/[id]/route.js
import { NextResponse } from 'next/server';

let movies = [
  // example movie objects: { id: '123', title: 'Movie 1', ... }
];

// GET (your existing code for fetching from TMDB API)
const movieBaseUrl = "https://api.themoviedb.org/3";
const apiKey = "9813ce01a72ca1bd2ae25f091898b1c7";

export async function GET(req, { params }) {
  try {
    const p = await params;      // await the whole params object first
           // then access id normally

     const id = await p.id;
    // If movie exists in local store, return it
    const localMovie = movies.find(m => m.id === id);
    if (localMovie) {
      return NextResponse.json(localMovie);
    }

    // Else fallback to TMDB API fetch
    const res = await fetch(`${movieBaseUrl}/movie/${id}?api_key=${apiKey}`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch movie' }, { status: 500 });
  }
}

// PUT - update movie by id
export async function PUT(req, { params }) {
  try {
    const id = params.id;
    const updateData = await req.json();

    const movieIndex = movies.findIndex(m => m.id === id);
    if (movieIndex === -1) {
      return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
    }

    movies[movieIndex] = { ...movies[movieIndex], ...updateData };

    return NextResponse.json({ message: 'Movie updated', movie: movies[movieIndex] });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update movie' }, { status: 500 });
  }
}

// DELETE - delete movie by id
export async function DELETE(req, { params }) {
  try {
    const id = params.id;
    const movieIndex = movies.findIndex(m => m.id === id);
    if (movieIndex === -1) {
      return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
    }

    movies.splice(movieIndex, 1);
    return NextResponse.json({ message: 'Movie deleted' });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete movie' }, { status: 500 });
  }
}
