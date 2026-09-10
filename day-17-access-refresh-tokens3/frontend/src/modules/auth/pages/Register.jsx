import React, { useState } from 'react'
import useApi from "../../shared/useApi"
import { useAuthContext } from "../context/AuthProvider"
import { useNavigate } from "react-router"

const Register = () => {
    const api = useApi()
    const authContext = useAuthContext()
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    async function handleSubmit(event) {
        event.preventDefault()
        setError(null)

        try {
            const response = await api.post('/auth/register', {
                name,
                email,
                password
            })

            console.log(response.data)

            authContext.setAccessToken(response.data.accessToken)
            authContext.setUser(response.data.user)

            navigate("/profile")
        } catch (err) {
            setError(err?.response?.data?.message || err?.message || "Registration failed")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <div className="w-full max-w-xs">
                <h1 className="text-xl font-semibold text-gray-900 mb-6">Register</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        name="name"
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-gray-900 transition"
                    />

                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-gray-900 transition"
                    />

                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-gray-900 transition"
                    />

                    <button
                        type="submit"
                        className="mt-1 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-zinc-800 transition cursor-pointer"
                    >
                        Register
                    </button>
                </form>

                {error && <p className="text-sm text-red-500 mt-3">{error}</p>}
            </div>
        </div>
    )
}

export default Register