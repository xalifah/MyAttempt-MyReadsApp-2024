import React from "react";
import PropTypes from "prop-types";

const BookshelfChanger = ({ book, onMove, isBookDetails }) => {
  const handleChange = (event) => {
    onMove(book, event.target.value);
  };

  const shelves = [
    { key: "move", name: "Move to...", disabled: true },
    { key: "currentlyReading", name: "Currently Reading" },
    { key: "wantToRead", name: "Want to Read" },
    { key: "read", name: "Read" },
    { key: "none", name: "None" },
  ];

  return (
    <div
      className={`book-shelf-changer ${
        isBookDetails ? "book-details-changer" : ""
      }`}
    >
      <select value={book.shelf} onChange={handleChange}>
        {shelves.map((shelf) => (
          <option key={shelf.key} value={shelf.key} disabled={shelf.disabled}>
            {shelf.name}
          </option>
        ))}
      </select>
    </div>
  );
};

BookshelfChanger.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    shelf: PropTypes.string.isRequired,
  }).isRequired,
  onMove: PropTypes.func.isRequired,
  isBookDetails: PropTypes.bool,
};

export default BookshelfChanger;
