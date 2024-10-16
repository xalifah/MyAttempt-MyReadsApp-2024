import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import * as BooksAPI from "../utils/BooksAPI";
import BookshelfChanger from "./BookshelfChanger";

const BookDetails = ({ onMove: parentOnMove }) => {
  const [book, setBook] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      const fetchedBook = await BooksAPI.get(id);
      setBook(fetchedBook);
    };
    fetchBook();
  }, [id]);

  const onMove = useCallback((updatedBook, shelf) => {
    parentOnMove(updatedBook, shelf);
    setBook(prevBook => ({ ...prevBook, shelf }));
  }, [parentOnMove]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="book-details">
      <Link to="/" className="close-details">
        Close
      </Link>
      <div className="book-details-content">
        <div className="book-cover-container">
          <img
            src={book.imageLinks?.thumbnail || "/placeholder-cover.jpg"}
            alt={`Cover of ${book.title}`}
            className="book-cover-large"
          />
        </div>
        <div className="book-info">
          <h1 className="book-title">{book.title}</h1>
          <h2 className="book-authors">{book.authors?.join(", ")}</h2>
          <p className="book-description">
            {book.description || "No description available for this book."}
          </p>
          <p>
            <strong>Published Date:</strong> {book.publishedDate || "Unknown"}
          </p>
          <p>
            <strong>Page Count:</strong> {book.pageCount || "Unknown"}
          </p>
          <p>
            <strong>Categories:</strong> {book.categories?.join(", ") || "Unknown"}
          </p>
          <p>
            <strong>Average Rating:</strong> {book.averageRating || "Not rated"}
          </p>
          <div className="book-shelf-changer-wrapper">
            <BookshelfChanger
              book={book}
              onMove={onMove}
              isBookDetails={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
