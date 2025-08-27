import { useState } from 'react'
import LoginPage from './components/LoginPage'
import { BrowserRouter, Route, Routes } from "react-router-dom";



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
