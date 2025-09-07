import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from './components/LoginPage'
import StudentSignupPage from './components/StudentSignupPage';
import StudentHomePage from './components/StudentHomePage';
import StudentLayout from './components/StudentLayout';
import StudentCoursePreferences from "./components/StudentCoursePreferences";
import SupervisorDashboard from "./components/SupervisorDashboard";
import SupervisorLayout from "./components/SupervisorLayout";
import SupervisorStudentsList from "./components/SupervisorStudentsList";
import SupervisorStudentDetails from "./components/SupervisorStudentDetails";
import SupervisorRequests from "./components/SupervisorRequests";
import StudentHistory from "./components/StudentHistory";
import SupervisorSignupPage from "./components/SupervisorSignupPage";
import { useState, useEffect } from "react";


function NotFound() {
  return <div style={{ padding: 20 }}>Page not found</div>;
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  // called by Login / Signup pages with the user object from backend
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    // role-based hard redirect (no useNavigate)
    if (userData.role === "supervisor") {
      window.location.href = "/supervisor";
    } else {
      window.location.href = "/student";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <BrowserRouter>
      <Routes>
        {!user && (
          <>
            <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/student-sign-up" element={<StudentSignupPage onLogin={handleLogin} />} />
            <Route path="/supervisor-sign-up" element={<SupervisorSignupPage onLogin={handleLogin} />} />
          </>
        )}

        {user?.role === "student" && (
          <Route path="/student" element={<StudentLayout onLogout={handleLogout} />}>
            <Route index element={<StudentHomePage />} />
            <Route path="home" element={<StudentHomePage />} />
            <Route path="course-preferences" element={<StudentCoursePreferences />} />
            {/* <Route path="history" element={<StudentHistory />} /> */}
          </Route>
        )}

        {user?.role === "supervisor" && (
          <Route path="/supervisor" element={<SupervisorLayout onLogout={handleLogout} />}>
            <Route index element={<SupervisorDashboard />} />
            <Route path="home" element={<SupervisorDashboard />} />
            <Route path="students" element={<SupervisorStudentsList />} />
            <Route path="students/:id" element={<SupervisorStudentDetails />} />
            <Route path="requests" element={<SupervisorRequests />} />
          </Route>
        )}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
