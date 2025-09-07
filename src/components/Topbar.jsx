import "boxicons/css/boxicons.min.css";
import "./css/Topbar.css";

function Topbar({ onLogout, role, user, onToggleSidebar }) {
  return (
    <header className="topbar">
      <div className="topbar__left">
        <h1 className="topbar__role">
          {/* 🔥 This toggles sidebar open/close */}
          <i
            className="bx bx-menu topbar__menu-icon"
            onClick={onToggleSidebar}
            role="button"
            aria-label="Toggle sidebar"
          ></i>
          {role === "student" ? "Student Portal" : "Supervisor Portal"}
        </h1>
      </div>

      <div className="topbar__actions">
        <button className="topbar__btn" onClick={onLogout}>Logout</button>
        <div className="topbar__user">
          <img
            src={user.avatar}
            alt={user.name}
            className="topbar__avatar"
          />
          <span className="topbar__name">{user.name}</span>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
