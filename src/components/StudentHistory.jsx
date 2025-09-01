import "./css/StudentHistory.css";

function StudentHistory() {
    const submissions = [
        {
            id: "2023-F-001", date: "2023-09-15", status: "Approved",
            courses: "CS201 - Data Structures",
        },
        {
            id: "2023-S-002", date: "2023-01-20", status: "Pending",
            courses: "PH101 - Introduction to Philosophy",
        },
        {
            id: "2022-F-003", date: "2022-09-01", status: "Rejected",
            courses: "CS305 - Operating Systems",
        },
        {
            id: "2022-S-004", date: "2022-01-10", status: "Approved",
            courses: "AR101 - Art History I",
        },
        {
            id: "2021-F-005", date: "2021-09-05", status: "Approved",
            courses: "CH101 - General Chemistry",
        },
    ];

    return (
        <div className="sh">
            <h1 className="sh-page-title">Submission History</h1>

            <section className="sh-card">
                <h2 className="sh-card-title">Past Submissions</h2>

                {/* Desktop / Tablet: TABLE */}
                <div className="sh-table-wrap">
                    <table className="sh-table">
                        <thead>
                            <tr>
                                <th>Submission ID</th>
                                <th>Course Name</th>
                                <th>Submission Date</th>
                                <th>Status</th>
                                {/* <th>Supervisor Feedback</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {submissions.map((s) => (
                                <tr key={s.id}>
                                    <td>{s.id}</td>
                                    <td>{s.courses}</td>
                                    <td>{s.date}</td>
                                    <td className="sh-status-cell">
                                        <span className="sh-badge">{s.status}</span>
                                    </td>


                                    {/* <td className="sh-feedback">{s.feedback}</td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Phones: CARDS */}
                <div className="sh-cards">
                    {submissions.map((s) => (
                        <article className="sh-sub-card" key={`m-${s.id}`}>
                            <header className="sh-sub-head">
                                <div className="sh-sub-id">{s.id}</div>
                                <span className="sh-badge">{s.status}</span>
                            </header>

                            <div className="sh-row">
                                <span className="sh-key">Submission Date</span>
                                <span className="sh-val">{s.date}</span>
                            </div>

                            <div className="sh-row">
                                <span className="sh-key">Course Name</span>
                                <div className="sh-val sh-val--stack">
                                    {s.courses}
                                </div>
                            </div>

                            {/* <div className="sh-row">
                                <span className="sh-key">Supervisor Feedback</span>
                                <p className="sh-val sh-feedback">{s.feedback}</p>
                            </div> */}
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default StudentHistory