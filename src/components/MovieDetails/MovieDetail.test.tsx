import React from "react";
import { render, screen } from "@testing-library/react";
import MovieDetail from "./MovieDetail";
import { Movie } from "@/interfaces/Movie";

const mockMovie: Movie = {
  title: "Star Wars: A New Hope",
  poster: "https://example.com/poster.jpg",
  opening_crawl: "It is a period of civil war...",
  director: "George Lucas",
  calcRating: 4.5,
  ratings: [
    { Source: "Internet Movie Database", Value: "8.6/10" },
    { Source: "Rotten Tomatoes", Value: "92%" },
  ],
};

describe("MovieDetail Component", () => {
  it("renders movie title", () => {
    render(<MovieDetail movie={mockMovie} />);
    expect(screen.getByText(mockMovie.title)).toBeInTheDocument();
  });

  it("renders movie poster", () => {
    render(<MovieDetail movie={mockMovie} />);
    const poster = screen.getByAltText(`Poster of ${mockMovie.title}`);
    expect(poster).toBeInTheDocument();
    expect(poster).toHaveAttribute("src", mockMovie.poster);
  });

  it("renders movie opening crawl", () => {
    render(<MovieDetail movie={mockMovie} />);
    expect(screen.getByText(mockMovie.opening_crawl)).toBeInTheDocument();
  });

  it("renders movie director", () => {
    render(<MovieDetail movie={mockMovie} />);
    expect(screen.getByText(`Directed By:`)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.director)).toBeInTheDocument();
  });

  it("renders movie rating component when calcRating is greater than 0", () => {
    render(<MovieDetail movie={mockMovie} />);
    expect(screen.getByText("Rating:")).toBeInTheDocument();
  });

  it("renders movie ratings", () => {
    render(<MovieDetail movie={mockMovie} />);
    mockMovie.ratings.forEach((rating) => {
      expect(screen.getByText(`${rating.Source}:`)).toBeInTheDocument();
      expect(screen.getByText(rating.Value)).toBeInTheDocument();
    });
  });

  it("does not render movie rating component when calcRating is 0", () => {
    const movieWithNoRating = { ...mockMovie, calcRating: 0 };
    render(<MovieDetail movie={movieWithNoRating} />);
    expect(screen.queryByText("Rating:")).not.toBeInTheDocument();
  });

  it("does not render ratings section when ratings array is empty", () => {
    const movieWithNoRatings = { ...mockMovie, ratings: [] };
    render(<MovieDetail movie={movieWithNoRatings} />);
    expect(
      screen.queryByRole("list", { name: "Ratings" })
    ).not.toBeInTheDocument();
  });
});
