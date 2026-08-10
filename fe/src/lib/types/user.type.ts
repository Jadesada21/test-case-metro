export type Role = 'SUPER_ADMIN' | 'GENERAL_USER'

export interface User {
    id: number
    username: string
    email: string
    role: Role
    isActive: boolean
    createdAt: string
}
