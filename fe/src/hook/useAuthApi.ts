import { useMutation } from "@tanstack/react-query";
import type { LoginInput, LoginResponse, RegisterInput, RegisterResponse } from "./types/useAuth.type";
import { apiClient, toApiError } from "../lib/apiClient";


export function useLogin() {
    return useMutation({
        mutationFn: async (input: LoginInput) => {
            try {
                const { data } = await apiClient.post<LoginResponse>('/login', input)
                return data
            } catch (err) {
                throw toApiError(err)
            }
        }
    })
}

export function useRegister() {
    return useMutation({
        mutationFn: async (input: RegisterInput) => {
            try {
                const { data } = await apiClient.post<RegisterResponse>('/register', input)
                return data
            } catch (err) {
                throw toApiError(err)
            }
        }
    })
}