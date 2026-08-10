import type { User } from "../../lib/types/user.type";

export interface UserListResponse {
    users: User[]
}

export interface UserUpdateResponse {
    user: User
}

export interface UpdateUserInput {
    username?: string
    password?: string
}