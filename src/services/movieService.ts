import axios from 'axios';
import type { Movie } from '../types/movie';

const URL = 'https://api.themoviedb.org/3/search/movie';
const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export default async function fetchMovies(
  query: string,
  page: number
): Promise<Movie[]> {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    },
    params: {
      query,
      include_adult: false,
      language: 'en-US',
      page,
    },
  };

  const response = await axios.get<MovieResponse>(URL, options);

  return response.data.results;
}
