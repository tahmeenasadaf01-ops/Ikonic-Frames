import React from "react";
import { Mail, Instagram, Linkedin, MessageCircle } from "lucide-react";
import { motion } from "motion/react";

export default function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800 relative overflow-hidden">
      {/* Decorative interactive background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800 items-start">
          
          {/* Logo Brand Title */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold text-white font-sans tracking-tight">Ikonic Frames</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm font-sans font-light">
              Crafting premium automated campaigns and high-fidelity social strategies for visionary creators, startups, and modern founders.
            </p>
          </div>

          {/* Support & Inquiries */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-purple-400 font-bold">Support & Inquiries</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center gap-2.5">
                <div className="p-1.5 bg-slate-800 rounded-lg border border-slate-700/60">
                  <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                </div>
                <a 
                  href="mailto:tahmeenasadaf01@gmail.com" 
                  className="text-slate-300 hover:text-white transition duration-200 font-mono font-medium border-b border-transparent hover:border-purple-400 pb-0.5"
                >
                  tahmeenasadaf01@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-slate-450">
                <div className="p-1.5 bg-slate-800/40 rounded-lg border border-slate-700/40">
                  <MessageCircle className="w-4 h-4 text-pink-450 shrink-0" />
                </div>
                <span className="font-sans font-light">Direct response usually within 12 hours.</span>
              </li>
            </ul>
          </div>

          {/* Social Media Details */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-pink-400 font-bold">Connect With Us</h4>
            <div className="flex gap-3">
              <motion.a 
                whileHover={{ y: -4, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.instagram.com/_sadaff_66/" 
                target="_blank" 
                rel="noreferrer"
                className="p-2.5 bg-slate-800 text-slate-300 hover:text-white rounded-xl border border-slate-700/60 hover:border-purple-500/50 shadow-sm transition-all flex items-center gap-1.5 text-xs font-medium cursor-pointer"
                aria-label="Instagram Profile"
              >
                <Instagram className="w-4 h-4 text-pink-400" />
                <span>Instagram</span>
              </motion.a>

              <motion.a 
                whileHover={{ y: -4, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.linkedin.com/in/tahmina1707" 
                target="_blank" 
                rel="noreferrer"
                className="p-2.5 bg-slate-800 text-slate-300 hover:text-white rounded-xl border border-slate-700/60 hover:border-purple-500/50 shadow-sm transition-all flex items-center gap-1.5 text-xs font-medium cursor-pointer"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4 text-sky-400" />
                <span>LinkedIn</span>
              </motion.a>
            </div>
          </div>

        </div>

        {/* Legal & Final details */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {currentYear} Ikonic Frames. Built with premium visual craftsmanship.</p>
          <div className="flex gap-6 font-mono text-[10px]">
            <span className="hover:text-slate-300 transition-colors duration-200 cursor-pointer">PRIVACY POLICY</span>
            <span className="hover:text-slate-300 transition-colors duration-200 cursor-pointer">TERMS OF SERVICE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
