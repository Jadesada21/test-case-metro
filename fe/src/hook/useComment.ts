import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient, toApiError } from "../lib/apiClient";
import type { CommentListResponse } from "./types/useComment.type";



export function useComments(blogId: string | undefined) {
    return useQuery({
        queryKey: ['comments', blogId],
        queryFn: async () => {
            try {
                const { data } = await apiClient.get<CommentListResponse>(`/blogs/${blogId}/comments`)
                return data.comments
            } catch (err) {
                throw toApiError(err)
            }
        },
        enabled: Boolean(blogId)
    })
}

export function useCreateComment(blogId: string) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (content: string) => {
            try {
                const { data } = await apiClient.post<CommentListResponse>(`/blogs/${blogId}/comments`, {
                    content,
                })
                return data.comments
            } catch (err) {
                throw toApiError(err)
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments', blogId] })
            queryClient.invalidateQueries({ queryKey: ['notification'] })
        }
    })
}