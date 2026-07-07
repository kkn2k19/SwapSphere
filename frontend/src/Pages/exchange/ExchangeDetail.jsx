import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import api from "../../services/api"

const ExchangeDetail = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [exchange, setExchange] = useState(null)

    const role = localStorage.getItem("role")
    // const token = localStorage.getItem("token")


    const accept = async () => {
        if (!window.confirm("Accept this exchange?")) return
        await api.put(`/api/exchanges/${id}/accept`)
        loadExchange()
    }

    const reject = async () => {
        if (!window.confirm("Reject this exchange?")) return
        await api.put(`/api/exchanges/${id}/reject`)
        loadExchange()
    }

    const cancel = async () => {
        if (!window.confirm("Cancel this exchange?")) return
        await api.delete(`/api/exchanges/${id}`)
        loadExchange()
    }

    const loadExchange = () => {
        const url = role === "ADMIN"
            ? `/api/admin/exchanges/${id}`
            : `/api/exchanges/${id}`

        api.get(url)
            .then(res => setExchange(res.data))
    }

    useEffect(() => {
        loadExchange()
    }, [id])

    if (!exchange) return <div className='p-8'>Loading...</div>

    return (
        // <div>ExchangeDetail</div>
        <div className='max-w-4xl mx-auto p-8'>
            <h1 className='text-2xl font-bold mb-6'>
                🔁 Exchange Detail
            </h1>

            <div className='bg-white shadow rounded p-6'>

                <div className='mb-4'>
                    <p>
                        <b>From:</b>{" "}
                        <span
                            onClick={() => navigate(`/user/${exchange.fromUserEmail}`)}
                            className='text-blue-600 cursor-pointer'
                        >
                            {exchange.fromUser}
                        </span>
                    </p>

                    <p>
                        <b>To:</b>{" "}
                        <span
                            onClick={() => navigate(`/user/${exchange.toUserEmail}`)}
                            className='text-blue-600 cursor-pointer'
                        >
                            {exchange.toUser}
                        </span>
                    </p>
                </div>



                <div className='mb-4'>
                    <b>Target Product:</b>{" "}
                    <span
                        onClick={() => navigate(`/product/${exchange.targetProductId}`)}
                        className='text-blue-600 cursor-pointer'
                    >
                        {exchange.targetProductTitle}
                    </span>
                </div>


                <div className='mb-4'>
                    <b>Offered Products:</b>
                    <ul className='list-disc ml-6 mt-2'>
                        {exchange.offeredProductTitles.map((title, index) => (
                            <li
                                key={index}
                                className='text-blue-600 cursor-pointer'
                                onClick={() => navigate(`/product/${exchange.offeredProductsIds[index]}`)}
                            >
                                {title}
                            </li>
                        ))}
                    </ul>
                </div>


                <div className='mb-4'>
                    <b>Status:</b>{" "}
                    <span className='font-semibold'>
                        {exchange.status}
                    </span>
                </div>

                <div className='text-sm text-gray-500'>
                    <p>Requested: {new Date(exchange.offeredDate).toLocaleString()}</p>


                    {exchange.processedAt && (
                        <p>Processed: {new Date(exchange.processedAt).toLocaleString()}</p>
                    )}
                </div>

                {role === "USER" && exchange.status === "PENDING" && (
                    <div className='mt-6 space-x-2'>

                        {exchange.isReceiver && (
                            <>
                                <button
                                    onClick={accept}
                                    className='bg-green-500 text-white px-4 py-2 rounded'
                                >
                                    Accept
                                </button>

                                <button
                                    onClick={reject}
                                    className='bg-red-500 text-white px-4 py-2 rounded'
                                >
                                    Reject
                                </button>
                            </>
                        )}


                        {exchange.isSender && (
                            <button
                                onClick={cancel}
                                className='bg-gray-500 text-white px-4 py-2 rounded'
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                )}

            </div>
        </div>
    )
}

export default ExchangeDetail