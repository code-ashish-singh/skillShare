import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";

export default function BlogCard({ blog }) {
  const { id, title, image, category, author, date, readTime, excerpt } = blog;
  return (
    <div className="card p-0 overflow-hidden hover:shadow-lg transition-all duration-200 group">
      <div className="overflow-hidden h-44">
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-5">
        <span className="badge bg-primary-50 text-primary mb-2">{category}</span>
        <h3 className="font-semibold text-gray-800 text-base leading-snug mb-2 line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">{excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Clock size={12} />
            <span>{readTime} read</span>
          </div>
          <Link to={`/blogs`} className="text-sm font-semibold text-primary flex items-center gap-1 hover:gap-2 transition-all">
            Read More <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}
