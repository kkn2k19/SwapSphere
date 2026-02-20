import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

const RegisterPage = () => {
    const [cities, setCities] = useState([]);

    const [form, setForm] = useState({
        role: "USER",
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        landmark: "",
        city: "",
        state: "",
        pincode: ""
    });

    const navigate = useNavigate();

    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [emailExists, setEmailExits] = useState(null); // true or false


    const checkEmail = () => {
        if (!form.email) return;
        api.post("/api/auth/check-email-present", { email: form.email })
            .then(res => {
                setEmailExits(res.data);
            })
            .catch(() => setEmailExits(null));
    }

    const register = async () => {
        if (emailExists) {
            alert("Account already exists. Please login.");
            return;
        }
        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        setLoading(true);

        try {
            const res = await api.post("/api/auth/register", form);
            alert(res.data);

            localStorage.setItem("otpEmail", form.email);
            navigate("/verify-otp");

        } catch (e) {
            alert(e.response?.data || "Registration failed");
        } finally {
            setLoading(false);
        }
    }

    const handleChange = async (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handlePincodeChange = async (e) => {
        const pin = e.target.value;
        setForm({
            ...form,
            pincode: pin
        })
        if (pin.length === 6) {
            try {
                const res = await fetch(
                    `https://api.postalpincode.in/pincode/${pin}`
                );
                const data = await res.json();

                if (data[0].Status === "Success") {
                    const postOffices = data[0].PostOffice;
                    const districts = [
                        ...new Set(
                            postOffices.map(p => p.District)
                        )
                    ];

                    setCities(districts);
                    setForm(prev => ({
                        ...prev,
                        city: districts[0],
                        state: postOffices[0].State
                    }));

                } else {
                    alert("Invalid Pincode")
                }
            } catch {
                alert("unable to fetch location")
            }
        }
    }
    return (
        // <div>RegisterPage</div>
        <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    register();
                }}
                className='w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-3'
            >
                <h2 className='text-xl font-bold text-center'>Create Account</h2>

                <input
                    name='name'
                    placeholder='Full Name'
                    className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400'
                    onChange={handleChange}
                />
                <div className='space-y-1'>
                    <input
                        name='email'
                        placeholder='Email Address'
                        className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400'
                        onChange={handleChange}
                        onBlue={checkEmail}
                    />
                    {emailExists === true && (
                        <div className='text-red-600 text-sm flex justify-between items-center'>
                            <span>Account already exists</span>
                            <button
                                onClick={() => navigate("/login")}
                                className='text-blue-600 underline'
                            >
                                Login
                            </button>
                        </div>
                    )}
                </div>
                <input
                    name='phone'
                    placeholder='Phone Number'
                    className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400'
                    onChange={handleChange}
                />
                <div className='relative'>
                    <input
                        type={showPass ? "text" : "password"}
                        name='password'
                        placeholder='Password'
                        className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400'
                        onChange={handleChange}
                    />
                    <span
                        className='absolute right-3 top-2.5 cursor-pointer text-sm text-blue-500'
                        onClick={() => setShowPass(!showPass)}
                    >
                        {showPass ? "Hide" : "Show"}
                    </span>
                </div>

                <div className='relative'>
                    <input
                        type={showPass ? "text" : "password"}
                        name='confirmPassword'
                        placeholder='Confirm Password'
                        className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400'
                        onChange={handleChange}
                    />
                    <span
                        className='absolute right-3 top-2.5 cursor-pointer text-sm text-blue-500'
                        onClick={() => setShowPass(!showPass)}
                    >
                        {showPass ? "Hide" : "Show"}
                    </span>
                </div>

                <select
                    name="role"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    onChange={handleChange}
                >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                </select>
                <input
                    name='landmark'
                    placeholder='LandMark'
                    className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400'
                    onChange={handleChange}
                />
                <input
                    name='pincode'
                    placeholder='Pincode'
                    value={form.pincode}
                    className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400'
                    onChange={handlePincodeChange}
                />
                <select
                    name="city"
                    value={form.city}
                    className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400'
                    onChange={handleChange}
                >
                    <option value="">Select City</option>
                    {cities.map((c, i) => (
                        <option key={i} value={c}>{c}</option>
                    ))}
                </select>
                <input
                    name='state'
                    placeholder='State'
                    value={form.state}
                    readOnly
                    className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400'
                />
                <button
                    type='submit'
                    disabled={loading}
                    className='w-full bg-orange-500 text-white py-2 rounded-lg'
                >
                    {loading ? "Registering..." : "Register"}
                </button>

                <p className='text-sm text-center'>
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate("/login")}
                        className='text-orange-500 cursor-pointer'
                    >
                        Login
                    </span>
                </p>
            </form>
        </div>
    )
}

export default RegisterPage