import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient, toApiError } from "../lib/apiClient";
import type { NotificationListResponse } from "./types/useNotificate.type";



export function useNotifications(enabled: boolean) {
    return useQuery({
        queryKey: ['notifications'],
        queryFn: async () => {
            try {
                const { data } = await apiClient.get<NotificationListResponse>('/notifications')
                return data
            } catch (err) {
                throw toApiError(err)
            }
        },
        enabled,
        refetchInterval: 20_000
    })
}

export function useMarkNotificationRead() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (id: number) => {
            try {
                await apiClient.patch(`/notifications/${id}/read`)
            } catch (err) {
                throw toApiError(err)
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] })
        }
    })
}