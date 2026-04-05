import { toast, Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';

import type { Movie } from '../../types/movie';

import fetchMovies from '../../services/movieService';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';

function App() {
  const [movieQuery, setMovieQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function fetchData() {
      setMovies([]);

      try {
        const movieList = await fetchMovies(movieQuery);

        if (movieList.length < 1) {
          toast.error('No movies found for your request.');
          return;
        }

        setMovies(movieList);
      } catch (error) {
        console.log(error);
      }
    }

    if (movieQuery !== '') {
      fetchData();
    }
  }, [movieQuery]);

  const handleMovieCardClick = (movie: Movie) => {
    console.log(movie);
  };

  return (
    <div>
      <SearchBar onSubmit={setMovieQuery} />

      {movies && <MovieGrid onSelect={handleMovieCardClick} movies={movies} />}

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
