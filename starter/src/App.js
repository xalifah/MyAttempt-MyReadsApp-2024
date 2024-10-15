import React, { useState, useCallback, useEffect, Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import "./styles/App.css";
import * as BooksAPI from "./utils/BooksAPI";

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
      const existingBookIndex = prevBooks.findIndex((b) => b.id === book.id);
      if (existingBookIndex >= 0) {
        // If the book already exists, update its shelf
        const updatedBooks = [...prevBooks];
        updatedBooks[existingBookIndex] = {
          ...updatedBooks[existingBookIndex],
          shelf: newShelf,
        };
        return updatedBooks;
      } else {
        // If it's a new book, add it to the list
        return [...prevBooks, { ...book, shelf: newShelf }];
      }
    });

    // Update the book's shelf on the server
    BooksAPI.update(book, newShelf).catch((error) => {
      console.error("Error updating book:", error);
      // Revert the UI update if the server request fails
      setBooks((prevBooks) => {
        const existingBookIndex = prevBooks.findIndex((b) => b.id === book.id);
        if (existingBookIndex >= 0) {
          // If the book exists, revert its shelf
          const updatedBooks = [...prevBooks];
          updatedBooks[existingBookIndex] = {
            ...updatedBooks[existingBookIndex],
            shelf: book.shelf,
          };
          return updatedBooks;
        } else {
          // If it was a new book, remove it from the list
          return prevBooks.filter((b) => b.id !== book.id);
        }
      });
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
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
