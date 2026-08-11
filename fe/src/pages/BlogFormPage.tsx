import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBlog, useCreateBlog, useUpdateBlog } from "../hook/useBlogApi";
import { ApiError } from "../lib/apiClient";

export default function BlogFormPage() {
    const { id } = useParams();
    const isEdit = Boolean(id);
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');

    const { data: existingBlog, isLoading: blogLoading } = useBlog(isEdit ? id : undefined);
    const createBlog = useCreateBlog();
    const updateBlog = useUpdateBlog(id || '');

    useEffect(() => {
        if (existingBlog) {
            setTitle(existingBlog.title);
            setContent(existingBlog.content);
        }
    }, [existingBlog]);

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setError('');
        try {
            if (isEdit && id) {
                const blog = await updateBlog.mutateAsync({ title, content });
                navigate(`/blogs/${blog.id}`);
            } else {
                const blog = await createBlog.mutateAsync({ title, content });
                navigate(`/blogs/${blog.id}`);
            }
        } catch (err) {
            setError(err instanceof ApiError ? err.message : 'บันทึกไม่สำเร็จ');
        }
    }

    const submitting = createBlog.isPending || updateBlog.isPending;

    if (isEdit && blogLoading)
        return <div className="max-w-2xl mx-auto px-6 text-sm text-center py-16">กำลังโหลด...</div>;

    return (
        <div className="max-w-2xl mx-auto px-6 pt-8 pb-24 border">
            <p className="font-mono text-md  mb-1">{isEdit ? 'แก้ไขบทความ' : 'เขียนบทความใหม่'}</p>

            {error && (
                <div className="bg-red-50 text-stampdark border border-red-200 text-sm rounded px-3 py-3 mb-5">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input
                        placeholder="หัวข้อบทความ"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full border-0 border-b-2 border-paperline bg-transparent px-0.5 py-2 font-display text-2xl font-semibold focus:outline-none focus:border-stamp transition-colors"
                    />
                </div>
                <div className="mb-4">
                    <textarea
                        placeholder="เนื้อหา"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        rows={14}
                        className="w-full border-0 border-b-[1.5px] border-stone-300 bg-transparent px-0.5 py-2 text-base leading-relaxed focus:outline-none focus:border-stamp transition-colors resize-y"
                    />
                </div>
                <div className="flex gap-2.5">
                    <button
                        type="submit"
                        disabled={submitting}
                        className="bg-stamp text-paper font-medium cursor-pointer border  text-sm rounded-sm px-5 py-2.5 hover:bg-stampdark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {submitting ? 'กำลังบันทึก...' : isEdit ? 'บันทึกการแก้ไข' : 'เผยแพร่บทความ'}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="text-sm px-5 py-2.5 rounded-sm cursor-pointer border  hover:bg-paperline transition-colors"
                    >
                        ยกเลิก
                    </button>
                </div>
            </form >
        </div >
    );
}
