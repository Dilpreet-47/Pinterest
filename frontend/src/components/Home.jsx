import React, { useState } from 'react';
import Login from './signup_login/Login.jsx';
import Signup from './signup_login/Signup.jsx';

const Home = () => {
  const [isSignupModalOpen, setSignupModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  return (
    <div className='relative h-screen bg-gray-100 flex flex-col items-center'>
      
      {/* Navigation */}
      <nav className='flex justify-between w-full px-8 py-6'>
        <h1 className='text-4xl font-bold text-red-600'>Pinterest</h1>
        <div className='space-x-4'> 
          <button 
            onClick={() => setLoginModalOpen(true)}
            className='text-gray-700 font-semibold hover:text-black'>Login</button>
          <button 
            onClick={() => setSignupModalOpen(true)}
            className='bg-red-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-700'
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex items-center justify-center">
         <h2 className="text-5xl font-semibold text-center">Get your next <br/> <span className="text-green-700">weekly meal plan</span></h2>
      </div>

     {isSignupModalOpen && <Signup onClose={() => setSignupModalOpen(false)} />}
     {isLoginModalOpen && <Login onClose={() => setLoginModalOpen(false)} />}

      
    </div>
  );
};

export default Home;