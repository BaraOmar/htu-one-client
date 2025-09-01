import "./css/SupervisorRequests.css";

function SupervisorRequests() {
  const rows = [
    { name: "Alice Wonderland", id: "HTU001-2023", date: "2023-10-26", status: "Pending" },
    { name: "Bob Thebuilder",   id: "HTU002-2023", date: "2023-10-25", status: "Pending" },
    { name: "Charlie Chaplin",  id: "HTU003-2023", date: "2023-10-24", status: "Pending" },
    { name: "Diana Prince",     id: "HTU004-2023", date: "2023-10-23", status: "Pending" },
    { name: "Eve Harrington",   id: "HTU005-2023", date: "2023-10-22", status: "Pending" },
  ];

  const onApprove = (r) => {
    // TODO: replace with API call
    alert(`Approved ${r.name} (${r.id})`);
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
                <th>Submission Date</th>
                <th>Status</th>
                <th className="req-col-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>{r.name}</td>
                  <td>{r.id}</td>
                  <td>{r.date}</td>
                  <td><span className="req-status">{r.status}</span></td>
                  <td className="req-actions">
                    <button className="req-approve" onClick={() => onApprove(r)}>Approve</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Phones: CARDS */}
        <div className="req-cards">
          {rows.map((r) => (
            <article className="req-carditem" key={`m-${r.id}`}>
              <header className="req-carditem__head">
                <h3 className="req-name">{r.name}</h3>
                <span className="req-status">{r.status}</span>
              </header>

              <div className="req-row">
                <span className="req-key">Student ID</span>
                <span className="req-val">{r.id}</span>
              </div>
              <div className="req-row">
                <span className="req-key">Submission Date</span>
                <span className="req-val">{r.date}</span>
              </div>

              <div className="req-carditem__actions">
                <button className="req-approve" onClick={() => onApprove(r)}>Approve</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default SupervisorRequests