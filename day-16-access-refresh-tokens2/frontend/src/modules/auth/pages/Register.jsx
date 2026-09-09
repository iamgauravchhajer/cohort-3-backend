import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext'
import useApi from '../../shared/api'

const Register = () => {
    const auth = useAuth()
    const navigate = useNavigate()
    const api = useApi()
    const [ form, setForm ] = useState({ name: "", email: "", password: "" })
    const [ error, setError ] = useState(null)

    const handleChange = (e) => {
        setForm({ ...form, [ e.target.name ]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        try {

            const response = await api.post("/auth/register", form)


            console.log(response.data)


        } catch (err) {
            setError(err?.message || "Registration failed")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <div className="w-full max-w-xs">
                <h1 className="text-xl font-semibold text-gray-900 mb-6">Register</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        name="name"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleChange}
                        className="px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-gray-900 transition"
                    />

                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-gray-900 transition"
                    />

                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
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