import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NotificationBell from './NotificationBell';
import { useLogout } from '../hook/useAuthApi';

export default function Topbar() {
    const { user } = useAuth();
    const logout = useLogout()
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    const linkClass = (path: string) =>
        `relative text-sm transition-colors ${isActive(path) ? 'text-ink after:absolute after:left-0 after:right-0 after:-bottom-1.5 after:h-0.5 after:bg-stamp' : 'text-pencil hover:text-ink'
        }`;

    return (
        <div className="border-b border-paperline bg-paper sticky top-0 z-10">
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link to="/blogs" className="font-display italic font-semibold text-xl">
                    <span className="text-stamp">Blogs</span>
                </Link>
                <nav className="flex items-center gap-5">
                    <Link to="/blogs" className={linkClass('/blogs')}>
                        บทความ
                    </Link>
                    <Link to="/blogs/new" className={linkClass('/blogs/new')}>
                        เขียนบทความ
                    </Link>
                    {user?.role === 'SUPER_ADMIN' && (
                        <Link to="/admin/users" className={linkClass('/admin/users')}>
                            จัดการผู้ใช้
                        </Link>
                    )}
                    <NotificationBell />
                    <span className="text-sm font-medium text-ink">{user?.username}</span>
                    <button
                        onClick={() => logout.mutate()}
                        className="text-pencil text-sm px-2.5 py-1.5 rounded-sm hover:bg-paperline hover:text-ink transition-colors"
                    >
                        ออกจากระบบ
                    </button>
                </nav>
            </div>
        </div>
    );
}
