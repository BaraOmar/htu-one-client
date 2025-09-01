import { Link } from "react-router-dom";
import "./css/SupervisorStudentsList.css";

const students = [
    { name: "Alice Johnson", id: "HTU001", lastSubmission: "2024-03-15" },
    { name: "Bob Williams", id: "HTU002", lastSubmission: "2024-03-20" },
    { name: "Charlie Brown", id: "HTU003", lastSubmission: "2024-03-18" },
    { name: "Diana Miller", id: "HTU004", lastSubmission: "2024-03-10" },
    { name: "Eve Davis", id: "HTU005", lastSubmission: "2024-03-22" },
    { name: "Frank White", id: "HTU006", lastSubmission: "2024-03-12" },
    { name: "Grace Lee", id: "HTU007", lastSubmission: "2024-03-21" },
    { name: "Henry King", id: "HTU008", lastSubmission: "2024-03-23" },
    { name: "Ivy Green", id: "HTU009", lastSubmission: "2024-03-14" },
    { name: "Jack Hall", id: "HTU010", lastSubmission: "2024-03-19" },
];

function SupervisorStudentsList() {
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
                        {students.map((s) => (
                            <tr key={s.id}>
                                <td>{s.name}</td>
                                <td>{s.id}</td>
                                <td>{s.lastSubmission}</td>
                                <td className="sup-table__actions">
                                    <Link to={s.id} className="view-link">View Details</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Phones: cards */}
            <div className="sup-cards">
                {students.map((s) => (
                    <article className="sup-student-card" key={`${s.id}-card`}>
                        <header className="sup-student-card__head">
                            <h3 className="sup-student-card__name">{s.name}</h3>
                            <span className="sup-badge">{s.id}</span>
                        </header>

                        <div className="sup-student-card__row">
                            <span className="sup-label">Last Submission</span>
                            <span className="sup-value">{s.lastSubmission}</span>
                        </div>

                        <Link to={s.id} className="sup-card-link">View Details</Link>

                    </article>
                ))}
            </div>
        </div>
    );
}

export default SupervisorStudentsList