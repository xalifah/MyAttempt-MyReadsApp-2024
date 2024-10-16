import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Bookshelf from "./Bookshelf";
import OpenSearchButton from "./OpenSearchButton";

const ListBooks = ({ books, bookshelves, onMove }) => {
  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    // Dropped outside a valid droppable
    if (!destination) return;

    // Dropped in the same place
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const book = books.find((b) => b.id === draggableId);
    onMove(book, destination.droppableId);
  };

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="list-books-content">
          {bookshelves.map((shelf) => (
            <Droppable droppableId={shelf.key} key={shelf.key}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <Bookshelf
                    shelf={shelf}
                    books={books.filter((book) => book.shelf === shelf.key)}
                    onMove={onMove}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
      <OpenSearchButton />
    </div>
  );
};

export default ListBooks;
