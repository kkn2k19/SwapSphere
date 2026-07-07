import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../services/api'

const CategoryProducts = () => {
    const { categoryName } = useParams()
    const [categoryDetails, setCategoryDetails] = useState("")
    const navigate = useNavigate()
    const [products, setProducts] = useState([])

    useEffect(() => {
        api.get(`/api/products/category/${categoryName}`)
            .then(res => setProducts(res.data))

        api.get("/api/categories/get")
            .then(res => {
                const category = res.data.find(
                    cat => cat.categoryName.toLowerCase() === categoryName.toLowerCase()
                )
                if (category) {
                    setCategoryDetails(category.details)
                }
            })
    }, [categoryName])

    return (
        // <div>CategoryProducts</div>
        <div className='p-8'>
            <h1 className='text-2xl font-bold mb-6'>
                {categoryName}
            </h1>
            <p className='text-gray-500 mb-6'>
                {categoryDetails}
            </p>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
                {products.map(p => (
                    <div key={p.id} className='bg-white shadow p-3 rounded'>
                        <img
                            src={p.thumbnailUrl}
                            className='h-40 w-full object-cover rounded cursor-pointer'
                            onClick={() => navigate(`/product/${p.id}`)}
                        />
                        <h3 className='mt-2 font-semibold cursor-pointer'
                            onClick={() => navigate(`/product/${p.id}`)}>{p.title}</h3>
                        <p className="text-xs text-gray-400 cursor-pointer"
                            onClick={() => navigate(`/category/${p.categoryName}`)}>{p.categoryName}</p>
                        <p className='text-orange-600 font-bold'>₹{p.price}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CategoryProducts