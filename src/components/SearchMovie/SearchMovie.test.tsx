import { fireEvent, render, screen } from "@testing-library/react";
import { SortCriteria } from "custom-types";
import { beforeEach, describe, expect, it, vi } from "vitest";
import SearchMovie from "./SearchMovie";

describe("SearchMovie Component", () => {
  const mockSetSearchQuery = vi.fn();
  const mockSetSortCriteria = vi.fn();

  const renderComponent = (searchQuery: string, sortCriteria: SortCriteria) => {
    render(
      <SearchMovie
        searchQuery={searchQuery}
        setSearchQuery={mockSetSearchQuery}
        sortCriteria={sortCriteria}
        setSortCriteria={mockSetSortCriteria}
      />
    );
  };

  beforeEach(() => {
    // Clear mocks before each test
    mockSetSearchQuery.mockClear();
    mockSetSortCriteria.mockClear();
  });

  it("should render search input and dropdown menu", () => {
    renderComponent("", "title");

    expect(screen.getByPlaceholderText("Search movies...")).toBeInTheDocument();
    expect(screen.getByText("Sort by...")).toBeInTheDocument();
  });

  it("should call setSearchQuery when input value changes", () => {
    renderComponent("", "title");

    const input = screen.getByPlaceholderText("Search movies...");
    fireEvent.change(input, { target: { value: "Star Wars" } });

    expect(mockSetSearchQuery).toHaveBeenCalledWith("Star Wars");
  });
});
