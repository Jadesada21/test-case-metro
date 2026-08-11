import { useState } from 'react';
import { useActivateUser, useDeleteUser, useUpdateUser, useUser } from '../hook/useUserApi';
import { ApiError } from '../lib/apiClient';
import type { User } from '../lib/types/user.type';


export default function AdminUsersPage() {
    const { data: users = [], isLoading } = useUser();
    const activateUser = useActivateUser();
    const updateUser = useUpdateUser();
    const deleteUser = useDeleteUser();

    const [editingId, setEditingId] = useState<number | null>(null);
    const [editUsername, setEditUsername] = useState('');
    const [editPassword, setEditPassword] = useState('')

    async function handleActivate(id: number) {
        try {
            await activateUser.mutateAsync(id);
        } catch (err) {
            alert(err instanceof ApiError ? err.message : 'อนุมัติไม่สำเร็จ');
        }
    }

    function startEdit(u: User) {
        setEditingId(u.id);
        setEditUsername(u.username);
    }

    async function saveEdit(id: number) {
        try {
            await updateUser.mutateAsync({ id, input: { username: editUsername } });
            setEditingId(null);
        } catch (err) {
            alert(err instanceof ApiError ? err.message : 'บันทึกไม่สำเร็จ');
        }
    }

    async function handleDelete(id: number) {
        if (!confirm('ยืนยันลบผู้ใช้นี้?')) return;
        try {
            await deleteUser.mutateAsync(id);
        } catch (err) {
            alert(err instanceof ApiError ? err.message : 'ลบไม่สำเร็จ');
        }
    }

    return (
        <div className="max-w-5xl mx-auto px-6 pt-8 pb-24">
            <h1 className="font-display italic text-4xl mb-6">จัดการผู้ใช้</h1>

            {isLoading ? (
                <div className="text-sm text-center py-16">กำลังโหลด...</div>
            ) : (
                <table className="w-full border-collapse text-sm">
                    <thead>
                        <tr>
                            <th className="text-left font-mono text-[11px] uppercase tracking-wide px-2.5 py-2 border-b-2">
                                ผู้ใช้
                            </th>
                            <th className="text-left font-mono text-[11px] uppercase tracking-wide px-2.5 py-2 border-b-2">
                                อีเมล
                            </th>
                            <th className="text-left font-mono text-[11px] uppercase tracking-wide px-2.5 py-2 border-b-2">
                                สิทธิ์
                            </th>
                            <th className="text-left font-mono text-[11px] uppercase tracking-wide px-2.5 py-2 border-b-2">
                                สถานะ
                            </th>
                            <th className="text-left font-mono text-[11px] uppercase tracking-wide px-2.5 py-2 border-b-2">
                                จัดการ
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u.id}>
                                <td className="px-2.5 py-3 border-b border-paperline align-middle">
                                    {editingId === u.id ? (
                                        <input
                                            value={editUsername}
                                            onChange={(e) => setEditUsername(e.target.value)}
                                            className="text-sm px-1.5 py-1 border border-paperline rounded-sm"
                                        />
                                    ) : (
                                        u.username
                                    )}
                                </td>
                                <td className="px-2.5 py-3 border-b border-paperline align-middle">
                                    {u.email}
                                </td>
                                <td className="px-2.5 py-3 border-b border-paperline align-middle">
                                    <span className="inline-flex py-0.5 rounded-full text-[11px] font-mono font-semibold bg-paperline text-ink">
                                        {u.role === 'SUPER_ADMIN' ? 'Admin' : 'User'}
                                    </span>
                                </td>
                                <td className="px-2.5 py-3 border-b border-paperline align-middle">
                                    <span
                                        className={`inline-flex py-0.5 rounded-full text-[11px] font-mono font-semibold ${u.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-orange-50 text-orange-700'
                                            }`}
                                    >
                                        {u.isActive ? 'Active' : 'รออนุมัติ'}
                                    </span>
                                </td>
                                <td className="px-2.5 py-3 border-b border-paperline align-middle">
                                    <div className="flex gap-1.5">
                                        {!u.isActive && (
                                            <button
                                                onClick={() => handleActivate(u.id)}
                                                className="border cursor-pointer bg-stamp text-paper text-xs font-medium rounded-sm px-2.5 py-1.5 hover:bg-stampdark transition-colors"
                                            >
                                                อนุมัติ
                                            </button>
                                        )}
                                        {editingId === u.id ? (
                                            <>
                                                <button
                                                    onClick={() => saveEdit(u.id)}
                                                    className="border cursor-pointer text-xs rounded-sm px-2.5 py-1.5 hover:bg-ink hover:text-paper transition-colors"
                                                >
                                                    บันทึก
                                                </button>
                                                <button
                                                    onClick={() => setEditingId(null)}
                                                    className="border cursor-pointer text-xs rounded-sm px-2.5 py-1.5 hover:bg-paperline transition-colors"
                                                >
                                                    ยกเลิก
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                onClick={() => startEdit(u)}
                                                className="border cursor-pointer text-xs rounded-sm px-2.5 py-1.5 hover:bg-paperline transition-colors"
                                            >
                                                แก้ไข
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDelete(u.id)}
                                            className="border border-stamp cursor-pointer text-stamp text-xs rounded-sm px-2.5 py-1.5 hover:bg-stamp hover:text-paper transition-colors"
                                        >
                                            ลบ
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
