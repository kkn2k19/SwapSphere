import React, { useEffect, useState } from 'react'
import api from "../../../services/api"
import { useParams, useNavigate } from "react-router-dom"

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [newImages, setNewImages] = useState([])


  const [form, setForm] = useState({
    title: "",
    description: "",
    categoryName: "",
    condition: "NEW",
    price: ""
  })

  const loadProduct = () => {
    api.get(`/api/products/${id}`)
      .then(res => {
        const p = res.data;
        setProduct(p)
        setForm({
          title: p.title,
          description: p.description,
          categoryName: p.categoryName,
          condition: p.condition,
          price: p.price
        })
      })
  }

  useEffect(() => {
    loadProduct();

    api.get("/api/categories/get")
      .then(res => setCategories(res.data))
  }, [id])

  const updateProduct = async (e) => {
    e.preventDefault();


    try {
      await api.put(`/api/products/${id}`, form);
      alert("Product updated successfully");
      loadProduct();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update product");
    }
    loadProduct()
  }

  const uploadImages = async () => {
    if (!newImages || newImages.length === 0) {
      alert("Select images first");
      return;
    }
    if (product.images.length + newImages.length > 5) {
      alert("max 5 images allowed");
      return;
    }
    const formData = new FormData();
    Array.from(newImages).forEach(file => {
      formData.append("files", file)
    })

    try {
      await api.post(`/api/products/${id}/images`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });


      alert("Images uploaded");
      setNewImages([])
      loadProduct()
    } catch (e) {
      alert(e.response?.data?.message || "Image upload failed")
    }
  }

  const deleteImage = async (imageId) => {
    if (!window.confirm("Delete image?")) return;

    try {
      await api.delete(`/api/products/images/${imageId}`)
      alert("Image deleted");
      loadProduct()
    } catch (e) {
      alert(e.response?.data?.message || "Delete failed");
    }
  }

  const setThumbnail = async (imageId) => {
    try {
      await api.put(`/api/products/images/${imageId}/thumbnail`)
      alert("Main image updated")
      loadProduct()
    } catch (e) {
      alert(e.response?.data?.message || "Failed")
    }
  }

  if (!product) return <div className='p-6'>Loading...</div>

  return (
    // <div>EditProduct</div>
    <div className='p-6 max-w-4xl mx-auto'>
      <h1 className='text-2xl font-bold mb-6'>Edit Product</h1>
      <form onSubmit={updateProduct} className="space-y-3 bg-white shadow p-6 rounded">
        <input
          value={form.title}
          onChange={e => setForm({
            ...form,
            title: e.target.value
          })}
          className='w-full border p-2'
        />
        <textarea
          value={form.description}
          onChange={e => setForm({
            ...form,
            description: e.target.value
          })}
          className="w-full border p-2"
        />

        <select
          value={form.categoryName}
          onChange={e => setForm({
            ...form, categoryName: e.target.value
          })}
          className="w-full border p-2"
        >
          {categories.map(c => (
            <option key={c.id} value={c.categoryName}>
              {c.categoryName}
            </option>
          ))}
        </select>

        <select
          value={form.condition}
          onChange={e => setForm({
            ...form,
            condition: e.target.value
          })}
          className='w-full border p-2'
        >
          <option value="NEW">NEW</option>
          <option value="USED">USED</option>
        </select>
        <input
          type="number"
          value={form.price}
          onChange={e => setForm({
            ...form,
            price: e.target.value
          })}
          className='w-full border p-2'
        />
        <button className='bg-orange-600 text-white px-4 py-2 rounded'>
          Update Product
        </button>
      </form>

      <div className='mt-8'>
        <h2 className='text-lg font-bold mb-4'>Product Images</h2>
        <div className='grid grid-cols-4 gap-4'>
          {product.images?.map(img => (
            <div key={img.id} className='relative group'>
              <img
                src={img.imageUrl}
                className='w-full h-32 object-cover rounded'
              />

              {img.thumbnail && (
                <span className='absolute top-1 left-1 bg-orange-500 text-white text-xs px-1 rounded'>
                  Main
                </span>
              )}

              <div className='absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition'>
                <button
                  onClick={() => setThumbnail(img.id)}
                  className='bg-blue-500 text-white text-xs px-2 py-1 rounded'
                >
                  Set Main
                </button>

                <button
                  onClick={() => deleteImage(img.id)}
                  className='bg-red-500 text-white text-xs px-2 py-1 rounded'
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='mt-6'>
        <h2 className='font-bold mb-2' >Upload Images</h2>
        <input
          type="file"
          multiple
          onChange={e => setNewImages(e.target.files)}
        />

        <button
          onClick={uploadImages}
          className='bg-green-600 text-white px-4 py-2 rounded ml-3'
        >
          Upload
        </button>
      </div>

      <button
        onClick={() => navigate("/manage-products")}
        className='mt-6 text-blue-600'
      >
        ← Back
      </button>

    </div>
  )
}

export default EditProduct