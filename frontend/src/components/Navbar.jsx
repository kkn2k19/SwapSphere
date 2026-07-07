import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'

const Navbar = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);
    const [openProfile, setOpenProfile] = useState(false);


    // const [openChat, setOpenChat] = useState(false);

    // const [chats, setChats] = useState([]);


    // const [chatRequests, setChatRequests] = useState([]);

    const profileRef = useRef();
    // const chatRef = useRef();

    const [notifications, setNotifications] = useState([])
    const [notifCount, setNotifCount] = useState(0)
    const [openNotif, setOpenNotif] = useState(false)
    const notifRef = useRef()

    // load profile
    useEffect(() => {
        if (!token) return;
        api.get("/api/user/me")
            .then(res => setProfile(res.data))
            .catch(() => setProfile(null));
    }, [token]);

    // load chats
    // useEffect(() => {
    //     if (!token || role !== "USER") return;
    //     const interval = setInterval(() => {
    //         api.get("/api/chats/my")
    //             .then(res => setChats(res.data))
    //             .catch(() => setChats([]));
    //     }, 5000)
    //     return () => clearInterval(interval)

    // }, [token, role]);

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
            // if (chatRef.current && !chatRef.current.contains(e.target)) {
            //     setOpenChat(false)
            // }
            if (notifRef.current && !notifRef.current.contains(e.target)) {
                setOpenNotif(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    // notifications
    useEffect(() => {
        if (!token) return;

        api.get("/api/notifications")
            .then(res => setNotifications(res.data))

        api.get("/api/notifications/count")
            .then(res => setNotifCount(res.data))
    }, [token])

    useEffect(() => {
        if (!token) return;
        const interval = setInterval(() => {
            api.get("/api/notifications/count")
                .then(res => setNotifCount(res.data))
        }, 10000)

        return () => clearInterval(interval)
    }, [token])

    // const totalUnread = chats.reduce((sum, c) => sum + c.unreadCount, 0)

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
                    
                    
                    {/* {role === "USER" && (
                        
                        <div className='relative' ref={chatRef}>
                            <div
                                onClick={() => setOpenChat(!openChat)}
                                className='cursor-pointer text-xl relative'
                            >
                                💬 */}
                                {/* {(chats.length) > 0 && (
                                    <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full' >
                                        {chats.length > 9 ? "9+" : chats.length}
                                    </span>
                                )} */}


                                {/* {totalUnread > 0 && (
                                    <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full'>
                                        {totalUnread > 9 ? "9+" : totalUnread}
                                    </span>
                                )}
                            </div> */}
                            {/* {openChat && (
                                <div className='absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg py-2 max-h-80 overflow-y-auto'> */}
                                    {/* <div className='px-4 py-1 text-sm font-semibold text-gray-600'>
                                        Chats
                                    </div>

                                    {chats.length === 0 && (
                                        <div className='px-4 py-2 text-sm text-gray-400'>
                                            No active chats
                                        </div>
                                    )} */}

                                    {/* {chats.map(chat => (
                                        <div
                                            key={chat.id}
                                            className='px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm flex justify-between'
                                            onClick={() => navigate(`/chat/${chat.id}`)}
                                        >
                                            <div>
                                                <div className='font-semibold'>{chat.otherUserName}</div>
                                                <div className='text-gray-400 text-xs'>
                                                    {chat.lastMessage || "No messages yet"}
                                                </div>
                                            </div>

                                            {chat.unreadCount > 0 && (
                                                <span className='bg-green-500 text-white text-xs px-2 rounded-full'>
                                                    {chat.unreadCount}
                                                </span>
                                            )}

                                            <button
                                                onClick={async () => {
                                                    await api.delete(`/api/chats/${chat.id}`)
                                                    setChats(prev => prev.filter(c => c.id !== chat.id))
                                                }}
                                                className='text-red-500 text-xs'>
                                                ❌
                                            </button>
                                        </div>
                                    ))} */}
                                    {/* <hr className='my-2' /> */}

                                    {/* <div className='px-4 py-1 text-sm font-semibold text-gray-600'>
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
                                                <button
                                                    className='text-green-600 text-xs'
                                                    onClick={() => api.put(`/api/chats/${req.id}/accept`)}
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    className='text-red-600 text-xs'
                                                    onClick={() => api.put(`/api/chats/${req.id}/reject`)}
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        </div>
                                    ))} */}
                                {/* </div>
                            )}
                        </div>
                    )} */}

                    <div className='relative' ref={notifRef}>
                        <div
                            onClick={() => setOpenNotif(!openNotif)}
                            className='cursor-pointer text-xl relative'
                        >
                            🔔
                            {notifCount > 0 && (
                                <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full'>
                                    {notifCount}
                                </span>
                            )}
                        </div>

                        {openNotif && (
                            <div className='absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg py-2 max-h-80 overflow-y-auto'>
                                <div className='px-4 py-2 font-semibold text-gray-600'>
                                    Notifications
                                </div>

                                {notifications.length === 0 && (
                                    <div className='px-4 py-2 text-gray-400'>
                                        No notifications
                                    </div>
                                )}

                                {notifications.map(noti => (
                                    <div
                                        key={noti.id}
                                        onClick={async () => {
                                            await api.put(`/api/notifications/${noti.id}/read`)

                                            if (noti.type === "EXCHANGE") {
                                                navigate(`/exchange/${noti.referenceId}`)
                                            }

                                            if (noti.type === "PRODUCT") {
                                                navigate(`/product/${noti.referenceId}`)
                                            }

                                            setNotifCount(prev => Math.max(prev - 1, 0))
                                            setOpenNotif(false)
                                        }}
                                        className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${!noti.read ? "bg-gray-50 font-semibold" : ""
                                            }`}
                                    >

                                        {!noti.read && (
                                            <span className='inline-block w-2 h-2 bg-blue-500 rounded-full mr-2'></span>
                                        )}


                                        {noti.message}
                                        <div className='text-xs text-gray-400'>
                                            {new Date(noti.createdAt).toLocaleString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

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