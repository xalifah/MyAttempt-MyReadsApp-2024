import React from "react";
import Book from "./Book";

const SearchResults = ({ books, onMove }) => {
  return (
    <div className="search-books-results">
      {books.length > 0 ? (
        <ol className="books-grid">
          {books.map((book) => (
            <Book
              key={book.id}
              book={book}
              shelf={book.shelf}
              onMove={onMove}
              isSearchResult={true}
              // isSearchResult prop is used to differentiate behavior in the Book component
            />
          ))}
        </ol>
      ) : (
        // Display a message when no books are found
        <p>No books found. Try a different search term.</p>
      )}
    </div>
  );
};

// SearchResults component renders a list of books or a "no results" message
export default SearchResults;
