import { Movie, Rating } from "@/interfaces/Movie";
import MovieRating from "../MovieRating/MovingRating";

interface MovieDetailProps {
  movie: Movie;
}

const renderMovingRating = (ratings: Rating[]) => {
  if (!ratings || ratings.length === 0) {
    return null;
  }

  return (
    <div
      className="flex flex-wrap gap-5 m-1 mt-4"
      role="list"
      aria-label="Ratings"
    >
      {ratings.map((rating) => (
        <div
          key={rating.Source}
          role="listitem"
          className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full border border-blue-200 shadow-sm focus-within:ring-2 focus-within:ring-blue-500"
        >
          <p className="text-sm font-semibold">
            <span className="sr-only">{rating.Source} rating: </span>
            <span>{rating.Source}:</span> {rating.Value}
          </p>
        </div>
      ))}
    </div>
  );
};

const MovieDetail: React.FC<MovieDetailProps> = ({ movie }) => {
  return (
    <section
      className="p-4 bg-white rounded-lg shadow-md"
      aria-labelledby="movie-title"
    >
      <h2 id="movie-title" className="text-2xl font-bold mb-4">
        {movie.title}
      </h2>
      <div className="flex space-x-4">
        <div className="w-1/3">
          <img
            src={movie.poster}
            alt={`Poster of ${movie.title}`}
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="w-2/3">
          <div className="text-gray-700">{movie.opening_crawl}</div>
        </div>
      </div>
      <div className="mt-2 text-gray-600 flex gap-5 m-3">
        <strong>Directed By:</strong> {movie.director}
      </div>
      {(movie.calcRating ?? 0) > 0 && (
        <div className="m-2">
          <strong>Rating:</strong>{" "}
          <MovieRating initialRating={movie.calcRating ?? 0} />
        </div>
      )}
      {movie.ratings && renderMovingRating(movie.ratings)}
    </section>
  );
};

export default MovieDetail;
