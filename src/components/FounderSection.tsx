import React, { useState, useRef } from "react";
import { Quote } from "lucide-react";
import { motion } from "motion/react";

export default function FounderSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, isHovered: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isHovered: true,
    });
  };

  return (
    <section 
      id="founder-story" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setMousePos(prev => ({ ...prev, isHovered: true }))}
      onMouseLeave={() => setMousePos(prev => ({ ...prev, isHovered: false }))}
      className="py-24 bg-slate-50/50 relative overflow-hidden bg-dot-pattern cursor-default transition-all duration-300"
    >
      {/* Interactive spotlight cursor halo */}
      {mousePos.isHovered && (
        <div 
          className="absolute pointer-events-none rounded-full blur-[100px] transition-all duration-300 z-0 bg-purple-500/10"
          style={{
            left: mousePos.x - 150,
            top: mousePos.y - 150,
            width: 300,
            height: 300,
          }}
        />
      )}

      {/* Graphical abstract shapes */}
      <motion.div 
        animate={{ 
          y: [0, -12, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[15%] left-[8%] w-16 h-16 rounded-2xl bg-purple-100/40 border border-purple-200/30 backdrop-blur-sm pointer-events-none flex items-center justify-center text-purple-300 text-lg font-mono font-bold"
      >
        ❖
      </motion.div>

      <motion.div 
        animate={{ 
          y: [0, 15, 0],
          rotate: [0, -8, 0]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[15%] right-[8%] w-20 h-20 rounded-full bg-pink-100/40 border border-pink-200/30 backdrop-blur-sm pointer-events-none flex items-center justify-center text-pink-300 text-lg font-mono font-bold"
      >
        ✦
      </motion.div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-black bg-slate-200/50 px-4 py-1.5 rounded-full inline-block">
            ✦ FOUNDER NOTE
          </span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-2xl mx-auto bg-white/40 backdrop-blur-md p-8 md:p-12 rounded-[40px] border border-slate-250/50 shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <Quote className="w-14 h-14 text-purple-200/50 absolute -top-6 -left-6 opacity-50 pointer-events-none" />
          <p className="text-lg md:text-2xl font-light text-slate-700 leading-relaxed italic relative z-10 font-fraunces text-purple-950">
            "I built this platform to make consistent online visibility easier for everyone. Great ideas deserve to be seen, and maintaining a strong social presence shouldn't feel overwhelming."
          </p>
        </motion.div>

        {/* Minimal Signature details */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center gap-1"
        >
          <div className="text-2xl font-cursive font-bold text-gradient select-none pl-2 tracking-wide">
            Tahmina S.
          </div>
          <div className="text-xs font-bold text-slate-800 tracking-wide mt-1">Tahmina Sadaf</div>
          <div className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">Founder & Lead Product Strategist</div>

          <div className="flex items-center gap-4 mt-6 text-xs font-mono">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://www.instagram.com/_sadaff_66/" 
              target="_blank" 
              rel="noreferrer" 
              className="text-pink-600 hover:text-pink-700 transition-colors font-bold underline decoration-pink-300 decoration-2 underline-offset-4 flex items-center gap-1"
            >
              Instagram
            </motion.a>
            <span className="text-slate-300">|</span>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://www.linkedin.com/in/tahmina1707" 
              target="_blank" 
              rel="noreferrer" 
              className="text-blue-600 hover:text-blue-700 transition-colors font-bold underline decoration-blue-300 decoration-2 underline-offset-4 flex items-center gap-1"
            >
              Linkedin
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
