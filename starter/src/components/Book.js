import React from "react";
import BookshelfChanger from "./BookshelfChanger";

const Book = ({ book, shelf, onMove, isSearchResult = false }) => {
  // Determine if the book is on a shelf or not
  const isOnShelf = shelf !== "none";

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              backgroundImage: `url("${
                // Use the book's thumbnail image if available, otherwise use an empty string
                book.imageLinks ? book.imageLinks.thumbnail : ""
              }")`,
            }}
          >
            {/* Display "On Shelf" indicator for search results that are already on a shelf */}
            {isSearchResult && isOnShelf && (
              <div className="book-on-shelf-indicator">On Shelf</div>
            )}
          </div>
          <BookshelfChanger 
            book={book} 
            shelf={shelf} 
            onMove={onMove} 
            isOnShelf={isOnShelf}
            isSearchResult={isSearchResult}
          />
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {/* Display authors if available, otherwise show "Unknown Author" */}
          {book.authors ? book.authors.join(", ") : "Unknown Author"}
        </div>
      </div>
    </li>
  );
};

export default Book;
