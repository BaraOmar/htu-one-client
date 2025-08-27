import { useState } from 'react'
import LoginPage from './components/LoginPage'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupPage from './components/SignupPage';



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
