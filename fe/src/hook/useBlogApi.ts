import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient, toApiError } from "../lib/apiClient";
import type { BlogDetailResponse, BlogInput, BlogLishResponse } from "./types/useBlog.type";

export function useBlogs(search: string) {
    return useQuery({
        queryKey: ['blogs', search],
        queryFn: async () => {
            try {
                const { data } = await apiClient.get<BlogLishResponse>('/blogs', {
                    params: search ? { search } : undefined,
                })
                return data.blogs
            } catch (err) {
                throw toApiError(err)
            }
        }
    })
}

export function useBlog(id: string | undefined) {
    return useQuery({
        queryKey: ['blog', id],
        queryFn: async () => {
            try {
                const { data } = await apiClient.get<BlogDetailResponse>(`/blogs/${id}`)
                return data.blog
            } catch (err) {
                throw toApiError(err)
            }
        }
    })
}

export function useCreateBlog() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: BlogInput) => {
            try {
                const { data } = await apiClient.post<BlogDetailResponse>('/blogs', input)
                return data.blog
            } catch (err) {
                throw toApiError(err)
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] })
        }
    })
}

export function useUpdateBlog(id: string) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: BlogInput) => {
            try {
                const { data } = await apiClient.put<BlogDetailResponse>(`/blogs/${id}`, input)
                return data.blog
            } catch (err) {
                throw toApiError(err)
            }
        },
        onSuccess: (blog) => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] })
            queryClient.setQueryData(['blog', id], blog)
        }
    })
}

export function useDeleteBlog() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (id: number) => {
            try {
                await apiClient.delete(`/blogs/${id}`)
            } catch (err) {
                throw toApiError(err)
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] })
        }
    })
}

