import React, { useState } from "react";
import PropTypes from "prop-types";
import "../styles/BookshelfChanger.css";

const BookshelfChanger = ({ book, onMove, isSearchResult }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (newShelf) => {
    onMove(book, newShelf);
    setIsOpen(false);
  };

  const options = [
    { value: "currentlyReading", label: "Reading Now" },
    { value: "wantToRead", label: "Want to Read" },
    { value: "read", label: "Read" },
    { value: "none", label: "None", className: "remove-option" },
  ];

  return (
    <div className="book-shelf-changer">
      <div className="select-wrapper" onClick={() => setIsOpen(!isOpen)}>
        <div className="select-value">
          {options.find((opt) => opt.value === book.shelf)?.label ||
            "Move to..."}
        </div>
        <div className={`select-options ${isOpen ? "open" : ""}`}>
          {options.map((option) => (
            <div
              key={option.value}
              className={`option ${option.className || ""} ${
                book.shelf === option.value ? "selected" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                handleChange(option.value);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

BookshelfChanger.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    shelf: PropTypes.string.isRequired,
  }).isRequired,
  onMove: PropTypes.func.isRequired,
  isSearchResult: PropTypes.bool,
};

BookshelfChanger.defaultProps = {
  isSearchResult: false,
};

export default BookshelfChanger;
