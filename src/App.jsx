import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Nav from './pages/nav.jsx'
import Landing from './pages/Landing.jsx'
import Footer from './pages/Footer.jsx'
import Login from './pages/Login.jsx'

function App() {
  return <div>
    <div className='bg-radial-[at_bottom] from-[#178582] via-[#0a1828] to-neutral-800  min-h-screen overflow-hidden'>
    <Nav />
    <Routes>
      <Route path="/" element={<><Landing /><Footer /></>} />
      <Route path="/login" element={<Login />} />
    </Routes>
    </div>
  </div>
}

export default App
