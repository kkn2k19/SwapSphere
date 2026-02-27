import React, { useEffect, useState } from 'react'
import api from '../services/api'

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [editMode, setEditMode] = useState(false);

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
    }, [])

    const updateProfile = async () => {
        await api.put("/api/auth/update-profile", form)
        alert("Profile updated successfully")
        setEditMode(false)
    }

    const changePassword = async () => {
        await api.put("/api/auth/change-password", passwordForm)
        alert("Password changed successfully")
        setPasswordForm({
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""
        })
    }

    if (!profile) return <div className='p-8'>Loading...</div>

    return (
        // <div>Profile</div>
        <div className='max-w-3xl mx-auto '>
            <h1 className='text-2xl font-bold mb-6'>My Profile</h1>
            <div className='bg-white shadow p-6 rounded space-y-4'>
                <p > <strong>Email:</strong>{profile.email}</p>
                <p><strong>Role:</strong>{profile.role}</p>

                <input
                    disabled={!editMode}
                    value={form.name}
                    onChange={e => setForm({
                        ...form, name: e.target.value
                    })}
                    className='w-full border p-2'
                />

                <input
                    disabled={!editMode}
                    value={form.phone}
                    onChange={e => setForm({
                        ...form, phone: e.target.value
                    })}
                />
                <input
                    disabled={!editMode}
                    value={form.city}
                    onChange={e => setForm({
                        ...form, city: e.target.value
                    })}
                    className='w-full border p-2'
                />

                <input
                    disabled={!editMode}
                    value={form.state}
                    onChange={e => setForm({
                        ...form, state: e.target.value
                    })}
                />
                <input
                    disabled={!editMode}
                    value={form.pincode}
                    onChange={e => setForm({
                        ...form, pincode: e.target.value
                    })}
                />

                {!editMode ? (
                    <button onClick={() => setEditMode(true)} className='bg-orange-600 text-white px-4 py-2 rounded'>
                        Edit Profile
                    </button>
                ) : (
                    <button onClick={updateProfile} className='bg-green-600 text-white px-4 py-2 rounded'>
                        Save Changes
                    </button>
                )}
            </div>

            <div className='bg-white shadow p-6 rounded space-y-3'>
                <h2 className='text-lg font-semibold ' >Change Password</h2>

                <input type="password"
                    placeholder='Old Password'
                    value={passwordForm.oldPassword}
                    onChange={e => setPasswordForm({
                        ...passwordForm, oldPassword: e.target.value
                    })}
                    className='w-full border p-2'
                />
                <input type="password"
                    placeholder='New Password'
                    value={passwordForm.newPassword}
                    onChange={e => setPasswordForm({
                        ...passwordForm, newPassword: e.target.value
                    })}
                    className='w-full border p-2'
                />
                <input type="password"
                    placeholder='Confirm Password'
                    value={passwordForm.confirmPassword}
                    onChange={e => setPasswordForm({
                        ...passwordForm, confirmPassword: e.target.value
                    })}
                    className='w-full border p-2'
                />
                <button onClick={changePassword}
                    className='bg-red-600 text-white px-4 py-2 rounded'>
                    Change Password
                </button>
            </div>
        </div>
    )
}

export default Profile