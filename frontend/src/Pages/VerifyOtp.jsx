import React, { useEffect, useState } from 'react'
import api from '../services/api'
import {  useNavigate } from 'react-router-dom'

const VerifyOtp = () => {
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();

    const email = localStorage.getItem("otpEmail");
    const type = "VERIFY";

    // ✅ FIX: move redirect logic inside useEffect
    useEffect(() => {
        if (!email || !type) {
            alert("Session expired. Please try again.");
            navigate("/login");
        }
    }, [email, type, navigate]);

    if (!email || !type) return null;

    const verifyOtp = () => {
        if (type === "VERIFY") {
            api.post("/api/auth/verify-email", { email, otp })
                .then(res => {
                    alert(res.data);
                    localStorage.removeItem("otpEmail");
                    navigate("/login");
                })
                .catch((err) => alert(err.response?.data || "Invalid OTP"));
        } else {
            navigate("/reset-password", { state: { email, otp } });
        }
    };

    const resendOtp = () => {
        api.post("/api/auth/resend-otp", { email, type })
            .then(res => {
                alert(res.data);
            })
            .catch(e => alert(e.response?.data || "Try again later"))
    }

    return (
        // <div>VerifyOtp</div>
        <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
            <div className='w-full max-w-md bg-white shadow-lg rounded-xl p-8'>
                <h2 className='text-xl font-bold text-center mb-6'>Verify OTP</h2>
                <input
                    type="text"
                    placeholder='Enter OTP'
                    className='w-full px-4 py-2 border rounded-lg mb-4'
                    onChange={e => setOtp(e.target.value)}
                />
                <button
                    className='w-full bg-orange-500 text-white py-2 rounded-lg mb-3'
                    onClick={verifyOtp}
                >
                    Verify OTP
                </button>
                <p
                    className='text-sm text-center text-orange-500 cursor-pointer'
                    onClick={resendOtp}
                >
                    Resend OTP
                </p>
            </div>
        </div>
    )
}

export default VerifyOtp