import React from "react";
import { Quote } from "lucide-react";

export default function FounderSection() {
  return (
    <section id="founder-story" className="py-16 bg-slate-50/40 relative overflow-hidden bg-dot-pattern">
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
          FOUNDER NOTE
        </span>

        <div className="mt-8 relative max-w-2xl mx-auto">
          <Quote className="w-10 h-10 text-purple-200/60 absolute -top-4 -left-6 opacity-60 pointer-events-none" />
          <p className="text-lg md:text-xl font-medium text-slate-700 leading-relaxed italic relative z-10">
            "I built this platform to make consistent online visibility easier for everyone. Great ideas deserve to be seen, and maintaining a strong social presence shouldn't feel overwhelming."
          </p>
        </div>

        {/* Minimal Signature details */}
        <div className="mt-6 flex flex-col items-center gap-1">
          <div className="text-lg font-cursive font-bold text-gradient select-none pl-2 tracking-wide">
            Tahmina S.
          </div>
          <div className="text-xs font-bold text-slate-800 tracking-wide mt-1">Tahmina Sadaf</div>
          <div className="text-[10px] text-slate-400 font-mono">Founder & Lead Product Strategist</div>
        </div>
      </div>
    </section>
  );
}
