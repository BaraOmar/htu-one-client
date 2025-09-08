import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import htuLogo from "../assets/htu.png"; 
import "./css/SupervisorStudentDetails.css";


function SupervisorStudentDetails() {
  const BASE_URL = import.meta.env.VITE_SERVER_URL;
  const { id } = useParams(); // student id from URL
  const [student, setStudent] = useState({
    avatar: htuLogo,
    name: "",
    email: "",
    studentId: "",
  });
  const [prefs, setPrefs] = useState([]);

  useEffect(() => {
    const fetchStudentAndPrefs = async () => {
      try {
        const raw = localStorage.getItem("user");
        const user = JSON.parse(raw);
        const supervisorId = user.id;
        const headers = { "x-role": "supervisor" };

        // 1️⃣ Fetch all students
        const studentsRes = await fetch(
          `${BASE_URL}/api/supervisors/${supervisorId}/students`,
          { headers }
        );
        const students = await studentsRes.json();

        // 2️⃣ Find the student by id
        const s = students.find(st => String(st.id) === String(id));
        if (!s) throw new Error("Student not found");

        setStudent(prev => ({
          ...prev,
          name: s.full_name,
          email: s.email,
          studentId: s.student_id || id,
        }));

        // 3️⃣ Fetch student's course preferences
        const prefsRes = await fetch(
          `${BASE_URL}/api/supervisors/${supervisorId}/students/${id}/requests`,
          { headers }
        );
        const data = await prefsRes.json();

        setPrefs(
          data.map(p => ({
            title: p.course_name,
            code: p.course_number,
            status: p.status,
            comments: p.student_comment || "—",
          }))
        );
      } catch (err) {
        console.error(err);
      }
    };

    fetchStudentAndPrefs();
  }, [id]);

  return (
    <div className="sd">
      {/* Info */}
      <section className="sd-card">
        <h2 className="sd-title">Student Information</h2>

        <div className="sd-info-grid">
          <img className="sd-avatar" src={student.avatar} alt={student.name} />

          <div className="sd-field sd-field--name">
            <div className="sd-label">Full Name</div>
            <div className="sd-value">{student.name || "—"}</div>
          </div>

          <div className="sd-field sd-field--email">
            <div className="sd-label">Email</div>
            <div className="sd-value">{student.email || "—"}</div>
          </div>

          <div className="sd-field sd-field--id">
            <div className="sd-label">Student ID</div>
            <div className="sd-value">{student.studentId || "—"}</div>
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
        </div>
      </section>
    </div>
  );
}

export default SupervisorStudentDetails;
