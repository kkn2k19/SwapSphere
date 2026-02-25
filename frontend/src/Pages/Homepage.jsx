import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api';

const Homepage = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/api/products")
            .then(res => setProducts(res.data))
            .catch(() => setProducts([]));
    }, []);

    return (
        <div className='bg-gray-100 min-h-screen p-6'>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
                {products.map(product => (
                    <div
                        key={product.id}
                        className='bg-white shadow rounded-lg p-3 cursor-pointer hover:shadow-lg transition'
                        onClick={() => navigate(`/product/${product.id}`)}
                    >
                        <img
                            src={product.thumbnailUrl || "/no-image.jpg"}
                            alt={product.title}
                            className="w-full h-40 object-cover rounded-t"
                        />
                        <div className='p-3'>
                            <h2 className='font-semibold truncate'>{product.title}</h2>
                            <p className='text-sm text-gray-500' >{product.categoryName}</p>
                            <p className='font-bold text-orange-600'>₹{product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default Homepage