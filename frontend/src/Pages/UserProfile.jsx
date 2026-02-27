import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../services/api'

const UserProfile = () => {
    const { email } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        api.get(`/api/auth/public/${email}`)
            .then(res => setUser(res.data))

        api.get(`/api/products/user/${email}`)
            .then(res => {
                // const filtered = res.data.filter(
                //     p => p.ownerEmail?.toLowerCase() === email.toLowerCase()
                // )
                console.log(products);
                // setProducts(filtered)
                setProducts(res.data)
            })
    }, [email])

    if (!user) return <div className='p-8'>Loading...</div>

    return (
        // <div>UserProfile</div>
        <div className='p-8 max-w-5xl mx-auto'>
            <div className='bg-white shadow p-6 rounded mb-8'>
                <h1 className='text-2xl font-bold'>{user.name}</h1>
                <p>Email: {user.email}</p>
                <p>City: {user.city}</p>
                <p>State: {user.state}</p>
            </div>

            <h2 className='text-xl font-bold mb-4'>
                {user.name}'s Products
            </h2>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
                {products.map(p => (
                    <div key={p.id} className='bg-white shadow p-3 rounded'>
                        <img
                            src={p.thumbnailUrl}
                            className='h-40 w-full object-cover rounded cursor-pointer'
                            onClick={() => navigate(`/product/${p.id}`)}
                        />
                        <h3 className='mt-2 font-semibold'>{p.title}</h3>
                        <p className='text-orange-600 font-bold'>₹{p.price}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UserProfile