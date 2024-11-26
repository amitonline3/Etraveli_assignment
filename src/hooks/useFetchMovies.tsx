// src/hooks/useFetchMovies.tsx
import { Movie } from "@/interfaces/Movie";
import { fetchMovies } from "@/services/swapiService";
import { useState, useEffect } from "react";

const useFetchMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchMovies();
        setMovies(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred."
        );
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  }, []);

  return { movies, loading, error };
};

export default useFetchMovies;
