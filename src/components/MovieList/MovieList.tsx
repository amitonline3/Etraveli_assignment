import { Movie } from "@/interfaces/Movie";
import MovieRating from "../MovieRating/MovingRating";

interface MovieListProps {
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
}

const MovieList: React.FC<MovieListProps> = ({ movies, onSelectMovie }) => {
  return (
    <div className="space-y-1 flex flex-col">
      {movies.map((movie, index) => (
        <div
          key={index}
          role="button"
          tabIndex={0}
          data-testid="movie-title"
          data-movie-title={movie.title}
          className="grid grid-cols-1 sm:grid-cols-[2rem_1fr_auto] md:grid-cols-[2rem_1fr_2fr_auto] items-center gap-4 border-b border-gray-300 py-3 px-4 text-sm text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-blue-200"
          aria-label={`Select movie: ${movie.title}`}
          onClick={() => onSelectMovie(movie)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              onSelectMovie(movie);
            }
          }}
        >
          {/* Episode */}
          <div
            className="font-medium w-10"
            aria-label={`Episode ${movie.episode_id}`}
          >
            {movie.episode_id || "N/A"}
          </div>

          {/* Title */}
          <div className="font-bold" aria-label={`Title: ${movie.title}`}>
            {movie.title || "Unknown Title"}
          </div>

          {/* Rating */}
          <div
            className="flex items-center"
            aria-label={`Rating: ${movie.calcRating || 0} out of 5`}
          >
            {movie.calcRating !== undefined ? (
              <>
                <MovieRating initialRating={movie.calcRating} />
              </>
            ) : (
              "No Rating"
            )}
          </div>

          {/* Release Date */}
          <div
            className="text-gray-500 w-40"
            aria-label={`Release Date: ${movie.release_date}`}
          >
            {movie.release_date || "Unknown Date"}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
