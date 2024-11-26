import { render, screen, fireEvent } from "@testing-library/react";
import Dashboard from "./Dashboard";
import useFetchMovies from "@/hooks/useFetchMovies";
import { Movie } from "@/interfaces/Movie";
import { vi } from "vitest";

vi.mock("@/hooks/useFetchMovies", () => ({
  default: vi.fn(),
}));

// Sample mock movies data
const mockMovies: Movie[] = [
  {
    episode_id: 1,
    title: "A New Hope",
    release_date: "1977-05-25",
    calcRating: 8.6,
    director: "George Lucas",
    producer: "Gary Kurtz, Rick McCallum",
    opening_crawl: "It is a period of civil war...",
    poster: "path/to/a_new_hope.jpg",
  },
  {
    episode_id: 2,
    title: "The Empire Strikes Back",
    release_date: "1980-05-21",
    calcRating: 8.7,
    director: "Irvin Kershner",
    producer: "Gary Kurtz, Rick McCallum",
    opening_crawl: "It is a dark time for the Rebellion...",
    poster: "path/to/the_empire_strikes_back.jpg",
  },
];

describe("Dashboard", () => {
  // Mock the hook in beforeEach if needed (not mandatory here as it's mocked globally)
  beforeEach(() => {
    (useFetchMovies as vi.Mock).mockReturnValue({
      movies: mockMovies,
      loading: false,
      error: null,
    });
  });

  test("renders Dashboard component", () => {
    render(<Dashboard />);
    expect(screen.getByTestId("dashboard")).toBeInTheDocument();
  });

  test("displays loading spinner when loading", () => {
    (useFetchMovies as vi.Mock).mockReturnValue({
      movies: [],
      loading: true,
      error: null,
    });
    render(<Dashboard />);
    expect(screen.getByTitle(/loading/i)).toBeInTheDocument();
  });

  test("displays error message when there is an error", () => {
    (useFetchMovies as vi.Mock).mockReturnValue({
      movies: [],
      loading: false,
      error: "Failed to fetch movies",
    });
    render(<Dashboard />);
    expect(
      screen.getByText(/Error: Failed to fetch movies/i)
    ).toBeInTheDocument();
  });

  test("displays movie list when movies are fetched", () => {
    render(<Dashboard />);
    expect(screen.getByText(/A New Hope/i)).toBeInTheDocument();
    expect(screen.getByText(/The Empire Strikes Back/i)).toBeInTheDocument();
  });

  test("filters movies based on search query", () => {
    render(<Dashboard />);
    const searchInput = screen.getByPlaceholderText(/Search.../i);
    fireEvent.change(searchInput, { target: { value: "Empire" } });
    expect(screen.queryByText(/A New Hope/i)).not.toBeInTheDocument();
    expect(screen.getByText(/The Empire Strikes Back/i)).toBeInTheDocument();
  });

  test("sorts movies based on sort criteria", () => {
    render(<Dashboard />);
    const sortSelect = screen.getByText(/Sort by.../i);
    fireEvent.change(sortSelect, { target: { value: "title" } });
    const movieTitles = screen.getAllByTestId("movie-title").map((el) => {
      return el.getAttribute("data-movie-title"); // Return the attribute value for further use
    });

    expect(movieTitles).toEqual(["A New Hope", "The Empire Strikes Back"]);
  });

  test("displays movie details when a movie is selected", () => {
    render(<Dashboard />);
    const movieItems = screen.getAllByTestId("movie-title");
    const aNewHopeElement = movieItems.find(
      (el) => el.getAttribute("data-movie-title") === "A New Hope"
    ); // Find the movie item with the title "A New Hope"
    expect(aNewHopeElement).toBeTruthy();
    if (aNewHopeElement) {
      fireEvent.click(aNewHopeElement);
    }
    expect(
      screen.getByText(/It is a period of civil war/i)
    ).toBeInTheDocument();
  });
});
