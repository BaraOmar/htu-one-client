import htuLogo from "../assets/htu.png"; 
import "./css/Topbar.css";


function Topbar({ onLogout, role, user, onToggleSidebar }) {
  return (
    <header className="topbar">
      <button
        className="sidebar-toggle"
        aria-label="Open sidebar"
        aria-controls="student-sidebar"
        onClick={onToggleSidebar}
      >
        ☰
      </button>

      <div className="topbar__left">
        <h1 className="topbar__role">
          {role === "student" ? "Student Portal" : "Supervisor Portal"}
        </h1>
      </div>

      <div className="topbar__actions">
        <button className="topbar__btn" onClick={onLogout}>Logout</button>
        <div className="topbar__user">
          <img
            src={user.avatar || htuLogo}
            alt={user.name || "User"}
            className="topbar__avatar"
          />
          <span className="topbar__name">{user.name || "User"}</span>
        </div>
      </div>
    </header>
  );
}

export default Topbar