import { useState } from "react";
import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";
import htuLogo from "../assets/htu.png"; 
import "./css/StudentLayout.css";
import SupervisorSidebar from "./SupervisorSidebar";

function SupervisorLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = { name: "Bara", avatar: htuLogo };
  const handleLogout = () => alert("Logout");

  return (
    <div className={`student-layout ${sidebarOpen ? "sidebar-open" : ""}`}>
      <SupervisorSidebar/>
      <div className="student-layout__main">
        <Topbar role="supervisor" user={user} onLogout={handleLogout} onToggleSidebar={() => setSidebarOpen((v) => !v)}/>
        <Outlet />
      </div>
       {sidebarOpen && (
        <button
          className="sidebar-backdrop"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default SupervisorLayout
