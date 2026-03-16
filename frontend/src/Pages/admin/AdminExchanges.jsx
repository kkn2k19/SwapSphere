import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import { useNavigate } from 'react-router-dom'

const AdminExchanges = () => {

    const navigate = useNavigate()

    const [exchanges, setExchanges] = useState([])

    useEffect(() => {
        api.get("/api/admin/exchanges")
            .then(res => setExchanges(res.data))
    }, [])

    return (
        // <div>AdminExchanges</div>
        <div className="p-8">

            <h1 className="text-2xl font-bold mb-6">
                All Exchanges
            </h1>

            <table className='w-full border rounded-lg overflow-hidden'>
                <thead className='bg-gray-100'>
                    <tr>
                        <th className='p-3'>From</th>
                        <th className='p-3'>To</th>
                        <th className='p-3'>Target Products</th>
                        <th className='p-3'>Offered Products</th>
                        <th className='p-3'>Status</th>
                        <th className='p-3'>Dates</th>
                    </tr>
                </thead>

                <tbody>
                    {exchanges.map(exchange => (
                        <tr key={exchange.id} className='border-t hover:bg-gray-50'>
                            <td
                                onClick={() => navigate(`/user/${exchange.fromUserEmail}`)}
                                className="p-3 text-blue-600 cursor-pointer"
                            >
                                {exchange.fromUser}
                            </td>
                            <td
                                onClick={() => navigate(`/user/${exchange.toUserEmail}`)}
                                className='p-3 text-blue-600 cursor-pointer'
                            >
                                {exchange.toUser}
                            </td>
                            <td
                                onClick={() => navigate(`/product/${exchange.targetProductId}`)}
                                className="p-3 cursor-pointer hover:underline"
                            >
                                {exchange.targetProductTitle}
                            </td>
                            <td className='p-3'>
                                {exchange.offeredProductTitles.map((title, index) => (
                                    <span
                                        key={index}
                                        onClick={() => navigate(`/product/${exchange.offeredProductsIds[index]}`)}
                                        className='text-blue-600 cursor-pointer hover:underline mr-1'
                                    >
                                        {title}
                                        {index < exchange.offeredProductTitles.length - 1 && ", "}
                                    </span>
                                ))}
                            </td>
                            <td className='p-3'>
                                <span
                                    className={`inline-flex items-center px-3 py-1 rounded text-xs font-semibold rounded-md ${exchange.status === "PENDING"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : exchange.status === "ACCEPTED"
                                            ? "bg-green-100 text-green-700"
                                            : exchange.status === "REJECTED"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-gray-200 text-gray-700"
                                        }`}
                                >
                                    {exchange.status}
                                </span>
                            </td>

                            <td className='p-3 text-sm text-left'>
                                <p>
                                    Requested:
                                    {new Date(exchange.offeredDate).toLocaleString()}
                                </p>

                                {exchange.processedAt && (
                                    <p>
                                        Processed:
                                        {new Date(exchange.processedAt).toLocaleString()}
                                    </p>
                                )}

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default AdminExchanges