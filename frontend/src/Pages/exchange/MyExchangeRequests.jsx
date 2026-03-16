import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import { useNavigate } from 'react-router-dom'

const MyExchangeRequests = () => {
  const [sent, setSent] = useState([])
  const [received, setReceived] = useState([])

  const navigate = useNavigate()

  const loadData = () => {
    api.get("/api/exchanges/sent")
      .then(res => setSent(res.data))

    api.get("/api/exchanges/received")
      .then(res => setReceived(res.data))
  }

  useEffect(() => {
    loadData()
  }, [])

  const accept = async (id) => {
    if (!window.confirm("Accept this exchange?")) return;
    await api.put(`/api/exchanges/${id}/accept`);
    loadData();
  }

  const reject = async (id) => {
    if (!window.confirm("Reject this exchange?")) return;
    await api.put(`/api/exchanges/${id}/reject`);
    loadData();
  }

  const cancel = async (id) => {
    if (!window.confirm("Cancel request?")) return;
    await api.delete(`/api/exchanges/${id}`);
    loadData()
  }

  const statusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "ACCEPTED":
        return "bg-green-100 text-green-700";
      case "REJECTED":
        return "bg-red-100 text-red-700";
      case "CANCELLED":
        return "bg-gray-200 text-gray-700";
      default:
        return "bg-gray-200";
    }
  };

  return (
    // <div>MyExchangeRequests</div>
    <div className='p-8 max-w-5xl mx-auto'>
      <h1 className='text-3xl font-bold mb-8'>
        🔁 Exchange Requests
      </h1>
      <h2 className='text-xl font-semibold mb-4'>
        Received Requests
      </h2>

      {received.length === 0 && (
        <p className="text-gray-400 mb-4">No received exchange requests</p>
      )}

      {received.map(request => (
        <div key={request.id}
          className='bg-white shadow-md hover:shadow-lg transition rounded-lg p-5 mb-4 border'>
          <div className='flex justify-between'>
            <div>
              <p
                className='font-semibold text-lg text-blue-600 cursor-pointer'
                onClick={() => navigate(`/user/${request.fromUserEmail}`)}>
                {request.fromUser}
              </p>
              <p className='text-gray-600 text-sm'>
                {/* Offered: {request.offeredProductTitles.join(", ")} */}
                They Offered ({request.offeredProductTitles.length}):
                {request.offeredProductTitles.map((title, index) => (
                  <span
                    key={index}
                    onClick={() => navigate(`/product/${request.offeredProductsIds[index]}`)}
                    className='text-blue-600 cursor-pointer hover:underline ml-1'
                  >
                    {title}
                    {index < request.offeredProductTitles.length - 1 && ", "}
                  </span>
                ))}
              </p>

              <p className='text-gray-600 text-sm'>
                For your:
                <span
                  onClick={() => navigate(`/product/${request.targetProductId}`)}
                  className='text-blue-600 cursor-pointer hover:underline ml-1'
                >
                  {request.targetProductTitle}
                </span>
              </p>

              <p className='text-xs text-gray-400 mt-1'>
                Requested: {new Date(request.offeredDate).toLocaleString()}
              </p>

              {request.processedAt && (
                <p className='text-xs text-gray-400'>
                  Processed: {new Date(request.processedAt).toLocaleString()}
                </p>
              )}
            </div>

            <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-md ${statusColor(request.status)}`}>
              {request.status}
            </span>
          </div>


          {request.status === "PENDING" && (
            <div className='mt-4 space-x-2'>
              <button
                onClick={() => accept(request.id)}
                className='bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded'
              >
                Accept
              </button>


              <button
                onClick={() => reject(request.id)}
                className='bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded'
              >
                Reject
              </button>
            </div>
          )}



        </div>
      ))}

      <h2 className='text-xl font-semibold mt-10 mb-4'>
        Sent Requests
      </h2>

      {sent.length === 0 && (
        <p className="text-gray-400">No sent exchange requests</p>
      )}

      {sent.map(s => (
        <div key={s.id}
          className='bg-white shadow-md rounded-lg p-5 mb-4 border hover:shadow-lg transition'>
          <div className='flex justify-between'>
            <div>
              <p
                onClick={() => navigate(`/user/${s.toUserEmail}`)}
                className='font-semibold text-lg text-blue-600 cursor-pointer'>
                {s.toUser}
              </p>
              <p className='text-gray-600 text-sm'>
                {/* Offered: {s.offeredProductTitles.join(", ")} */}
                You Offered ({s.offeredProductTitles.length}):
                {s.offeredProductTitles.map((title, index) => (
                  <span
                    key={index}
                    onClick={() => navigate(`/product/${s.offeredProductsIds[index]}`)}
                    className='text-blue-600 cursor-pointer hover:underline ml-1'
                  >
                    {title}
                    {index < s.offeredProductTitles.length - 1 && ", "}
                  </span>
                ))}
              </p>

              <p className='text-gray-600 text-sm'>
                For their:
                <span
                  onClick={() => navigate(`/product/${s.targetProductId}`)}
                  className='text-blue-600 cursor-pointer hover:underline ml-1'
                >
                  {s.targetProductTitle}
                </span>
              </p>

              <p className='text-xs text-gray-400 mt-1'>
                Requested: {new Date(s.offeredDate).toLocaleString()}
              </p>
              {s.processedAt && (
                <p className='text-xs text-gray-400'>
                  Processed: {new Date(s.processedAt).toLocaleString()}
                </p>
              )}
            </div>
            <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-md ${statusColor(s.status)}`}>
              {s.status}
            </span>
          </div>
          {s.status === "PENDING" && (
            <button
              onClick={() => cancel(s.id)}
              className='mt-3 bg-gray-500 text-white px-4 py-1 rounded'>
              Cancel Request
            </button>
          )}
        </div>
      ))}

    </div>
  )
}

export default MyExchangeRequests