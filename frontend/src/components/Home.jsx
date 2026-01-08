import React from 'react'
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
      <h1 className='text-4xl font-bold'>Home</h1>
      <Link to="/login" className='text-blue-500'>Login</Link>
    </div>
  )
};

export default Home;