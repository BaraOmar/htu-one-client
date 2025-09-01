import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage';
import StudentHomePage from './components/StudentHomePage';
import StudentLayout from './components/StudentLayout';
import StudentCoursePreferences from "./components/StudentCoursePreferences";
import SupervisorDashboard from "./components/SupervisorDashboard";
import SupervisorLayout from "./components/SupervisorLayout";
import SupervisorStudentsList from "./components/SupervisorStudentsList";
import SupervisorStudentDetails from "./components/SupervisorStudentDetails";
import SupervisorRequests from "./components/SupervisorRequests";
import StudentHistory from "./components/StudentHistory";



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<StudentHomePage />} />
          <Route path="home" element={<StudentHomePage />} />
          <Route path="course-preferences" element={<StudentCoursePreferences />} />
          <Route path="history" element={<StudentHistory />} />
        </Route>
        <Route path="/supervisor" element={<SupervisorLayout />}>
          <Route index element={<SupervisorDashboard />} />
          <Route path="home" element={<SupervisorDashboard />} />
          <Route path="students" element={<SupervisorStudentsList />} />
          <Route path="students/:id" element={<SupervisorStudentDetails />} />
          <Route path="requests" element={<SupervisorRequests />} />
        </Route>
        <Route path="/supervisor/students" element={<SupervisorStudentsList />} />
        <Route path="/supervisor/requests" element={<SupervisorRequests />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
