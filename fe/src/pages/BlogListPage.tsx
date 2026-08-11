import { useEffect, useState } from "react";
import { useBlogs } from "../hook/useBlogApi";
import { Link } from "react-router-dom";



function excerpt(content: string, len = 160) {
    const clean = content.replace(/\s+/g, ' ').trim();
    return clean.length > len ? clean.slice(0, len) + '…' : clean;
}

export default function BlogListPage() {
    const [search, setSearch] = useState('')
    const [debouncedSearch, setDebouncedSearch] = useState('')

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(search), 300)
        return () => clearTimeout(timer)
    }, [search])

    const { data: blogs = [], isLoading } = useBlogs(debouncedSearch)

    return (
        <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-end justify-between gap-4 flex-wrap py-10">
                <h1 className="font-display italic text-4xl font-medium m-0">บทความทั้งหมด</h1>
                <div className="flex items-center gap-2 border-b-[1.5px] border-stone-300 px-1 py-1.5 min-w-[220px]">
                    <span className="text-pencil">⌕</span>
                    <input
                        placeholder="ค้นหาบทความ..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-transparent outline-none text-sm w-full"
                    />
                </div>
            </div>

            {isLoading ? (
                <div className="text-pencil text-sm text-center py-16">กำลังโหลด...</div>
            ) : blogs.length === 0 ? (
                <div className="text-center py-20 text-pencil">
                    <div className="font-display italic text-5xl text-paperline mb-2">¶</div>
                    {debouncedSearch ? 'ไม่พบบทความที่ค้นหา' : 'ยังไม่มีบทความ เริ่มเขียนเรื่องแรกของคุณเลย'}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-20">
                    {blogs.map((blog) => (
                        <Link
                            to={`/blogs/${blog.id}`}
                            key={blog.id}
                            className="group flex flex-col justify-between bg-white/60 border border-paperline rounded-sm p-5 hover:border-ink hover:shadow-[3px_3px_0_var(--paper-line)] transition-all"
                        >
                            <div>
                                <h2 className="font-display text-xl font-semibold leading-snug mb-2 group-hover:text-stamp transition-colors">
                                    {blog.title}
                                </h2>
                                <p className="text-sm text-neutral-600 leading-relaxed">{excerpt(blog.content)}</p>
                            </div>
                            <div className="font-mono text-xs text-pencil mt-4 pt-3 border-t border-paperline flex justify-between">
                                <span>{blog.author.username}</span>
                                <span>{new Date(blog.createdAt).toLocaleDateString('th-TH')}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}