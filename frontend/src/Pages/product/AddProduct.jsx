import React, { useState } from 'react'
import api from '../../services/api'
import { useNavigate } from 'react-router-dom'

const AddProduct = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    categoryName: "",
    condition: "NEW",
    price: ""
  })

  const [files, setFiles] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()

    Object.keys(form).forEach(key => {
      formData.append(key, form[key])
    })

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i])
    }
    await api.post("/api/products/add", formData)

    navigate("/")
  }

  return (
    // <div>AddProduct</div>
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          placeholder="Title"
          className="w-full border p-2"
          onChange={e => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          placeholder="Description"
          className="w-full border p-2"
          onChange={e => setForm({ ...form, description: e.target.value })}
        />

        <input
          placeholder="Category"
          className="w-full border p-2"
          onChange={e => setForm({ ...form, categoryName: e.target.value })}
        />

        <select
          className="w-full border p-2"
          onChange={e => setForm({ ...form, condition: e.target.value })}
        >
          <option value="NEW">NEW</option>
          <option value="USED">USED</option>
        </select>

        <input
          type="number"
          placeholder="Price"
          className="w-full border p-2"
          onChange={e => setForm({ ...form, price: e.target.value })}
        />

        <input
          type="file"
          multiple
          onChange={e => setFiles(e.target.files)}
        />

        <button className="bg-orange-600 text-white px-4 py-2 rounded">
          Add Product
        </button>
      </form>
    </div>

  )
}

export default AddProduct