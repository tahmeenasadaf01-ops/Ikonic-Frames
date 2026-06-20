import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
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
  Bookmark
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { GenerationInputs, GeneratedSocialContent } from "../types";

interface ContentWizardProps {
  onUnlockPremium: () => void;
  generationsCount: number;
  incrementGenerations: () => void;
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

export default function ContentWizard({ onUnlockPremium, generationsCount, incrementGenerations }: ContentWizardProps) {
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
    <div id="try-now-wizard" className="w-full max-w-4xl mx-auto glass-panel rounded-3xl shadow-2xl p-6 md:p-10 border border-slate-100 relative overflow-hidden">
      {/* Visual decorative flare */}
      <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-pink-purple opacity-[0.08] blur-xl rounded-full" />
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-4 border-b border-slate-100/80 gap-4">
        <div className="flex flex-wrap items-center gap-2.5">
          <Sparkles className="w-5 h-5 text-purple-600 animate-pulse" />
          <h3 className="text-lg font-bold bg-gradient-pink-purple bg-clip-text text-transparent font-mono uppercase tracking-wider">
            AI Content Engine
          </h3>
          <button 
            type="button"
            onClick={() => setShowDashboardVision(prev => !prev)}
            className="px-3.5 py-1.5 bg-gradient-pink-purple text-white text-[9px] font-mono font-bold tracking-wider rounded-lg shadow-md hover:scale-[1.03] active:scale-[0.97] transition-all duration-150 flex items-center gap-1 cursor-pointer"
          >
            <span>✦</span> {showDashboardVision ? "HIDE VISION" : "DASHBOARD VISION & MISSION"}
          </button>
        </div>
        <div className="text-xs text-slate-500 font-medium">
          {step < 5 ? (
            <span className="bg-slate-100 px-3 py-1.5 rounded-full font-mono">
              Step {step} of 4
            </span>
          ) : (
            <span className="bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full font-mono font-bold">
              Generation Result
            </span>
          )}
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
              <div className="absolute top-4 right-4 text-purple-400 animate-pulse">
                <Sparkles className="w-5 h-5" />
              </div>
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
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Tell us about yourself</h2>
              <p className="text-sm text-slate-500 mt-1">Let's set up the core identity background for the intelligence engine.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
                  Your Full Name <span className="text-pink-500">*</span>
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. John Doe, Sarah Chen"
                  value={inputs.name}
                  onChange={e => setInputs(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-purple-400 focus:bg-white outline-none rounded-xl text-sm transition duration-150"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
                  Company / Brand Name <span className="text-slate-400 text-[10px]">(Optional)</span>
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. Acme SaaS, Bloom Bakery"
                  value={inputs.brandName || ""}
                  onChange={e => setInputs(prev => ({ ...prev, brandName: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-purple-400 focus:bg-white outline-none rounded-xl text-sm transition duration-150"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
                  Industry / Business Niche <span className="text-pink-500">*</span>
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Digital Marketing, Artificial Intelligence, Wellness & Mindfulness"
                  value={inputs.industry}
                  onChange={e => setInputs(prev => ({ ...prev, industry: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-purple-400 focus:bg-white outline-none rounded-xl text-sm transition duration-150"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
                  Exact Target Audience <span className="text-pink-500">*</span>
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Solo SaaS founders, Gen Z fitness enthusiasts"
                  value={inputs.targetAudience}
                  onChange={e => setInputs(prev => ({ ...prev, targetAudience: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-purple-400 focus:bg-white outline-none rounded-xl text-sm transition duration-150"
                />
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
                  <Sparkles className="w-4 h-4 text-pink-600" />
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
              <Sparkles className="w-4 h-4 text-white animate-pulse" /> Create Content (Used {generationsCount}/3)
            </button>
          )}
        </div>
      )}
    </div>
  );
}
