import { Link } from "react-router-dom";
import htuLogo from "../assets/htu.png"; 
import "./css/StudentSidebar.css";
import "boxicons/css/boxicons.min.css";

function SupervisorSidebar() {
  return (
    <aside id="student-sidebar" className="student-sidebar">
      <div className="student-sidebar__brand">
        <img src={htuLogo} alt="HTU" />
      </div>

      <nav className="student-sidebar__nav">
        <Link to="/supervisor/home" className="student-sidebar__link">
          <i className="bx bx-home-alt-2"></i>
          <span className="student-sidebar__label">Dashboard</span>
        </Link>

        <Link to="/supervisor/students" className="student-sidebar__link">
          <i className="bx bx-group"></i>
          <span className="student-sidebar__label">Students List</span>
        </Link>

        <Link to="/supervisor/requests" className="student-sidebar__link">
          <i className="bx bx-envelope"></i>
          <span className="student-sidebar__label">Requests</span>
        </Link>
      </nav>
    </aside>
  );
}

export default SupervisorSidebar;
