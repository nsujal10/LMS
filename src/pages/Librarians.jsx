import { useEffect, useState } from "react";
import LibrarianForm from "../components/LibrarianForm";
import LibrarianService from "../services/LibrarianService";

export default function Librarians({ onDataChanged }) {
  const [librarians, setLibrarians] = useState([]);
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setLibrarians(LibrarianService.getAll());
  }, []);

  const saveLibrarian = (librarian) => {
    selected
      ? LibrarianService.update(librarian)
      : LibrarianService.add(librarian);

    setLibrarians(LibrarianService.getAll());
    setSelected(null);
    onDataChanged?.();
  };

  const deleteLibrarian = (id) => {
    LibrarianService.delete(id);
    setLibrarians(LibrarianService.getAll());
    onDataChanged?.();
  };

  const filteredLibrarians = librarians.filter((l) => {
    const value = query.toLowerCase();
    return (
      l.name?.toLowerCase().includes(value) ||
      l.email?.toLowerCase().includes(value)
    );
  });

  return (
    <>
      <h2>Librarians</h2>
      <LibrarianForm onSave={saveLibrarian} selected={selected} />

      <input
        className="search-input"
        placeholder="Search by name or email"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <ul>
        {filteredLibrarians.map(l => (
          <li key={l.id}>
            <span>{l.name} - {l.email}</span>
            <span>
            <button onClick={() => setSelected(l)}>Edit</button>
            <button onClick={() => deleteLibrarian(l.id)}>Delete</button>
            </span>
          </li>
        ))}
      </ul>

      {filteredLibrarians.length === 0 && <p className="empty">No librarians found.</p>}
    </>
  );
}
