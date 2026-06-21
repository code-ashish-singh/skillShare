import { Link } from "react-router-dom";
import { Star, CheckCircle, ArrowRight } from "lucide-react";

export default function SkillCard({ skill, view = "grid" }) {
  const { _id, title, category, tags, startingPrice, rating, completedProjects, provider } = skill;
  const providerName = provider?.name || "Provider";
  const providerAvatar = provider?.avatar || "https://i.pravatar.cc/150";
  const verified = provider?.providerProfile?.verificationStatus === "Verified";

  if (view === "list") {
    return (
      <div className="card flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:shadow-lg transition-all duration-200">
        <img src={providerAvatar} alt={providerName} className="w-16 h-16 rounded-2xl object-cover flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500 mt-0.5">{providerName}</p>
          <p className="text-xs text-gray-400 mt-0.5">{category}</p>
          <div className="flex items-center gap-4 mt-2">
            <span className="flex items-center gap-1 text-sm text-amber-500 font-semibold"><Star size={13} fill="currentColor" /> {(rating || 0).toFixed(1)}</span>
            {verified && <span className="flex items-center gap-1 text-xs text-green-600"><CheckCircle size={12} /> Verified</span>}
            <span className="text-xs text-gray-400">{completedProjects || 0} projects done</span>
          </div>
          {tags?.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {tags.slice(0, 4).map(t => <span key={t} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{t}</span>)}
            </div>
          )}
        </div>
        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="text-right">
            <p className="text-xs text-gray-400">Starting at</p>
            <p className="text-lg font-bold text-primary">₹{startingPrice || 0}</p>
          </div>
          <Link to={`/provider/${provider?._id}`} className="btn-primary flex items-center gap-1 whitespace-nowrap">
            View <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="card hover:shadow-lg transition-all duration-200 group">
      <div className="flex items-start justify-between mb-4">
        <img src={providerAvatar} alt={providerName} className="w-12 h-12 rounded-2xl object-cover ring-2 ring-gray-100" />
        <span className="badge bg-primary-50 text-primary text-xs">₹{startingPrice || 0}+</span>
      </div>
      <h3 className="font-semibold text-gray-800 text-base leading-tight">{title}</h3>
      <p className="text-sm text-gray-500 mt-0.5 truncate">{providerName}</p>
      <p className="text-xs text-gray-400 mt-0.5 truncate">{category}</p>
      <div className="flex items-center gap-3 mt-3">
        <span className="flex items-center gap-1 text-sm text-amber-500 font-bold"><Star size={13} fill="currentColor" /> {(rating || 0).toFixed(1)}</span>
        {verified && <span className="flex items-center gap-1 text-xs text-green-600"><CheckCircle size={12} /> Verified</span>}
        <span className="text-xs text-gray-400 ml-auto">{completedProjects || 0} done</span>
      </div>
      {tags?.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {tags.slice(0, 3).map(t => <span key={t} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{t}</span>)}
        </div>
      )}
      <Link to={`/provider/${provider?._id}`} className="mt-4 btn-primary w-full text-center flex items-center justify-center gap-1 group-hover:gap-2 transition-all">
        View Provider <ArrowRight size={14} />
      </Link>
    </div>
  );
}
