import React, { useState, useCallback, useEffect, Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import "./styles/App.css";
import * as BooksAPI from "./utils/BooksAPI";
import BookDetails from "./components/BookDetails";

// Lazy load components for better performance and reduced initial bundle size
const ListBooks = lazy(() => import("./components/ListBooks"));
const SearchBooks = lazy(() => import("./components/SearchBooks"));

const App = () => {
  const [books, setBooks] = useState([]);
  const bookshelves = [
    { key: "currentlyReading", name: "Reading Now" },
    { key: "wantToRead", name: "Want to Read" },
    { key: "read", name: "Read" },
  ];

  // Fetch all books when the component mounts
  useEffect(() => {
    BooksAPI.getAll().then(setBooks);
  }, []);

  const moveBook = useCallback((book, newShelf) => {
    // Update the UI immediately for a responsive feel
    setBooks((prevBooks) => {
      const updatedBooks = prevBooks.map((b) =>
        b.id === book.id ? { ...b, shelf: newShelf } : b
      );
      return updatedBooks;
    });

    // Update the book's shelf on the server
    BooksAPI.update(book, newShelf).catch((error) => {
      console.error("Error updating book:", error);
      // Revert the UI update if the server request fails
      setBooks((prevBooks) =>
        prevBooks.map((b) =>
          b.id === book.id ? { ...b, shelf: book.shelf } : b
        )
      );
    });
  }, []);

  return (
    <div className="app">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <ListBooks
                books={books}
                bookshelves={bookshelves}
                onMove={moveBook}
              />
            }
          />
          <Route
            path="/search"
            element={<SearchBooks onMove={moveBook} books={books} />}
          />
          <Route path="/book/:id" element={<BookDetails onMove={moveBook} />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
