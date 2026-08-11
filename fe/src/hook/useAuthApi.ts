import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { LoginInput, LoginResponse, RegisterInput, RegisterResponse } from "./types/useAuth.type";
import { apiClient, toApiError } from "../lib/apiClient";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export function useLogin() {
    return useMutation({
        mutationFn: async (input: LoginInput) => {
            try {
                const { data } = await apiClient.post<LoginResponse>('/auth/login', input)
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
                const { data } = await apiClient.post<RegisterResponse>('/auth/register', input)
                return data
            } catch (err) {
                throw toApiError(err)
            }
        }
    })
}

export function useLogout() {
    const { logout } = useAuth();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async () => {
            logout();
        },
        onSuccess: () => {
            queryClient.clear();
            navigate('/', { replace: true });
        },
    });
}