// OOP CONCEPTS USED:
// 1. Composition: Page composed of BookForm
// 2. Delegation: Business logic delegated to BookService

import { useEffect, useState } from "react";
import BookForm from "../components/BookForm";
import BookService from "../services/BookService";

export default function Books({ onDataChanged }) {
  const [books, setBooks] = useState([]);
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setBooks(BookService.getAll());
  }, []);

  const saveBook = (book) => {
    selected ? BookService.update(book) : BookService.add(book);
    setBooks(BookService.getAll());
    setSelected(null);
    onDataChanged?.();
  };

  const filteredBooks = books.filter((b) => {
    const value = query.toLowerCase();
    return (
      b.title?.toLowerCase().includes(value) ||
      b.author?.toLowerCase().includes(value) ||
      b.isbn?.toLowerCase().includes(value)
    );
  });

  return (
    <>
      <h2>Books</h2>
      <BookForm onSave={saveBook} selected={selected} />

      <input
        className="search-input"
        placeholder="Search by title, author, or ISBN"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <ul>
        {filteredBooks.map(b => (
          <li key={b.id}>
            <span>{b.title} by {b.author} ({b.isbn})</span>
            <span>
            <button onClick={() => setSelected(b)}>Edit</button>
            <button onClick={() => {
              BookService.delete(b.id);
              setBooks(BookService.getAll());
              onDataChanged?.();
            }}>Delete</button>
            </span>
          </li>
        ))}
      </ul>

      {filteredBooks.length === 0 && <p className="empty">No books found.</p>}
    </>
  );
}
