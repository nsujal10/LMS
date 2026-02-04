// OOP CONCEPTS:
// - Composition
// - Delegation to StudentService

import { useEffect, useState } from "react";
import StudentForm from "../components/StudentForm";
import StudentService from "../services/StudentService";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setStudents(StudentService.getAll());
  }, []);

  const saveStudent = (student) => {
    selected
      ? StudentService.update(student)
      : StudentService.add(student);

    setStudents(StudentService.getAll());
    setSelected(null);
  };

  const deleteStudent = (id) => {
    StudentService.delete(id);
    setStudents(StudentService.getAll());
  };

  return (
    <>
      <h2>Students</h2>
      <StudentForm onSave={saveStudent} selected={selected} />

      <ul>
        {students.map(s => (
          <li key={s.id}>
            {s.name} ({s.enrollmentNo})
            <button onClick={() => setSelected(s)}>Edit</button>
            <button onClick={() => deleteStudent(s.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}
