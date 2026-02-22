// import React, { useEffect, useRef, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import api from '../services/api'

// const Nav = () => {
//     const token = localStorage.getItem("token");
//     const role = localStorage.getItem("role");
//     const [profile, setProfile] = useState(null);

//     const navigate = useNavigate();
//     const [open, setOpen] = useState(false);
//     const dropdownRef = useRef();

//     useEffect(() => {
//         if (!token) return;
//         api.get("/api/auth/me")
//             .then(res => setProfile(res.data))
//             .catch(() => setProfile(null));
//     }, [token])

//     const logout = () => {
//         localStorage.removeItem("token");
//         localStorage.removeItem("role");
//         setProfile(null)
//         navigate("/");
//     }

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                 setOpen(false);
//             }
//         }
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         }
//     }, [])

//     return (
//         // <div>Nav</div>
//         <div className='flex justify-between items-center px-8 py-4 shadow-md bg-white sticky top-0 z-50'>
//             <h1 className='text-2xl font-bold text-orange-600 cursor-pointer ' onClick={() => {
//                 navigate('/');
//             }}>SwapSphere</h1>
//             {!token ? (
//                 <div className='space-x-2 text-gray-700 font-medium'>
//                     <Link to="/login" className='hover:text-orange-600'>Login</Link>
//                     <span>||</span>
//                     <Link to="/register" className='hover:text-orange-600'>Register</Link>
//                 </div>
//             ) : (
//                 <div className='relative' ref={dropdownRef}>
//                     <div
//                         onClick={() => setOpen(!open)}
//                         className='w-10 h-10 bg-orange-500 text-white-600 flex items-center justify-center rounded-full cursor-pointer'>
//                         {profile?.name ? profile.name.charAt(0).toUpperCase() : "U"}
//                     </div>

//                     {open && (
//                         <div className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2'>
//                             <div
//                                 onClick={() => {
//                                     setOpen(false);
//                                     navigate("/profile");
//                                 }}
//                                 className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
//                             >
//                                 My Profile
//                             </div>


//                             {role === "ADMIN" && (
//                                 <>
//                                     <div onClick={() => {
//                                         setOpen(false);
//                                         navigate("/admin")
//                                     }}
//                                         className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
//                                     >
//                                         Admin Dashboard
//                                     </div>
//                                     <div onClick={() => {
//                                         setOpen(false);
//                                         navigate("//exchangeRequests")
//                                     }}
//                                         className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
//                                     >
//                                         All Users' Exchange Requests
//                                     </div>

//                                 </>
//                             )}

//                             {role === "USER" && (
//                                 <>
//                                     <div
//                                         onClick={() => {
//                                             setOpen(false);
//                                             navigate("/exchangeRequests")
//                                         }}
//                                         className='px-4 py-2 hover:bg-gray-100 cursor:pointer'
//                                     >
//                                         My Exchange Requests
//                                     </div>

//                                     <div
//                                         onClick={() => {
//                                             setOpen(false);
//                                             navigate("/xxxxxxxxx")
//                                         }}
//                                         className='px-4 py-2 hover:bg-gray-100 cursor:pointer'
//                                     >
//                                         xxxxxxxxxxxx
//                                     </div>
//                                 </>
//                             )}
//                             <div onClick={logout} className='px-4 py-2 hover:bg-gray-100 cursor:pointer'>
//                                 Logout
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             )}
//         </div>
//     )
// }

// export default Nav


import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'

const Navbar = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);
    const [openProfileIcon, setOpenProfileIcon] = useState(false);
    const [openChatIcon, setOpenChatIcon] = useState(false);

    const [chats, setChats] = useState([]);
    const [chatRequests, setChatRequests] = useState([]);

    const profileDropdownRef = useRef();
    const chatDropdownRef = useRef();

    useEffect(() => {
        if (!token) return;
        api.get("/api/auth/me")
            .then(res => setProfile(res.data))
            .catch(() => setProfile(null));
    }, [token]);

    useEffect(() => {
        if (!token) return;
        api.get("/api/chats/my")
            .then(res => setChats(res.data))
            .catch(() => setChats([]));

        api.get("/api/chats/requests")
            .then(res => setChatRequests(res.data))
            .catch(() => setChatRequests([]));
    }, [token]);

    const logout = () => {
        localStorage.clear();
        navigate("/");
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target)) {
                setOpenProfileIcon(false);
            }
            if (chatDropdownRef.current && !chatDropdownRef.current.contains(e.target)) {
                setOpenChatIcon(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);

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
                <div className='space-x-3 font-medium'>
                    <Link to="/login" className='hover:text-orange-600'>Login</Link>
                    <span>||</span>
                    <Link to="/register" className='hover:text-orange-600'>Register</Link>
                </div>
            ) : (
                <>

                    <div className='flex-1 mx-10'>
                        <input
                            type="text"
                            placeholder='Search products...'
                            className='w-full border px-4 py-2 rounded-lg focus:outline-orange-500'
                        />
                    </div>


                    <div className='flex items-center space-x-6'>

                        <div className='relative' ref={chatDropdownRef}>
                            <div
                                onClick={() => setOpenChatIcon(!openChatIcon)}
                                className='cursor-pointer text-xl relative'
                            >
                                💬
                                {(chats.length + chatRequests.length) > 0 && (
                                    <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full' >
                                        {chats.length + chatRequests.length}
                                    </span>
                                )}
                            </div>
                            {openChatIcon && (
                                <div className='absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg py-2 max-h-80 overflow-y-auto'>
                                    <div className='px-4 py-1 text-sm font-semibold text-gray-600'>
                                        Chats
                                    </div>
                                    {chats.map(chat => (
                                        <div
                                            key={chat.id}
                                            className='px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm'
                                            onClick={() => navigate(`/api/chats/${chat.id}`)}
                                        >
                                            {chat.otherUserName}
                                        </div>
                                    ))}
                                    <hr className='my-2' />
                                    <div className='px-4 py-1 text-sm font-semibold text-gray-600'>
                                        Chat Requests
                                    </div>
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


                        <div className='relative' ref={profileDropdownRef}>
                            <div
                                className='w-10 h-10 bg-orange-500 text-white flex items-center justify-center rounded-full cursor-pointer'
                                onClick={() => setOpenProfileIcon(!openProfileIcon)}
                            >
                                {profile?.name?.charAt(0).toUpperCase() || "U"}
                            </div>

                            {openProfileIcon && (
                                <div className='absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg py-2 text-sm'>
                                    <div
                                        onClick={() => navigate("/profile")}
                                        className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                                    >
                                        👤 My Profile
                                    </div>

                                    {role === "USER" && (
                                        <>
                                            <div
                                                onClick={() => navigate("/my-projects")}
                                                className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                                            >
                                                📦 My Products
                                            </div>
                                            <div
                                                onClick={() => navigate("/exchangeRequests")}
                                                className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                                            >
                                                🔁 My Exchange Requests
                                            </div>
                                        </>
                                    )}


                                    {role === "ADMIN" && (
                                        <>
                                            <div
                                                onClick={() => navigate("/admin/dashboard")}
                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            >
                                                📊 Admin Dashboard
                                            </div>
                                            <div
                                                onClick={() => navigate("/admin/users")}
                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            >
                                                👥 Manage Users
                                            </div>
                                            <div
                                                onClick={() => navigate("/admin/products")}
                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            >
                                                📦 Manage Products
                                            </div>
                                            <div
                                                onClick={() => navigate("/admin/exchanges")}
                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            >
                                                🔁 Manage Exchanges
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
                </>
            )}
        </div>
    )
}

export default Navbar