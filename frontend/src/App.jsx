import React from 'react'
import { Routes, Route } from "react-router-dom"
import Navbar from './components/Navbar'
import RegisterPage from './pages/auth/RegisterPage'
import LoginPage from './pages/auth/LoginPage'
import ForgotPassword from './pages/auth/ForgotPassword'
import VerifyOtp from './pages/auth/VerifyOtp'
import ResetPassword from './pages/auth/ResetPassword'
import MyProducts from './Pages/product/MyProducts'
import ProtectedRoute from './components/ProtectedRoute'
import AddProduct from './Pages/product/AddProduct'
import ProductDetail from './Pages/product/ProductDetail'
import Homepage from './Pages/Homepage'
import Profile from './Pages/Profile'
import UserProfile from './Pages/UserProfile'
import CategoryProducts from './Pages/CategoryProducts'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* <Route path='/add-product'
          element={
            <ProtectedRoute roleRequired="USER">
              <AddProduct />
            </ProtectedRoute>
          } /> */}

        <Route path="/my-products"
          element={
            <ProtectedRoute roleRequired="USER">
              <MyProducts />
            </ProtectedRoute>
          } />

        <Route path='/product/:id' element={<ProductDetail />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path='/user/:email' element={<UserProfile />} />
        <Route path="/category/:categoryName" element={<CategoryProducts />} />

      </Routes>
    </div>
  )
}

export default App