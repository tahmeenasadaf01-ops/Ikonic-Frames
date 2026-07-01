import React, { useState, useEffect, useRef } from "react";
import { 
  ArrowRight, 
  ArrowLeft, 
  Instagram, 
  Linkedin, 
  Facebook, 
  CheckCircle2, 
  AlertTriangle,
  Copy,
  Check,
  RefreshCw,
  Cpu,
  Target,
  Smile,
  Zap,
  Bookmark,
  Crown,
  Lock,
  X,
  ShieldCheck,
  Home,
  User,
  Video
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { GenerationInputs, GeneratedSocialContent } from "../types";

interface ContentWizardProps {
  onUnlockPremium: () => void;
  generationsCount: number;
  incrementGenerations: () => void;
  isPremium?: boolean;
}

const TONES = [
  { value: "Professional", label: "Professional", desc: "Corporate, informative, and trust-building", emoji: "💼" },
  { value: "Friendly", label: "Friendly", desc: "Approachable, conversational, and warm", emoji: "👋" },
  { value: "Inspirational", label: "Inspirational", desc: "Motivational, storytelling, and high-impact", emoji: "✨" },
  { value: "Educational", label: "Educational", desc: "Value-packed, step-by-step instructional, clear", emoji: "🧠" },
  { value: "Promotional", label: "Promotional", desc: "Compelling call-to-actions, offer-focused, conversion-centric", emoji: "🚀" }
];

const GOALS = [
  { value: "Engagement", title: "Engagement", desc: "Ignite comments, likes, and interactive shares" },
  { value: "Awareness", title: "Awareness", desc: "Educate broader audiences and stay top-of-mind" },
  { value: "Leads", title: "Leads", desc: "Inquire clicks, sign-ups, and customer queries" },
  { value: "Education", title: "Education", desc: "Simplify industry concepts and demonstrate expertise" },
  { value: "Personal Branding", title: "Personal Branding", desc: "Elevate your authority and highlight founder story" }
];

export default function ContentWizard({ onUnlockPremium, generationsCount, incrementGenerations, isPremium = false }: ContentWizardProps) {
  const [step, setStep] = useState<number>(1);
  const [inputs, setInputs] = useState<GenerationInputs>({
    name: "",
    brandName: "",
    industry: "",
    targetAudience: "",
    platforms: ["Instagram"],
    goal: "Engagement",
    description: "",
    keyMessage: "",
    tone: "Professional"
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingStage, setLoadingStage] = useState<string>("");
  const [errorOnGen, setErrorOnGen] = useState<string | null>(null);
  const [result, setResult] = useState<GeneratedSocialContent | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [resultTab, setResultTab] = useState<'Instagram' | 'LinkedIn' | 'Facebook' | string>("");
  const [showDashboardVision, setShowDashboardVision] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState<boolean>(false);

  useEffect(() => {
    if (result && result.platformSpecifics.length > 0) {
      setResultTab(result.platformSpecifics[0].platform);
    }
  }, [result]);

  const validateStep = () => {
    if (step === 1) {
      return inputs.name.trim() !== "" && inputs.industry.trim() !== "" && inputs.targetAudience.trim() !== "";
    }
    if (step === 2) {
      return inputs.platforms.length > 0;
    }
    if (step === 3) {
      return inputs.goal !== undefined;
    }
    if (step === 4) {
      return inputs.description.trim() !== "" && inputs.keyMessage.trim() !== "" && inputs.tone !== undefined;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const triggerGeneration = async () => {
    if (!isPremium && generationsCount >= 3) {
      setShowUpgradeModal(true);
      onUnlockPremium();
      return;
    }

    setLoading(true);
    setErrorOnGen(null);
    setResult(null);

    const stages = [
      "Securing connection with Gemini AI engine...",
      "Analyzing industry trends and audience parameters...",
      "Generating tailored high-reach hashtags...",
      "Drafting optimal multi-platform social captions...",
      "Polishing engagement anchors and outlines..."
    ];

    let stageIdx = 0;
    setLoadingStage(stages[0]);
    const stageInterval = setInterval(() => {
      stageIdx = (stageIdx + 1) % stages.length;
      setLoadingStage(stages[stageIdx]);
    }, 1800);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Generation query returned a server exception.");
      }

      const generatedData: GeneratedSocialContent = await response.json();
      setResult(generatedData);
      incrementGenerations();
      setStep(5); // Move to final results display
    } catch (err: any) {
      setErrorOnGen(err.message || "Unable to synthesize digital content, please check your network connection.");
    } finally {
      clearInterval(stageInterval);
      setLoading(false);
    }
  };

  const handleCopyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handlePlatformToggle = (platform: 'Instagram' | 'LinkedIn' | 'Facebook') => {
    setInputs(prev => {
      const exists = prev.platforms.includes(platform);
      if (exists) {
        if (prev.platforms.length === 1) return prev; // Keep at least one platform
        return {
          ...prev,
          platforms: prev.platforms.filter(p => p !== platform)
        };
      } else {
        return {
          ...prev,
          platforms: [...prev.platforms, platform]
        };
      }
    });
  };

  const resetForm = () => {
    setStep(1);
    setInputs({
      name: "",
      brandName: "",
      industry: "",
      targetAudience: "",
      platforms: ["Instagram"],
      goal: "Engagement",
      description: "",
      keyMessage: "",
      tone: "Professional"
    });
    setResult(null);
    setErrorOnGen(null);
  };

  return (
    <div 
      id="try-now-wizard" 
      className="w-full max-w-4xl mx-auto rounded-3xl shadow-2xl p-6 md:p-10 border relative overflow-hidden transition-all duration-500 glass-panel border-slate-100 text-slate-900"
    >
      {/* Visual decorative flare */}
      <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-pink-purple opacity-[0.08] blur-xl rounded-full" />
      
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 pb-5 border-b gap-4 transition-colors duration-300 border-slate-100/80">
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <h3 className="text-xl font-extrabold tracking-tight font-outfit text-black">
              AI Content Engine
            </h3>
            <p className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">High-Fidelity Campaign Studio</p>
          </div>
          <button 
            type="button"
            onClick={() => setShowDashboardVision(prev => !prev)}
            className={`ml-1 px-3.5 py-1.5 text-[10px] font-mono tracking-wider rounded-full border transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-sm ${
              showDashboardVision 
                ? "bg-purple-600 text-white border-purple-500 shadow-purple-500/20" 
                : "bg-white/60 hover:bg-white text-purple-700 border-purple-200 hover:border-purple-300"
            }`}
          >
            <span>{showDashboardVision ? "HIDE VISION" : "VISION & MISSION"}</span>
          </button>
        </div>
        
        <div className="flex flex-wrap items-center gap-2.5 text-xs font-medium">
          {/* Elegant Interactive Steps Beads (Visible on Tablet/Desktop) */}
          {step < 5 && (
            <div className="hidden sm:flex items-center gap-1.5 bg-slate-50 border border-slate-100 p-1 rounded-full mr-1.5 shadow-inner">
              {[1, 2, 3, 4].map((s) => (
                <div 
                  key={s}
                  className={`w-5.5 h-5.5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold transition-all duration-300 ${
                    step === s 
                      ? "bg-gradient-pink-purple text-white scale-110 shadow-md" 
                      : step > s 
                        ? "bg-purple-100 text-purple-700" 
                        : "bg-slate-200/50 text-slate-400"
                  }`}
                >
                  {s}
                </div>
              ))}
            </div>
          )}

          {/* Script Count / Premium status indicator */}
          {!isPremium ? (
            <div className={`px-3 py-1.5 rounded-full font-mono font-bold text-[10px] border transition-all duration-300 flex items-center gap-1.5 ${
              generationsCount >= 3 
                ? "bg-amber-50 text-amber-700 border-amber-200 animate-pulse" 
                : "bg-slate-50 text-slate-500 border-slate-150 shadow-sm"
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${generationsCount >= 3 ? "bg-amber-500 animate-ping" : "bg-slate-400"}`} />
              <span>{generationsCount}/3 FREE SCRIPTS</span>
            </div>
          ) : (
            <div className="px-3 py-1.5 rounded-full font-mono font-bold text-[10px] border transition-all duration-300 bg-purple-50 text-purple-700 border-purple-200/50 flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
              <span>PREMIUM ACTIVE</span>
            </div>
          )}

          {/* Step Pill */}
          <div className={`px-3 py-1.5 rounded-full font-mono font-bold text-[10px] border transition-all duration-300 shadow-sm ${
            step < 5 
              ? "bg-purple-50 text-purple-600 border-purple-150/60" 
              : "bg-emerald-50 text-emerald-700 border-emerald-200"
          }`}>
            {step < 5 ? `STEP ${step} OF 4` : "SUCCESS"}
          </div>
        </div>
      </div>

      {/* Real-time elegant Dashboard Vision & Mission Overlay inside the dashboard frame */}
      <AnimatePresence>
        {showDashboardVision && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 border border-slate-800 shadow-xl space-y-5 relative mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest font-black block">
                    [ Brand Vision ]
                  </span>
                  <p className="text-sm font-bold font-fraunces italic text-purple-250">
                    "A world where every great idea finds its audience."
                  </p>
                  <p className="text-[11px] text-slate-350 leading-relaxed font-sans">
                    We believe that the power of storytelling should transcend conventional barriers. We guide and elevate creative minds so your ideal destiny matches maximum audience resonance.
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-pink-400 uppercase tracking-widest font-black block">
                    [ Brand Mission ]
                  </span>
                  <p className="text-sm font-bold font-outfit text-pink-200 uppercase tracking-wide">
                    Elevating story resonance intelligently.
                  </p>
                  <p className="text-[11px] text-slate-350 leading-relaxed font-sans">
                    We are building the most intelligent social media platform on earth — one that doesn't just automate marketing, but elevates it. Behind every brand is a story worth telling. Our mission is to make sure the world never misses it.
                  </p>
                </div>
              </div>
              <div className="text-[9px] font-mono text-slate-500 text-center border-t border-slate-800/85 pt-3">
                SECURED SYSTEM INTEGRATION &bull; STANDARDS APPROVED
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Bar */}
      {step < 5 && (
        <div className="w-full h-1.5 bg-slate-100 rounded-full mb-8 overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-pink-purple" 
            initial={{ width: "25%" }}
            animate={{ width: `${(step / 4) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-16 px-4 text-center min-h-[350px]"
          >
            <div className="relative mb-6">
              <div className="w-20 h-20 rounded-full border-4 border-purple-100 border-t-purple-600 animate-spin" />
              <Cpu className="w-8 h-8 text-pink-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
            </div>
            
            <h4 className="text-xl font-bold text-slate-800 mb-2">Creating Pure Social Magic</h4>
            <p className="text-sm text-slate-500 font-mono max-w-md h-8 text-purple-600">
              {loadingStage}
            </p>
            <div className="mt-8 space-y-1.5 text-xs text-slate-400 font-sans max-w-sm">
              <p>Designing optimal post hooks based on psychological engagement triggers.</p>
              <p className="opacity-75">Complementary Generations used: {generationsCount}/3</p>
            </div>
          </motion.div>
        ) : errorOnGen ? (
          <motion.div 
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <AlertTriangle className="w-16 h-16 text-rose-500 mb-4 animate-bounce" />
            <h3 className="text-lg font-bold text-slate-800 mb-2">Synthesis Failed</h3>
            <p className="text-sm text-slate-600 max-w-md mb-6">{errorOnGen}</p>
            <button 
              onClick={triggerGeneration}
              className="px-6 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-full inline-flex items-center gap-2 transition duration-200"
            >
              <RefreshCw className="w-4 h-4 animate-spin-slow" /> Retry Connection
            </button>
          </motion.div>
        ) : step === 1 ? (
          <motion.div 
            key="step1"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { staggerChildren: 0.08 }
              }
            }}
            className="space-y-6 relative z-10"
          >
            {/* Background image specific to Tell us about yourself - Unblurred */}
            <div className="absolute -inset-x-6 -inset-y-6 md:-inset-x-10 md:-inset-y-10 pointer-events-none -z-10 overflow-hidden rounded-3xl select-none">
              <img 
                src="/src/assets/images/video_editor_timeline_1782826634000.jpg" 
                alt="Background Timeline" 
                className="w-full h-full object-cover scale-115 opacity-[0.35] saturate-150"
                referrerPolicy="no-referrer"
              />
            </div>

            <motion.div 
              variants={{
                hidden: { opacity: 0, y: -10 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } }
              }}
              className="text-center"
            >
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Tell us about yourself</h2>
              <p className="text-sm text-slate-500 mt-1">Let's set up the core identity background for the intelligence engine.</p>
            </motion.div>

            {/* Centered full-width Core Identity Form */}
            <div className="w-full max-w-2xl mx-auto pt-2">
              <div className="bg-white/95 backdrop-blur shadow-2xl border border-slate-200/80 rounded-[32px] p-6 sm:p-8 space-y-5 flex flex-col justify-between">
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <motion.div 
                      variants={{
                        hidden: { opacity: 0, y: 15 },
                        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 18 } }
                      }}
                      className="space-y-2 group"
                    >
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block group-hover:text-purple-600 transition-colors">
                        Your Full Name <span className="text-pink-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. John Doe, Sarah Chen"
                        value={inputs.name}
                        onChange={e => setInputs(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-3 bg-white border border-slate-200 focus:border-purple-500 focus:bg-white outline-none rounded-xl text-sm text-slate-850 placeholder-slate-400 transition duration-200 focus:ring-2 focus:ring-purple-500/10 shadow-sm"
                      />
                    </motion.div>

                    <motion.div 
                      variants={{
                        hidden: { opacity: 0, y: 15 },
                        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 18 } }
                      }}
                      className="space-y-2 group"
                    >
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block group-hover:text-purple-600 transition-colors">
                        Company / Brand Name <span className="text-slate-450 text-[10px]">(Optional)</span>
                      </label>
                      <input 
                        type="text" 
                        placeholder="e.g. Acme SaaS, Bloom Bakery"
                        value={inputs.brandName || ""}
                        onChange={e => setInputs(prev => ({ ...prev, brandName: e.target.value }))}
                        className="w-full px-4 py-3 bg-white border border-slate-200 focus:border-purple-500 focus:bg-white outline-none rounded-xl text-sm text-slate-850 placeholder-slate-400 transition duration-200 focus:ring-2 focus:ring-purple-500/10 shadow-sm"
                      />
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <motion.div 
                      variants={{
                        hidden: { opacity: 0, y: 15 },
                        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 18 } }
                      }}
                      className="space-y-2 group"
                    >
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block group-hover:text-purple-600 transition-colors">
                        Industry / Business Niche <span className="text-pink-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Digital Marketing, Artificial Intelligence"
                        value={inputs.industry}
                        onChange={e => setInputs(prev => ({ ...prev, industry: e.target.value }))}
                        className="w-full px-4 py-3 bg-white border border-slate-200 focus:border-purple-500 focus:bg-white outline-none rounded-xl text-sm text-slate-850 placeholder-slate-400 transition duration-200 focus:ring-2 focus:ring-purple-500/10 shadow-sm"
                      />
                    </motion.div>

                    <motion.div 
                      variants={{
                        hidden: { opacity: 0, y: 15 },
                        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 18 } }
                      }}
                      className="space-y-2 group"
                    >
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block group-hover:text-purple-600 transition-colors">
                        Exact Target Audience <span className="text-pink-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Solo SaaS founders, Gen Z"
                        value={inputs.targetAudience}
                        onChange={e => setInputs(prev => ({ ...prev, targetAudience: e.target.value }))}
                        className="w-full px-4 py-3 bg-white border border-slate-200 focus:border-purple-500 focus:bg-white outline-none rounded-xl text-sm text-slate-850 placeholder-slate-400 transition duration-200 focus:ring-2 focus:ring-purple-500/10 shadow-sm"
                      />
                    </motion.div>
                  </div>
                </div>

                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 150, damping: 15 } }
                  }}
                  className="bg-purple-55 border border-purple-100 rounded-2xl p-4 flex gap-3 text-xs text-purple-700 font-medium leading-relaxed shadow-sm mt-3"
                >
                  <Cpu className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[13px] text-purple-900 mb-0.5">Interactive Multi-Platform Adaptation</p>
                    <p className="text-slate-600">The parameters above tailor the tone, pacing, and viral hooks of generated campaigns to your specific business niche automatically.</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ) : step === 2 ? (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Select target platforms</h2>
              <p className="text-sm text-slate-500 mt-1">Select all platforms you plan to distribute active strategies to.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {/* Instagram Selector */}
              <div 
                onClick={() => handlePlatformToggle('Instagram')}
                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex flex-col items-center text-center relative ${
                  inputs.platforms.includes('Instagram') 
                    ? "border-purple-500 bg-purple-50/20" 
                    : "border-slate-100 hover:border-slate-300 bg-white"
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                  inputs.platforms.includes('Instagram')
                    ? "bg-gradient-pink-purple text-white shadow-md shadow-pink-500/20"
                    : "bg-slate-100 text-slate-500"
                }`}>
                  <Instagram className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-850 text-sm">Instagram</h4>
                <p className="text-[11px] text-slate-450 mt-1.5 leading-relaxed">Perfect for story layouts, video copy prompts, and elegant aesthetics.</p>
                {inputs.platforms.includes('Instagram') && (
                  <CheckCircle2 className="w-5 h-5 text-purple-600 absolute top-3 right-3" />
                )}
              </div>

              {/* LinkedIn Selector */}
              <div 
                onClick={() => handlePlatformToggle('LinkedIn')}
                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex flex-col items-center text-center relative ${
                  inputs.platforms.includes('LinkedIn') 
                    ? "border-purple-500 bg-purple-50/20" 
                    : "border-slate-100 hover:border-slate-300 bg-white"
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                  inputs.platforms.includes('LinkedIn')
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                    : "bg-slate-100 text-slate-500"
                }`}>
                  <Linkedin className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-850 text-sm">LinkedIn Professional</h4>
                <p className="text-[11px] text-slate-450 mt-1.5 leading-relaxed">Polished updates, hooks, and thought-leadership posts.</p>
                {inputs.platforms.includes('LinkedIn') && (
                  <CheckCircle2 className="w-5 h-5 text-purple-600 absolute top-3 right-3" />
                )}
              </div>

              {/* Facebook Selector */}
              <div 
                onClick={() => handlePlatformToggle('Facebook')}
                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex flex-col items-center text-center relative ${
                  inputs.platforms.includes('Facebook') 
                    ? "border-purple-500 bg-purple-50/20" 
                    : "border-slate-100 hover:border-slate-300 bg-white"
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                  inputs.platforms.includes('Facebook')
                    ? "bg-blue-800 text-white shadow-md shadow-blue-800/25"
                    : "bg-slate-100 text-slate-500"
                }`}>
                  <Facebook className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-850 text-sm">Facebook Hub</h4>
                <p className="text-[11px] text-slate-450 mt-1.5 leading-relaxed">Conversational engagement, active community messaging.</p>
                {inputs.platforms.includes('Facebook') && (
                  <CheckCircle2 className="w-5 h-5 text-purple-600 absolute top-3 right-3" />
                )}
              </div>
            </div>
          </motion.div>
        ) : step === 3 ? (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">What is your primary goal?</h2>
              <p className="text-sm text-slate-500 mt-1">Determine the core CTA strategy and cognitive focus used for copy hooks.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {GOALS.map((goalOption) => (
                <div 
                  key={goalOption.value}
                  onClick={() => setInputs(prev => ({ ...prev, goal: goalOption.value as any }))}
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 flex items-start gap-4 ${
                    inputs.goal === goalOption.value
                      ? "border-purple-500 bg-purple-50/10 shadow-sm"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    inputs.goal === goalOption.value ? "bg-purple-600 text-white" : "bg-slate-100 text-slate-500"
                  }`}>
                    {goalOption.value === "Engagement" && <Smile className="w-5 h-5" />}
                    {goalOption.value === "Awareness" && <Zap className="w-5 h-5" />}
                    {goalOption.value === "Leads" && <Target className="w-5 h-5" />}
                    {goalOption.value === "Education" && <Bookmark className="w-5 h-5" />}
                    {goalOption.value === "Personal Branding" && <Cpu className="w-5 h-5" />}
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800 text-sm">{goalOption.title}</h5>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{goalOption.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : step === 4 ? (
          <motion.div 
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Design the communication hook</h2>
              <p className="text-sm text-slate-500 mt-1">Specify precisely what you are announcing and select the optimal voice tone.</p>
            </div>

            <div className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
                  Campaign description <span className="text-pink-500">*</span>
                </label>
                <textarea 
                  required
                  rows={3}
                  placeholder="e.g. Launching a new premium AI tool that helps startup founders curate digital copy automatically without spending thousands with copywriter consultants."
                  value={inputs.description}
                  onChange={e => setInputs(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-purple-400 focus:bg-white outline-none rounded-xl text-sm transition duration-150 resize-none leading-relaxed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
                  Key core message <span className="text-pink-500">*</span>
                </label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Save 15 hours a week and curate pristine visual layouts in seconds."
                  value={inputs.keyMessage}
                  onChange={e => setInputs(prev => ({ ...prev, keyMessage: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-purple-400 focus:bg-white outline-none rounded-xl text-sm transition duration-150"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
                  Aura / Tone Selection <span className="text-pink-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {TONES.map(t => (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => setInputs(prev => ({ ...prev, tone: t.value as any }))}
                      className={`py-3 px-2.5 rounded-xl border text-center cursor-pointer transition-all duration-150 flex flex-col items-center justify-center gap-1.5 ${
                        inputs.tone === t.value
                          ? "border-purple-500 bg-purple-50/25"
                          : "border-slate-100 hover:border-slate-300 bg-slate-50/40"
                      }`}
                    >
                      <span className="text-lg">{t.emoji}</span>
                      <span className="font-bold text-slate-800 text-[10.5px] tracking-tight">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="step5-results"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-purple-50/30 p-5 rounded-2xl border border-purple-100/40">
              <div>
                <span className="text-[10px] font-mono font-bold bg-pink-100 text-pink-700 px-2 py-1 rounded">COMPLEMENTARY AI OUTLINE</span>
                <h4 className="text-xl font-bold text-slate-800 mt-1">{result?.headline}</h4>
                <p className="text-xs text-slate-500 leading-relaxed mt-1">{result?.overview}</p>
              </div>
              <button
                onClick={resetForm}
                className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 transition duration-150 shrink-0 shadow-sm"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Plan New Campaign
              </button>
            </div>

            {/* Campaign Core Ideas Section */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block">
                ⭐ Campaign Creative Strategies (3 Key concepts)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {result?.ideas.map((idea, idx) => (
                  <div key={idx} className="bg-slate-50/50 hover:bg-slate-50 border border-slate-250/40 rounded-xl p-4 transition-all duration-150">
                    <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-xs font-bold flex items-center justify-center mb-2.5">
                      {idx + 1}
                    </span>
                    <h5 className="font-bold text-slate-800 text-sm leading-snug">{idea.title}</h5>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{idea.concept}</p>
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-col gap-1">
                      <span className="text-[9px] font-mono text-pink-500 uppercase font-semibold">Visual Template Layout</span>
                      <span className="text-[11px] text-slate-600 leading-normal font-sans italic">"{idea.visualSuggestion}"</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Platform Previews */}
            <div className="space-y-4 pt-2">
              <div className="border-b border-slate-100 flex gap-2">
                {result?.platformSpecifics.map(p => (
                  <button
                    key={p.platform}
                    onClick={() => setResultTab(p.platform)}
                    className={`pb-3 px-4 text-xs font-bold font-mono tracking-tight transition duration-150 border-b-2 flex items-center gap-1.5 ${
                      resultTab === p.platform
                        ? "border-purple-600 text-purple-700"
                        : "border-transparent text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    {p.platform === "Instagram" && <Instagram className="w-4 h-4 text-pink-500" />}
                    {p.platform === "LinkedIn" && <Linkedin className="w-4 h-4 text-blue-600" />}
                    {p.platform === "Facebook" && <Facebook className="w-4 h-4 text-blue-800" />}
                    {p.platform}
                  </button>
                ))}
              </div>

              {result?.platformSpecifics.filter(p => p.platform === resultTab).map(p => (
                <div key={p.platform} className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-1">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl shadow-inner font-mono text-xs relative group min-h-[160px]">
                      <button
                        onClick={() => handleCopyToClipboard(p.caption, p.platform)}
                        className="absolute top-3 right-3 text-slate-400 hover:text-white p-1.5 bg-slate-800 rounded-lg transition duration-150"
                        title="Copy Caption"
                      >
                        {copiedKey === p.platform ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <div className="text-[9px] text-purple-400 uppercase tracking-wider font-bold mb-3 block">Tailored Copy Output</div>
                      <p className="whitespace-pre-wrap leading-relaxed select-text pr-4">{p.caption}</p>
                    </div>

                    {/* Social hashtags */}
                    <div className="flex flex-wrap gap-1.5 p-3.5 bg-slate-100/50 rounded-xl">
                      {p.hashtags.map((h, i) => (
                        <span key={i} className="text-xs bg-white text-purple-700 px-2.5 py-1 text-gradient font-semibold rounded-lg font-mono">
                          {h.startsWith('#') ? h : `#${h}`}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-4">
                    {/* Outline Carousel Slide Planner */}
                    <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-200/40">
                      <span className="text-[9px] font-mono text-purple-500 uppercase font-bold block mb-2.5">
                        Post Structure / Creator Outline
                      </span>
                      <ol className="space-y-2 text-xs text-slate-600">
                        {p.outline.map((o, idx) => (
                          <li key={idx} className="flex gap-2.5 items-start">
                            <span className="font-mono bg-purple-150 text-purple-700 font-bold text-[10px] py-0.5 px-1.5 rounded bg-purple-100">
                              Frame {idx + 1}
                            </span>
                            <span className="leading-normal">{o}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Engagement trigger hook */}
                    <div className="bg-purple-50/15 p-4 rounded-xl border border-purple-100 border-dashed">
                      <span className="text-[9px] font-mono text-pink-500 uppercase font-bold block mb-1">
                        🔑 Crucial Engagement Tip
                      </span>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans">{p.engagementTip}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {result?.brandingAdvisory && (
              <div className="border-t border-slate-100 pt-4 flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center shrink-0">
                  <Target className="w-4 h-4 text-pink-600" />
                </div>
                <div>
                  <h6 className="text-xs font-bold text-slate-800">Brand Identity Advisory</h6>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed font-sans">{result.brandingAdvisory}</p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer wizard navigation */}
      {step < 5 && !loading && (
        <div className="flex items-center justify-between border-t border-slate-100/80 mt-8 pt-5">
          <button
            type="button"
            disabled={step === 1}
            onClick={handlePrev}
            className={`px-5 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 transition duration-150 ${
              step === 1
                ? "text-slate-300 cursor-not-allowed"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
            }`}
          >
            <ArrowLeft className="w-4 h-4" /> Previous
          </button>

          {step < 4 ? (
            <button
              type="button"
              disabled={!validateStep()}
              onClick={handleNext}
              className={`px-6 py-2.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md ${
                validateStep() 
                  ? "bg-gradient-pink-purple text-white hover:opacity-90 cursor-pointer shadow-purple-500/10" 
                  : "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none"
              }`}
            >
              Draft Next <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              disabled={!validateStep()}
              onClick={triggerGeneration}
              className={`px-7 py-3 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg relative overflow-hidden group ${
                validateStep()
                  ? "bg-gradient-pink-purple text-white hover:scale-105 active:scale-95 cursor-pointer shadow-purple-500/25"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none"
              }`}
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition duration-150 pointer-events-none" />
              {!isPremium && generationsCount >= 3 ? (
                <>
                  <Lock className="w-4 h-4 text-white shrink-0 animate-pulse" /> Upgrade to Create (3/3 Used)
                </>
              ) : (
                <>
                  <Cpu className="w-4 h-4 text-white animate-pulse" /> Create Content (Used {generationsCount}/3)
                </>
              )}
            </button>
          )}
        </div>
      )}

      {/* Premium Upgrade Block Modal */}
      <AnimatePresence>
        {showUpgradeModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-[32px] p-6 md:p-8 max-w-md w-full shadow-2xl border border-slate-100 relative text-center"
            >
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-14 h-14 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/80 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md shadow-amber-500/5">
                <Crown className="w-7 h-7 text-amber-600 animate-bounce" />
              </div>

              <h3 className="text-xl font-bold text-slate-950 tracking-tight font-sans">
                Upgrade to Premium Plan
              </h3>
              
              <div className="my-3 bg-amber-50/50 border border-amber-100 rounded-xl py-2 px-3 inline-flex items-center gap-1.5 justify-center">
                <span className="text-[10px] font-mono font-bold text-amber-800 uppercase tracking-wider">
                  Trial Limit Reached: 3/3 Scripts Created
                </span>
              </div>

              <p className="text-xs text-slate-500 mt-2 leading-relaxed font-sans">
                You have generated your 3 free campaign scripts on the Free Starter plan. To generate this new campaign and get full, unlimited management with high-converting scripts, upgrade to Unlimited Professional.
              </p>

              <div className="mt-6 space-y-2.5">
                <button
                  onClick={() => {
                    setShowUpgradeModal(false);
                    onUnlockPremium();
                  }}
                  className="w-full py-3.5 bg-gradient-pink-purple text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Crown className="w-4 h-4 animate-pulse" /> UPGRADE TO PREMIUM PLAN
                </button>
                
                <button
                  onClick={() => setShowUpgradeModal(false)}
                  className="w-full py-2.5 bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors font-bold text-xs rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
              </div>

              <div className="mt-4 border-t border-slate-100 pt-4 flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Risk Free &bull; Cancel Anytime</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface ResonanceRadarProps {
  inputs: GenerationInputs;
}

function ResonanceRadar({ inputs }: ResonanceRadarProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 140, y: 80, isOver: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let angle = 0;
    
    // Particle class
    class Particle {
      x: number;
      y: number;
      ox: number;
      oy: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.ox = x;
        this.oy = y;
        this.vx = 0;
        this.vy = 0;
        this.radius = Math.random() * 2 + 1;
        const colors = ["#ec4899", "#a855f7", "#3b82f6", "#22d3ee"];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update(mx: number, my: number, isOver: boolean) {
        if (isOver) {
          const dx = mx - this.x;
          const dy = my - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            const force = (100 - dist) / 100;
            this.vx += (dx / dist) * force * 0.4;
            this.vy += (dy / dist) * force * 0.4;
          }
        }

        // Return force to original position
        const hx = this.ox - this.x;
        const hy = this.oy - this.y;
        this.vx += hx * 0.05;
        this.vy += hy * 0.05;

        // Friction
        this.vx *= 0.85;
        this.vy *= 0.85;

        this.x += this.vx;
        this.y += this.vy;
      }

      draw(c: CanvasRenderingContext2D) {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.fill();
      }
    }

    // Initialize particles on circular orbits
    const particles: Particle[] = [];
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    for (let r = 30; r < 120; r += 20) {
      const numParticles = Math.floor(r / 3);
      for (let i = 0; i < numParticles; i++) {
        const theta = (i / numParticles) * Math.PI * 2;
        const px = centerX + Math.cos(theta) * r;
        const py = centerY + Math.sin(theta) * r;
        particles.push(new Particle(px, py));
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Draw background Radar sweep rings
      ctx.strokeStyle = "rgba(168, 85, 247, 0.08)";
      ctx.lineWidth = 1;
      for (let r = 40; r < 130; r += 35) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw axis
      ctx.beginPath();
      ctx.moveTo(cx - 150, cy);
      ctx.lineTo(cx + 150, cy);
      ctx.moveTo(cx, cy - 110);
      ctx.lineTo(cx, cy + 110);
      ctx.strokeStyle = "rgba(168, 85, 247, 0.04)";
      ctx.stroke();

      // Dynamic radar sweeping line
      angle += 0.015;
      const sweepX = cx + Math.cos(angle) * 120;
      const sweepY = cy + Math.sin(angle) * 120;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(sweepX, sweepY);
      ctx.strokeStyle = "rgba(236, 72, 153, 0.15)";
      ctx.stroke();

      // Mouse interactive line links to particles
      if (mousePos.isOver) {
        ctx.strokeStyle = "rgba(168, 85, 247, 0.12)";
        particles.forEach(p => {
          const dx = mousePos.x - p.x;
          const dy = mousePos.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 60) {
            ctx.beginPath();
            ctx.moveTo(mousePos.x, mousePos.y);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
          }
        });
      }

      // Update and Draw particles
      particles.forEach(p => {
        p.update(mousePos.x, mousePos.y, mousePos.isOver);
        p.draw(ctx);
      });

      // Draw active target circle around mouse
      if (mousePos.isOver) {
        ctx.beginPath();
        ctx.arc(mousePos.x, mousePos.y, 8, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(236, 72, 153, 0.5)";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(mousePos.x, mousePos.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#ec4899";
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isOver: true
    });
  };

  const handleMouseLeave = () => {
    setMousePos(prev => ({ ...prev, isOver: false }));
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white shadow-xl h-full flex flex-col justify-between relative overflow-hidden select-none group min-h-[350px]"
    >
      {/* Decorative cyber grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

      <div className="relative z-10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
            </span>
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold">
              Identity Aura Radar
            </span>
          </div>
          <span className="text-[9px] font-mono bg-purple-950 text-purple-300 border border-purple-800 px-2 py-0.5 rounded font-bold">
            MATRIX ACTIVE
          </span>
        </div>

        {/* Dynamic Display of User Input */}
        <div className="space-y-1.5 bg-black/40 backdrop-blur border border-slate-800/80 p-3.5 rounded-xl font-mono text-[10.5px] text-slate-300 leading-normal">
          <div className="flex justify-between border-b border-slate-850 pb-1.5 mb-1.5">
            <span className="text-slate-500">CORE COGNITIVE FLUIDITY</span>
            <span className="text-emerald-400 animate-pulse font-bold">ONLINE</span>
          </div>
          <div>
            <span className="text-slate-500">PROTAGONIST:</span>{" "}
            <span className="text-white font-bold">{inputs.name || "Awaiting entry..."}</span>
          </div>
          <div>
            <span className="text-slate-500">BRAND COGNIZANCE:</span>{" "}
            <span className="text-white font-bold">{inputs.brandName || "Implicit Identity"}</span>
          </div>
          <div>
            <span className="text-slate-500">TARGET NICHE:</span>{" "}
            <span className="text-purple-400 font-bold">{inputs.industry || "General Spaces"}</span>
          </div>
          <div>
            <span className="text-slate-500">DEMOGRAPHIC WAVE:</span>{" "}
            <span className="text-pink-400 font-bold">{inputs.targetAudience || "Symmetric Flow"}</span>
          </div>
        </div>
      </div>

      {/* Interactive Canvas Area */}
      <div className="relative flex items-center justify-center my-4 h-[160px]">
        <canvas 
          ref={canvasRef} 
          width={280} 
          height={160} 
          className="absolute z-0 pointer-events-none"
        />
        <div className="relative pointer-events-none text-center space-y-1">
          <div className="text-[18px] font-light font-fraunces italic text-pink-300 group-hover:scale-105 transition-transform duration-300">
            {inputs.name ? `Resonance: ${inputs.name.length * 7}Hz` : "Ready"}
          </div>
          <div className="text-[8px] text-slate-500 font-mono tracking-widest uppercase">
            {mousePos.isOver ? `COORDS: X=${Math.round(mousePos.x)} Y=${Math.round(mousePos.y)}` : "MOVE MOUSE OVER RADAR"}
          </div>
        </div>
      </div>

      <div className="relative z-10 pt-3 border-t border-slate-850 text-center">
        <p className="text-[9px] text-slate-500 font-mono tracking-tight uppercase">
          Dynamic brand fields automatically shift the resonance vector
        </p>
      </div>
    </div>
  );
}
