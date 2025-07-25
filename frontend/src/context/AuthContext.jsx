import { createContext, useState } from "react";
import axios from "axios";

// 1. Create the context
export const AuthContext = createContext();

// 2. Create the provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // To store logged in user (or registered user)

  // Signup function
  const signup = async (userData) => {
    try {
      const response = await axios.post("http://localhost:3000/api/auth/register", userData);
      console.log("Registration successful", response.data);
      setUser(response.data); // You can adjust based on what your backend returns
    } catch (e) {
      console.error("Error in registration", e);
    }
  };

    const login = async (userData) => {
  try {
    const response = await axios.post("http://localhost:3000/api/auth/login", userData);
    setUser(response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Login failed"
    };
  }
};

  return (
    <AuthContext.Provider value={{ user, signup , login}}>
      {children}
    </AuthContext.Provider>
  );
};
