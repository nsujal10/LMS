// OOP CONCEPTS:
// - Composition
// - Delegation to StudentService

import { useEffect, useState } from "react";
import StudentForm from "../components/StudentForm";
import StudentService from "../services/StudentService";

export default function Students({ onDataChanged }) {
  const [students, setStudents] = useState([]);
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setStudents(StudentService.getAll());
  }, []);

  const saveStudent = (student) => {
    selected
      ? StudentService.update(student)
      : StudentService.add(student);

    setStudents(StudentService.getAll());
    setSelected(null);
    onDataChanged?.();
  };

  const deleteStudent = (id) => {
    StudentService.delete(id);
    setStudents(StudentService.getAll());
    onDataChanged?.();
  };

  const filteredStudents = students.filter((s) => {
    const value = query.toLowerCase();
    return (
      s.name?.toLowerCase().includes(value) ||
      s.email?.toLowerCase().includes(value) ||
      s.enrollmentNo?.toLowerCase().includes(value)
    );
  });

  return (
    <>
      <h2>Students</h2>
      <StudentForm onSave={saveStudent} selected={selected} />

      <input
        className="search-input"
        placeholder="Search by name, email, or enrollment no"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <ul>
        {filteredStudents.map(s => (
          <li key={s.id}>
            <span>{s.name} ({s.enrollmentNo}) - {s.email}</span>
            <span>
            <button onClick={() => setSelected(s)}>Edit</button>
            <button onClick={() => deleteStudent(s.id)}>Delete</button>
            </span>
          </li>
        ))}
      </ul>

      {filteredStudents.length === 0 && <p className="empty">No students found.</p>}
    </>
  );
}
