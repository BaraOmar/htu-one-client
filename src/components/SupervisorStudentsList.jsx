import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/SupervisorStudentsList.css";

const API_BASE = "http://localhost:5000/api";

function SupervisorStudentsList() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem("user");
    const user = JSON.parse(raw);
    const supervisorId = user.id;

    const headers = { "x-role": "supervisor" };

    // 1) Get students
    fetch(`${API_BASE}/supervisors/${supervisorId}/students`, { headers })
      .then((r) => (r.ok ? r.json() : []))
      .then((students) => {
        // 2) Directly use the latest submission (assuming it's available in the student object)
        const studentsWithLastSubmission = students.map((s) => {
          const lastSubmission = s.last_submission
            ? new Date(s.last_submission).toLocaleDateString()
            : "—";
          return {
            id: s.id,
            name: s.full_name,
            lastSubmission: lastSubmission,
          };
        });

        setRows(studentsWithLastSubmission);
      })
      .catch(() => setRows([]));
  }, []);

  return (
    <div className="sup-students">
      <h1 className="sup-students__title">Students List</h1>

      {/* Desktop/Tablet: table */}
      <div className="sup-table-wrap">
        <table className="sup-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Last Submission Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((s) => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.id}</td>
                <td>{s.lastSubmission}</td>
                <td className="sup-table__actions">
                  <Link to={`/supervisor/students/${s.id}`} className="view-link">View Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phones: cards */}
      <div className="sup-cards">
        {rows.map((s) => (
          <article className="sup-student-card" key={`${s.id}-card`}>
            <header className="sup-student-card__head">
              <h3 className="sup-student-card__name">{s.name}</h3>
              <span className="sup-badge">{s.id}</span>
            </header>

            <div className="sup-student-card__row">
              <span className="sup-label">Last Submission</span>
              <span className="sup-value">{s.lastSubmission}</span>
            </div>

            <Link to={`/supervisor/students/${s.id}`} className="sup-card-link">View Details</Link>
          </article>
        ))}
      </div>
    </div>
  );
}

export default SupervisorStudentsList;
