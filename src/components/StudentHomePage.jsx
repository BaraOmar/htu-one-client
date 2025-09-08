import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./css/StudentHomePage.css";

function StudentHomePage() {
    const BASE_URL = import.meta.env.VITE_SERVER_URL;
    const [requests, setRequests] = useState([]);
    const [user, setUser] = useState("");

    useEffect(() => {
        const saved = localStorage.getItem("user");
        const user = JSON.parse(saved);
        setUser(user);
        fetch(`${BASE_URL}/api/requests/${user.id}`)
            .then((res) => (res.ok ? res.json() : []))
            .then((data) => setRequests(data))
            .catch((err) => console.error("requests fetch error", err));
    }, []);

    async function handleDelete(courseId, status) {
        const requestId = requests[0].request_id;


        try {
            const res = await fetch(
                `${BASE_URL}/api/requests/${requestId}/preferences/${courseId}/${user.id}`,
                { method: "DELETE" }
            );
            // server-side rule (backend returns 409 for approved)
            if (res.status === 409) {
                const msg = await res.json().catch(() => ({}));
                alert(msg?.message || "Cannot delete approved course");
                return;
            }

            const payload = await res.json();
            const updated = payload.request

            setRequests(updated);
        } catch (e) {
            console.error(e);
            alert("Network error while deleting course.");
        }
    }

    const hasRequests = requests.length > 0;

    return (
        <main className="student-main">
            <h1 className="student-page-title">Student Dashboard</h1>

            <div className="student-grid">
                <section className="student-card">
                    <h2 className="student-card__title">Course Preferences Summary</h2>

                    {!hasRequests ? (
                        <div className="student-empty">
                            <p>You don’t have any course preference requests yet.</p>
                            <Link to="/student/course-preferences" className="student-btn student-btn--primary">
                                Submit New Preferences
                            </Link>
                        </div>
                    ) : (
                        <>
                            <ul className="student-list">
                                {requests.map((r) => (
                                    <li key={r.course_id} className="student-list__item">
                                        <div className="student-list__title">{r.course_name}</div>
                                        <div className="student-list__meta">
                                            {new Date(r.submitted_at).toLocaleDateString()}
                                        </div>
                                        <div className="student-list__status">
                                            <span className="student-pill">{r.status}</span>
                                            <button
                                                className="student-btn student-btn--danger student-btn--sm"
                                                onClick={() => handleDelete(r.course_id, r.status)}
                                                // disabled={r.status === "approved"}
                                                style={{ marginLeft: 8 }}
                                                title={r.status === "approved" ? "Approved courses cannot be deleted" : "Delete this course"}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            {/* <div className="student-card__footer">
                                <Link to="/student/course-preferences" className="student-btn student-btn--light">
                                    View All Preferences
                                </Link>
                            </div> */}
                        </>
                    )}
                </section>

                <aside className="student-card student-card--side">
                    <h2 className="student-card__title">Quick Actions</h2>
                    <Link to="/student/course-preferences" className="student-btn student-btn--primary student-fullw">
                        Submit New Preferences
                    </Link>
                </aside>
            </div>
        </main>
    );
}

export default StudentHomePage;
