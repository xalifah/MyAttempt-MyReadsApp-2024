import React from "react";
import Book from "./Book";

const Bookshelf = ({ shelf, books, onMove }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf.name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(book => (
            <li key={book.id}>
              {/* Render individual Book component for each book */}
              <Book 
                book={book} 
                shelf={shelf.key} 
                onMove={onMove} 
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

// Bookshelf component represents a single shelf of books
// It receives shelf details, books to display, and a function to move books
export default Bookshelf;
