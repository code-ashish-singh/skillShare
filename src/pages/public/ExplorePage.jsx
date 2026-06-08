import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, Grid3X3, List, Loader } from "lucide-react";
import { providerService } from "../../services/api";
import ProviderCard from "../../components/common/ProviderCard";

const CATEGORIES = [
  "All", "Web Development", "Mobile Development", "UI/UX Design",
  "Graphic Design", "Content Writing", "Digital Marketing", "Data Science",
  "Video Production", "Photography", "Other",
];

export default function ExplorePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "All");
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState("-createdAt");
  const [view, setView] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);

  const [providers, setProviders] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProviders = useCallback(async (page = 1) => {
    setLoading(true);
    setError("");
    try {
      const params = { page, limit: 12, sort };
      if (search.trim()) params.search = search.trim();
      if (category !== "All") params.category = category;
      if (minRating > 0) params.minRating = minRating;

      const res = await providerService.getAll(params);
      setProviders(res.data.data);
      setPagination(res.data.pagination);
    } catch {
      setError("Failed to load providers. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [search, category, minRating, sort]);

  // Sync URL params and fetch on filter change
  useEffect(() => {
    const params = {};
    if (search) params.q = search;
    if (category !== "All") params.category = category;
    setSearchParams(params, { replace: true });

    const delay = setTimeout(() => fetchProviders(1), 400);
    return () => clearTimeout(delay);
  }, [search, category, minRating, sort]);

  // Initial load from URL
  useEffect(() => {
    fetchProviders(1);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore Skill Providers</h1>
        <p className="text-gray-500">{loading ? "Loading..." : `${pagination.total} professionals available`}</p>
      </div>

      {/* Search & Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or skill..."
            className="input pl-11 h-11"
          />
        </div>
        <select value={sort} onChange={e => setSort(e.target.value)} className="input h-11 w-auto cursor-pointer">
          <option value="-providerProfile.rating">Sort: Top Rated</option>
          <option value="-providerProfile.completedProjects">Most Projects</option>
          <option value="-createdAt">Newest</option>
        </select>
        <button onClick={() => setShowFilters(!showFilters)} className="btn-outline flex items-center gap-2 h-11">
          <SlidersHorizontal size={16} /> Filters
        </button>
        <div className="flex border border-gray-200 rounded-xl overflow-hidden">
          <button onClick={() => setView("grid")} className={`px-3 py-2 ${view === "grid" ? "bg-primary text-white" : "bg-white text-gray-500 hover:bg-gray-50"}`}><Grid3X3 size={18} /></button>
          <button onClick={() => setView("list")} className={`px-3 py-2 ${view === "list" ? "bg-primary text-white" : "bg-white text-gray-500 hover:bg-gray-50"}`}><List size={18} /></button>
        </div>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div className="card mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Min Rating: {minRating}+</label>
            <input type="range" min={0} max={5} step={0.5} value={minRating} onChange={e => setMinRating(Number(e.target.value))} className="w-full accent-primary" />
            <div className="flex justify-between text-xs text-gray-400 mt-1"><span>Any</span><span>5.0</span></div>
          </div>
          <div className="flex items-end">
            <button onClick={() => { setMinRating(0); setCategory("All"); setSearch(""); }} className="btn-outline text-sm">Reset Filters</button>
          </div>
        </div>
      )}

      {/* Category pills */}
      <div className="flex gap-2 flex-wrap mb-6">
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCategory(c)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${category === c ? "bg-primary text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-primary hover:text-primary"}`}>{c}</button>
        ))}
      </div>

      {/* Results */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader size={32} className="animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <p className="text-red-500">{error}</p>
          <button onClick={() => fetchProviders(1)} className="btn-primary mt-4">Retry</button>
        </div>
      ) : providers.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">🔍</p>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No providers found</h3>
          <p className="text-gray-400">Try adjusting your search or filters</p>
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {providers.map(p => <ProviderCard key={p._id} provider={p} view="grid" />)}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {providers.map(p => <ProviderCard key={p._id} provider={p} view="list" />)}
        </div>
      )}

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(p => (
            <button key={p} onClick={() => fetchProviders(p)} className={`w-9 h-9 rounded-lg text-sm font-semibold transition-all ${pagination.page === p ? "bg-primary text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-primary"}`}>{p}</button>
          ))}
        </div>
      )}
    </div>
  );
}
