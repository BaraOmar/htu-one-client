import { Link, useParams } from "react-router-dom";
import htuLogo from "../assets/htu.png"; 
import "./css/SupervisorStudentDetails.css";

function SupervisorStudentDetails() {
  const { id } = useParams();

  // TODO: fetch by id
  const student = {
    avatar: htuLogo,
    name: "Alice Wonderland",
    email: "alice.w@htu.edu",
    studentId: "S-2022-001",
    major: "Computer Science",
    semester: "Fall 2024",
  };

  const prefs = [
    { title: "Advanced Algorithms", code: "CS301", status: "Approved",
      comments: "Excellent choice, fundamental for future studies." },
    { title: "Linear Algebra", code: "MA205", status: "Pending",
      comments: "Waiting for prerequisite verification." },
    { title: "Machine Learning", code: "DS410", status: "Feedback",
      comments: "Consider CS420 for stronger foundational knowledge. Please review course description." },
    { title: "Introduction to Psychology", code: "PY101", status: "Approved",
      comments: "Approved as a general elective." },
    { title: "Digital Logic Design", code: "EE307", status: "Pending",
      comments: "Still under review by department." },
    { title: "Creative Writing", code: "EN101", status: "Feedback",
      comments: "Alternative elective required. This course is not part of your curriculum." },
    { title: "General Physics I", code: "PH101", status: "Approved",
      comments: "Core science requirement met." },
  ];

  return (
    <div className="sd">
      {/* Info */}
      <section className="sd-card">
        <h2 className="sd-title">Student Information</h2>

        <div className="sd-info-grid">
          <img className="sd-avatar" src={student.avatar} alt={student.name} />

          <div className="sd-field sd-field--name">
            <div className="sd-label">Full Name</div>
            <div className="sd-value">{student.name}</div>
          </div>

          <div className="sd-field sd-field--email">
            <div className="sd-label">Email</div>
            <div className="sd-value">{student.email}</div>
          </div>

          <div className="sd-field sd-field--id">
            <div className="sd-label">Student ID</div>
            <div className="sd-value">{student.studentId}</div>
          </div>

          <div className="sd-field sd-field--sem">
            <div className="sd-label">Current Semester</div>
            <div className="sd-value">{student.semester}</div>
          </div>

          <div className="sd-field sd-field--major">
            <div className="sd-label">Major</div>
            <div className="sd-value">{student.major}</div>
          </div>
        </div>
      </section>

      {/* Preferences — table on desktop/tablet */}
      <section className="sd-card">
        <h2 className="sd-title">Submitted Course Preferences</h2>

        {/* Desktop/Tablet: TABLE */}
        <div className="sd-table-wrap">
          <table className="sd-table">
            <thead>
              <tr>
                <th>Course Title</th>
                <th>Course Code</th>
                <th>Comments</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {prefs.map((p, i) => (
                <tr key={i}>
                  <td>{p.title}</td>
                  <td>{p.code}</td>
                  <td className="sd-comments">{p.comments}</td>
                  <td className="sd-status-cell">
                    <span className="sd-status">{p.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Phones: CARDS */}
        <div className="sd-pref-cards">
          {prefs.map((p, i) => (
            <article className="sd-pref-card" key={`m-${i}`}>
              <header className="sd-pref-head">
                <div className="sd-pref-title">{p.title}</div>
                <span className="sd-code-badge">{p.code}</span>
              </header>
              <div className="sd-pref-row">
                <span className="sd-muted">Status</span>
                <span className="sd-status">{p.status}</span>
              </div>
              <div className="sd-pref-row sd-pref-comment">
                <span className="sd-muted">Comments</span>
                <p className="sd-comment-text">{p.comments}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="sd-actions">
          <Link to=".." relative="path" className="sd-btn sd-btn--link">Back to list</Link>
          <button className="sd-btn sd-btn--primary">Approve</button>
        </div>
      </section>
    </div>
  );
}
export default SupervisorStudentDetails