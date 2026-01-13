import { Routes, Route } from 'react-router-dom';
import Home from './components/Home.jsx';
import Signup from './components/signup_login/Signup.jsx';
import Login from './components/signup_login/Login.jsx';
import Feed from './components/Feed.jsx';
const App = () => {
  return (
    <div className='font-[googleSans]'> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </div>
  )
}

export default App