import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Loader } from "lucide-react";
import { blogService } from "../../services/api";

export default function BlogDetailPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    blogService.getById(id)
      .then(res => setBlog(res.data.data?.blog || res.data.blog))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="flex justify-center py-32"><Loader size={28} className="animate-spin text-primary" /></div>;
  if (notFound || !blog) return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <p className="text-gray-400 text-lg mb-4">Blog nahi mila.</p>
      <Link to="/blogs" className="text-primary font-semibold hover:underline">← Wapas Blogs pe jao</Link>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <Link to="/blogs" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary mb-8 transition-colors">
        <ArrowLeft size={15} /> Wapas Blogs
      </Link>

      {blog.coverImage && (
        <img src={blog.coverImage} alt={blog.title} className="w-full h-64 sm:h-80 object-cover rounded-2xl mb-8" />
      )}

      <span className="badge bg-primary-50 text-primary mb-4 inline-block">{blog.category}</span>
      <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-snug">{blog.title}</h1>

      <div className="flex items-center gap-3 text-sm text-gray-400 mb-6">
        <span>{blog.author?.name || "Admin"}</span>
        <span>•</span>
        <span>{new Date(blog.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
        <span>•</span>
        <span className="flex items-center gap-1"><Clock size={13} /> {blog.readTime} read</span>
      </div>

      {blog.excerpt && (
        <p className="text-gray-500 text-lg leading-relaxed border-l-4 border-primary pl-4 mb-8 italic">{blog.excerpt}</p>
      )}

      <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
        {blog.content}
      </div>
    </div>
  );
}
