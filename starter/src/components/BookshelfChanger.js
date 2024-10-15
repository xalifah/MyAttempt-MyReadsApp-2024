import React, { useState } from "react";

const BookshelfChanger = ({ book, shelf, onMove, isOnShelf, isSearchResult }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (newShelf) => {
    onMove(book, newShelf);
    setIsOpen(false);
  };

  // If the book is already on a shelf and this is a search result, don't render the changer
  if (isSearchResult && isOnShelf) {
    return null;
  }

  // Define options for the dropdown
  const options = [
    { value: "currentlyReading", label: "Reading Now" },
    { value: "wantToRead", label: "Want to Read" },
    { value: "read", label: "Read" },
    // Only include the 'Remove' option if it's not a search result
    ...(isSearchResult ? [] : [{ value: "none", label: "Remove", className: "remove-option" }])
  ];

  return (
    <div className="book-shelf-changer">
      <div className="select-wrapper" onClick={() => setIsOpen(!isOpen)}>
        <div className="select-value"></div>
        <div className={`select-options ${isOpen ? 'open' : ''}`}>
          {options.map(option => (
            <div 
              key={option.value} 
              className={`option ${option.className || ''}`}
              onClick={() => handleChange(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookshelfChanger;
