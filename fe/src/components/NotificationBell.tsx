import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMarkNotificationRead, useNotifications } from '../hook/useNotification';
import type { NotificationItem } from '../lib/types/notificate.type';

export default function NotificationBell() {
    const [open, setOpen] = useState(false);
    const wrapRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const { data } = useNotifications(true);
    const markAsRead = useMarkNotificationRead();

    const notifications = data?.notification ?? [];
    const unreadCount = data?.unreadCount ?? 0;

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    function handleClickNotif(n: NotificationItem) {
        if (!n.isRead) {
            markAsRead.mutate(n.id);
        }
        setOpen(false);
        navigate(`/blogs/${n.blogId}`);
    }

    return (
        <div className="relative" ref={wrapRef}>
            <button
                onClick={() => setOpen((o) => !o)}
                aria-label="การแจ้งเตือน"
                className="relative text-lg  cursor-pointer transition-colors p-1.5"
            >
                🔔
                {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-stamp text-paper font-mono text-[10px] font-semibold min-w-4 h-4 rounded-full flex items-center justify-center px-1 border-2 border-paper">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>
            {open && (
                <div className="absolute left-5 top-14 w-80 bg-paper border shadow-[4px_4px_0_theme(colors.paperline)] z-20 max-h-96 overflow-y-auto">
                    <div className="px-4 py-3 border-b border-paperline font-display italic text-[15px]">
                        การแจ้งเตือน
                    </div>
                    {notifications.length === 0 ? (
                        <div className="px-4 py-6 text-center  text-sm">ยังไม่มีการแจ้งเตือน</div>
                    ) : (
                        notifications.map((n) => (
                            <div
                                key={n.id}
                                onClick={() => handleClickNotif(n)}
                                className={`px-4 py-3 border-b border-paperline text-sm cursor-pointer flex gap-2 items-start hover:bg-paperline transition-colors ${n.isRead ? '' : 'bg-orange-50/60'
                                    }`}
                            >
                                <span
                                    className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${n.isRead ? 'bg-transparent' : 'bg-stamp'
                                        }`}
                                />
                                <div>
                                    <div>มีความคิดเห็นใหม่ในบทความ "{n.blog.title}"</div>
                                    <div className="font-mono text-xs  mt-0.5">
                                        {new Date(n.createdAt).toLocaleString('th-TH')}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
