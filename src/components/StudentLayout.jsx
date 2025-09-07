import { useState } from "react";
import { Outlet } from "react-router-dom";
import StudentSidebar from "./StudentSidebar";
import Topbar from "./Topbar";
import htuLogo from "../assets/htu.png";
import "./css/StudentLayout.css";

function StudentLayout({onLogout}) {
  
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
      <StudentSidebar />
      <div className="student-layout__main">
        <Topbar
          role="student"
          user={user}
          onLogout={onLogout}
          onToggleSidebar={() => setSidebarOpen((v) => !v)}
        />
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

export default StudentLayout
