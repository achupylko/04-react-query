import { toast, Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';

import type { Movie } from '../../types/movie';

import fetchMovies from '../../services/movieService';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';

function App() {
  const [movieQuery, setMovieQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    async function fetchData() {
      setMovies([]);

      try {
        setIsLoading(true);
        setIsError(false);

        const movieList = await fetchMovies(movieQuery);

        if (movieList.length < 1) {
          toast.error('No movies found for your request.');
          return;
        }

        setMovies(movieList);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    if (movieQuery !== '') {
      fetchData();
    }
  }, [movieQuery]);

  const openModal = (movie: Movie) => {
    setIsModalOpen(true);
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <div>
      <SearchBar onSubmit={setMovieQuery} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movies && <MovieGrid onSelect={openModal} movies={movies} />}
      {selectedMovie && isModalOpen && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
