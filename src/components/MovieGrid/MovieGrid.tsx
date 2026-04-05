import type { Movie } from '../../types/movie';

interface MovieGridProps {
  onSelect: (movie: Movie) => void;
  movies: Movie[];
}

export default function MovieGrid({ onSelect, movies }: MovieGridProps) {
  return (
    <ul>
      {movies.map(movie => (
        <li key={movie.id}>
          <div>
            <img
              onClick={() => onSelect(movie)}
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              loading="lazy"
            />
            <h2>{movie.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}
