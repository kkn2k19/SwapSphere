import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'

const Navbar = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);
    const [openProfile, setOpenProfile] = useState(false);
    const [openChat, setOpenChat] = useState(false);

    const [chats, setChats] = useState([]);
    const [chatRequests, setChatRequests] = useState([]);

    const profileRef = useRef();
    const chatRef = useRef();

    // load profile
    useEffect(() => {
        if (!token) return;
        api.get("/api/user/me")
            .then(res => setProfile(res.data))
            .catch(() => setProfile(null));
    }, [token]);

    // load chats
    useEffect(() => {
        if (!token || role !== "USER") return;
        api.get("/api/chats/my")
            .then(res => setChats(res.data))
            .catch(() => setChats([]));

        api.get("/api/chats/requests")
            .then(res => setChatRequests(res.data))
            .catch(() => setChatRequests([]));
    }, [token, role]);

    const logout = () => {
        localStorage.clear();
        navigate("/");
    }

    // close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setOpenProfile(false);
            }
            if (chatRef.current && !chatRef.current.contains(e.target)) {
                setOpenChat(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        // <div>Navbar</div>
        <div className='flex justify-between items-center px-8 py-4 shadow-md bg-white sticky top-0 z-50'>
            <h1
                className='text-2xl font-bold text-orange-600 cursor-pointer'
                onClick={() => navigate("/")}
            >
                SwapSphere
            </h1>

            {!token ? (
                <div className='flex items-center gap-6'>
                    <div className='w-80'>
                        <input
                            type="text"
                            placeholder='🔍Search products...'
                            className='w-full border px-4 py-2 rounded-lg focus:outline-orange-500'
                        />
                    </div>
                    <div className="flex gap-4 items-center">

                        <button
                            onClick={() => navigate("/filters")}
                            className="text-sm bg-gray-200 px-3 py-1 rounded"
                        >
                            ⚙️ Filters
                        </button>

                        <button
                            onClick={() => navigate("/wishlist")}
                            className="text-sm bg-gray-200 px-3 py-1 rounded"
                        >
                            ❤️ Wishlist
                        </button>

                        <button
                            onClick={() => navigate("/sort")}
                            className="text-sm bg-gray-200 px-3 py-1 rounded"
                        >
                            ↕️ Sort
                        </button>

                    </div>
                    <div className='space-x-4 font-medium'>
                        <Link to="/login" className='hover:text-orange-600'>Login</Link>
                        <span>||</span>
                        <Link to="/register" className='hover:text-orange-600'>Register</Link>
                    </div>
                </div>
            ) : (
                <div className='flex items-center gap-6'>

                    <div className='w-80'>
                        <input
                            type="text"
                            placeholder='🔍Search products...'
                            className='w-full border px-4 py-2 rounded-lg focus:outline-orange-500'
                        />
                    </div>
                    <div className="flex gap-4 items-center">

                        <button
                            onClick={() => navigate("/filters")}
                            className="text-sm bg-gray-200 px-3 py-1 rounded"
                        >
                            ⚙️ Filters
                        </button>

                        <button
                            onClick={() => navigate("/wishlist")}
                            className="text-sm bg-gray-200 px-3 py-1 rounded"
                        >
                            ❤️ Wishlist
                        </button>

                        <button
                            onClick={() => navigate("/sort")}
                            className="text-sm bg-gray-200 px-3 py-1 rounded"
                        >
                            ↕️ Sort
                        </button>

                    </div>
                    {role === "USER" && (
                        <div className='relative' ref={chatRef}>
                            <div
                                onClick={() => setOpenChat(!openChat)}
                                className='cursor-pointer text-xl relative'
                            >
                                💬
                                {(chats.length + chatRequests.length) > 0 && (
                                    <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full' >
                                        {chats.length + chatRequests.length}
                                    </span>
                                )}
                            </div>
                            {openChat && (
                                <div className='absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg py-2 max-h-80 overflow-y-auto'>
                                    <div className='px-4 py-1 text-sm font-semibold text-gray-600'>
                                        Chats
                                    </div>

                                    {chats.length === 0 && (
                                        <div className='px-4 py-2 text-sm text-gray-400'>
                                            No active chats
                                        </div>
                                    )}

                                    {chats.map(chat => (
                                        <div
                                            key={chat.id}
                                            className='px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm'
                                            onClick={() => navigate(`/chats/${chat.id}`)}
                                        >
                                            {chat.otherUserName}
                                        </div>
                                    ))}
                                    <hr className='my-2' />

                                    <div className='px-4 py-1 text-sm font-semibold text-gray-600'>
                                        Chat Requests
                                    </div>

                                    {chatRequests.length === 0 && (
                                        <div className='px-4 py-2 text-sm text-gray-400'>
                                            No requests
                                        </div>
                                    )}

                                    {chatRequests.map(req => (
                                        <div key={req.id} className='px-4 py-2 text-sm'>
                                            {req.senderName}

                                            <div className='mt-1 space-x-2'>
                                                <button className='text-green-600 text-xs'>Accept</button>
                                                <button className='text-red-600 text-xs'>Reject</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}


                    <div className='relative' ref={profileRef}>
                        <div
                            className='w-10 h-10 bg-orange-500 text-white flex items-center justify-center rounded-full cursor-pointer'
                            onClick={() => setOpenProfile(!openProfile)}
                        >
                            {profile?.name?.charAt(0).toUpperCase() || "U"}
                        </div>

                        {openProfile && (
                            <div className='absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg py-2 text-sm'>
                                <div
                                    onClick={() => navigate("/profile")}
                                    className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                                >
                                    👤 Profile
                                </div>

                                {role === "USER" && (
                                    <>

                                        <div
                                            onClick={() => navigate("/manage-products")}
                                            className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                                        >
                                            📦 Manage Products
                                        </div>

                                        <div
                                            onClick={() => navigate("/add-product")}
                                            className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
                                            ➕ Add Product
                                        </div>

                                        <div
                                            onClick={() => navigate("/exchangeRequests")}
                                            className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                                        >
                                            🔁 My Exchange Requests
                                        </div>
                                        {/* <div
                                            onClick={() => navigate("/add-product")}
                                            className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                                        >
                                            Add product
                                        </div> */}
                                    </>
                                )}


                                {role === "ADMIN" && (
                                    <>
                                        <div
                                            onClick={() => navigate("/admin/dashboard")}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        >
                                            📊 Dashboard
                                        </div>
                                        <div
                                            onClick={() => navigate("/admin/users")}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        >
                                            👥 Users
                                        </div>
                                        <div
                                            onClick={() => navigate("/admin/products")}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        >
                                            📦 Products
                                        </div>
                                        <div
                                            onClick={() => navigate("/admin/exchanges")}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        >
                                            🔁 Exchanges
                                        </div>
                                        <div
                                            onClick={() => navigate("/admin/categories")}
                                            className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                                        >
                                            Categories
                                        </div>
                                    </>
                                )}
                                <div
                                    onClick={logout}
                                    className='px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500'
                                >
                                    🚪 Logout
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div >
    )
}

export default Navbar