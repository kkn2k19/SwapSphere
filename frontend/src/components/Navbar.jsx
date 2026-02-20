import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'

const Nav = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const [profile, setProfile] = useState(null);

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef();

    useEffect(() => {
        if (!token) return;
        api.get("/api/auth/me")
            .then(res => setProfile(res.data))
            .catch(() => setProfile(null));
    }, [token])

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setProfile(null)
        navigate("/");
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [])

    return (
        // <div>Nav</div>
        <div className='flex justify-between items-center px-8 py-4 shadow-md bg-white sticky top-0 z-50'>
            <h1 className='text-2xl font-bold text-orange-600 cursor-pointer ' onClick={() => {
                navigate('/');
            }}>SwapSphere</h1>
            {!token ? (
                <div className='space-x-2 text-gray-700 font-medium'>
                    <Link to="/login" className='hover:text-orange-600'>Login</Link>
                    <span>||</span>
                    <Link to="/register" className='hover:text-orange-600'>Register</Link>
                </div>
            ) : (
                <div className='relative' ref={dropdownRef}>
                    <div
                        onClick={() => setOpen(!open)}
                        className='w-10 h-10 bg-orange-500 text-white-600 flex items-center justify-center rounded-full cursor-pointer'>
                        {profile?.name ? profile.name.charAt(0).toUpperCase() : "U"}
                    </div>

                    {open && (
                        <div className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2'>
                            <div
                                onClick={() => {
                                    setOpen(false);
                                    navigate("/profile");
                                }}
                                className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                            >
                                My Profile
                            </div>


                            {role === "ADMIN" && (
                                <>
                                    <div onClick={() => {
                                        setOpen(false);
                                        navigate("/admin")
                                    }}
                                        className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                                    >
                                        Admin Dashboard
                                    </div>
                                    <div onClick={() => {
                                        setOpen(false);
                                        navigate("//exchangeRequests")
                                    }}
                                        className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                                    >
                                        All Users' Exchange Requests
                                    </div>

                                </>
                            )}

                            {role === "USER" && (
                                <>
                                    <div
                                        onClick={() => {
                                            setOpen(false);
                                            navigate("/exchangeRequests")
                                        }}
                                        className='px-4 py-2 hover:bg-gray-100 cursor:pointer'
                                    >
                                        My Exchange Requests
                                    </div>

                                    <div
                                        onClick={() => {
                                            setOpen(false);
                                            navigate("/xxxxxxxxx")
                                        }}
                                        className='px-4 py-2 hover:bg-gray-100 cursor:pointer'
                                    >
                                        xxxxxxxxxxxx
                                    </div>
                                </>
                            )}
                            <div onClick={logout} className='px-4 py-2 hover:bg-gray-100 cursor:pointer'>
                                Logout
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Nav