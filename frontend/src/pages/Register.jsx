import React, { useState, useContext } from 'react'
import logo from '../assets/logo.jpg'
import google from '../assets/google.png'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function Register() {
  const { signup } = useContext(AuthContext)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const navigatetohome = () => navigate('/')

  const handleSignup = async (e) => {
    e.preventDefault()
  const userData = {
    name: username,     // ✅ Backend expects 'name', not 'username'
    email,
    password,
    role: 'user'        // ✅ Explicitly send the role
  };
    try {
      const response = await signup(userData)
      
      console.log(response)
      alert("Registration successful")
      navigate('/login')
    } catch (error) {
      alert("Registration failed")
      console.error("Signup Error:", error)
    }
  }

  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start'>
      {/* Header */}
      <div className='w-full h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer'>
        <img className="w-[40px]" src={logo} alt="Logo" onClick={navigatetohome} />
        <h1 className='text-[22px] font-sans'>Shri ji store</h1>
      </div>

      {/* Welcome Text */}
      <div className='w-full h-[100px] flex items-center justify-center flex-col gap-[10px]'>
        <span className='text-[25px] font-semibold'>Registration Page</span>
        <span className='text-[20px]'>Welcome to Shri ji Store, Place your order</span>
      </div>

      {/* Form Container */}
      <div className='max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center'>
        <form 
          onSubmit={handleSignup} 
          className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]'
        >
          {/* Google Registration */}
          <div className='w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer'>
            <img src={google} className="w-[20px]" alt="Google" />
            Registration with Google
          </div>

          {/* OR Divider */}
          <div className='w-full flex items-center justify-center gap-[10px]'>
            <div className='w-[40%] h-[1px] bg-[#96969635]'></div>
            OR
            <div className='w-[40%] h-[1px] bg-[#96969635]'></div>
          </div>

          {/* Username Input */}
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='w-[90%] h-[40px] rounded-md px-3 bg-transparent border border-gray-400 placeholder-gray-300 focus:outline-none'
            required
          />

          {/* Email Input */}
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-[90%] h-[40px] rounded-md px-3 bg-transparent border border-gray-400 placeholder-gray-300 focus:outline-none'
            required
          />

          {/* Password Input with Eye Toggle */}
          <div className='w-[90%] h-[40px] flex items-center border border-gray-400 rounded-md px-3 bg-transparent'>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full bg-transparent outline-none text-white placeholder-gray-300'
              required
            />
            <div onClick={() => setShowPassword(!showPassword)} className='cursor-pointer text-xl'>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          {/* Register Button */}
          <button type="submit" className='w-[90%] h-[40px] bg-[#2f7a84] hover:bg-[#2b6e76] transition rounded-md'>
            Register
          </button>

          {/* Login Redirect */}
          <div className='text-sm'>
            Already have an account?{' '}
            <Link to="/login" className='text-blue-400 underline hover:text-blue-300'>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
