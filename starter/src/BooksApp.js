import React, { Component, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import * as BooksAPI from "./utils/BooksAPI";
import ListBooks from "./components/ListBooks";
import SearchBooks from "./components/SearchBooks";
import "./styles/App.css";

class BooksApp extends Component {
  state = {
    books: [],
    searchBooks: [],
    bookshelves: [
      { key: "currentlyReading", name: "Currently Reading" },
      { key: "wantToRead", name: "Want to Read" },
      { key: "read", name: "Read" },
    ],
  };

  componentDidMount() {
    // Fetch all books from the API when the component mounts
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  }

  // Move a book to a different shelf
  moveBook = useCallback((book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.setState((prevState) => {
        const updatedBook = { ...book, shelf };
        // Update the books array: remove the old book instance and add the updated one
        return {
          books: prevState.books.filter((b) => b.id !== book.id).concat(updatedBook)
        };
      });
    });
  }, []);

  // Search for books based on a query
  searchForBooks = useCallback((query) => {
    if (query.length > 0) {
      BooksAPI.search(query).then((books) => {
        if (books.error) {
          // If the API returns an error, clear the search results
          this.setState({ searchBooks: [] });
        } else {
          this.setState({ searchBooks: books });
        }
      });
    } else {
      // Clear search results if query is empty
      this.setState({ searchBooks: [] });
    }
  }, []);

  render() {
    return (
      <div>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <ListBooks
                books={this.state.books}
                bookshelves={this.state.bookshelves}
                onMove={this.moveBook}
              />
            }
          />
          <Route
            path="/search"
            element={
              <SearchBooks
                searchBooks={this.state.searchBooks}
                onSearchForBooks={this.searchForBooks}
                onMove={this.moveBook}
                books={this.state.books}
              />
            }
          />
        </Routes>
      </div>
    );
  }
}

export default BooksApp;
