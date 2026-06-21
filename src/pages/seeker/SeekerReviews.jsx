import { useState, useEffect } from "react";
import { Star, Trash2, Loader } from "lucide-react";
import { reviewService } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function SeekerReviews() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReviews = async () => {
    setLoading(true);
    try {
      // Provider reviews fetch karo apne id se
      const res = await reviewService.getProviderReviews(user._id);
      // Sirf apne reviews filter karo
      const mine = (res.data.data || []).filter(r => r.user?._id === user._id || r.user === user._id);
      setReviews(mine);
    } catch {
      setError("Failed to load reviews.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      await reviewService.delete(id);
      setReviews(prev => prev.filter(r => r._id !== id));
    } catch {
      alert("Failed to delete review. Please try again.");
    }
  };

  if (loading) return (
    <div className="flex justify-center py-20">
      <Loader size={28} className="animate-spin text-primary" />
    </div>
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Reviews</h1>
        <p className="text-gray-500 mt-1">Reviews you have given to providers</p>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <Star size={32} className="mx-auto mb-3 opacity-30" />
            <p>No reviews yet. Complete a project and leave your first review.</p>
          </div>
        ) : reviews.map(r => (
          <div key={r._id} className="card">
            <div className="flex items-start gap-4">
              <img
                src={r.provider?.avatar || "https://i.pravatar.cc/150"}
                alt={r.provider?.name}
                className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800">{r.provider?.name}</h3>
                    <p className="text-xs text-gray-400">{r.skill?.title || ""}</p>
                    <div className="flex items-center gap-0.5 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={13} className={i < r.rating ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"} />
                      ))}
                      <span className="text-xs text-gray-400 ml-2">
                        {new Date(r.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(r._id)}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-3 leading-relaxed">{r.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
