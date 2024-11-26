const API_URLS = {
  SWAPI: "https://swapi.dev/api",
  OMDB_BASE: "https://www.omdbapi.com/",
};

const API_KEYS = {
  OMDB: "b9a5e69d", //  OMDB API key
};

export { API_URLS, API_KEYS };

export const MAX_RATING = 10;

export const SORTED_MOVIE_FIELD = [
  { label: "Year", value: "year" },
  { label: "Episode", value: "episode" },
  { label: "Title", value: "title" },
  { label: "Rating", value: "calcRating" },
];
