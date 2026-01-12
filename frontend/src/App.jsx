import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/signup_login/Login';
const App = () => {
  return (
    <div className='font-[googleSans]'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App