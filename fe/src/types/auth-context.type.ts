import type { User } from "../lib/types/user.type"

export interface AuthContextValue {
    user: User | null
    loading: boolean
    login: (email: string, password: string) => Promise<void>
    register: (username: string, email: string, password: string) => Promise<string>
    logout: () => void
}