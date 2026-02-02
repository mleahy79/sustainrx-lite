import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Nav from './pages/nav.jsx'
import Landing from './pages/Landing.jsx'
import Footer from './pages/Footer.jsx'
import Login from './pages/Login.jsx'
import About from './pages/About.jsx'
import Profile from './pages/Profile.jsx'
import Faq from './pages/Faq.jsx'

function App() {
  return <div>
    <div className='bg-radial-[at_bottom] from-[#178582] via-neutral-800 to-[#0a1828] min-h-screen overflow-hidden'>
    <Nav />
    <Routes>
      <Route path="/" element={<><Landing /><Footer /></>} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<><About /><Footer /></>} />
      <Route path="/profile" element={<><Profile /><Footer /></>} />
      <Route path="/faq" element={<><Faq /><Footer /></>} />
    </Routes>
    </div>
  </div>
}

export default App
