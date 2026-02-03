// OOP CONCEPTS USED:
// 1. Composition: Page composed of BookForm
// 2. Delegation: Business logic delegated to BookService

import { useEffect, useState } from "react";
import BookForm from "../components/BookForm";
import BookService from "../services/BookService";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setBooks(BookService.getAll());
  }, []);

  const saveBook = (book) => {
    selected ? BookService.update(book) : BookService.add(book);
    setBooks(BookService.getAll());
    setSelected(null);
  };

  return (
    <>
      <h2>Books</h2>
      <BookForm onSave={saveBook} selected={selected} />

      <ul>
        {books.map(b => (
          <li key={b.id}>
            {b.title}
            <button onClick={() => setSelected(b)}>Edit</button>
            <button onClick={() => {
              BookService.delete(b.id);
              setBooks(BookService.getAll());
            }}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}
