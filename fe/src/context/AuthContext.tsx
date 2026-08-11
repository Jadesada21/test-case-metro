import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { AuthContextValue } from "../types/auth-context.type";
import type { User } from "../lib/types/user.type";
import { useLogin, useRegister } from "../hook/useAuthApi";



const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    const loginMutation = useLogin()
    const registerMutation = useRegister()

    useEffect(() => {
        const stored = localStorage.getItem('user')
        if (stored) {
            try {
                setUser(JSON.parse(stored))
            } catch {
                localStorage.removeItem('user')
            }
        }
        setLoading(false)
    }, [])

    async function login(email: string, password: string) {
        const data = await loginMutation.mutateAsync({ email, password })
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        setUser(data.user)
    }

    async function register(username: string, email: string, password: string) {
        const data = await registerMutation.mutateAsync({ username, email, password })
        return data.message
    }

    function logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth muse be use in AuthProvider only')
    return ctx
}