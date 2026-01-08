import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App