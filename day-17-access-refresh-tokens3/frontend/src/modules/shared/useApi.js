import axios from 'axios'
import { useAuthContext } from '../auth/context/AuthProvider'


export default function useApi() {

    // user , setUser , accessToken , setAccessToken
    const authContext = useAuthContext()

    const api = axios.create({
        baseURL: "http://localhost:5173/api/v1",
        withCredentials: true
    })

    api.interceptors.request.use(config => {

        if (authContext.accessToken) {
            config.headers.Authorization = `Bearer ${authContext.accessToken}`
        }

        return config

    })

    // handle for 401 Unauthorized responses
    api.interceptors.response.use(
        response => response,
        async (error) => {
            if (error.response && error.response.status === 401) {

                const res = await axios.post('/api/v1/auth/refresh')

                authContext.setAccessToken(res.data.accessToken)

                error.config.headers.Authorization = `Bearer ${res.data.accessToken}`

                return axios(error.config)
            }
            return Promise.reject(error)
        }
    )


    return api
}
