import React, { useState, useCallback } from "react";
import debounce from 'lodash.debounce';

const SearchBooksInput = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  // Create a debounced search function to limit API calls
  // This function will only trigger the search after the user stops typing for 300ms
  const debouncedSearch = useCallback(
    (q) => {
      debounce((searchQuery) => onSearch(searchQuery), 300)(q);
    },
    [onSearch]
  );

  const handleChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    debouncedSearch(newQuery);
  };

  return (
    <div className="search-books-input-wrapper">
      <input
        type="text"
        placeholder="Search by title or author"
        value={query}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBooksInput;
