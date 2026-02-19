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

    return (
        <div>Nav</div>
    )
}

export default Nav