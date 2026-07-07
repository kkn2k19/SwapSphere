import React, { useEffect, useState } from 'react'
import api from '../../services/api'

const AdminProducts = () => {
  const [products, setProducts] = useState([])

  const loadProducts = () => {
    api.get("/api/admin/products")
      .then(res => setProducts(res.data))
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const deactivate = async (id) => {
    await api.put(`/api/admin/products/${id}/deactivate`)
    loadProducts()
  }

  const activate = async (id) => {
    await api.put(`/api/admin/products/${id}/activate`)
    loadProducts()
  }

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete product?")) return
    await api.delete(`/api/admin/products/${id}`)
    loadProducts()
  }

  return (
    // <div>AdminProducts</div>
    <div className='p-8'>
      <h1 className='text-2xl font-bold mb-6'>
        Manage Products
      </h1>
      {products.map(product => (
        <div key={product.id} className='bg-white shadow p-4 mb-3 rounded'>
          <h2 className='font-semibold text-lg'>
            {product.title}
          </h2>
          <p className="text-sm text-gray-500">
            Category: {product.category}
          </p>

          <p className="text-sm text-gray-500">
            Owner: {product.ownerEmail}
          </p>

          <p className="text-orange-600 font-bold">
            ₹{product.price}
          </p>
          <p>Status: {product.status}</p>
          <div className='space-x-2 mt-2'>
            <button
              onClick={() => activate(product.id)}
              className='bg-green-500 text-white px-2 py-1'>
              Activate
            </button>
            <button
              onClick={() => deactivate(product.id)}
              className='bg-yellow-500 text-white px-2 py-1'>
              Deactivate
            </button>
            <button
              onClick={() => deleteProduct(product.id)}
              className='bg-red-500 text-white px-2 py-1'>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AdminProducts