import React from 'react'
import { Routes, Route } from "react-router-dom"
import Homepage from './Pages/Homepage'
import Navbar from './components/Navbar'
import RegisterPage from './Pages/RegisterPage'
import LoginPage from './Pages/LoginPage'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </div>
  )
}

export default App