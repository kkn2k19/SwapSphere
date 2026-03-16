import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import { useNavigate } from 'react-router-dom'


const AdminCategories = () => {
    const navigate = useNavigate()

    const [categories, setCategories] = useState([])

    const [name, setName] = useState("")
    const [details, setDetails] = useState("")

    const [editId, setEditId] = useState(null)

    const loadCategories = () => {
        api.get('/api/categories/get')
            .then(res => setCategories(res.data))
            .catch(() => setCategories([]))
    }

    useEffect(() => {
        loadCategories()
    }, [])

    const categoryExists = () => {
        return categories.some(
            category => category.categoryName.toLowerCase() === name.trim().toLowerCase()
        )
    }

    const createCategory = async () => {
        if (!name.trim()) {
            alert("Category name required")
            return
        }
        if (categoryExists()) {
            alert("category already exists");
            return;
        }
        await api.post("/api/categories/create", {
            categoryName: name,
            details: details
        })
        setName("")
        setDetails("")
        loadCategories()
    }

    const deleteCategory = async (id) => {
        if (!window.confirm("Delete category?")) return;

        try {
            await api.delete(`/api/categories/${id}`)
            loadCategories()
        } catch (e) {
            alert(e.response?.data || "Cannot delete category")
        }
    }

    const updateCategory = async (id) => {
        if (!name.trim()) {
            alert("Category name required")
            return
        }
        await api.put(`/api/categories/${id}`, {
            categoryName: name,
            details: details
        })
        setEditId(null)
        setName("")
        setDetails("")
        loadCategories()
    }

    const startEdit = (category) => {
        setEditId(category.id)
        setName(category.categoryName)
        setDetails(category.details || "")
    }

    const cancelEdit = () => {
        setEditId(null)
        setName("")
        setDetails("")
    }

    return (
        // <div>AdminCategories</div>
        <div className='p-8'>
            <h1 className='text-2xl font-bold mb-6'>
                Manage Categories
            </h1>
            <div className='flex gap-3 mb-6'>
                <input
                    placeholder='Category Name'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className='border p-2'
                />
                <input
                    placeholder='Details'
                    value={details}
                    onChange={e => setDetails(e.target.value)}
                    className='border p-2'
                />
                {editId ? (
                    <>
                        <button
                            onClick={() => updateCategory(editId)}
                            className='bg-blue-600 text-white px-4 py-2 rounded'
                        >
                            Update
                        </button>

                        <button
                            onClick={cancelEdit}
                            className='bg-gray-400 text-white px-4 py-2 rounded'
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <button
                        onClick={createCategory}
                        className='bg-orange-600 text-white px-4 py-2 rounded'
                    >
                        Add
                    </button>
                )}
            </div>

            <table className='w-full border'>
                <thead className='bg-gray-100'>
                    <tr>
                        <th className='p-2'>Category</th>
                        <th>Details</th>
                        <th>Products</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {categories.map(category => (
                        <tr key={category.id} className='border-t text-center hover:bg-gray-50'>
                            <td
                                className='text-blue-600 cursor-pointer hover:underline'
                                onClick={() => navigate(`/category/${category.categoryName}`)}
                            >
                                {category.categoryName}
                            </td>
                            <td className='text-gray-600'>
                                {category.details || "-"}
                            </td>
                            <td>
                                {category.productCount || 0}
                            </td>
                            <td className='space-x-2'>
                                <button
                                    onClick={() => startEdit(category)}
                                    className='bg-yellow-500 text-white px-2 py-1'
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => deleteCategory(category.id)}
                                    className='bg-red-500 text-white px-2 py-1'
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AdminCategories