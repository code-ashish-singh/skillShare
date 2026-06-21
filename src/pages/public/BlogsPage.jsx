import { useState, useEffect } from "react";
import { Search, Loader } from "lucide-react";
import { blogService } from "../../services/api";
import BlogCard from "../../components/common/BlogCard";

const CATS = ["All", "Hiring Tips", "Design", "Development", "Business", "Marketing", "Guide", "News"];

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(async () => {
      setLoading(true);
      try {
        const params = { limit: 20 };
        if (search) params.search = search;
        if (category !== "All") params.category = category;
        const res = await blogService.getAll(params);
        setBlogs(res.data.data || []);
      } catch {
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [search, category]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">SkillShare Blog</h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">Tips, guides and insights for skill seekers and providers</p>
      </div>

      {/* Featured post */}
      {!loading && blogs.length > 0 && (
        <div className="card p-0 overflow-hidden mb-12 grid grid-cols-1 lg:grid-cols-2">
          <div className="h-64 lg:h-auto overflow-hidden bg-gray-100">
            {blogs[0].coverImage
              ? <img src={blogs[0].coverImage} alt={blogs[0].title} className="w-full h-full object-cover" />
              : <div className="w-full h-full flex items-center justify-center text-gray-300 text-6xl">📝</div>
            }
          </div>
          <div className="p-8 flex flex-col justify-center">
            <span className="badge bg-primary-50 text-primary mb-3">{blogs[0].category}</span>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{blogs[0].title}</h2>
            <p className="text-gray-500 leading-relaxed mb-5">{blogs[0].excerpt}</p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>{blogs[0].author?.name || "Admin"}</span>
              <span>•</span>
              <span>{new Date(blogs[0].createdAt).toLocaleDateString("en-IN", { month: "long", day: "numeric", year: "numeric" })}</span>
              <span>•</span>
              <span>{blogs[0].readTime} read</span>
            </div>
          </div>
        </div>
      )}

      {/* Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search articles..." className="input pl-9 h-10" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {CATS.map(c => (
            <button key={c} onClick={() => setCategory(c)} className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${category === c ? "bg-primary text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-primary hover:text-primary"}`}>{c}</button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader size={28} className="animate-spin text-primary" /></div>
      ) : blogs.length <= 1 && !loading ? (
        <p className="text-center text-gray-400 py-10">No blogs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.slice(1).map(b => <BlogCard key={b._id} blog={b} />)}
        </div>
      )}
    </div>
  );
}
