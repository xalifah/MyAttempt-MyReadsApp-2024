import React from "react";
import PropTypes from 'prop-types';
import BookshelfChanger from "./BookshelfChanger";

const Book = ({ book, onMove, isSearchResult }) => {
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              backgroundImage: `url("${
                book.imageLinks ? book.imageLinks.thumbnail : ""
              }")`,
            }}
          >
            {isSearchResult && book.shelf !== "none" && (
              <div className="book-on-shelf-indicator">On Shelf</div>
            )}
          </div>
          <BookshelfChanger 
            book={book} 
            onMove={onMove} 
            isSearchResult={isSearchResult}
          />
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors ? book.authors.join(", ") : "Unknown Author"}
        </div>
      </div>
    </li>
  );
};

Book.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string),
    imageLinks: PropTypes.shape({
      thumbnail: PropTypes.string
    }),
    shelf: PropTypes.string.isRequired
  }).isRequired,
  onMove: PropTypes.func.isRequired,
  isSearchResult: PropTypes.bool
};

Book.defaultProps = {
  isSearchResult: false
};

export default Book;
