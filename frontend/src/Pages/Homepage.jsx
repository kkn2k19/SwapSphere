import React, { useEffect, useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

const Homepage = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    useEffect(() = {
        api.get("/api/products")
            .then(res => setProducts(res.data))
            .catch(e => e.response?.data || "failed loading products...");
    }, []);

    return (
        <div className='bg-gray-100 min-h-screen'>
            <div className='p-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 max-h-[80vh] overflow-y-auto'>
            products.map(product => (
                <div
                    key={products.id}
                className=''></div>
                ))
            </div>
        </div>

    )
}

export default Homepage