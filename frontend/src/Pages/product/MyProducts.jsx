import React, { useEffect, useState } from 'react'
import api from '../../services/api'

const MyProducts = () => {

  const [products, setProducts] = useState([])

  useEffect(() => {
    api.get("/api/products/my")
      .then(res => setProducts(res.data))
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Products</h1>

      {products.map(p => (
        <div key={p.id} className="border p-3 mb-2">
          {p.title} - ₹{p.price}
        </div>
      ))}
    </div>
  )
}

export default MyProducts