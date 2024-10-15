import React, { useState, useCallback, useEffect } from "react";
import * as BooksAPI from "../utils/BooksAPI";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import { useDebounce } from "../hooks/useDebounce";

const SearchBooks = ({ onMove, books }) => {
  const [searchBooks, setSearchBooks] = useState([]);
  const [query, setQuery] = useState(localStorage.getItem('searchQuery') || '');
  const [showOnShelf, setShowOnShelf] = useState(JSON.parse(localStorage.getItem('showOnShelf')) ?? true);
  
  // Debounce the search query to avoid excessive API calls
  const debouncedQuery = useDebounce(query, 300);

  const searchForBooks = useCallback(async (query) => {
    if (query.length === 0) {
      setSearchBooks([]);
      return;
    }
    try {
      const results = await BooksAPI.search(query);
      if (results.error) {
        setSearchBooks([]);
      } else {
        // Update search results with shelf information from user's books
        const updatedResults = results.map((searchBook) => {
          const bookOnShelf = books.find((b) => b.id === searchBook.id);
          return bookOnShelf ? { ...searchBook, shelf: bookOnShelf.shelf } : { ...searchBook, shelf: "none" };
        });
        setSearchBooks(updatedResults);
      }
    } catch (error) {
      console.error("Error searching books:", error);
      setSearchBooks([]);
    }
  }, [books]);

  // Trigger search when debounced query changes
  useEffect(() => {
    searchForBooks(debouncedQuery);
  }, [debouncedQuery, searchForBooks]);

  // Persist search query and showOnShelf preference in localStorage
  useEffect(() => {
    localStorage.setItem('searchQuery', query);
    localStorage.setItem('showOnShelf', JSON.stringify(showOnShelf));
  }, [query, showOnShelf]);

  const handleSearch = useCallback((newQuery) => {
    setQuery(newQuery);
  }, []);

  const handleMoveBook = (book, shelf) => {
    onMove(book, shelf);
    // Update local state to reflect the change immediately
    setSearchBooks(prevBooks => 
      prevBooks.map(b => b.id === book.id ? { ...b, shelf } : b)
    );
  };

  const handleToggleShowOnShelf = () => {
    setShowOnShelf(prev => !prev);
  };

  // Filter books based on showOnShelf preference
  const filteredBooks = showOnShelf ? searchBooks : searchBooks.filter(book => book.shelf === "none");

  return (
    <div className="search-books">
      <SearchBar 
        onSearch={handleSearch} 
        query={query} 
        showOnShelf={showOnShelf}
        onToggleShowOnShelf={handleToggleShowOnShelf}
      />
      <SearchResults 
        books={filteredBooks} 
        onMove={handleMoveBook} 
        isSearchResult={true}
      />
    </div>
  );
};

export default SearchBooks;
