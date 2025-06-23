import './App.css';
import '@fontsource/inter/index.css';
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import FrontPage from './pages/FrontPage/FrontPage.jsx'
import LoginPage from './pages/UserAuth/LoginPage.jsx'
import SignupPage from './pages/UserAuth/SignupPage.jsx'

function App() {
    return (
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/signup" element={<SignupPage />}/>
      </Routes>
  )
}

export default App
