import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../../services/api'
import { jwtDecode } from "jwt-decode";

const ProductDetail = () => {

  const { id } = useParams()
  const navigate = useNavigate();

  const [product, setProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)

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

  console.log("Logged user:", loggedUserEmail)
  console.log("Product owner:", product.ownerEmail)
  console.log("isOwner:", isOwner)

  const setThumbnail = (id) => {
    api.put(`/api/products/images/${id}/thumbnail`)
  }

  return (
    <div className="max-x-6xl mx-auto-p p-8">
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>

        <div>
          {selectedImage && (
            <img
              src={selectedImage?.imageUrl}
              alt="Main"
              className='w-full h-96 object-contain rounded-lg shadow'
            />
          )}


          <div className='flex gap-3 mt-4 overflow-x-auto flex justify-center items-center'>
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

          {!isOwner && product.status === "ACTIVE" && token && (
            <button className='mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded shadow'>
              Send Exchange Request
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail