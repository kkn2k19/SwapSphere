// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import api from '../../services/api'

// const AddProduct = () => {

//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     categoryName: "",
//     condition: "",
//     price: ""
//   });

//   const [conditions, setConditions] = useState([]);
//   const [images, setImages] = useState([]);
//   const [previewUrls, setPreviewUrls] = useState([]);
//   const [error, setError] = useState("");

//   const [categories, setCategories] = useState([]);
//   const [addingNewCategory, setAddingNewCategory] = useState(false);

//   useEffect(() => {
//     api.get("/api/categories/get")
//       .then(res => setCategories(res.data))
//       .catch(() => { });
//   }, []);

//   useEffect(() => {
//     api.get("/api/products/productConditions")
//       .then(res => {
//         setConditions(res.data);
//         setForm(prev => ({
//           ...prev,
//           condition: res.data[0]
//         }));
//       })
//       .catch(() => { });
//   }, []);

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value
//     })
//   }

//   const handleCategorySelect = (e) => {
//     const value = e.target.value;
//     if (value === "__new__") {
//       setAddingNewCategory(true);
//       setForm({
//         ...form, categoryName: ""
//       })
//     } else {
//       setAddingNewCategory(false);
//       setForm({
//         ...form, categoryName: value
//       })
//     }
//   }

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);

//     setError("");
//     if (files.length + images.length > 5) {
//       setError("Maximum 5 images allowed");
//       return;
//     }

//     const validFiles = [];
//     for (let file of files) {
//       if (!file.type.startsWith("image/")) {
//         setError("Only image files allowed");
//         return;
//       }
//       if (file.size > 2 * 1024 * 1024) {
//         setError("Each image must be less than 2MB");
//         return;
//       }
//       validFiles.push(file);
//     }

//     const newPreviews = validFiles.map(
//       file => URL.createObjectURL(file)
//     )

//     setImages(prev => [...prev, ...validFiles]);
//     setPreviewUrls(prev => [...prev, ...newPreviews]);
//   };

//   const removeImage = (index) => {
//     const updatedImages = images.filter((_, i) => i !== index);
//     const updatedPreviews = previewUrls.filter((_, i) => i !== index);

//     setImages(updatedImages);
//     setPreviewUrls(updatedPreviews);
//   }

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   if (!form.categoryName.trim()) {
//   //     setError("Category is required");
//   //     return;
//   //   }

//   //   if (images.length === 0) {
//   //     setError("At least 1 image is required");
//   //     return;
//   //   }

//   //   try {
//   //     const res = await api.post("/api/products", form);
//   //     const productId = res.data.id;

//   //     const formData = new FormData();
//   //     images.forEach(file => formData.append("files", file))

//   //     await api.post(`/api/products/${productId}/images`, formData);

//   //     navigate("/my-products");
//   //   } catch (e) {
//   //     alert(e.response?.data || "Failed to add product");
//   //   }
//   // }

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.categoryName.trim()) {
//       setError("Category is required");
//       return;
//     }

//     if (images.length === 0) {
//       setError("At least 1 image is required");
//       return;
//     }

//     try {
//       const formData = new FormData();

//       formData.append("title", form.title);
//       formData.append("description", form.description);
//       formData.append("categoryName", form.categoryName);
//       formData.append("condition", form.condition);
//       formData.append("price", form.price);

//       images.forEach(file => {
//         formData.append("files", file);
//       });

//       await api.post("/api/products", formData);

//       navigate("/my-products");

//     } catch (e) {
//       alert(e.response?.data || "Failed to add product");
//     }
//   };

//   return (
//     // <div>AddProduct</div>
//     <div className='p-8 max-w-xl mx-auto'>
//       <h2 className='text-2xl font-bold mb-6'>Add Product</h2>

//       {error && (
//         <div className='bg-red-100 text-red-600 p-3 mb-4 rounded'>
//           {error}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className='space-y-4'>
//         <input
//           name='title'
//           placeholder='Title'
//           className='w-full border p-2 rounded'
//           onChange={handleChange}
//           required
//         />

//         <textarea
//           name="description"
//           placeholder="Description"
//           className='w-full border p-2 rounded'
//           onChange={handleChange}
//         />

//         <div>
//           <label className='block font-medium mb-1'>Category</label>

//           <select
//             className='w-full border p-2 rounded mb-2'
//             onChange={handleCategorySelect}
//             value={addingNewCategory ? "__new__" : form.categoryName}
//           >
//             <option value="">Select Category</option>
//             {categories.map(category => (
//               <option key={category.id} value={category.categoryName}>
//                 {category.categoryName}
//               </option>
//             ))}

//             <option value="__new__">+ Add New Category</option>
//           </select>

//           {addingNewCategory && (
//             <input
//               type="text"
//               placeholder='Enter new Category'
//               className='w-full border p-2 rounded'
//               value={form.categoryName}
//               onChange={(e) => {
//                 setForm({
//                   ...form, categoryName: e.target.value
//                 })
//               }}
//               required
//             />
//           )}
//         </div>


//         <div>
//           <label className='block font-medium mb-1'>Condition</label>
//           <select
//             name="condition"
//             value={form.condition}
//             onChange={handleChange}
//             className='w-full border p-2 rounded'
//           >
//             {conditions.map(condition => (
//               <option key={condition} value={condition}>
//                 {condition}
//               </option>
//             ))}
//           </select>
//         </div>

//         <input
//           name="price"
//           type='number'
//           placeholder='Price'
//           className='w-full border p-2 rounded'
//           onChange={handleChange}
//           required
//         />

//         <div>
//           <label className='block font-medium mb-2'>
//             Upload Images (Max 5)
//           </label>
//           <input type="file" multiple onChange={handleImageChange} />
//         </div>

//         {previewUrls.length > 0 && (
//           <div className='grid grid-cols-3 gap-3 mt-4'>
//             {previewUrls.map((url, index) => (
//               <div key={index} className='relative'>
//                 <img
//                   src={url}
//                   alt="preview"
//                   className='h-24 w-full object-cover rounded'
//                 />
//                 <button
//                   type='button'
//                   onClick={() => removeImage(index)}
//                   className='absolute top-1 right-1 bg-black text-white text-xs px-2 rounded'
//                 >
//                   X
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}

//         <button className='bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600'>
//           Add Product
//         </button>

//       </form>
//     </div>
//   )
// }

// export default AddProduct

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