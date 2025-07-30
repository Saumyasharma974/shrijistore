import React, { useState } from 'react'
import logo from '../assets/logo.jpg'
import google from '../assets/google.png'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in both fields");
      return;
    }

    const userData = { email, password };
    const response = await login(userData);
    console.log(response)
    // Check if login was successful
    if (response && response.success) {
      // Store token in localStorage
      localStorage.setItem("user", JSON.stringify({
        token: response.data.token,
        role: response.data.user.role,
      }));
     if (response.data.user.role === "admin") {
  navigate("/admin");
  alert("Login successful as Admin");
} else {
  navigate("/");
  alert("Login successful");
}


      
     
    } else {
      alert(response?.message || "Login failed. Please check your credentials.");
    }
  }

  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start'>

      {/* Header */}
      <div className='w-full h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer'>
        <img className="w-[40px]" src={logo} alt="Logo" />
        <h1 className='text-[22px] font-sans'>Shri ji store</h1>
      </div>

      {/* Welcome Text */}
      <div className='w-full h-[100px] flex items-center justify-center flex-col gap-[10px]'>
        <span className='text-[25px] font-semibold'>Login Page</span>
        <span className='text-[20px]'>Welcome back to Shri ji Store</span>
      </div>

      {/* Form Container */}
      <div className='max-w-[600px] w-[90%] h-[400px] bg-[#00000025] border border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center'>

        <form className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]'>

          {/* Google Login */}
          <div className='w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer'>
            <img src={google} className="w-[20px]" alt="Google" />
            Login with Google
          </div>

          {/* OR Divider */}
          <div className='w-full flex items-center justify-center gap-[10px]'>
            <div className='w-[40%] h-[1px] bg-[#96969635]'></div>
            OR
            <div className='w-[40%] h-[1px] bg-[#96969635]'></div>
          </div>

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

          {/* Login Button */}
          <button type="submit" onClick={handleLogin} className='w-[90%] h-[40px] bg-[#2f7a84] hover:bg-[#2b6e76] transition rounded-md'>
            Login
          </button>

          {/* Register Redirect */}
          <div className='text-sm'>
            Don't have an account?{' '}
            <Link to="/register" className='text-blue-400 underline hover:text-blue-300'>
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
