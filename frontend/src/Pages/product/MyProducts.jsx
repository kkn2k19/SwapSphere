import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import { useNavigate } from 'react-router-dom'
import AddProduct from './AddProduct'

const MyProducts = () => {

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
    if (!window.confirm("Delete this product")) return
    await api.delete(`/api/products/${id}`)
    loadProducts()
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <AddProduct refresh={loadProducts} />
      <h1 className="text-2xl font-bold mb-4">My Products</h1>

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


            <button
              onClick={() => deleteProduct(product.id)}
              className='mt-2 bg-red-500 text-white px-3 py-1 rounded text-sm'
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyProducts