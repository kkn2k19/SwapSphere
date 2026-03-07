import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../services/api'

const CategoryProducts = () => {
    const { categoryName } = useParams()
    const navigate = useNavigate()
    const [products, setProducts] = useState([])

    useEffect(() => {
        api.get(`/api/products/category/${categoryName}`)
            .then(res => setProducts(res.data))
    }, [categoryName])

    return (
        // <div>CategoryProducts</div>
        <div className='p-8'>
            <h1 className='text-2xl font-bold mb-6'>
                {categoryName} Products
            </h1>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
                {products.map(p => (
                    <div key={p.id} className='bg-white shadow p-3 rounded'>
                        <img
                            src={p.thumbnailUrl}
                            className='h-40 w-full object-cover rounded cursor-pointer'
                            onClick={() => navigate(`/product/${p.id}`)}
                        />
                        <h3 className='mt-2 font-semibold cursor-pointer'>{p.title}</h3>
                        <p className='text-orange-600 font-bold'>₹{p.price}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CategoryProducts