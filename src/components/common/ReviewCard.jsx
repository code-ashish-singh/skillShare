import { Star } from "lucide-react";

export default function ReviewCard({ review }) {
  // Support both backend API shape and legacy static shape
  const author = review.user?.name || review.author || "Anonymous";
  const avatar = review.user?.avatar || review.avatar || "https://i.pravatar.cc/150";
  const rating = review.rating || 0;
  const date = review.createdAt || review.date;
  const text = review.comment || review.text || "";

  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-3">
        <img src={avatar} alt={author} className="w-10 h-10 rounded-full object-cover" />
        <div>
          <p className="font-semibold text-gray-800 text-sm">{author}</p>
          {date && <p className="text-xs text-gray-400">{new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>}
        </div>
        <div className="ml-auto flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={13} className={i < rating ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"} />
          ))}
        </div>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
    </div>
  );
}
