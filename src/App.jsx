import { useEffect, useState } from "react";
import "./App.css";
import Books from "./pages/Books";
import Students from "./pages/Students";
import Librarians from "./pages/Librarians";
import BookService from "./services/BookService";
import StudentService from "./services/StudentService";
import LibrarianService from "./services/LibrarianService";

const TABS = {
  books: "Books",
  students: "Students",
  librarians: "Librarians"
};

function App() {
  const [activeTab, setActiveTab] = useState("books");
  const [stats, setStats] = useState({ books: 0, students: 0, librarians: 0 });

  const refreshStats = () => {
    setStats({
      books: BookService.getAll().length,
      students: StudentService.getAll().length,
      librarians: LibrarianService.getAll().length
    });
  };

  useEffect(() => {
    refreshStats();
  }, []);

  return (
    <div className="app-shell">
      <header>
        <h1>Library Management System</h1>
        <p className="subtitle">Manage books, students, and librarians in one place</p>
      </header>

      <section className="stats-grid">
        <article className="stat-card">
          <h3>Total Books</h3>
          <p>{stats.books}</p>
        </article>
        <article className="stat-card">
          <h3>Total Students</h3>
          <p>{stats.students}</p>
        </article>
        <article className="stat-card">
          <h3>Total Librarians</h3>
          <p>{stats.librarians}</p>
        </article>
      </section>

      <nav className="tabs">
        {Object.entries(TABS).map(([key, label]) => (
          <button
            key={key}
            className={key === activeTab ? "active" : ""}
            onClick={() => setActiveTab(key)}
          >
            {label}
          </button>
        ))}
      </nav>

      <main className="tab-panel">
        {activeTab === "books" && <Books onDataChanged={refreshStats} />}
        {activeTab === "students" && <Students onDataChanged={refreshStats} />}
        {activeTab === "librarians" && <Librarians onDataChanged={refreshStats} />}
      </main>
    </div>
  );
}

export default App;
