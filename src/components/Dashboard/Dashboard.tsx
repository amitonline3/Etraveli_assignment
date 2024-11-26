import useFetchMovies from "@/hooks/useFetchMovies";
import MovieDetail from "../MovieDetails/MovieDetail";
import MovieList from "../MovieList/MovieList";
import SearchMovie from "../SearchMovie/SearchMovie";
import { useState } from "react";
import { Movie } from "@/interfaces/Movie";
import { SortCriteria } from "custom-types";

const Dashboard = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortCriteria, setSortCriteria] = useState<SortCriteria>("episode");
  const { movies, loading, error } = useFetchMovies();

  // Filter movies based on the search query
  const filterMovies = (movies: Movie[], searchQuery: string): Movie[] => {
    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const sortMovies = (movies: Movie[], sortCriteria: SortCriteria): Movie[] => {
    const sortFunctions: Record<SortCriteria, (a: Movie, b: Movie) => number> =
      {
        year: (a, b) =>
          new Date(a.release_date).getTime() -
          new Date(b.release_date).getTime(),
        episode: (a, b) => a.episode_id - b.episode_id,
        calcRating: (a, b) => (b.calcRating ?? 0) - (a.calcRating ?? 0), // Descending
        title: (a, b) => a.title.localeCompare(b.title),
      };

    return [...movies].sort(sortFunctions[sortCriteria]);
  };

  const filteredMovies = filterMovies(movies, searchQuery);
  const sortedMovies = sortMovies(filteredMovies, sortCriteria);

  return (
    <div data-testid="dashboard" className="h-screen w-screen flex flex-col">
      <div className="flex p-4 bg-white shadow-md bg-gray-100">
        <SearchMovie
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setSortCriteria={setSortCriteria}
          sortCriteria={sortCriteria}
        />
      </div>

      <div className="flex-1 flex flex-col md:flex-row bg-white">
        {/* Movie List Section */}
        <div className="w-full md:w-1/2 p-4 border-b md:border-b-0 md:border-r border-gray-300 overflow-y-auto">
          {loading ? (
            <div className="text-center">
              <i className="fas fa-spinner fa-spin mr-2"></i>
            </div>
          ) : error ? (
            <div className="text-center text-red-500">Error: {error}</div>
          ) : (
            <MovieList movies={sortedMovies} onSelectMovie={setSelectedMovie} />
          )}
        </div>

        {/* Movie Details Section */}
        <div className="w-full md:flex-1 p-4 overflow-y-auto">
          {loading ? (
            <div className="text-center">
              <i title="loading" className="fas fa-spinner fa-spin mr-2"></i>
            </div>
          ) : selectedMovie ? (
            <MovieDetail movie={selectedMovie} />
          ) : (
            <div className="text-center">Select a movie</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
