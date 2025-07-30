import React from 'react'
import Register from './pages/Register'
import Login from './pages/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AdminDashboard from './pages/AdminDashboard'

import Collections from './pages/Collections'
import AdminRoute from './pages/ProtectedAdmin'
import CategoryPage from './pages/Category'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/admin' element={<AdminRoute><AdminDashboard/></AdminRoute>}/>
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path='/all' element={<Collections/>}/>
        <Route path='/product/:id' element={<ProductDetails />} />
       <Route path="/cart" element={<Cart />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
