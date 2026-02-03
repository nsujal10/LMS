// OOP CONCEPTS USED:
// 1. Encapsulation: Internal state hidden inside component
// 2. Polymorphism: Same form handles add & update via props

import { useState } from "react";

export default function BookForm({ onSave, selected }) {
  const [title, setTitle] = useState(selected?.title || "");
  const [author, setAuthor] = useState(selected?.author || "");
  const [isbn, setIsbn] = useState(selected?.isbn || "");

  const submit = () => {
    onSave({
      id: selected?.id || Date.now(),
      title,
      author,
      isbn
    });
  };

  return (
    <>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <input placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} />
      <input placeholder="ISBN" value={isbn} onChange={e => setIsbn(e.target.value)} />
      <button onClick={submit}>
        {selected ? "Update" : "Add"}
      </button>
    </>
  );
}
