import React, { useEffect, useState } from 'react'
import api from '../../services/api'

const AdminDashboard = () => {
  const [stats, setStats] = useState({})

  useEffect(() => {
    api.get("/api/admin/dashboard")
      .then(res => setStats(res.data))
  }, [])

  return (
    // <div>AdminDashboard</div>
    <div className='p-8'>
      <h1 className='text-2xl font-bold mb-6'>
        Admin Dashboard
      </h1>

      <div className='grid grid-cols-2 gap-6'>
        <div className='bg-white shadow p-6 rounded'>
          <h2 className='text-lg font-semibold'>Total Users</h2>
          <p className='text-3xl text-orange-600 mt-2'>
            {stats.totalUsers}
          </p>
        </div>
        <div className='bg-white shadow p-6 rounded'>
          <h2 className='text-lg font-semibold '>Total Products</h2>
          <p className='text-3xl text-orange-600 mt-2'>
            {stats.totalProducts}
          </p>
        </div>
        <div className='bg-white shadow p-6 rounded'>
          <h2 className='text-lg font-semibold'>Categories</h2>
          <p className='text-3xl text-orange-600 mt-2'>
            {stats.totalCategories}
          </p>
        </div>

        <div className='bg-white shadow p-6 rounded'>
          <h2 className='text-lg font-semibold'>Exchanges</h2>
          <p className='text-3xl text-orange-600 mt-2'>
            {stats.totalExchanges}
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard