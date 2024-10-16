import React, { useState, useCallback, useEffect } from "react";
import * as BooksAPI from "../utils/BooksAPI";
import SearchBar from "./SearchBar";
import Book from "./Book";

const SearchBooks = ({ onMove, books }) => {
  const [searchBooks, setSearchBooks] = useState([]);
  const [query, setQuery] = useState(localStorage.getItem("searchQuery") || "");
  const [showOnShelf, setShowOnShelf] = useState(
    JSON.parse(localStorage.getItem("showOnShelf")) ?? true
  );
  const [isWhitespaceQuery, setIsWhitespaceQuery] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const searchForBooks = useCallback(
    async (query) => {
      setIsLoading(true);
      setIsWhitespaceQuery(false);

      const trimmedQuery = query.trim();

      if (trimmedQuery.length === 0) {
        setTimeout(() => {
          setSearchBooks([]);
          setIsWhitespaceQuery(query.length > 0);
          setIsLoading(false);
        }, 500);
        return;
      }

      if (query.endsWith(" ")) {
        setIsWhitespaceQuery(true);
      }

      try {
        const results = await BooksAPI.search(trimmedQuery);
        if (results.error) {
          setSearchBooks([]);
        } else {
          const updatedResults = results.map((searchBook) => {
            const bookOnShelf = books.find((b) => b.id === searchBook.id);
            return bookOnShelf
              ? { ...searchBook, shelf: bookOnShelf.shelf }
              : { ...searchBook, shelf: "none" };
          });
          setSearchBooks(updatedResults);
        }
      } catch (error) {
        console.error("Error searching books:", error);
        setSearchBooks([]);
      } finally {
        setTimeout(() => setIsLoading(false), 500);
      }
    },
    [books]
  );

  useEffect(() => {
    localStorage.setItem("searchQuery", query);
    localStorage.setItem("showOnShelf", JSON.stringify(showOnShelf));
  }, [query, showOnShelf]);

  const handleSearch = useCallback((newQuery) => {
    setQuery(newQuery);
  }, []);

  useEffect(() => {
    if (query) {
      searchForBooks(query);
    } else {
      setSearchBooks([]);
    }
  }, [query, searchForBooks]);

  const handleMoveBook = (book, shelf) => {
    onMove(book, shelf);
    setSearchBooks((prevBooks) =>
      prevBooks.map((b) => (b.id === book.id ? { ...b, shelf } : b))
    );
  };

  const handleToggleShowOnShelf = () => {
    setShowOnShelf((prev) => !prev);
  };

  const filteredBooks = showOnShelf
    ? searchBooks
    : searchBooks.filter((book) => book.shelf === "none");

  return (
    <div className="search-books">
      <SearchBar
        query={query}
        onSearch={handleSearch}
        showOnShelf={showOnShelf}
        onToggleShowOnShelf={handleToggleShowOnShelf}
      />
      <div className="search-books-results">
        {isLoading ? (
          <div className="loading-spinner"></div>
        ) : isWhitespaceQuery ? (
          <div className="search-info">
            <p>Your search query ends with whitespace. </p>
            <p>
              <strong>Please remove trailing spaces</strong> or{" "}
              <strong>type in a second search term</strong> for accurate
              results.
            </p>
          </div>
        ) : filteredBooks.length > 0 ? (
          <ol className="books-grid">
            {filteredBooks.map((book) => (
              <Book
                key={book.id}
                book={book}
                shelf={book.shelf}
                onMove={handleMoveBook}
                isSearchResult={true}
              />
            ))}
          </ol>
        ) : query.trim() !== "" ? (
          <div className="search-info">
            <p>No books found. Try a different search term.</p>
            <p>
              Search is limited to specific terms.{" "}
              <strong>If you don't get results, try different words.</strong>
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SearchBooks;
