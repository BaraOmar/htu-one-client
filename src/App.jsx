import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage';
import StudentHomePage from './components/StudentHomePage';
import StudentLayout from './components/StudentLayout';



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
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
