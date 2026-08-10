import type { NotificationItem } from "../../lib/types/notificate.type";


export interface NotificationListResponse {
    notification: NotificationItem[]
    unreadCount: number
}

