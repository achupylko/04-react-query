import { toast, Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import type { Movie } from '../../types/movie';

import fetchMovies from '../../services/movieService';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const {
    data: movies,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['movies', searchQuery],
    queryFn: () => fetchMovies(searchQuery, 1),
    enabled: searchQuery !== '',
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (movies?.length === 0) {
      toast.error('No movies found for your request.');
    }
  }, [movies]);

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
      <SearchBar onSubmit={setSearchQuery} />
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
