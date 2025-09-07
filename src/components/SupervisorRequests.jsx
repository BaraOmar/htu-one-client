import { useEffect, useState } from "react";
import "./css/SupervisorRequests.css";

const API_BASE = "http://localhost:5000/api";

function SupervisorRequests() {
  const [requests, setRequests] = useState([]);

  // Fetch all pending requests
  const fetchRequests = async () => {
    try {
      const raw = localStorage.getItem("user");
      const user = JSON.parse(raw);
      const supervisorId = user.id;

      const res = await fetch(`${API_BASE}/supervisors/${supervisorId}/requests`, {
        headers: { "x-role": "supervisor" },
      });
      const data = await res.json();

      // Add localStatus for dropdown
      const enhanced = data.map(r => ({ ...r, localStatus: r.status }));
      setRequests(enhanced);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Handle dropdown change
  const handleStatusChange = (requestId, courseId, value) => {
    setRequests(prev =>
      prev.map(r =>
        r.request_id === requestId && r.course_id === courseId
          ? { ...r, localStatus: value }
          : r
      )
    );
  };

  // Handle approve button click
  const handleApprove = async (requestId, courseId) => {
    try {
      const raw = localStorage.getItem("user");
      const user = JSON.parse(raw);
      const supervisorId = user.id;

      const request = requests.find(r => r.request_id === requestId && r.course_id === courseId);

      await fetch(
        `${API_BASE}/supervisors/${supervisorId}/requests/${requestId}/courses/${courseId}/status`,
        {
          method: "PATCH",
          headers: {
            "x-role": "supervisor",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: request.localStatus }),
        }
      );

      // Refresh table to show only pending requests
      fetchRequests();
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };


  return (
    <div className="req">
      <h1 className="req-title">Pending Requests</h1>

      <section className="req-card">
        <h2 className="req-card__title">Student Submissions</h2>

        {/* Desktop / Tablet: TABLE */}
        <div className="req-table-wrap">
          <table className="req-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Student ID</th>
                <th>Course Name</th>
                <th>Student Comment</th>
                <th>Submission Date</th>
                <th>Status</th>
                <th className="req-col-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.length === 0 ? (
                <tr>
                  <td colSpan="7">No pending requests.</td>
                </tr>
              ) : (
                requests.map((r) => (
                  <tr key={`${r.request_id}-${r.course_id}`}>
                    <td>{r.student_name}</td>
                    <td>{r.student_id}</td>
                    <td>{r.course_name}</td>
                    <td>{r.student_comment}</td>
                    <td>{new Date(r.submitted_at).toLocaleDateString()}</td>
                    <td>
                      <select
                        value={r.localStatus}
                        onChange={(e) =>
                          handleStatusChange(r.request_id, r.course_id, e.target.value)
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="need_feedback">Need Feedback</option>
                        <option value="approved">Approved</option>
                      </select>
                    </td>
                    <td className="req-actions">
                      <button
                        className="req-approve"
                        onClick={() => handleApprove(r.request_id, r.course_id)}
                      >
                        Approve
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Phones: CARDS */}
        <div className="req-cards">
          {requests.map((r) => (
            <article className="req-carditem" key={`m-${r.request_id}-${r.course_id}`}>
              <header className="req-carditem__head">
                <h3 className="req-name">{r.student_name}</h3>
                <span className="req-status">{r.localStatus}</span>
              </header>

              <div className="req-row">
                <span className="req-key">Student ID</span>
                <span className="req-val">{r.student_id}</span>
              </div>
              <div className="req-row">
                <span className="req-key">Course Name</span>
                <span className="req-val">{r.course_name}</span>
              </div>
              <div className="req-row">
                <span className="req-key">Student Comment</span>
                <span className="req-val">{r.student_comment}</span>
              </div>
              <div className="req-row">
                <span className="req-key">Submission Date</span>
                <span className="req-val">{r.submitted_at}</span>
              </div>
              <div className="req-row">
                <span className="req-key">Status</span>
                <span className="req-val">
                  <select
                    value={r.localStatus}
                    onChange={(e) =>
                      handleStatusChange(r.request_id, r.course_id, e.target.value)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="need_feedback">Need Feedback</option>
                    <option value="approved">Approved</option>
                  </select>
                </span>
              </div>

              <div className="req-carditem__actions">
                <button
                  className="req-approve"
                  onClick={() => handleApprove(r.request_id, r.course_id)}
                >
                  Approve
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default SupervisorRequests;
