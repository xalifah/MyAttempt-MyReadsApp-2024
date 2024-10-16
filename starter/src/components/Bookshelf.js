import React from "react";
import PropTypes from 'prop-types';
import Book from "./Book";

const Bookshelf = ({ shelf, books, onMove }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf.name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(book => (
            <Book 
              key={book.id}
              book={book} 
              onMove={onMove} 
            />
          ))}
        </ol>
      </div>
    </div>
  );
};

Bookshelf.propTypes = {
  shelf: PropTypes.shape({
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  onMove: PropTypes.func.isRequired
};

// Bookshelf component represents a single shelf of books
// It receives shelf details, books to display, and a function to move books
export default Bookshelf;
