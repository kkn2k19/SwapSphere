import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState(null);

    const login = () => {
        api.post("/api/auth/login", { email, password })
            .then(res => {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("role", res.data.role);
                navigate("/");
            })
            .catch(e => {
                const msg = e.response?.data || "login failed";
                alert(msg);
                if (msg.includes("verify your email")) {
                    navigate("/verify-otp", { state: { email, type: "VERIFY" } });
                }
            })
    };

    return (
        // <div>LoginPage</div>
        <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
            <div className='w-full max-w-md bg-white shadow-lg rounded-xl p-8'>
                <h2 className='text-2xl font-bold text-center mb-6'>Login to App</h2>
                <div className='space-y-2'>
                    <input
                        type="email"
                        placeholder='Email Address'
                        className='w-full px-4 py-2 border rounded-lg'
                        onChange={e => setEmail(e.target.value)}
                    />
                    <div className='relative'>
                        <input
                            type={showPass ? "text" : "password"}
                            placeholder='Password'
                            className='w-full px-4 py-2 border rounded-lg pr-12'
                            onChange={e => setPassword(e.target.value)}
                        />
                        <span
                            className='absolute right-3 top-2.5 cursor-pointer tex-sm text-blue-500'
                            onClick={() => setShowPass(!showPass)}
                        >
                            {showPass ? "Hide" : "Show"}
                        </span>
                    </div>
                    <button
                        className='w-full bg-orange-500 text-white py-2 rounded-lg'
                        onClick={login}
                    >
                        Login
                    </button>
                </div>
                <p className='text-sm text-center mt-2'>
                    <span
                        className='text-orange-500 cursor-pointer hover:underline'
                        onClick={() => navigate("/forgot-password")}
                    >
                        Forgot Password?
                    </span>
                </p>

                <p className='text-sm text-center text-gray-500'>
                    Don't have an account? {" "}
                    <span
                        className='text-orange-500 cursor-pointer hover:underline'
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </span>
                </p>
            </div>
        </div>
    )
}

export default LoginPage