import React from 'react'
import { Routes, Route } from "react-router-dom"
import Navbar from './components/Navbar'
import RegisterPage from './pages/auth/RegisterPage'
import LoginPage from './pages/auth/LoginPage'
import ForgotPassword from './pages/auth/ForgotPassword'
import VerifyOtp from './pages/auth/VerifyOtp'
import ResetPassword from './pages/auth/ResetPassword'
import ManageProducts from './pages/product/user/ManageProducts'
import ProtectedRoute from './components/ProtectedRoute'
import AddProduct from './pages/product/user/AddProduct'
import ProductDetail from './pages/product/shared/ProductDetail'
import Homepage from './pages/Homepage'
import Profile from './pages/Profile'
import UserProfile from './pages/UserProfile'
import CategoryProducts from './pages/CategoryProducts'
import MyExchangeRequests from './pages/exchange/MyExchangeRequests'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminUsers from './pages/admin/AdminUsers'
import AdminProducts from './pages/admin/AdminProducts'
import AdminExchanges from './pages/admin/AdminExchanges'
import EditProduct from './pages/product/user/EditProduct'
import AdminCategories from './pages/admin/AdminCategories'
import ExchangeDetail from './pages/exchange/ExchangeDetail'
// import ChatPage from './Pages/chats/ChatPage'

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

        <Route path='/add-product'
          element={
            <ProtectedRoute roleRequired="USER">
              <AddProduct />
            </ProtectedRoute>
          } />

        <Route path="/manage-products"
          element={
            <ProtectedRoute roleRequired="USER">
              <ManageProducts />
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

        <Route path='/edit-product/:id'
          element={
            <ProtectedRoute roleRequired="USER">
              <EditProduct />
            </ProtectedRoute>
          } />

        <Route path='/user/:email' element={<UserProfile />} />
        <Route path="/category/:categoryName" element={<CategoryProducts />} />
        <Route path='/exchangeRequests'
          element={
            <ProtectedRoute roleRequired="USER">
              <MyExchangeRequests />
            </ProtectedRoute>
          } />


        <Route path='/admin/dashboard'
          element={
            <ProtectedRoute roleRequired="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          } />
        <Route path='/admin/users'
          element={
            <ProtectedRoute roleRequired="ADMIN">
              <AdminUsers />
            </ProtectedRoute>
          } />
        <Route path='/admin/products'
          element={
            <ProtectedRoute roleRequired="ADMIN">
              <AdminProducts />
            </ProtectedRoute>
          } />
        <Route path='/admin/exchanges'
          element={
            <ProtectedRoute roleRequired="ADMIN">
              <AdminExchanges />
            </ProtectedRoute>
          } />
        <Route path='/admin/categories'
          element={
            <ProtectedRoute roleRequired="ADMIN">
              <AdminCategories />
            </ProtectedRoute>
          } />


        <Route path='/exchange/:id' element={<ExchangeDetail />} />
        {/* <Route path='/chat/:id' element={<ChatPage />} /> */}

      </Routes>
    </div>
  )
}

export default App