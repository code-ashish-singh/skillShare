import { Star, Edit, Trash2 } from "lucide-react";
import { reviews } from "../../data/reviews";
import { providers } from "../../data/providers";

export default function SeekerReviews() {
  const myReviews = reviews.slice(0, 3).map(r => ({
    ...r,
    provider: providers.find(p => p.id === r.providerId),
  }));

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Reviews</h1>
        <p className="text-gray-500 mt-1">Reviews you've left for providers</p>
      </div>
      <div className="space-y-4">
        {myReviews.map(r => (
          <div key={r.id} className="card">
            <div className="flex items-start gap-4">
              <img src={r.provider?.avatar} alt={r.provider?.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800">{r.provider?.name}</h3>
                    <p className="text-xs text-gray-400">{r.provider?.skill}</p>
                    <div className="flex items-center gap-0.5 mt-2">
                      {[...Array(5)].map((_, i) => <Star key={i} size={13} className={i < r.rating ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"} />)}
                      <span className="text-xs text-gray-400 ml-2">{new Date(r.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary-50 rounded-lg transition-all"><Edit size={15} /></button>
                    <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={15} /></button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-3 leading-relaxed">{r.text}</p>
              </div>
            </div>
          </div>
        ))}
        {myReviews.length === 0 && <div className="text-center py-16 text-gray-400"><Star size={32} className="mx-auto mb-3 opacity-30" /><p>No reviews yet. Complete a project to leave a review.</p></div>}
      </div>
    </div>
  );
}
