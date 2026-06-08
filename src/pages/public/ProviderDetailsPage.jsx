import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Star, MapPin, Clock, Globe, CheckCircle, MessageCircle, Share2, ChevronRight, Check, Loader, AlertCircle } from "lucide-react";
import { providerService, reviewService, bookingService } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import ReviewCard from "../../components/common/ReviewCard";

export default function ProviderDetailsPage() {
  const { id } = useParams();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [provider, setProvider] = useState(null);
  const [skills, setSkills] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState("about");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingMsg, setBookingMsg] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [provRes, revRes] = await Promise.all([
          providerService.getById(id),
          reviewService.getProviderReviews(id),
        ]);
        const p = provRes.data.data.provider;
        setProvider(p);
        setSkills(p.providerProfile?.skills || []);
        setReviews(revRes.data.data || []);
      } catch {
        setError("Provider not found.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleBook = async (plan) => {
    if (!isAuthenticated) { navigate("/login"); return; }
    if (user?.role !== "skillSeeker") {
      setBookingMsg("Only skill seekers can book services.");
      return;
    }
    setBookingLoading(true);
    setBookingMsg("");
    try {
      await bookingService.create({ planId: plan._id, requirements: "" });
      setBookingMsg("Booking created successfully! Check your bookings.");
      setSelectedPlan(plan);
    } catch (err) {
      setBookingMsg(err.response?.data?.message || "Booking failed. Try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <Loader size={36} className="animate-spin text-primary" />
    </div>
  );

  if (error || !provider) return (
    <div className="text-center py-20">
      <p className="text-gray-500">{error || "Provider not found."}</p>
      <Link to="/explore" className="btn-primary mt-4 inline-block">Back to Explore</Link>
    </div>
  );

  const profile = provider.providerProfile || {};
  const allPlans = skills.flatMap(s => s.plans || []);
  const tabs = ["about", "skills", "portfolio", "reviews"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link to="/explore" className="hover:text-primary">Explore</Link>
        <ChevronRight size={14} />
        <span className="text-gray-600 font-medium">{provider.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column */}
        <div className="lg:col-span-2">
          {/* Header card */}
          <div className="card mb-6">
            <div className="flex flex-col sm:flex-row gap-5">
              <img src={provider.avatar || "https://i.pravatar.cc/150"} alt={provider.name} className="w-24 h-24 rounded-2xl object-cover flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-2xl font-bold text-gray-900">{provider.name}</h1>
                      {profile.verificationStatus === "Verified" && (
                        <span className="flex items-center gap-1 text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-semibold">
                          <CheckCircle size={11} /> Verified
                        </span>
                      )}
                    </div>
                    <p className="text-primary font-semibold mt-0.5">
                      {skills[0]?.title || "Skill Provider"}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 mt-3">
                      {provider.location && <span className="flex items-center gap-1.5 text-sm text-gray-500"><MapPin size={14} className="text-gray-400" />{provider.location}</span>}
                      {profile.responseTime && <span className="flex items-center gap-1.5 text-sm text-gray-500"><Clock size={14} className="text-gray-400" />Responds in {profile.responseTime}</span>}
                      {profile.languages?.length > 0 && <span className="flex items-center gap-1.5 text-sm text-gray-500"><Globe size={14} className="text-gray-400" />{profile.languages.join(", ")}</span>}
                    </div>
                  </div>
                  <button className="p-2 rounded-lg border border-gray-200 hover:border-primary hover:text-primary transition-all"><Share2 size={18} /></button>
                </div>
                <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-100">
                  <div className="text-center">
                    <div className="flex items-center gap-1"><Star size={16} className="text-amber-400 fill-amber-400" /><span className="font-bold text-gray-800">{(profile.rating || 0).toFixed(1)}</span></div>
                    <p className="text-xs text-gray-400 mt-0.5">{profile.totalReviews || 0} reviews</p>
                  </div>
                  <div className="w-px h-8 bg-gray-100" />
                  <div className="text-center">
                    <p className="font-bold text-gray-800">{profile.completedProjects || 0}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Completed</p>
                  </div>
                  <div className="w-px h-8 bg-gray-100" />
                  <div className="text-center">
                    <p className="font-bold text-gray-800">{profile.ongoingProjects || 0}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Ongoing</p>
                  </div>
                  <div className="w-px h-8 bg-gray-100" />
                  <div className="text-center">
                    <p className="font-bold text-gray-800">{profile.pendingProjects || 0}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Pending</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border border-gray-200 rounded-2xl p-1 bg-gray-50 mb-6 gap-1">
            {tabs.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-2.5 text-sm font-semibold rounded-xl capitalize transition-all ${activeTab === tab ? "bg-white text-primary shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>{tab}</button>
            ))}
          </div>

          {/* About */}
          {activeTab === "about" && (
            <div className="card">
              <h3 className="font-bold text-gray-800 text-lg mb-3">About Me</h3>
              <p className="text-gray-600 leading-relaxed mb-6">{provider.bio || "No bio provided."}</p>
              {profile.socialLinks && Object.values(profile.socialLinks).some(Boolean) && (
                <>
                  <h4 className="font-bold text-gray-800 mb-3">Social Links</h4>
                  <div className="flex flex-wrap gap-3">
                    {profile.socialLinks.website && <a href={profile.socialLinks.website} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline">Website</a>}
                    {profile.socialLinks.github && <a href={profile.socialLinks.github} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline">GitHub</a>}
                    {profile.socialLinks.linkedin && <a href={profile.socialLinks.linkedin} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline">LinkedIn</a>}
                    {profile.socialLinks.twitter && <a href={profile.socialLinks.twitter} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline">Twitter</a>}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Skills & Plans */}
          {activeTab === "skills" && (
            <div className="space-y-6">
              {skills.length === 0 ? <p className="text-center text-gray-400 py-8">No skills listed.</p> : skills.map(skill => (
                <div key={skill._id} className="card">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">{skill.title}</h3>
                      <span className="text-xs bg-primary-50 text-primary px-2 py-0.5 rounded-full">{skill.category}</span>
                    </div>
                    <p className="text-sm text-gray-500">From <span className="font-bold text-primary">${skill.startingPrice}</span></p>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{skill.description}</p>
                  {skill.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {skill.tags.map(t => <span key={t} className="badge bg-gray-100 text-gray-600 text-xs">{t}</span>)}
                    </div>
                  )}
                  {skill.plans?.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                      {skill.plans.map((plan, i) => (
                        <div key={plan._id} className={`rounded-xl border p-4 ${i === 1 ? "border-primary bg-primary-50" : "border-gray-200"}`}>
                          <h4 className="font-bold text-gray-800">{plan.name}</h4>
                          <p className="text-2xl font-bold text-primary mt-1">${plan.price}</p>
                          <p className="text-xs text-gray-400 mt-1">{plan.deliveryTime} • {plan.revisions} revisions</p>
                          <div className="mt-3 space-y-1.5">
                            {plan.features?.map(f => (
                              <div key={f} className="flex items-start gap-2 text-xs text-gray-600"><Check size={12} className="text-green-500 mt-0.5 flex-shrink-0" />{f}</div>
                            ))}
                          </div>
                          <button onClick={() => handleBook(plan)} disabled={bookingLoading} className={`mt-4 w-full py-2 rounded-lg text-sm font-semibold transition-all ${i === 1 ? "btn-primary" : "btn-outline"}`}>
                            {bookingLoading && selectedPlan?._id === plan._id ? "Booking..." : "Book Now"}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Portfolio */}
          {activeTab === "portfolio" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {profile.portfolio?.length === 0 || !profile.portfolio ? (
                <p className="text-center text-gray-400 py-8 col-span-3">No portfolio items.</p>
              ) : profile.portfolio.map((item, i) => (
                <div key={item._id || i} className="card p-0 overflow-hidden hover:shadow-lg transition-all group">
                  <div className="overflow-hidden h-36">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-gray-800 text-sm">{item.title}</p>
                    {item.description && <p className="text-xs text-gray-400 mt-1">{item.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Reviews */}
          {activeTab === "reviews" && (
            <div className="space-y-4">
              {reviews.length === 0
                ? <p className="text-center text-gray-400 py-8">No reviews yet.</p>
                : reviews.map(r => <ReviewCard key={r._id} review={r} />)
              }
            </div>
          )}
        </div>

        {/* Right column — booking sidebar */}
        <div>
          <div className="card sticky top-24">
            <p className="text-sm text-gray-500 mb-1">Starting from</p>
            <p className="text-3xl font-bold text-primary mb-4">
              ${skills[0]?.startingPrice || 0}<span className="text-base text-gray-400 font-normal"> /project</span>
            </p>

            {bookingMsg && (
              <div className={`flex items-center gap-2 text-sm p-3 rounded-xl mb-3 ${bookingMsg.includes("success") ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
                <AlertCircle size={15} />{bookingMsg}
              </div>
            )}

            {/* Show first skill's plans in sidebar */}
            {skills[0]?.plans?.map((plan, i) => (
              <button key={plan._id} onClick={() => handleBook(plan)} className={`w-full mb-2 py-2.5 px-4 rounded-xl text-sm font-semibold flex justify-between items-center transition-all border ${selectedPlan?._id === plan._id ? "border-primary bg-primary text-white" : "border-gray-200 text-gray-700 hover:border-primary hover:text-primary"}`}>
                <span>{plan.name}</span><span>${plan.price}</span>
              </button>
            ))}

            <button
              onClick={() => skills[0]?.plans?.[0] ? handleBook(skills[0].plans[0]) : !isAuthenticated && navigate("/login")}
              disabled={bookingLoading}
              className="btn-primary w-full mt-3"
            >
              {bookingLoading ? "Booking..." : isAuthenticated ? "Book Now" : "Login to Book"}
            </button>

            <button className="btn-outline w-full mt-2 flex items-center justify-center gap-2">
              <MessageCircle size={15} /> Contact Provider
            </button>

            <div className="mt-5 pt-5 border-t border-gray-100 space-y-2">
              {[
                `${profile.completedProjects || 0} projects completed`,
                `${profile.totalReviews || 0} verified reviews`,
                profile.responseTime ? `Responds within ${profile.responseTime}` : null,
              ].filter(Boolean).map(t => (
                <div key={t} className="flex items-center gap-2 text-xs text-gray-500"><CheckCircle size={13} className="text-green-500" />{t}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
