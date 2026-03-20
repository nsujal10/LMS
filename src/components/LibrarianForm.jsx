import { useEffect, useState } from "react";

export default function LibrarianForm({ onSave, selected }) {
  const [name, setName] = useState(selected?.name || "");
  const [email, setEmail] = useState(selected?.email || "");

  useEffect(() => {
    setName(selected?.name || "");
    setEmail(selected?.email || "");
  }, [selected]);

  const submit = () => {
    if (!name.trim() || !email.trim()) {
      return;
    }

    onSave({
      id: selected?.id || Date.now(),
      name: name.trim(),
      email: email.trim()
    });

    setName("");
    setEmail("");
  };

  return (
    <>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <button onClick={submit}>
        {selected ? "Update" : "Add"}
      </button>
    </>
  );
}
