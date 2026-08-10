import axios, { AxiosError } from "axios"

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'


export const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
})

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export class ApiError extends Error {
    statusCode: number
    constructor(message: string, statusCode: number) {
        super(message)
        this.statusCode = statusCode
    }
}

export function toApiError(err: unknown): ApiError {
    if (axios.isAxiosError(err)) {
        const axiosErr = err as AxiosError<{ message?: string }>
        const message = axiosErr.response?.data?.message ||
            'Something wrong'
        const statusCode = axiosErr.response?.status || 500

        if (statusCode === 401) {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        }

        return new ApiError(message, statusCode)
    }
    return new ApiError('An unexpected error occurred', 500)
}