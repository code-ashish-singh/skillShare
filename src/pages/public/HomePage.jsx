import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Star, ArrowRight, CheckCircle, Zap, Globe, Smartphone, Palette, PenTool, Type, TrendingUp } from "lucide-react";
import { providers } from "../../data/providers";
import { blogs } from "../../data/blogs";
import { testimonials } from "../../data/reviews";
import ProviderCard from "../../components/common/ProviderCard";
import BlogCard from "../../components/common/BlogCard";

const skills = [
  { icon: Globe, label: "Web Development", color: "bg-blue-50 text-blue-600", providers: 120 },
  { icon: Smartphone, label: "Mobile Development", color: "bg-purple-50 text-purple-600", providers: 84 },
  { icon: Palette, label: "UI/UX Design", color: "bg-pink-50 text-pink-600", providers: 97 },
  { icon: PenTool, label: "Graphic Design", color: "bg-orange-50 text-orange-600", providers: 143 },
  { icon: Type, label: "Content Writing", color: "bg-green-50 text-green-600", providers: 206 },
  { icon: TrendingUp, label: "Digital Marketing", color: "bg-teal-50 text-teal-600", providers: 89 },
];

const steps = [
  { step: "01", title: "Search", desc: "Browse through hundreds of skilled professionals across 50+ categories." },
  { step: "02", title: "Connect", desc: "View profiles, portfolios, and reviews to find your perfect match." },
  { step: "03", title: "Book", desc: "Choose a plan and book instantly with secure payment protection." },
  { step: "04", title: "Complete", desc: "Receive your work on time and leave a review to help others." },
];

export default function HomePage() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/explore?q=${search}`);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-blue-50 py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary-50 text-primary text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                <Zap size={12} /> 2,400+ verified skill providers
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Find the perfect<br />
                <span className="text-primary">skill provider</span><br />
                for your project
              </h1>
              <p className="text-lg text-gray-500 mb-8 leading-relaxed max-w-lg">
                Connect with top-tier freelancers for web, design, mobile, and more. Quality work, transparent pricing.
              </p>
              <form onSubmit={handleSearch} className="flex gap-3 mb-6 max-w-lg">
                <div className="flex-1 relative">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input value={search} onChange={e => setSearch(e.target.value)} type="text" placeholder="Search for a skill (e.g. React developer)" className="input pl-11 h-12 text-base shadow-sm" />
                </div>
                <button type="submit" className="btn-primary px-6 h-12 text-base">Search</button>
              </form>
              <div className="flex flex-wrap gap-2">
                {["Web Dev", "UI Design", "Mobile App", "Logo Design", "Content"].map(tag => (
                  <Link key={tag} to={`/explore?q=${tag}`} className="text-xs bg-white border border-gray-200 px-3 py-1.5 rounded-full text-gray-600 hover:border-primary hover:text-primary transition-all shadow-sm">{tag}</Link>
                ))}
              </div>
            </div>
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {providers.slice(0, 4).map(p => (
                <div key={p.id} className="card hover:shadow-lg transition-all duration-200 flex items-center gap-3 py-4">
                  <img src={p.avatar} alt={p.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-gray-800 truncate">{p.name}</p>
                    <p className="text-xs text-gray-400 truncate">{p.skill}</p>
                    <div className="flex items-center gap-1 mt-1"><Star size={11} className="text-amber-400 fill-amber-400" /><span className="text-xs font-semibold text-gray-700">{p.rating}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-y border-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[["2,400+", "Skill Providers"], ["18,000+", "Projects Done"], ["4.8★", "Avg Rating"], ["98%", "Satisfaction"]].map(([val, label]) => (
              <div key={label}><p className="text-3xl font-bold text-primary">{val}</p><p className="text-sm text-gray-500 mt-1">{label}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Skills */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Browse Popular Skills</h2>
            <p className="text-gray-500">Find experts across every digital discipline</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {skills.map(({ icon: Icon, label, color, providers: count }) => (
              <Link key={label} to={`/explore?category=${label}`} className="card flex flex-col items-center text-center py-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group">
                <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon size={22} />
                </div>
                <p className="font-semibold text-gray-800 text-sm">{label}</p>
                <p className="text-xs text-gray-400 mt-1">{count} providers</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Providers */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Providers</h2>
              <p className="text-gray-500">Hand-picked top-rated professionals</p>
            </div>
            <Link to="/explore" className="btn-outline flex items-center gap-2">See All <ArrowRight size={16} /></Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {providers.filter(p => p.featured).map(p => <ProviderCard key={p.id} provider={p} />)}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">How SkillShare Works</h2>
            <p className="text-gray-500">From search to success in 4 simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-10 left-[calc(12.5%+20px)] right-[calc(12.5%+20px)] h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
            {steps.map(({ step, title, desc }, i) => (
              <div key={step} className="text-center relative">
                <div className="w-20 h-20 rounded-full bg-primary text-white text-2xl font-bold flex items-center justify-center mx-auto mb-5 shadow-lg2">
                  {step}
                </div>
                <h3 className="font-bold text-gray-800 text-lg mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">What Our Users Say</h2>
            <p className="text-gray-500">Real stories from satisfied clients</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.id} className="card">
                <div className="flex items-center gap-0.5 mb-4">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={14} className="text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blogs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Latest from the Blog</h2>
              <p className="text-gray-500">Tips, guides, and industry insights</p>
            </div>
            <Link to="/blogs" className="btn-outline flex items-center gap-2">All Articles <ArrowRight size={16} /></Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogs.slice(0, 3).map(b => <BlogCard key={b.id} blog={b} />)}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to get started?</h2>
          <p className="text-primary-100 text-lg mb-8">Join thousands of businesses and professionals already using SkillShare.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/explore" className="bg-white text-primary font-semibold px-8 py-3.5 rounded-xl hover:bg-primary-50 transition-colors text-base">Find a Provider</Link>
            <Link to="/signup" className="border-2 border-white text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-colors text-base">Become a Provider</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
