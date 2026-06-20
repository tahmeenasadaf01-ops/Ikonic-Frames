import React from "react";
import { Sparkles, Mail, CircleHelp, Globe2 } from "lucide-react";

export default function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Logo Brand Pitch */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span className="text-lg font-extrabold text-white font-sans tracking-tight">Ikonic Frames</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
              Premium intelligence engine tailored to assist creators, startups, and modern founders establish absolute automated authority.
            </p>
          </div>

          {/* Quick Navulations */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold">Solutions</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#try-now-wizard" className="hover:text-purple-400 transition-colors">Campaign Drafts</a></li>
              <li><a href="#pricing" className="hover:text-purple-400 transition-colors">Premium Plans</a></li>
              <li><a href="#founder-story" className="hover:text-purple-400 transition-colors">Founder Story</a></li>
            </ul>
          </div>

          {/* Platform Capabilities */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold">Supported Outlets</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2"><span>Instagram Engine</span></li>
              <li className="flex items-center gap-2"><span>LinkedIn Corporate</span></li>
              <li className="flex items-center gap-2"><span>Facebook Hub</span></li>
            </ul>
          </div>

          {/* Direct Support Contacts */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold">Support & Inquiries</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="hover:text-white transition duration-200 cursor-pointer">tahmeenasadaf01@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-pink-400 shrink-0" />
                <span>Global Secure Server Active</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Minimal details */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {currentYear} Ikonic Frames. Built with absolute visual craftsmanship.</p>
          <div className="flex gap-6">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Guidelines</span>
            <span className="hover:text-slate-300 cursor-pointer">Platform Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
