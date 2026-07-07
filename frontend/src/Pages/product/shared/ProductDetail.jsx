import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";
import api from '../../../services/api';

const ProductDetail = () => {

  const role = localStorage.getItem("role");

  const { id } = useParams()
  const navigate = useNavigate();

  const [product, setProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)

  const [myProducts, setMyProducts] = useState([])
  const [selected, setSelected] = useState([])
  const [showExchange, setShowExchange] = useState(false)
  const [totalValue, setTotalValue] = useState(0)


  const token = localStorage.getItem("token")

  let loggedUserEmail = null

  if (token) {
    try {
      const decoded = jwtDecode(token)
      loggedUserEmail = decoded.sub   // email stored as subject
    } catch (e) {
      console.error("Invalid token" + e)
    }
  }

  // Calculations for OFFERS 
  const targetPrice = product?.price || 0
  const difference = totalValue - targetPrice

  const minOffer = targetPrice * 0.7
  const maxOffer = targetPrice * 1.5

  const offerRatio = targetPrice ? totalValue / targetPrice : 0

  let offerQuality = ""
  let qualityColor = ""

  if (offerRatio < 0.7) {
    offerQuality = "❌ Too Low"
    qualityColor = "text-red-500"
  }
  else if (offerRatio < 0.85) {
    offerQuality = "⚠️ Low Offer"
    qualityColor = "text-yellow-600"
  }
  else if (offerRatio <= 1.15) {
    offerQuality = "✅ Fair Trade"
    qualityColor = "text-green-600"
  }
  else if (offerRatio <= 1.35) {
    offerQuality = "⚠️ Overpay"
    qualityColor = "text-orange-500"
  }
  else {
    offerQuality = "❗ Heavy Overpay"
    qualityColor = "text-red-600"
  }


  // load user products ----- 
  const loadMyProducts = async () => {
    const res = await api.get("/api/products/my")
    setMyProducts(res.data)
  }


  // slect products
  const toggleProduct = (p) => {
    if (selected.find(x => x.id === p.id)) {
      const updated = selected.filter(x => x.id !== p.id)
      setSelected(updated)

      const sum = updated.reduce((a, b) => a + b.price, 0)
      setTotalValue(sum)
    } else {
      const updated = [...selected, p]
      setSelected(updated)

      const sum = updated.reduce((a, b) => a + b.price, 0)
      setTotalValue(sum)
    }
  }

  const sendExchange = async () => {
    const ids = selected.map(p => p.id)
    await api.post("/api/exchanges", {
      targetProductId: product.id,
      offeredProductIds: ids
    })
    alert("Exchange request sent")
    setShowExchange(false)
  }

  useEffect(() => {
    if (!product?.images?.length) return

    let index = 0
    const interval = setInterval(() => {
      index = (index + 1) % product.images.length
      setSelectedImage(product.images[index])
    }, 2500)

    return () => clearInterval(interval)
  }, [product]);

  useEffect(() => {
    api.get(`/api/products/${id}`)
      .then(res => {
        setProduct(res.data)
        if (res.data.images?.length > 0) {
          // setSelectedImage(res.data.images[0])
          const thumbnail = res.data.images.find(i => i.thumbnail)
          setSelectedImage(thumbnail || res.data.images[0])
        }
      })
  }, [id])

  if (!product) return <div className='p-8 text-lg'>Loading...</div>

  const isOwner = loggedUserEmail?.toLowerCase() === product.ownerEmail?.toLowerCase()


  const setThumbnail = (id) => {
    api.put(`/api/products/images/${id}/thumbnail`)
  }

  console.log("Logged user:", loggedUserEmail)
  console.log("Product owner:", product.ownerEmail)
  console.log("isOwner:", isOwner)

  console.log("My Products:", myProducts)


  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>

        <div>
          {selectedImage && (
            <img
              src={selectedImage?.imageUrl}
              alt="Main"
              className='w-full h-96 object-contain rounded-lg shadow'
            />
          )}


          <div className='flex gap-3 mt-4 overflow-x-auto justify-center items-center'>
            {product.images?.map((img) => (
              <div key={img.id} className='relative'>
                <img
                  key={img.id}
                  src={img.imageUrl}
                  alt="thumb"
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 object-cover rounded cursor-pointer border-2 
            ${selectedImage?.id === img.id ? "border-orange-500" : "border-gray-200"}`}
                />

                {isOwner && (
                  <button
                    onClick={() => setThumbnail(img.id)}
                    className="absolute bottom-0 left-0 bg-blue-600 text-white text-xs px-1"
                  >
                    Set Main
                  </button>
                )}
              </div>
            ))}

          </div>
        </div>
        {/* {product.status !== "ACTIVE" && (
          <span className="bg-red-500 text-white px-3 py-1 rounded text-sm mr-2">
            Inactive
          </span>
        )} */}
        <div>
          <h1 className='text-3xl font-bold mb-2'>
            {product.title}
          </h1>
          <p className='mt-2'>
            Category: {" "}
            <span onClick={() => navigate(`/category/${product.categoryName}`)}
              className='text-blue-600 cursor-pointer hover:underline'>
              {product.categoryName}
            </span>
          </p>
          <p className='text-gray-500 mb-2'>
            Condition: {product.condition}
          </p>
          <p className='text-gray-500 mb-2'>
            Status: {product.status}
          </p>
          <p className='text-2xl font-bold text-orange-600 my-4'>
            ₹{product.price}
          </p>
          <p className='mt-2'>
            Owner: {" "}
            <span onClick={() => navigate(`/user/${product.ownerEmail}`)}
              className='text-blue-600 cursor-pointer hover:underline'>
              {product.ownerName}
            </span>
          </p>

          <p className='text-gray-400 text-sm mb-4'>
            Posted on: {new Date(product.createdAt).toLocaleDateString()}
          </p>

          <hr className='my-4' />

          <h2 className='text-lg font-semibold mb-2'>Description</h2>
          <p className='text-gray-700 whitespace-pre-line'>
            {product.description}
          </p>

          {!isOwner && role === "USER" && product.status === "ACTIVE" && token && (
            <button
              className='mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded shadow'
              onClick={() => {
                loadMyProducts()
                setShowExchange(true)
              }}
            >
              Send Exchange Request
            </button>

          )}

          {!isOwner && role === "USER" && (
            <button
              className='mt-3 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded shadow'
              onClick={async () => {
                const res = await api.post("/api/chats/start", {
                  userEmail: product.ownerEmail
                })

                navigate(`/chat/${res.data.id}`)
              }}
            >
              💬 Contact Seller
            </button>
          )}

          {showExchange && (
            <div className='fixed inset-0 bg-black/40 flex items-center justify-center'>
              <div className='bg-white p-6 rounded w-[500px]'>
                <h2 className='text-xl font-bold mb-4'>
                  Select Products To Offer
                </h2>

                <p className='text-sm mb-2'>
                  Target Value: ₹{product.price}
                </p>

                <p className='text-sm mb-4'>
                  Your Offer: ₹{totalValue}
                </p>

                <p className={`text-sm mb-4 font-semibold ${difference < 0 ? "text-red-500" : difference > 0 ? "text-green-600" : "text-gray-600"
                  }`}>
                  Difference: ₹{difference}
                </p>

                {/* offer quality */}
                {totalValue > 0 && (
                  <p className={`font-semibold ${qualityColor}`}>
                    Offer Quality: {offerQuality}
                  </p>
                )}

                {/* too low */}
                {totalValue > 0 && totalValue < minOffer && (
                  <p className='text-red-500 text-sm mb-2'>
                    Offer value too low. Minimum required: ₹{Math.round(minOffer)}
                  </p>
                )}

                {/* too high */}
                {totalValue > maxOffer && (
                  <p className='text-red-500 text-sm'>
                    Offer too high. Maximum allowed ₹{Math.round(maxOffer)}
                  </p>
                )}

                <div className='max-h-60 overflow-y-auto'>
                  {myProducts
                    .filter(p => p.id !== product.id)
                    .map(p => (
                      <div
                        key={p.id}
                        className={`flex gap-3 border p-2 mb-2 ${p.status !== "ACTIVE" ? "opacity-40" : ""
                          }`}
                      >
                        <input
                          type="checkbox"
                          disabled={p.status !== "ACTIVE"}
                          checked={selected.some(x => x.id === p.id)}
                          onChange={() => toggleProduct(p)}
                        />
                        <span>{p.title}</span>

                        {p.status !== "ACTIVE" && (
                          <span className="text-xs text-red-700">
                            (Unavailable)
                          </span>
                        )}


                        <span className='ml-auto text-orange-600'>
                          ₹{p.price}
                        </span>
                      </div>
                    ))}

                </div>
                <button
                  onClick={sendExchange}
                  disabled={
                    selected.length === 0 ||
                    totalValue < minOffer ||
                    totalValue > maxOffer
                  }
                  className={`mt-4 px-4 py-2 rounded text-white ${selected.length === 0 ||
                    totalValue < minOffer ||
                    totalValue > maxOffer
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-orange-500 hover:bg-orange-600"
                    }`}
                >
                  Send Offer
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default ProductDetail