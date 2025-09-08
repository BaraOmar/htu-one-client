import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/SupervisorDashboard.css";
import "boxicons/css/boxicons.min.css";


function SupervisorDashboard() {
  const BASE_URL = import.meta.env.VITE_SERVER_URL;
  const [totalStudents, setTotalStudents] = useState(0);
  const [pendingApprovals, setPendingApprovals] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const raw = localStorage.getItem("user");
      const user = JSON.parse(raw);
      const supervisorId = user.id;
      if (!supervisorId) return;

      const headers = { "x-role": "supervisor" };

      try {
        // Fetch students
        const studentsRes = await fetch(`${BASE_URL}/api/supervisors/${supervisorId}/students`, { headers });
        const students = studentsRes.ok ? await studentsRes.json() : [];
        setTotalStudents(students.length);

        // Fetch pending approvals after students data is fetched
        const requestsRes = await fetch(`${BASE_URL}/api/supervisors/${supervisorId}/requests`, { headers });
        const pendingRows = requestsRes.ok ? await requestsRes.json() : [];
        setPendingApprovals(pendingRows.length);
      } catch (error) {
        console.error("Error fetching data:", error);
        setTotalStudents(0);
        setPendingApprovals(0);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="sup-dash">
      <h1 className="sup-dash__title">Supervisor Dashboard</h1>

      <div className="sup-dash__cards">
        {/* Students card */}
        <section className="sup-card">
          <div>

            <div className="sup-card__label">Total Students
              <i className="bx bx-group"></i>
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
            <div className="sup-card__label">Pending Approvals
              <i className="bx bx-envelope"></i>
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

export default SupervisorDashboard;
