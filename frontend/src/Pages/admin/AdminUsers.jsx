import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import { useNavigate } from 'react-router-dom'

const AdminUsers = () => {
  const [users, setUsers] = useState([])

  const navigate = useNavigate()

  const loadUsers = () => {
    api.get("/api/admin/users")
      .then(res => setUsers(res.data))
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const blockUser = async (id) => {
    try {
      await api.put(`/api/admin/users/${id}/block`)
      loadUsers()
    } catch (e) {
      alert(e.response?.data || "Error blocking user")
    }
    loadUsers()
  }

  const unblockUser = async (id) => {
    await api.put(`/api/admin/users/${id}/unblock`)
    loadUsers()
  }

  const deleteUser = async (id) => {
    if (!window.confirm("Delete user?")) return
    await api.delete(`/api/admin/users/${id}`)
    loadUsers()
  }

  return (
    // <div>AdminUsers</div>
    <div className='p-8'>
      <h1 className='text-2xl font-bold mb-6'>
        Manage Users
      </h1>

      <table className='w-full border'>
        <thead className='bg-gray-100'>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map(user => (
            <tr key={user.id} className='border-t text-center'>
              <td
                className='cursor-pointer'
                onClick={() => {
                  navigate(`/user/${user.email}`)
                }}
              >
                {user.name}
              </td>
              <td
                className='cursor-pointer'
                onClick={() => {
                  navigate(`/user/${user.email}`)
                }}
              >{user.email}</td>
              <td>{user.role}</td>
              <td>
                {user.blocked ? "Blocked" : "Active"}
              </td>
              <td className='space-x-2'>
                {user.blocked ? (
                  <button
                    onClick={() => unblockUser(user.id)}
                    className='bg-green-500 text-white px-2 py-1'>
                    Unblock
                  </button>
                ) : (
                  <button
                    onClick={() => blockUser(user.id)}
                    className='bg-yellow-500 text-white px-2 py-1'>
                    Block
                  </button>
                )}

                <button
                  onClick={() => deleteUser(user.id)}
                  className='bg-red-500 text-white px-2 py-1'>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminUsers