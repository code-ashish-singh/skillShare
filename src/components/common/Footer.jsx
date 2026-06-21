import { Link } from "react-router-dom";
import { Zap, Mail, Globe, Rss, Users, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl text-white mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center"><Zap size={18} className="text-white" /></div>
              SkillShare
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">The marketplace connecting talented skill providers with seekers who need expert help.</p>
            <div className="flex gap-3 mt-5">
              {[Globe, Rss, Users, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors"><Icon size={16} /></a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <div className="space-y-2.5">
              {[["Explore Providers", "/explore"], ["How It Works", "/"], ["Blogs", "/blogs"], ["Become a Provider", "/signup"]].map(([label, to]) => (
                <Link key={to} to={to} className="block text-sm text-gray-400 hover:text-white transition-colors">{label}</Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Skills</h4>
            <div className="space-y-2.5">
              {["Web Development", "Mobile Apps", "UI/UX Design", "Graphic Design", "Content Writing", "Digital Marketing"].map(s => (
                <Link key={s} to="/explore" className="block text-sm text-gray-400 hover:text-white transition-colors">{s}</Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <div className="space-y-2.5">
              {["About Us", "Careers", "Press", "Privacy Policy", "Terms of Service", "Contact"].map(s => (
                <a key={s} href="#" className="block text-sm text-gray-400 hover:text-white transition-colors">{s}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">© 2025 SkillShare. All rights reserved.</p>
          <p className="text-xs text-gray-500">Made with ❤️ for skilled professionals worldwide</p>
        </div>
      </div>
    </footer>
  );
}
