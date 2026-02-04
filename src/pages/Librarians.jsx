import { useEffect, useState } from "react";
import LibrarianForm from "../components/LibrarianForm";
import LibrarianService from "../services/LibrarianService";

export default function Librarians() {
  const [librarians, setLibrarians] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setLibrarians(LibrarianService.getAll());
  }, []);

  const saveLibrarian = (librarian) => {
    selected
      ? LibrarianService.update(librarian)
      : LibrarianService.add(librarian);

    setLibrarians(LibrarianService.getAll());
    setSelected(null);
  };

  const deleteLibrarian = (id) => {
    LibrarianService.delete(id);
    setLibrarians(LibrarianService.getAll());
  };

  return (
    <>
      <h2>Librarians</h2>
      <LibrarianForm onSave={saveLibrarian} selected={selected} />

      <ul>
        {librarians.map(l => (
          <li key={l.id}>
            {l.name}
            <button onClick={() => setSelected(l)}>Edit</button>
            <button onClick={() => deleteLibrarian(l.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}
