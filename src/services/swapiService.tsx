import { API_KEYS, API_URLS } from "@/config/constants";
import { Movie, Rating } from "@/interfaces/Movie";
import axios from "axios";

// Function to fetch data from OMDB
const fetchOMDBData = async (title: string) => {
  try {
    const response = await axios.get(`${API_URLS.OMDB_BASE}`, {
      params: {
        t: title,
        apikey: API_KEYS.OMDB,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching OMDB data for ${title}`, error);
    throw error;
  }
};

const calcFinalRating = (ratings: Rating[]) => {
  if (ratings.length === 0) {
    return 0;
  }

  const normalizedRatings = ratings.map((rating) => {
    const value = rating.Value;

    if (value.includes("/100")) {
      return parseFloat(value.split("/")[0]) / 10;
    } else if (value.includes("/10")) {
      return parseFloat(value.split("/")[0]);
    } else if (value.includes("%")) {
      return parseFloat(value.replace("%", "")) / 10;
    }
    return 0;
  });
  const sum = normalizedRatings.reduce((acc, curr) => acc + curr, 0);
  const average = sum / normalizedRatings.length;
  return Math.round(average); // Return the average rounded to one decimal place
};

export const fetchMovies = async (): Promise<Movie[]> => {
  try {
    const swapiResponse = await axios.get(`${API_URLS.SWAPI}/films/`);

    const movies: Movie[] = swapiResponse.data.results;

    console.log("Star Wars Films from SWAPI:", movies);

    const updatedMovies = await Promise.all(
      movies.map(async (movie: Movie) => {
        try {
          const omdbResponse = await fetchOMDBData(movie.title);

          return {
            ...movie,
            calcRating: calcFinalRating(omdbResponse.Ratings),
            ratings: omdbResponse.Ratings,
            poster: omdbResponse.Poster,
          };
        } catch (omdbError) {
          console.error(
            `Error updating movie with OMDB data for ${movie.title}`,
            omdbError
          );
          return movie; // Return the original movie if OMDB fetch fails
        }
      })
    );

    return updatedMovies;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    throw new Error(errorMessage);
  }
};
