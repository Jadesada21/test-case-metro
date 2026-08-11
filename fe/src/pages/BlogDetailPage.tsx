import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useBlog, useDeleteBlog } from "../hook/useBlogApi";
import { useComments, useCreateComment } from "../hook/useComment";
import { ApiError } from "../lib/apiClient";


export default function BlogDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [commentText, setCommentText] = useState('');

    const { data: blog, isLoading: blogLoading, error: blogError } = useBlog(id);
    const { data: comments = [] } = useComments(id);
    const deleteBlog = useDeleteBlog();
    const createComment = useCreateComment(id || '');

    async function handleDelete() {
        if (!blog || !confirm('ยืนยันลบบทความนี้? การกระทำนี้ไม่สามารถย้อนกลับได้')) return;
        try {
            await deleteBlog.mutateAsync(blog.id);
            navigate('/blogs');
        } catch (err) {
            alert(err instanceof ApiError ? err.message : 'ลบไม่สำเร็จ');
        }
    }

    async function handleComment(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!commentText.trim()) return;
        try {
            await createComment.mutateAsync(commentText);
            setCommentText('');
        } catch (err) {
            alert(err instanceof ApiError ? err.message : 'คอมเมนต์ไม่สำเร็จ');
        }
    }

    if (blogLoading) return <div className="max-w-3xl mx-auto px-6 text-sm text-center py-16">กำลังโหลด...</div>;

    if (blogError || !blog)
        return (
            <div className="max-w-3xl mx-auto px-6 py-10">
                <div className="bg-red-50 text-stampdark border border-red-200 text-sm rounded px-3 py-3 mb-5">
                    {blogError instanceof ApiError ? blogError.message : 'ไม่พบบทความ'}
                </div>

                <Link to="/blogs" className="inline-block border px-4 py-2 rounded-sm text-sm hover:bg-ink hover:text-paper transition-colors">
                    ← กลับหน้ารายการ
                </Link>
            </div>
        );

    const isOwner = user?.id === blog.authorId;
    const canDelete = isOwner || user?.role === 'SUPER_ADMIN';

    return (
        <div className="max-w-3xl mx-auto px-6 pt-8 pb-24">
            <Link to="/blogs" className="text-md transition-colors">
                ← กลับหน้ารายการ
            </Link>

            <h1 className="font-display text-4xl font-semibold leading-tight mt-5 mb-3">{blog.title}</h1>

            <div className="font-mono text-xs flex gap-4 items-center mb-7 pb-6 border-b border-paperline">
                <span>โดย {blog.author.username}</span>
                <span>{new Date(blog.createdAt).toLocaleDateString('th-TH', { dateStyle: 'long' })}</span>
            </div>

            {(isOwner || canDelete) && (
                <div className="flex gap-2 mb-8">
                    {isOwner && (
                        <Link
                            to={`/blogs/${blog.id}/edit`}
                            className="border px-3.5 py-1.5 rounded-sm text-sm hover:bg-ink hover:text-paper transition-colors"
                        >
                            แก้ไขบทความ
                        </Link>
                    )}
                    {canDelete && (
                        <button
                            onClick={handleDelete}
                            disabled={deleteBlog.isPending}
                            className="border border-stamp text-stamp px-3.5 py-1.5 rounded-sm text-sm hover:bg-stamp hover:text-paper disabled:opacity-50 transition-colors"
                        >
                            ลบบทความ
                        </button>
                    )}
                </div>
            )}

            <div className="text-[17px] leading-[1.85] whitespace-pre-wrap mb-10">{blog.content}</div>

            <section className="border-t-2 pt-7">
                <h3 className="font-display italic text-xl mb-5">ความคิดเห็น ({comments.length})</h3>

                {comments.length === 0 ? (
                    <p className="text-sm">ยังไม่มีความคิดเห็น เป็นคนแรกที่แสดงความเห็นสิ</p>
                ) : (
                    <div className="space-y-0">
                        {comments.map((c) => (
                            <div key={c.id} className="py-4 border-b border-paperline">
                                <div className="flex items-baseline gap-2.5 mb-1.5">
                                    <span className="font-semibold text-sm">{c.user.username}</span>
                                    <span className="font-mono text-xs">
                                        {new Date(c.createdAt).toLocaleString('th-TH')}
                                    </span>
                                </div>
                                <div className="text-[15px] leading-relaxed">{c.content}</div>
                            </div>
                        ))}
                    </div>
                )}

                <form onSubmit={handleComment} className="flex gap-2.5 mt-5 items-center">
                    <textarea
                        placeholder="แสดงความคิดเห็น..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        rows={2}
                        className="flex-1 border border-paperline rounded-sm px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-stamp resize-y"
                    />

                    <button
                        type="submit"
                        disabled={createComment.isPending || !commentText.trim()}
                        className="bg-stamp text-paper cursor-pointer border font-medium text-md rounded-sm px-4 py-2.5 hover:bg-stampdark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        ส่ง
                    </button>

                </form>
            </section>
        </div >
    );
}
