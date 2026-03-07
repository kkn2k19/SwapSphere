import React, { useEffect, useState } from 'react'
import api from '../../../services/api'
// import { useNavigate } from 'react-router-dom'

const AddProduct = ({ refresh }) => {
  // const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    categoryName: "",
    condition: "NEW",
    price: ""
  })

  const [files, setFiles] = useState([])

  useEffect(() => {
    api.get("/api/categories/get")
      .then(res => setCategories(res.data))
      .catch(() => setCategories([]))
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.categoryName) {
      alert("Please select category")
      return
    }

    const formData = new FormData()

    Object.keys(form).forEach(key => {
      formData.append(key, form[key])
    })

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i])
    }
    await api.post("/api/products/add", formData)

    setForm({
      title: "",
      description: "",
      categoryName: "",
      condition: "NEW",
      price: ""
    })

    setFiles([])

    refresh()

    // navigate("/")
  }

  return (
    // <div>AddProduct</div>
    <div className="bg-white shadow p-5 rounded mb-6">
      <h1 className="text-lg font-bold mb-4">Add Product</h1>

      <form onSubmit={handleSubmit} className="space-y-3">

        <input
          value={form.title}
          placeholder="Title"
          className="w-full border p-2"
          onChange={e => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          value={form.description}
          placeholder="Description"
          className="w-full border p-2"
          onChange={e => setForm({ ...form, description: e.target.value })}
        />

        {/* <input
          placeholder="Category"
          className="w-full border p-2"
          onChange={e => setForm({ ...form, categoryName: e.target.value })}
        /> */}

        <select
          value={form.categoryName}
          className='w-full border p-2'
          onChange={e => setForm({ ...form, categoryName: e.target.value })}
        >
          <option value="">Select Category</option>
          {categories.map(category => (
            <option
              key={category.id}
              value={category.categoryName}>
              {category.categoryName}
            </option>
          ))}
        </select>

        <select
          value={form.condition}
          className="w-full border p-2"
          onChange={e => setForm({ ...form, condition: e.target.value })}
        >
          <option value="NEW">NEW</option>
          <option value="USED">USED</option>
        </select>

        <input
          type="number"
          value={form.price}
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