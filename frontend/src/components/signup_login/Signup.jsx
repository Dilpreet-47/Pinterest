import React from 'react'
const Signup = ({onClose}) => {
  return (
    <div>
         {/* 4. The Modal Logic */}
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          
          {/* The Dimmed Overlay - Click it to close modal */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => onClose()}
          ></div>

          {/* The Modal Box */}
          <div className="relative bg-white p-10 rounded-3xl shadow-2xl w-[450px] flex flex-col items-center">
            {/* Pinterest Logo for authenticity */}
            <div className='text-red-600 text-4xl mb-4'>
               <i className="fab fa-pinterest"></i>
            </div>
            
            <h2 className="text-3xl font-bold mb-2">Welcome to Pinterest</h2>
            <p className="text-gray-600 mb-6">Find new ideas to try</p>
            
            <form className="space-y-3 w-full" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-400" 
              />
              <input 
                type="password" 
                placeholder="Password" 
                className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-400" 
              />
              
              <input type="date" className='w-full p-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-400'/>

              <button className="w-full bg-red-600 text-white py-3 rounded-full font-bold text-lg hover:bg-red-700 transition">
                Continue
              </button>
            </form>

            <button 
              onClick={() => onClose()}
              className="mt-6 text-xs text-gray-500 hover:bg-gray-100 p-2 rounded-full px-4"
            >
              Close
            </button>
          </div>
        </div>
    </div>
  )
}

export default Signup;