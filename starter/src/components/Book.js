import React from "react";
import PropTypes from "prop-types";
import BookshelfChanger from "./BookshelfChanger";
import { Link } from "react-router-dom";

const Book = ({ book, onMove, isSearchResult }) => {
  const isOnShelf = book.shelf && book.shelf !== "none";

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <Link to={`/book/${book.id}`} className="book-cover-link">
            <div
              className="book-cover"
              style={{
                backgroundImage: `url("${
                  book.imageLinks ? book.imageLinks.thumbnail : ""
                }")`,
              }}
            >
              {isSearchResult && isOnShelf && (
                <div className="book-shelf-indicator">On Shelf</div>
              )}
            </div>
          </Link>
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
  book: PropTypes.object.isRequired,
  onMove: PropTypes.func.isRequired,
  isSearchResult: PropTypes.bool,
};

export default Book;
