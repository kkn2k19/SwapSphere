import React, { useEffect, useState } from 'react'
import api from '../../../services/api'
import { useNavigate } from 'react-router-dom'

const ManageProducts = () => {

  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  const loadProducts = () => {
    api.get("/api/products/my")
      .then(res => setProducts(res.data))
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product")) return;
    try {
      await api.delete(`/api/products/${id}`)
      alert("Deleted");
      loadProducts()
    } catch (e) {
      alert(e.response?.data?.message || "Delete failed");
    }
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold mb-4">My Products</h1>

      {
        products.length === 0
          ?
          <div className='text-center text-gray-500'>
            No Products Yet
          </div>

          :


          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
            {products.map(product => (
              <div key={product.id} className='bg-white shadow rounded p-3'>
                <img
                  src={product.thumbnailUrl || "/no-image.jpg"}
                  alt={product.title}
                  className='h-40 w-full object-cover rounded cursor-pointer'
                  onClick={() => navigate(`/product/${product.id}`)}
                />
                <h3
                  className='font-semibold mt-2 cursor-pointer'
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  {product.title}
                </h3>
                <p className='text-sm text-gray-500' >{product.categoryName}</p>
                <p className='text-orange-600 font-bold' >₹{product.price}</p>

                <div className='flex justify-between'>
                  <button
                    onClick={() => navigate(`/edit-product/${product.id}`)}
                    className='bg-blue-500 text-white px-3 py-1 text-sm rounded'
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteProduct(product.id)}
                    className='mt-2 bg-red-500 text-white px-3 py-1 rounded text-sm'
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
      }
    </div>
  )
}

export default ManageProducts