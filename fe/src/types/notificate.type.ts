

export interface NotificationItem {
    id: number
    userId: number
    blogId: number
    isRead: boolean
    blog: { id: number, title: string }
    createdAt: string
}