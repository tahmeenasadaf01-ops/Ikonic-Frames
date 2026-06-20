import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  Play, 
  ArrowRight, 
  CheckCircle2, 
  Info, 
  X, 
  TrendingUp, 
  Bookmark, 
  Cpu, 
  Layers, 
  Instagram, 
  Linkedin, 
  Facebook, 
  Users,
  Eye,
  Rocket,
  Heart,
  MessageSquare,
  Share2,
  ThumbsUp,
  Hash
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import AnimatedBackground from "./components/AnimatedBackground";
import ContentWizard from "./components/ContentWizard";
import FounderSection from "./components/FounderSection";
import SubscriptionSection from "./components/SubscriptionSection";
import FooterSection from "./components/FooterSection";

export default function App() {
  const [generationsCount, setGenerationsCount] = useState<number>(0);
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [showDemoModal, setShowDemoModal] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<string | null>(null);
  const [isHeroHovered, setIsHeroHovered] = useState(false);

  // Synchronize generation count and premium status with localStorage
  useEffect(() => {
    const savedCount = localStorage.getItem("scribe_social_gens");
    const savedPremium = localStorage.getItem("scribe_social_premium");
    
    if (savedCount) {
      setGenerationsCount(parseInt(savedCount, 10));
    } else {
      localStorage.setItem("scribe_social_gens", "0");
    }

    if (savedPremium === "true") {
      setIsPremium(true);
    }
  }, []);

  const handleIncrementGenerations = () => {
    const nextCount = generationsCount + 1;
    setGenerationsCount(nextCount);
    localStorage.setItem("scribe_social_gens", nextCount.toString());
    
    triggerNotification("Campaign draft generated successfully!");
  };

  const handleUnlockPremium = () => {
    setIsPremium(true);
    localStorage.setItem("scribe_social_premium", "true");
    triggerNotification("Premium plan successfully activated!");
    scrollToSection("try-now-wizard");
  };

  const triggerNotification = (msg: string) => {
    setShowNotification(msg);
    setTimeout(() => {
      setShowNotification(null);
    }, 4500);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/20 text-slate-900 relative selection:bg-purple-100 selection:text-purple-800">
      
      {/* Dynamic Toast Alerts */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[99999] bg-slate-900 text-white px-6 py-3.5 rounded-full shadow-2xl flex items-center gap-3 border border-slate-800 font-mono text-xs max-w-md text-center"
          >
            <Sparkles className="w-4.5 h-4.5 text-pink-400 animate-pulse shrink-0" />
            <span>{showNotification}</span>
            <button onClick={() => setShowNotification(null)} className="hover:text-pink-400 ml-2">
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Luxury Glass Navigation Bar */}
      <header className="sticky top-0 left-0 right-0 z-50 glass-panel border-b border-white/50 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection("hero")}>
            <div className="bg-gradient-pink-purple p-2 rounded-xl text-white shadow-md shadow-purple-500/10">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <span className="font-extrabold text-lg tracking-tight text-slate-900 font-sans">
              Ikonic Frames
            </span>
          </div>

          {/* Nav Items */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-600">
            <button onClick={() => scrollToSection("try-now-wizard")} className="hover:text-purple-600 transition duration-150">Campaign Drafts</button>
            <button onClick={() => scrollToSection("vision-mission")} className="hover:text-purple-600 transition duration-150">Vision & Mission</button>
            <button onClick={() => scrollToSection("founder-story")} className="hover:text-purple-600 transition duration-150">Meet The Founder</button>
            <button onClick={() => scrollToSection("pricing")} className="hover:text-purple-600 transition duration-150">Premium Plan</button>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            {isPremium ? (
              <span className="text-[10px] uppercase tracking-wider font-mono bg-purple-100 text-purple-700 font-bold px-3.5 py-1.5 rounded-full border border-purple-200 shadow-sm flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" /> Premium Professional Active
              </span>
            ) : (
              <span className="text-[10px] uppercase tracking-wider font-mono bg-slate-100 text-slate-600 font-bold px-3.5 py-1.5 rounded-full border border-slate-200 shadow-sm hidden sm:inline-block">
                ✦ Free Starter Active
              </span>
            )}
            
            <button
              onClick={() => scrollToSection("try-now-wizard")}
              className="px-5 py-2.5 bg-gradient-pink-purple hover:scale-[1.03] active:scale-[0.97] transition-all text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-550/15 cursor-pointer"
            >
              TRY NOW
            </button>
          </div>
        </div>
      </header>

      {/* SECTION 1 — HERO */}
      <section id="hero" className="relative pt-16 pb-20 md:pt-20 md:pb-24 overflow-hidden bg-white bg-dot-pattern">
        
        {/* Animated fluid atmosphere layer */}
        <AnimatedBackground />

        {/* Ambient subtle decorative blurred orbs that elevate white spaces */}
        <div className="absolute top-[10%] left-[10%] w-80 h-80 bg-purple-200/20 rounded-full blur-[110px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-pink-200/20 rounded-full blur-[130px] pointer-events-none" />
        
        {/* Decorative Background Floater Cards Container (Fills background layer behind content) */}
        <div className="absolute inset-x-0 top-0 bottom-0 max-w-7xl mx-auto px-6 pointer-events-none z-0">
          <div className="relative w-full h-full">
            {/* Left Laptop Dashboard Floater Card */}
            <div className="hidden xl:flex absolute left-4 top-[22%] w-[255px] flex-col bg-white/60 backdrop-blur-md rounded-2xl border border-slate-200/40 shadow-[0_8px_24px_rgba(15,23,42,0.03)] p-5 space-y-4 text-left animate-float-slow-1 select-none opacity-65">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[11px] font-bold text-slate-700 tracking-wide font-sans">AI OPTIMIZING FEED</span>
                </div>
                <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-pulse" />
              </div>

              <div className="space-y-3">
                {/* Step 1 */}
                <div className="flex items-start gap-2.5 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="font-semibold text-slate-800 block">Sentiment Calibrated</span>
                    <span className="text-[10px] text-slate-400 font-mono">Mapped to high-authority tone</span>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-2.5 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="font-semibold text-slate-800 block">Platform Alignment</span>
                    <span className="text-[10px] text-slate-400 font-mono">Dual output: LinkedIn, Insta</span>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-2.5 text-xs">
                  <span className="w-4 h-4 rounded-full bg-purple-50 flex items-center justify-center border border-purple-200 shrink-0 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                  </span>
                  <div className="flex-1">
                    <span className="font-semibold text-slate-600 block text-gradient font-black">Structuring SmartTags</span>
                    <span className="text-[10px] text-slate-400 font-mono">Running optimization model</span>
                  </div>
                </div>
              </div>

              {/* Quick Micro Graph */}
              <div className="bg-slate-50/55 rounded-xl p-2.5 border border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-bold font-mono">MATCH SCORE:</span>
                <span className="text-[10px] font-bold font-mono text-purple-600 bg-purple-50 px-2 py-0.5 rounded">99.8% Perfect</span>
              </div>
            </div>

            {/* Right Laptop Dashboard Floater Card */}
            <div className="hidden xl:flex absolute right-4 top-[22%] w-[255px] flex-col bg-white/60 backdrop-blur-md rounded-2xl border border-slate-200/40 shadow-[0_8px_24px_rgba(15,23,42,0.03)] p-5 space-y-4 text-left animate-float-slow-2 select-none opacity-65">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-purple-500" />
                  <span className="text-[11px] font-bold text-slate-700 tracking-wide font-sans">AUDIENCE SPECTRUM</span>
                </div>
                <span className="text-[9px] font-mono text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded font-bold uppercase">+320.4%</span>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 block font-bold font-mono">ESTIMATED REACTION TRACTION</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold tracking-tight text-slate-900 font-outfit">48,290</span>
                    <span className="text-[10px] text-slate-500 font-mono">Impressions</span>
                  </div>
                </div>

                {/* Sparklines / Live Bar Charts that fill space beautifully */}
                <div className="h-14 flex items-end gap-1 px-1 bg-slate-50/30 rounded-xl border border-slate-100 pt-3">
                  <div className="h-[30%] w-full bg-purple-200 rounded-sm duration-300" />
                  <div className="h-[45%] w-full bg-purple-300 rounded-sm duration-300" />
                  <div className="h-[75%] w-full bg-purple-500 rounded-sm duration-300" />
                  <div className="h-[90%] w-full bg-gradient-pink-purple rounded-sm duration-300" />
                  <div className="h-[60%] w-full bg-pink-400 rounded-sm duration-300" />
                  <div className="h-[80%] w-full bg-purple-400 rounded-sm duration-300" />
                  <div className="h-[40%] w-full bg-slate-200 rounded-sm duration-300" />
                </div>
              </div>

              <div className="flex gap-2.5 text-[10px] justify-between text-slate-400 font-mono border-t border-slate-100 pt-2.5">
                <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> 1.2k Likes</span>
                <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5 text-purple-500" /> 45 Comments</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          
          {/* Centered Main Header Column that expands on hover with visual feedback */}
          <div 
            className="relative max-w-4xl mx-auto space-y-6 cursor-default group py-4 px-4 rounded-3xl transition-all duration-300"
            onMouseEnter={() => setIsHeroHovered(true)}
            onMouseLeave={() => setIsHeroHovered(false)}
          >
            
            {/* Interactive Floaties popping up on hover around the text */}
            <AnimatePresence>
              {isHeroHovered && (
                <>
                  {/* Floating Heart / Like badge */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.6, y: 15, x: -30 }}
                    animate={{ opacity: 1, scale: 1, y: -40, x: -160 }}
                    exit={{ opacity: 0, scale: 0.8, y: -10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute hidden md:flex items-center gap-1.5 bg-rose-50 border border-rose-200 text-rose-600 px-3.5 py-2 rounded-full shadow-lg text-[11px] font-bold font-mono z-20 left-1/4 top-0"
                  >
                    <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-pulse" />
                    <span>Auto-Liked! +5.2k</span>
                  </motion.div>

                  {/* Floating comment bubble */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.6, y: 15, x: 30 }}
                    animate={{ opacity: 1, scale: 1, y: -35, x: 170 }}
                    exit={{ opacity: 0, scale: 0.8, y: -10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.05 }}
                    className="absolute hidden md:flex items-center gap-1.5 bg-purple-50 border border-purple-200 text-purple-700 px-4 py-2 rounded-full shadow-lg text-[11px] font-bold font-mono z-20 right-1/4 top-0"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-purple-500 fill-purple-50" />
                    <span>"This caption is perfect! 🔥"</span>
                  </motion.div>

                  {/* Floating reach analytics bubble */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.6, y: 15, x: -40 }}
                    animate={{ opacity: 1, scale: 1, y: 45, x: -220 }}
                    exit={{ opacity: 0, scale: 0.8, y: 10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                    className="absolute hidden md:flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 px-3.5 py-2 rounded-full shadow-lg text-[11px] font-bold font-mono z-20 left-6 bottom-1/3"
                  >
                     <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                     <span>Organic Impressions +320%</span>
                  </motion.div>

                  {/* Floating share bubble */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.6, y: 15, x: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 55, x: 230 }}
                    exit={{ opacity: 0, scale: 0.8, y: 10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.15 }}
                    className="absolute hidden md:flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-full shadow-lg text-[11px] font-bold font-mono z-20 right-6 bottom-1/3"
                  >
                     <Share2 className="w-3.5 h-3.5 text-blue-500 fill-blue-50" />
                     <span>Shared to LinkedIn Feed!</span>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* Premium, ultra-stylish balanced Headline with zero boxes/overlays */}
            <h1 className="text-5xl sm:text-7xl md:text-8xl xl:text-[94px] leading-[1.1] md:leading-[1.08] tracking-tight font-black text-black">
              <span className="font-fraunces italic font-normal text-black mr-4 inline-block select-text transform group-hover:scale-105 transition-transform duration-300">Your</span>
              <span className="font-outfit font-black text-gradient mr-4 select-text">Social Presence</span>
              <br className="hidden md:inline" />
              <span className="font-fraunces italic font-normal text-black tracking-tight mr-4 inline-block select-text transform group-hover:scale-105 transition-transform duration-300">Managed</span>
              <span className="font-outfit font-black text-gradient select-text">Intelligently.</span>
            </h1>

            {/* Hero paragraph description - Centered */}
            <p className="text-sm sm:text-base md:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed font-sans font-light">
              AI-powered social media management designed to help individuals, creators, startups, professionals, and businesses maintain a consistent and impactful online presence.
            </p>

            {/* Centered CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={() => scrollToSection("try-now-wizard")}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-pink-purple text-white font-bold rounded-full shadow-lg hover:scale-105 active:scale-95 hover:shadow-purple-500/20 transition-all duration-200 cursor-pointer text-xs tracking-wider inline-flex items-center justify-center gap-2 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition duration-150 pointer-events-none" />
                START NOW <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>

            {/* Hint message explaining the cool easter-egg hover feature */}
            <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase hidden md:block pt-3 animate-pulse">
              ✨ Hover over the headline for organic social feedback sparks ✨
            </p>
                   {/* Aesthetic showcase of beautiful horizontal visual preview graphics (Expanded to feel immersive and fill empty desktop space) */}
          <div className="w-full max-w-7xl mt-16 relative px-4 transform hover:scale-[1.01] transition-transform duration-500 ease-out">
            
            {/* Outer soft card device container with light dot styling */}
            <div className="absolute inset-0 bg-slate-50/40 rounded-[56px] border border-slate-200/30 shadow-inner z-0 overflow-hidden bg-dot-pattern-slate" />

            {/* Horizontal strip holding the gorgeous layout of content preview items side-by-side */}
            <div className="relative w-full py-14 px-10 flex flex-col lg:flex-row justify-center items-stretch gap-10 z-10">
              
              {/* Instagram Card Mockup - Made significantly larger and higher fidelity with scroll-triggered luxury animation */}
              <motion.div 
                id="instagram-mockup" 
                initial={{ opacity: 0, y: 45, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="w-full lg:w-[360px] bg-white p-6 rounded-3xl shadow-2xl border border-slate-100/90 transform hover:-translate-y-3 hover:rotate-1 hover:shadow-pink-500/5 transition-all duration-500 shrink-0 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-md">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="h-3 w-28 bg-slate-250 rounded animate-pulse" />
                      <div className="h-2 w-16 bg-slate-150 rounded mt-1.5" />
                    </div>
                  </div>
                  
                  <div className="space-y-3 mt-3">
                    {/* Rich simulated post visual with soft color waves */}
                    <div className="h-40 w-full bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100 rounded-2xl flex flex-col items-center justify-center gap-2 relative overflow-hidden group/insta border border-purple-100/30">
                      <motion.div 
                        animate={{ scale: [1, 1.08, 1] }} 
                        transition={{ repeat: Infinity, duration: 4 }}
                        className="w-12 h-12 rounded-full bg-white/85 shadow-lg flex items-center justify-center"
                      >
                        <Sparkles className="w-6 h-6 text-pink-500 animate-pulse" />
                      </motion.div>
                      <span className="text-[10px] font-mono tracking-widest text-slate-500 font-bold uppercase mt-1">GENERATIVE PREVIEW</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3.5 border-t border-slate-100 flex gap-4 text-slate-400 text-xs justify-between">
                  <span className="flex items-center gap-1.5 font-bold text-rose-500"><Heart className="w-4 h-4 fill-rose-500" /> Auto-Likes +4.2k</span>
                  <span className="flex items-center gap-1.5 hover:text-purple-600 transition-colors"><MessageSquare className="w-4 h-4" /> 188 Comments</span>
                </div>
              </motion.div>

              {/* LinkedIn Mockup Card - Made significantly larger and higher fidelity with scroll-triggered luxury animation and offset delay */}
              <motion.div 
                id="linkedin-mockup" 
                initial={{ opacity: 0, y: 45, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="w-full lg:w-[410px] bg-white p-6 rounded-3xl shadow-2xl border border-slate-100/90 transform hover:-translate-y-3 hover:-rotate-1 hover:shadow-purple-500/5 transition-all duration-500 shrink-0 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-md">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="h-3 w-36 bg-slate-300 rounded" />
                      <div className="h-2 w-20 bg-slate-200 rounded mt-1.5" />
                    </div>
                  </div>
                  
                  <div className="space-y-3 text-left">
                    <p className="text-xs sm:text-[13px] text-slate-700 font-sans leading-relaxed">
                      🚀 <strong>Strategic Breakthrough:</strong> How we orchestrated a 24/7 automated media strategist using high-affinity sentiment modeling. The organic output is fully aligned with industry authority tones across channels simultaneously.
                    </p>
                    <p className="text-[11px] text-purple-600 font-mono font-bold tracking-wide">
                      #Leadership #DigitalTransformation #Growth
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-100/95 mt-5 pt-3.5 flex justify-between text-slate-400 text-[11px]">
                  <span className="flex items-center gap-1.5 text-blue-600 font-extrabold"><ThumbsUp className="w-4 h-4 fill-blue-50" /> High Reach Score</span>
                  <span className="flex items-center gap-1.5 hover:text-blue-500 transition-colors"><Share2 className="w-4 h-4" /> Auto-Sharing Scheduled</span>
                </div>
              </motion.div>

              {/* Smart badge elements - Adjusted layout on the side with scroll-triggered luxury delay */}
              <motion.div 
                initial={{ opacity: 0, y: 45, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row lg:flex-col gap-4 justify-center items-stretch lg:max-w-[200px] shrink-0"
              >
                
                <div className="bg-white py-4 px-5 rounded-2xl shadow-lg border border-slate-100/90 flex items-center gap-3 flex-1 lg:flex-none">
                  <span className="relative flex h-3 w-3 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                  </span>
                  <div className="text-left">
                    <span className="text-[12px] font-black text-slate-800 font-sans block leading-none">
                      Autopilot Ready
                    </span>
                    <span className="text-[9px] text-slate-400 font-mono">24/7 Continuous sync</span>
                  </div>
                </div>

                <div className="bg-white py-4 px-5 rounded-2xl shadow-lg border border-slate-100/90 flex items-center gap-3 flex-1 lg:flex-none">
                  <div className="w-8 h-8 rounded-xl bg-purple-500 flex items-center justify-center text-white text-xs font-black shrink-0 shadow-inner">
                    #
                  </div>
                  <div className="text-left">
                    <span className="text-[12px] font-black text-slate-800 font-sans block leading-none">
                      SmartTags Engine
                    </span>
                    <span className="text-[9px] text-slate-400 font-mono">Dynamic category reach</span>
                  </div>
                </div>

                <div className="bg-gradient-pink-purple p-[1px] rounded-2xl shadow-lg flex-1 lg:flex-none transform hover:scale-[1.02] transition-transform duration-300">
                  <div className="bg-white py-3.5 px-5 rounded-[15px] flex items-center gap-3">
                    <TrendingUp className="w-4 h-4 text-pink-500" />
                    <div className="text-left">
                      <span className="text-[11px] font-bold text-slate-800 block leading-none">TRACTION MATCH</span>
                      <span className="text-[13px] font-black text-pink-500 font-mono">99.8% Perfect</span>
                    </div>
                  </div>
                </div>

              </motion.div>

            </div>
          </div>

        </div>

        {/* Beautiful sliding Horizontal Marquee Ticker of apps Managed (NO BOX SHAPES — ONLY TEXT AND GLOWING ICONS MOVEMENT) */}
        <div className="w-full bg-black py-7 overflow-hidden border-y border-slate-900 relative z-20 mt-20 shadow-xl">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center px-6 justify-between gap-6">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-extrabold shrink-0 border-r border-slate-900 pr-6 select-none">
              PLATFORMS COMPREHENSIVELY INTEGRATED:
            </span>
            <div className="relative w-full overflow-hidden flex items-center py-2">
              <div className="animate-marquee flex whitespace-nowrap gap-12 text-slate-400 font-medium font-sans text-sm items-center">
                
                {/* Loop Segment 1 */}
                <div className="flex items-center gap-3 select-none">
                  <Instagram className="w-5 h-5 text-pink-500" />
                  <span className="text-white font-extrabold text-xs tracking-wider">Instagram Channel</span>
                  <span className="text-[10px] text-purple-400 font-mono font-bold tracking-tight">CAPTIONS & IMAGES</span>
                </div>
                
                <span className="text-purple-700/60 font-black text-sm select-none">✦</span>
                
                <div className="flex items-center gap-3 select-none">
                  <Facebook className="w-5 h-5 text-blue-500" />
                  <span className="text-white font-extrabold text-xs tracking-wider">Facebook Group & Page</span>
                  <span className="text-[10px] text-pink-400 font-mono font-bold tracking-tight">ENGAGEMENT TARGETS</span>
                </div>
                
                <span className="text-purple-700/60 font-black text-sm select-none">✦</span>
                
                <div className="flex items-center gap-3 select-none">
                  <Linkedin className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-extrabold text-xs tracking-wider">LinkedIn Professional</span>
                  <span className="text-[10px] text-purple-300 font-mono font-bold tracking-tight">EXECUTIVE THESIS WRITER</span>
                </div>

                <span className="text-purple-700/60 font-black text-sm select-none">✦</span>

                <div className="flex items-center gap-3 select-none">
                  <Share2 className="w-5 h-5 text-emerald-500 animate-pulse" />
                  <span className="text-white font-extrabold text-xs tracking-wider">Twitter / X Feed</span>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold tracking-tight">BREVITY CRITICAL MAPPINGS</span>
                </div>

                <span className="text-purple-700/60 font-black text-sm select-none">✦</span>

                {/* Loop Segment 2 (Duplicated for seamless continuous transition loop) */}
                <div className="flex items-center gap-3 select-none">
                  <Instagram className="w-5 h-5 text-pink-500" />
                  <span className="text-white font-extrabold text-xs tracking-wider">Instagram Channel</span>
                  <span className="text-[10px] text-purple-400 font-mono font-bold tracking-tight">CAPTIONS & IMAGES</span>
                </div>
                
                <span className="text-purple-700/60 font-black text-sm select-none">✦</span>
                
                <div className="flex items-center gap-3 select-none">
                  <Facebook className="w-5 h-5 text-blue-500" />
                  <span className="text-white font-extrabold text-xs tracking-wider">Facebook Group & Page</span>
                  <span className="text-[10px] text-pink-400 font-mono font-bold tracking-tight">ENGAGEMENT TARGETS</span>
                </div>
                
                <span className="text-purple-700/60 font-black text-sm select-none">✦</span>
                
                <div className="flex items-center gap-3 select-none">
                  <Linkedin className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-extrabold text-xs tracking-wider">LinkedIn Professional</span>
                  <span className="text-[10px] text-purple-300 font-mono font-bold tracking-tight">EXECUTIVE THESIS WRITER</span>
                </div>

                <span className="text-purple-700/60 font-black text-sm select-none">✦</span>

                <div className="flex items-center gap-3 select-none">
                  <Share2 className="w-5 h-5 text-emerald-500 animate-pulse" />
                  <span className="text-white font-extrabold text-xs tracking-wider">Twitter / X Feed</span>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold tracking-tight">BREVITY CRITICAL MAPPINGS</span>
                </div>

                <span className="text-purple-700/60 font-black text-sm select-none">✦</span>

              </div>
            </div>
          </div>
        </div>      </div>

      </section>

      {/* SECTION 2 — TRY NOW FLOW */}
      <section id="wizard-section" className="py-20 bg-slate-50/20 relative z-10 border-t border-slate-100/50 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
              AI Strategy Room
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-slate-900 tracking-tight mt-3">
              Draft Customized Campaigns Instantly.
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 font-sans">
              Enter target parameters, platform selection, and tone. Our engine drafts multi-platform content with layout visual frames, hashtags, and engagement hooks automatically.
            </p>
          </div>

          <ContentWizard 
            generationsCount={generationsCount} 
            incrementGenerations={handleIncrementGenerations}
            onUnlockPremium={() => {
              triggerNotification("Redirecting: trial generation balance exhausted.");
              scrollToSection("pricing");
            }}
          />
        </div>
      </section>

       {/* SECTION 2.5 — GIGANTIC STRATEGIC VISION & MISSION */}
      <section id="vision-mission" className="py-24 bg-white text-slate-900 border-t border-b border-slate-100/60 relative overflow-hidden">
        {/* Subtle glowing orbs of atmospheric elements */}
        <div className="absolute top-[20%] left-[5%] w-96 h-96 bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[5%] w-96 h-96 bg-pink-500/5 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          
          {/* Header */}
          <div className="max-w-3xl mx-auto mb-20">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-pink-550 block mb-3">
              ✦ OUR SUPREME MANIFESTO
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-950 tracking-tight leading-none font-outfit">
              Unlimited Vision. <br />
              <span className="text-gradient font-black">Infinite Expression.</span>
            </h2>
          </div>

          {/* Large Split Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch text-left">
            
            {/* Column 1: COSMIC VISION CARD */}
            <motion.div 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="bg-slate-50/40 p-10 md:p-14 rounded-[40px] border border-slate-150/80 shadow-md flex flex-col justify-between relative overflow-hidden group hover:border-purple-300/60 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500-[0.02] blur-2xl rounded-full pointer-events-none" />
              
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                    <Eye className="w-4.5 h-4.5 animate-pulse" />
                  </div>
                  <span className="text-xs font-mono font-black text-purple-600 uppercase tracking-widest block">
                    THE VISION
                  </span>
                </div>
                
                {/* Huge Display Quote */}
                <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight select-text font-fraunces italic font-normal text-purple-950">
                  "A world where every great idea finds its audience."
                </h3>
                
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans font-light">
                  We believe that the power of storytelling should transcend conventional barriers. Our vision is to elevate creative minds, ensuring that breakthrough concepts naturally flow to their ideal destiny across all social spaces.
                </p>
              </div>

              {/* Graphic stats metrics bar */}
              <div className="pt-8 border-t border-slate-150 mt-8 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-mono">VISION TARGET: ORGANIC DISCOVERY</span>
                <span className="text-xs text-purple-600 font-bold font-mono">UNBOUNDED RANGE</span>
              </div>
            </motion.div>

            {/* Column 2: BRAND MISSION CARD */}
            <motion.div 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="bg-slate-50/40 p-10 md:p-14 rounded-[40px] border border-slate-150/80 shadow-md flex flex-col justify-between relative overflow-hidden group hover:border-pink-300/60 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500-[0.02] blur-2xl rounded-full pointer-events-none" />
              
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-500">
                    <Rocket className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-xs font-mono font-black text-pink-500 uppercase tracking-widest block">
                    THE MISSION
                  </span>
                </div>
                
                {/* Huge Display Quote */}
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug select-text font-outfit uppercase text-gradient">
                  Accelerating Strategic storytelling resonance at scale.
                </h3>
                
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans font-light">
                  We are building the most intelligent social media platform on earth — one that doesn't just automate marketing, but elevates it. We believe that behind every brand is a story worth telling. Our mission is to make sure the world never misses it.
                </p>
              </div>

              {/* Graphic stats metrics bar */}
              <div className="pt-8 border-t border-slate-150 mt-8 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-mono">MISSION CODE: STORY ELEVATOR</span>
                <span className="text-xs text-pink-600 font-bold font-mono">100% MAXIMUM ATTENTION</span>
              </div>
            </motion.div>

          </div>

          {/* Inspirational footer line */}
          <div className="mt-16 text-center max-w-3xl mx-auto">
            <p className="text-lg md:text-2xl font-light font-fraunces italic text-slate-600">
              "We believe that vision has no limits &mdash; where creative minds align with high-affinity intelligence, boundaries fade away."
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 3 — FOUNDER SECTION */}
      <FounderSection />

      {/* SECTION 4 — SUBSCRIPTION PAGE */}
      <SubscriptionSection onUnlockSuccess={handleUnlockPremium} />

      {/* FOOTER */}
      <FooterSection />

    </div>
  );
}
