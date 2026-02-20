import React, { useState } from 'react'
import api from '../services/api'
import { useLocation, useNavigate } from 'react-router-dom'

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email;
    const otp = location.state?.otp;

    if (!email || !otp) {
        alert("Session expired. Please start again.");
        navigate("/forgot-password");
        return null;
    }

    const resetPass = () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        api.post("/api/auth/reset-password", {
            email,
            otp,
            newPassword: password,
            confirmPassword
        })
            .then(res => {
                alert(res.data)
                navigate("/login");
            })
            .catch(e => alert(e.response?.data || "Failed to reset password"))
    }

    return (
        // <div>ResetPassword</div>
        <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
            <div className='w-full max-w-md bg-white shadow-lg rounded-xl p-8'>
                <h2 className='text-xl font-bold text-center mb-6'>Reset Password</h2>
                <input
                    type="password"
                    placeholder='New password'
                    className='w-full px-4 py-2 border rounded-lg mb-4'
                    onChange={e => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder='Confirm Password'
                    className='w-full px-4 py-2 border rounded-lg mb-4'
                    onChange={e => setConfirmPassword(e.target.value)}
                />
                <button
                    className='w-full bg-orange-500 text-white py-2 rounded-lg mb-3'
                    onClick={resetPass}
                >
                    Reset Password
                </button>
            </div>
        </div>
    )
}

export default ResetPassword