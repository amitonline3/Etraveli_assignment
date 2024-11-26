import { render } from "@testing-library/react";
import MovieRating from "./MovingRating";
import { MAX_RATING } from "@/config/constants";

describe("MovieRating Component", () => {
  it("renders without crashing", () => {
    render(<MovieRating />);
  });

  it("renders the correct number of stars based on maxRating", () => {
    const { container } = render(<MovieRating maxRating={5} />);
    const stars = container.querySelectorAll("i");
    expect(stars.length).toBe(5);
  });

  it("renders the correct number of filled stars based on initialRating", () => {
    const { container } = render(
      <MovieRating initialRating={3} maxRating={5} />
    );
    const filledStars = container.querySelectorAll(
      ".fas.fa-star.text-yellow-500"
    );
    expect(filledStars.length).toBe(3);
  });

  it("renders the correct number of empty stars based on initialRating", () => {
    const { container } = render(
      <MovieRating initialRating={3} maxRating={5} />
    );
    const emptyStars = container.querySelectorAll(".far.fa-star.text-gray-400");
    expect(emptyStars.length).toBe(2);
  });

  it("uses MAX_RATING as default maxRating", () => {
    const { container } = render(<MovieRating />);
    const stars = container.querySelectorAll("i");
    expect(stars.length).toBe(MAX_RATING);
  });
});
