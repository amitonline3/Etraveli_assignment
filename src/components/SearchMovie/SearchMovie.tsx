import { SortCriteria } from "custom-types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SORTED_MOVIE_FIELD } from "@/config/constants";

interface SearchMovieProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortCriteria: SortCriteria;
  setSortCriteria: (criteria: SortCriteria) => void;
}

const SearchMovie: React.FC<SearchMovieProps> = ({
  searchQuery,
  setSearchQuery,
  sortCriteria,
  setSortCriteria,
}) => {
  return (
    <div className="flex w-full flex-row ">
      <div className="w-1/6 md:w-1/8 ">
        <DropdownMenu>
          <DropdownMenuTrigger className="bg-white text-blue-700  focus:outline-none focus:ring-1 focus:ring-blue-400 shadow-sm rounded rounded border-blue-400 focus:border-blue-400">
            Sort by...
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {SORTED_MOVIE_FIELD.map((field) => (
              <DropdownMenuItem
                key={field.value}
                onClick={() => setSortCriteria(field.value as SortCriteria)}
              >
                {field.label}{" "}
                {sortCriteria === field.value && (
                  <i className="fas fa-check mr-2"></i>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search movies..."
        className="w-full p-2 border border-blue-400 rounded focus:ring-blue-400 focus:outline-none focus:ring-1 "
      />
    </div>
  );
};

export default SearchMovie;
