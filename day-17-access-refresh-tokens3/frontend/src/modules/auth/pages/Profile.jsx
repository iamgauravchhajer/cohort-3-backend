import React, { useEffect } from 'react'
import { useAuthContext } from "../context/AuthProvider"
import useApi from "../../shared/useApi"

const Profile = () => {
    const authContext = useAuthContext()
    const api = useApi()

    async function fetchProfile() {
        try {
            const response = await api.get("/auth/me")
            authContext.setUser(response.data.user)
        } catch (error) {
            console.error("Failed to fetch profile", error)
        }
    }

    useEffect(() => {
        fetchProfile()
    }, [])

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <div className="w-full max-w-xs">
                <h1 className="text-xl font-semibold text-gray-900 mb-6">Profile</h1>

                <div className="flex flex-col gap-3 p-4 border border-gray-200 rounded-lg">
                    <div>
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Name</span>
                        <p className="text-sm font-medium text-gray-900 mt-0.5">
                            {authContext.user?.name || "Loading..."}
                        </p>
                    </div>

                    <div className="border-t border-gray-100 pt-3">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Email</span>
                        <p className="text-sm font-medium text-gray-900 mt-0.5">
                            {authContext.user?.email || "Loading..."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile