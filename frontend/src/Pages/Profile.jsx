import React, { useEffect, useState } from 'react'
import api from '../services/api'

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [passChangeMode, setPassChangeMode] = useState(false);

    const [form, setForm] = useState({
        name: "",
        phone: "",
        city: "",
        state: "",
        pincode: ""
    })

    const [passwordForm, setPasswordForm] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    })

    useEffect(() => {
        api.get("/api/auth/me")
            .then(res => {
                setProfile(res.data)
                setForm({
                    name: res.data.name,
                    phone: res.data.phone,
                    city: res.data.city,
                    state: res.data.state,
                    pincode: res.data.pincode
                })
            })
            .catch(() => alert("Failed to load profile"))
    }, [])

    const updateProfile = async () => {
        try {
            await api.put("/api/auth/update-profile", form)
            alert("Profile updated successfully")
            // setEditMode(false)

            setProfile({
                ...profile,
                ...form
            })
            setEditMode(false)
        } catch {
            alert("Failed to update profile")
        }
    }

    const changePassword = async () => {
        try {
            await api.put("/api/auth/change-password", passwordForm)
            alert("Password changed successfully")
            setPasswordForm({
                oldPassword: "",
                newPassword: "",
                confirmPassword: ""
            })
            setPassChangeMode(false)
        } catch {
            alert("Password change failed")
        }
    }

    if (!profile) return <div className='p-8'>Loading...</div>

    return (
        // <div>Profile</div>
        <div className='min-h-screen bg-gray-100 p-6' >
            <div className='max-w-xl mx-auto bg-white rounded-xl shadow p-6'>
                <h1 className='text-2xl font-bold mb-4'>My Profile</h1>

                {!editMode ? (
                    <>
                        <div className='space-y-2 text-sm'>
                            <p><b>Name:</b> {profile.name}</p>
                            <p><b>Email:</b> {profile.email}</p>
                            <p><b>Phone:</b> {profile.phone}</p>
                            <p><b>Role:</b> {profile.role}</p>
                            <p><b>City:</b> {profile.city}</p>
                            <p><b>State:</b> {profile.state}</p>
                            <p><b>Pincode:</b> {profile.pincode}</p>
                        </div>
                        <div className='mt-4 flex gap-3'>
                            <button
                                onClick={() => {
                                    setEditMode(true)
                                    setPassChangeMode(false)
                                }}
                                className='bg-blue-500 text-white px-4 py-2 rounded'
                            >
                                Edit Profile
                            </button>
                            <button onClick={() => {
                                setPassChangeMode(true)
                                setEditMode(false)
                            }}
                                className='bg-orange-500 text-white px-4 py-2 rounded'
                            >
                                Change Password
                            </button>
                        </div>
                    </>
                ) : (
                    <div className='space-y-3 text-sm'>
                        <input
                            value={form.name}
                            onChange={e => setForm({
                                ...form,
                                name: e.target.value
                            })}
                            placeholder='Name'
                            className='w-full border p-2 rounded'
                        />
                        <input
                            value={form.phone}
                            onChange={e => setForm({
                                ...form,
                                phone: e.target.value
                            })}
                            placeholder='Phone'
                            className='w-full border p-2 rounded'
                        />
                        <input
                            value={form.city}
                            onChange={e => setForm({
                                ...form,
                                city: e.target.value
                            })}
                            placeholder='City'
                            className='w-full border p-2 rounded'
                        />
                        <input
                            value={form.state}
                            onChange={e => setForm({
                                ...form,
                                state: e.target.value
                            })}
                            placeholder='State'
                            className='w-full border p-2 rounded'
                        />
                        <input
                            value={form.pincode}
                            onChange={e => setForm({
                                ...form,
                                pincode: e.target.value
                            })}
                            placeholder='Pincode'
                            className='w-full border p-2 rounded'
                        />

                        <div className='flex gap-3'>
                            <button
                                onClick={updateProfile}
                                className='bg-green-500 text-white px-4 py-2 rounded'>
                                Save Changes
                            </button>
                            <button
                                onClick={() => setEditMode(false)}
                                className='bg-gray-400 text-white px-4 py-2 rounded'>
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {passChangeMode && (
                <div className='max-w-xl mx-auto bg-white rounded-xl shadow p-6 mt-6'>
                    <h2 className='text-lg font-semibold mb-3' >Change Password</h2>

                    <div className='space-y-3'>
                        <input type="password"
                            placeholder='Old Password'
                            value={passwordForm.oldPassword}
                            onChange={e => setPasswordForm({
                                ...passwordForm,
                                oldPassword: e.target.value
                            })}
                            className='w-full border p-2 rounded'
                        />
                        <input type="password"
                            placeholder='New Password'
                            value={passwordForm.newPassword}
                            onChange={e => setPasswordForm({
                                ...passwordForm,
                                newPassword: e.target.value
                            })}
                            className='w-full border p-2 rounded'
                        />
                        <input type="password"
                            placeholder='Confirm Password'
                            value={passwordForm.confirmPassword}
                            onChange={e => setPasswordForm({
                                ...passwordForm,
                                confirmPassword: e.target.value
                            })}
                            className='w-full border p-2 rounded'
                        />
                        <div className='flex gap-3'>
                            <button onClick={changePassword}
                                className='bg-red-600 text-white px-4 py-2 rounded'
                            >
                                Change Password
                            </button>
                            <button
                                onClick={() => setPassChangeMode(false)}
                                className='bg-gray-400 text-white px-4 py-2 rounded'
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Profile