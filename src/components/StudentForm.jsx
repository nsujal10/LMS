// OOP CONCEPTS:
// - Encapsulation: state hidden inside component
// - Polymorphism: add & update via props

import { useState } from "react";

export default function StudentForm({ onSave, selected }) {
  const [name, setName] = useState(selected?.name || "");
  const [email, setEmail] = useState(selected?.email || "");
  const [enrollmentNo, setEnrollmentNo] = useState(selected?.enrollmentNo || "");

  const submit = () => {
    onSave({
      id: selected?.id || Date.now(),
      name,
      email,
      enrollmentNo
    });

    setName("");
    setEmail("");
    setEnrollmentNo("");
  };

  return (
    <>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Enrollment No" value={enrollmentNo} onChange={e => setEnrollmentNo(e.target.value)} />
      <button onClick={submit}>
        {selected ? "Update" : "Add"}
      </button>
    </>
  );
}
