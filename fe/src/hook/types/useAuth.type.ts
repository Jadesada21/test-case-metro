import type { User } from "../../lib/types/user.type"

export interface LoginInput {
    email: string
    password: string
}

export interface LoginResponse {
    token: string
    user: User
}

export interface RegisterInput {
    username: string
    email: string
    password: string
}

export interface RegisterResponse {
    message: string
    user: User
}