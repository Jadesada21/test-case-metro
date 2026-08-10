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
        <div className="container">
            <div className="page-head">
                <h1 className="page-title">บทความทั้งหมด</h1>
                <div className="search-box">
                    <span style={{ color: 'var(--pencil)' }}>⌕</span>
                    <input
                        placeholder="ค้นหาบทความ..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {isLoading ? (
                <div className="loading-text">กำลังโหลด...</div>
            ) : blogs.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state-mark">¶</div>
                    {debouncedSearch ? 'ไม่พบบทความที่ค้นหา' : 'ยังไม่มีบทความ เริ่มเขียนเรื่องแรกของคุณเลย'}
                </div>
            ) : (
                <div className="blog-list">
                    {blogs.map((blog) => (
                        <article className="blog-entry" key={blog.id}>
                            <Link to={`/blogs/${blog.id}`}>
                                <h2 className="blog-entry-title">{blog.title}</h2>
                            </Link>
                            <div className="blog-entry-meta">
                                {blog.author.username} · {new Date(blog.createdAt).toLocaleDateString('th-TH')}
                            </div>
                            <p className="blog-entry-excerpt">{excerpt(blog.content)}</p>
                        </article>
                    ))}
                </div>
            )}
            <div className="page-footer-space" />
        </div>
    );
}