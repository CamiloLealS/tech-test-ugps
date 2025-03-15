import { useDebounce } from "@uidotdev/usehooks";
import { useState, useEffect } from "react";

const SearchBar = ({ filters, setFilters }) => {
  const [searchText, setSearchText] = useState(filters.search);
  const debouncedSearch = useDebounce(searchText, 500);

  useEffect(() => {
    setSearchText(filters.search);
  }, [filters.search]);

  useEffect(() => {
    setFilters((prev) => ({ ...prev, search: debouncedSearch }));
  }, [debouncedSearch, setFilters]);

  return (
    <input
      className="search-bar"
      type="text"
      placeholder="Buscar juegos..."
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
    />
  );
};

export default SearchBar;