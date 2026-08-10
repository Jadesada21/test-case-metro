import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient, toApiError } from "../lib/apiClient";
import type { UpdateUserInput, UserListResponse, UserUpdateResponse } from "./useUser.type";



export function useUser() {
    return useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            try {
                const { data } = await apiClient.get<UserListResponse>('/users')
                return data.users
            } catch (err) {
                throw toApiError(err)
            }
        }
    })
}

export function useActivateUser() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (id: number) => {
            try {
                const { data } = await apiClient.patch<UserUpdateResponse>(`users/${id}/active`)
                return data.user
            } catch (err) {
                throw toApiError(err)
            }
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] })
    })
}

export function useUpdateUser() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ id, input }: { id: number, input: UpdateUserInput }) => {
            try {
                const { data } = await apiClient.put<UserUpdateResponse>(`/users/${id}`, input)
                return data.user
            } catch (err) {
                throw toApiError(err)
            }
        },
        onSuccess: () => queryClient.invalidateQueries({
            queryKey: ['users']
        })
    })
}

export function useDeleteUser() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (id: number) => {
            try {
                await apiClient.delete(`/users/${id}`)
            } catch (err) {
                throw toApiError(err)
            }
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] })
    })
}