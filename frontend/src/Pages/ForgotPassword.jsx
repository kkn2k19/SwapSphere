import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const sendOtp = () => {
        api.post("/api/auth/forgot-password", { email })
            .then(() => {
                alert("OTP sent to your email");
                navigate("/verify-otp", { state: { email, type: "RESET" } });
            })
            .catch(() => alert("Email not found!"));
    }

    return (
        // <div>ForgotPassword</div>
        <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
            <div className='w-full max-w-md bg-white shadow-lg rounded-xl p-8'>
                <h2 className='text-xl font-bold text-center mb-6'>Forgot Password</h2>
                <input
                    type='email'
                    placeholder='Email Address'
                    className='w-full px-4 py-2 border rounded-lg mb-4'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button
                    onClick={sendOtp}
                    className='w-full bg-orange-500 text-white py-2 rounded-lg'
                >
                    Send OTP
                </button>
            </div>
        </div>
    )
}

export default ForgotPassword