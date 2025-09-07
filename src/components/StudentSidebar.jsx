import { Link } from "react-router-dom";
import htuLogo from "../assets/htu.png";
import "./css/StudentSidebar.css";
import "boxicons/css/boxicons.min.css";

function StudentSidebar() {
  return (
    <aside id="student-sidebar" className="student-sidebar">
      <div className="student-sidebar__brand">
        <img src={htuLogo} alt="HTU" />
      </div>

      <nav className="student-sidebar__nav">
        <Link to="/student/home" className="student-sidebar__link">
          <i className="bx bx-home-alt-2"></i>
          <span className="student-sidebar__label">Home</span>
        </Link>

        <Link to="/student/course-preferences" className="student-sidebar__link">
          <i className="bx bx-book-content"></i>
          <span className="student-sidebar__label">Course Preferences</span>
        </Link>

        {/* <Link to="/student/history" className="student-sidebar__link">
          <i className="bx bx-history"></i>
          <span className="student-sidebar__label">History</span>
        </Link> */}
      </nav>
    </aside>
  );
}

export default StudentSidebar;
