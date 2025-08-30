import { useState } from "react";
import "./css/StudentCoursePreferences.css";

// All course options combined TODO: replace later with API)
const ALL_OPTIONS = [
  "Option 1",
  "Option 2",
  "Option 3",
  "Option 4",
  "Option 5",
  "Option 6",
  "Option 7",
  "Option 8",
];

function CoursePreferencesForm() {
  const slots = [0, 1, 2, 3, 4, 5];
  const [selected, setSelected] = useState([""]);
  const [comments, setComments] = useState([""]);

  // Saved state (shown only after submit)
  const [savedSelected, setSavedSelected] = useState([]);
  const [savedComments, setSavedComments] = useState([]);
  const [showChoices, setShowChoices] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSavedSelected(selected);
    setSavedComments(comments);
    setShowChoices(true);
  };

  return (
    <>
      {showChoices ? (
        <div className="cp-subsection">
          <h3>Current Choices</h3>
          <ul>
            {slots.map((i) => {
              const c = savedSelected[i] || "";
              const note = savedComments[i] || "";
              return (
                <li key={i}>
                  <span>
                    <strong>Course {i + 1}:</strong> {c || "—"}
                    {note ? ` — ${note}` : ""}
                  </span>
                  <button type="button" className="cp-delete" onClick={() => alert("deleted")}>
                    Delete
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="cp-subsection">
          <h3>Current Choices</h3>
          <p className="cp-muted">No saved choices yet — use the form below.</p>
        </div>
      )}

      <form className="cp-form" onSubmit={handleSubmit}>
        <h2 className="cp-section__title">Select Courses</h2>

        <div className="cp-subsection">
          <h3>
            Courses <span className="cp-muted">(6)</span>
          </h3>
          <div className="cp-grid">
            {slots.map((i) => (
              <div key={i} className="cp-card">
                <strong>Course {i + 1}</strong>
                <select className="cp-select" value={selected[i] || ""} onChange={(e) => setSelected((prev) => {
                  const next = [...prev];
                  next[i] = e.target.value;
                  return next;
                })
                }
                >
                  <option value="">Select a course</option>
                  {ALL_OPTIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <textarea className="cp-textarea" rows={3} placeholder="Add comments…" value={comments[i] || ""} onChange={(e) =>
                  setComments((prev) => {
                    const next = [...prev];
                    next[i] = e.target.value;
                    return next;
                  })
                }
                />
              </div>
            ))}
          </div>
        </div>
        <div className="cp-actions">
          <button type="submit" className="cp-btn">Save Preferences</button>
        </div>
      </form>
    </>
  );
}

export default CoursePreferencesForm;
