import { toast, Toaster } from 'react-hot-toast';
import SearchBar from '../SearchBar/SearchBar';
import { useEffect, useState } from 'react';
import fetchMovies from '../../services/movieService';
import type { Movie } from '../../types/movie';

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

  console.log(movies);

  return (
    <div>
      <SearchBar onSubmit={setMovieQuery} />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
