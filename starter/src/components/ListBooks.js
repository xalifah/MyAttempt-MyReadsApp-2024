import React, { useState, useMemo } from "react";
import Bookshelf from "./Bookshelf";
import OpenSearchButton from "./OpenSearchButton";

const ListBooks = ({ books, bookshelves, onMove }) => {
  // State for sorting and filtering
  const [sortBy, setSortBy] = useState('title');
  const [filterQuery, setFilterQuery] = useState('');

  // Memoized sorted and filtered books array
  const sortedAndFilteredBooks = useMemo(() => {
    return books
      .filter(book => 
        book.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
        (book.authors && book.authors.some(author => 
          author.toLowerCase().includes(filterQuery.toLowerCase())
        ))
      )
      .sort((a, b) => {
        if (sortBy === 'title') {
          return a.title.localeCompare(b.title);
        } else if (sortBy === 'author') {
          return ((a.authors && a.authors[0]) || '').localeCompare((b.authors && b.authors[0]) || '');
        }
        return 0;
      });
  }, [books, sortBy, filterQuery]);

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1><span className="title-decoration">Libri</span></h1>
      </div>
      <div className="list-books-controls">
        <input 
          type="text" 
          placeholder="Filter books..." 
          value={filterQuery} 
          onChange={(e) => setFilterQuery(e.target.value)}
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="title">Sort by Title</option>
          <option value="author">Sort by Author</option>
        </select>
      </div>
      <div className="list-books-content">
        <div className="bookcase">
          {bookshelves.map(shelf => (
            <Bookshelf
              key={shelf.key}
              shelf={shelf}
              books={sortedAndFilteredBooks.filter(book => book.shelf === shelf.key)}
              onMove={onMove}
            />
          ))}
        </div>
      </div>
      <OpenSearchButton />
    </div>
  );
};

export default ListBooks;
