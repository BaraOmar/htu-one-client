import { useState } from "react";
import { Outlet } from "react-router-dom";
import SupervisorSidebar from "./SupervisorSidebar";
import Topbar from "./Topbar";
import htuLogo from "../assets/htu.png"; 
import "./css/StudentLayout.css";

function SupervisorLayout({onLogout}) {

  const [sidebarOpen, setSidebarOpen] = useState(false);
   const saved = localStorage.getItem("user");
    const currentUser = JSON.parse(saved);
    const user = {
      name: currentUser.fullName,
      avatar: htuLogo, // replace if you later store an avatar URL
    };
  // const user = { name: "Bara", avatar: htuLogo };
  // const handleLogout = () => alert("Logout");

  return (
    <div className={`student-layout ${sidebarOpen ? "sidebar-open" : ""}`}>
      <SupervisorSidebar/>
      <div className="student-layout__main">
        <Topbar role="supervisor" user={user} onLogout={onLogout} onToggleSidebar={() => setSidebarOpen((v) => !v)}/>
        <Outlet />
      </div>
      {/* Backdrop only shows when sidebar is open */}
      {sidebarOpen && (
        <button
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default SupervisorLayout
