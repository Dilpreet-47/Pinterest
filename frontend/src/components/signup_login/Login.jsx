import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Login = ({onClose}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleLogin = async() => {
       
        try {
          const response = await axios.post('http://localhost:5000/api/v1/users/login', {
            email,
            password
        })
        const token = response.data.token;
        localStorage.setItem('accessToken', token);
        navigate('/feed');
        console.log(response.data);
        } catch (error) {
            setErrorMessage(error.response.data.message);
            console.log(error.response.data.message);
        }
    }
  return (
    <div>
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
            <p className="text-gray-600 mb-6">Login to get started</p>
            
            <form className="space-y-3 w-full" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email" 
                className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-400" 
              />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password" 
                className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-400" 
              />


              <button onClick={() => handleLogin()} className="w-full bg-red-600 text-white py-3 rounded-full font-bold text-lg hover:bg-red-700 transition">
                Login
              </button>
            </form>

            <button 
              onClick={() => onClose()}
              className="mt-6 text-xs text-gray-500 hover:bg-gray-100 p-2 rounded-full px-4"
            >
              Close
            </button>
            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
          </div>
        </div>
    </div>
  )
};

export default Login;