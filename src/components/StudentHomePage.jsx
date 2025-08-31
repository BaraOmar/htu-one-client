import { Link } from "react-router-dom";
import "./css/StudentHomePage.css";


function StudentHomePage() {
    // TODO: replace with real data (API)
    const requests = [
        { id: 1, title: "Advanced Database Systems", date: "2024-03-10", status: "Approved" },
        { id: 2, title: "Machine Learning Fundamentals", date: "2024-03-05", status: "Pending" },
        { id: 3, title: "Software Engineering Principles", date: "2024-02-28", status: "Feedback Requested" },
        { id: 4, title: "Human-Computer Interaction", date: "2024-02-20", status: "Approved" },
        { id: 5, title: "Network Security", date: "2024-02-15", status: "Pending" },
    ];
    // const requests = [];

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
                                    <li key={r.id} className="student-list__item">
                                        <div className="student-list__title">{r.title}</div>
                                        <div className="student-list__meta">{r.date}</div>
                                        <div className="student-list__status">
                                            <span className="student-pill">{r.status}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <div className="student-card__footer">
                                <Link to="/student/course-preferences" className="student-btn student-btn--light">
                                    View All Preferences
                                </Link>
                            </div>
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


export default StudentHomePage