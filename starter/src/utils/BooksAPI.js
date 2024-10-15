// API endpoint for the book server
const api = "https://reactnd-books-api.udacity.com";

// Generate a unique token for storing bookshelf data on the backend server
let token = localStorage.token;
if (!token) token = localStorage.token = Math.random().toString(36).substr(-8);

// Default headers for API requests
const headers = {
  Accept: "application/json",
  Authorization: token,
};

// Fetch a single book by its ID
export const get = (bookId) =>
  fetch(`${api}/books/${bookId}`, { headers })
    .then((res) => res.json())
    .then((data) => data.book);

// Fetch all books
export const getAll = () =>
  fetch(`${api}/books`, { headers })
    .then((res) => res.json())
    .then((data) => data.books);

// Update a book's shelf
export const update = (book, shelf) =>
  fetch(`${api}/books/${book.id}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ shelf }),
  }).then((res) => res.json());

// Search for books
export const search = (query) =>
  fetch(`${api}/search`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  })
    .then((res) => res.json())
    .then((data) => data.books);
