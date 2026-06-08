import { Link } from "react-router-dom";
import { Star, CheckCircle, ArrowRight } from "lucide-react";

export default function ProviderCard({ provider, view = "grid" }) {
  const {
    _id,
    name,
    avatar,
    location,
    providerProfile,
  } = provider;

  const firstSkill = providerProfile?.skills?.[0];
  const skillTitle = firstSkill?.title || "Skill Provider";
  const rating = providerProfile?.rating || 0;
  const totalReviews = providerProfile?.totalReviews || 0;
  const completedProjects = providerProfile?.completedProjects || 0;
  const startingPrice = firstSkill?.startingPrice || 0;

  if (view === "list") {
    return (
      <div className="card flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:shadow-lg transition-all duration-200">
        <img src={avatar || "https://i.pravatar.cc/150"} alt={name} className="w-16 h-16 rounded-2xl object-cover flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800">{name}</h3>
          <p className="text-sm text-gray-500 mt-0.5">{skillTitle}</p>
          {location && <p className="text-xs text-gray-400 mt-0.5">{location}</p>}
          <div className="flex items-center gap-4 mt-2">
            <span className="flex items-center gap-1 text-sm text-amber-500 font-semibold"><Star size={13} fill="currentColor" /> {rating.toFixed(1)}</span>
            <span className="text-xs text-gray-400">({totalReviews} reviews)</span>
            <span className="flex items-center gap-1 text-xs text-green-600"><CheckCircle size={12} /> {completedProjects} projects</span>
          </div>
        </div>
        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="text-right">
            <p className="text-xs text-gray-400">Starting at</p>
            <p className="text-lg font-bold text-primary">${startingPrice}</p>
          </div>
          <Link to={`/provider/${_id}`} className="btn-primary flex items-center gap-1 whitespace-nowrap">
            View Profile <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="card hover:shadow-lg transition-all duration-200 group">
      <div className="flex items-start justify-between mb-4">
        <img src={avatar || "https://i.pravatar.cc/150"} alt={name} className="w-14 h-14 rounded-2xl object-cover ring-2 ring-gray-100" />
        <span className="badge bg-primary-50 text-primary text-xs">${startingPrice}+</span>
      </div>
      <h3 className="font-semibold text-gray-800 text-base">{name}</h3>
      <p className="text-sm text-gray-500 mt-0.5 truncate">{skillTitle}</p>
      {location && <p className="text-xs text-gray-400 mt-0.5 truncate">{location}</p>}
      <div className="flex items-center gap-3 mt-3">
        <span className="flex items-center gap-1 text-sm text-amber-500 font-bold"><Star size={13} fill="currentColor" /> {rating.toFixed(1)}</span>
        <span className="text-xs text-gray-400">({totalReviews})</span>
        <span className="flex items-center gap-1 text-xs text-green-600 font-medium ml-auto"><CheckCircle size={12} /> {completedProjects} done</span>
      </div>
      <Link to={`/provider/${_id}`} className="mt-4 btn-primary w-full text-center flex items-center justify-center gap-1 group-hover:gap-2 transition-all">
        View Profile <ArrowRight size={14} />
      </Link>
    </div>
  );
}
