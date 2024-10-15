import React from "react";
import { Link } from "react-router-dom";

const SearchBar = ({ onSearch, query, showOnShelf, onToggleShowOnShelf }) => {
  const handleChange = (event) => {
    const newQuery = event.target.value;
    onSearch(newQuery);
  };

  return (
    <div className="search-books-bar">
      {/* Link back to the main page */}
      <Link to="/" className="close-search">Close</Link>
      <div className="search-books-input-wrapper">
        {/* Input field for search query */}
        <input
          type="text"
          placeholder="Search by title or author"
          value={query}
          onChange={handleChange}
        />
      </div>
      <div className="search-books-toggle">
        <label>
          {/* Checkbox to toggle display of books already on shelf */}
          <input
            type="checkbox"
            checked={showOnShelf}
            onChange={onToggleShowOnShelf}
          />
          Show books on shelf
        </label>
      </div>
    </div>
  );
};

export default SearchBar;
