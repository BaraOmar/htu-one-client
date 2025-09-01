import { Link } from "react-router-dom";
import "./css/SupervisorDashboard.css";

function SupervisorDashboard() {
  const totalStudents = 120;      // TODO: replace with API
  const pendingApprovals = 7;

  return (
    <div className="sup-dash">
      <h1 className="sup-dash__title">Supervisor Dashboard</h1>

      <div className="sup-dash__cards">
        {/* Students card */}
        <section className="sup-card">
          <div>
            <div className="sup-card__label">
              Total Students
            </div>
            <div className="sup-card__value">{totalStudents}</div>
          </div>

          <div className="sup-card__actions">
            <Link to="/supervisor/students" className="sup-btn sup-btn--card">
               View Students
            </Link>
          </div>
        </section>

        {/* Pending requests card */}
        <section className="sup-card">
          <div>
            <div className="sup-card__label">
              Pending Approvals
            </div>
            <div className="sup-card__value">{pendingApprovals}</div>
          </div>

          <div className="sup-card__actions">
            <Link to="/supervisor/requests" className="sup-btn sup-btn--card">
               Requests
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default SupervisorDashboard