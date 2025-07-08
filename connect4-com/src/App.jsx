import './App.css';
import '@fontsource/inter/index.css';
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import FrontPage from './pages/FrontPage/FrontPage.jsx'
import LoginPage from './pages/UserAuth/LoginPage.jsx'
import SignupPage from './pages/UserAuth/SignupPage.jsx'
import ProfilePage from './pages/Profile/ProfilePage.jsx'
import GameRoom from './pages/Game/GameRoom.jsx'
function App() {
    return (
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/signup" element={<SignupPage />}/>
        <Route path="/profile" element={<ProfilePage />}/>
        <Route path="/room" element={<GameRoom />} />
      </Routes>
  )
}

export default App
