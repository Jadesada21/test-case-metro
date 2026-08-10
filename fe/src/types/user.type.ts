export type Role = 'SUPER_ADMIN' | 'GENERAL_USER'

export interface User {
    id: Number
    username: String
    email: String
    role: Role
    isActive: Boolean
    createdAt: String
}
