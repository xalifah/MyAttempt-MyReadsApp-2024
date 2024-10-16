import React from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import Book from "./Book";

const Bookshelf = ({ shelf, books, onMove }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf.name}</h2>
      <div className="bookshelf-books">
        <div className="books-grid">
          {books.map((book, index) => (
            <Draggable key={book.id} draggableId={book.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <Book book={book} onMove={onMove} />
                </div>
              )}
            </Draggable>
          ))}
        </div>
      </div>
    </div>
  );
};

Bookshelf.propTypes = {
  shelf: PropTypes.shape({
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  onMove: PropTypes.func.isRequired,
};

// Bookshelf component represents a single shelf of books
// It receives shelf details, books to display, and a function to move books
export default Bookshelf;
