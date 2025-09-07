import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import StudentSidebar from "./StudentSidebar";
import Topbar from "./Topbar";
import "./css/StudentLayout.css";

function StudentLayout({ onLogout }) {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const saved = localStorage.getItem("user");
  const currentUser = JSON.parse(saved);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    // generate a random seed so each user gets a unique avatar
    const seed = Math.floor(Math.random() * 100000);
    // 🎨 Anime / cartoon style avatar from DiceBear
    setAvatar(`https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}`);
  }, []);

  const user = {
    name: currentUser.fullName,
    avatar: avatar,
  };


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
