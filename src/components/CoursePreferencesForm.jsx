import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/StudentCoursePreferences.css";


function CoursePreferencesForm() {

  const BASE_URL = import.meta.env.VITE_SERVER_URL;
  const slots = [0, 1, 2, 3, 4, 5];
  const [courses, setCourses] = useState([]);
  const [selected, setSelected] = useState(Array(6).fill(""));
  const [comments, setComments] = useState(Array(6).fill(""));
  
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BASE_URL}/api/courses`)
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => setCourses(data))
      .catch((e) => console.error("courses fetch error", e));
  }, []);


  function label(c) {
    return `${c.course_number} — ${c.name}`;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Check duplicates
    const dedup = new Set(selected);
    if (dedup.size !== 6) {
      alert("Each of the 6 choices must be a different course.");
      return;
    }

    const raw = localStorage.getItem("user");
    const user =JSON.parse(raw);
    const student_id = user.id

    const payload = {
      student_id,
      preferences: selected.map((courseId, i) => ({
        courseId: Number(courseId),
        comment: comments[i] || "",
      })),
    };

    try {
      await fetch(`http://localhost:5000/api/requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });


      // redirect to home after success
      navigate("/student");
    } catch (err) {
      alert("Network error while saving preferences.");
    }
  }

  return (
    <form className="cp-form" onSubmit={handleSubmit}>
      <div className="cp-subsection">
        <div className="cp-grid">
          {slots.map((i) => (
            <div key={i} className="cp-card">
              <strong>Course {i + 1}</strong>

              <select
                className="cp-select"
                name={`course_${i}`}
                required
                value={selected[i]}
                onChange={(e) => {
                  const next = [...selected];
                  next[i] = e.target.value;
                  setSelected(next);
                }}
              >
                <option value="" disabled>
                  Select a course
                </option>
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {label(c)}
                  </option>
                ))}
              </select>

              <textarea
                className="cp-textarea"
                rows={3}
                placeholder="Add comments (optional)…"
                value={comments[i]}
                onChange={(e) => {
                  const next = [...comments];
                  next[i] = e.target.value;
                  setComments(next);
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="cp-actions">
        <button type="submit" className="cp-btn">
          Save Preferences
        </button>
      </div>
    </form>
  );
}

export default CoursePreferencesForm