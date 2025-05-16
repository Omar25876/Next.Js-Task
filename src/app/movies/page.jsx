'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

export default function Trending() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch('/api/movies');
        const data = await res.json();
        setMovies(data); // already an array of movie objects
      } catch (err) {
        console.error('Failed to fetch trending movies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleMovieClick = (movie) => {
    router.push(`/movies/${movie.id}`);
  };

  return (
    <div className="p-8 pb-10 mt-10">
      <h2 className="text-white text-2xl font-bold mb-10">Trending Now</h2>

      {loading ? (
        <p className="text-white">Loading...</p>
      ) : (
        <div className="flex space-x-4 overflow-x-auto scrollbar-none">
          {movies.map((movie, index) => (
            <div
              key={index}
              className="flex-none w-48 cursor-pointer"
              onClick={() => handleMovieClick(movie)}
            >
              <img
                src={`${imageBaseUrl}${movie.backdrop_path}`}
                alt={movie.title || movie.name}
                className="w-full h-72 object-cover rounded-2xl bg-indigo-500 shadow-lg shadow-violet-500/50 mb-0.5"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
