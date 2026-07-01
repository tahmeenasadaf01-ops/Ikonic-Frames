import React, { useState } from "react";
import { Check, X, ShieldCheck, Zap, Copy, Mail } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface SubscriptionSectionProps {
  onUnlockSuccess: () => void;
}

export default function SubscriptionSection({ onUnlockSuccess }: SubscriptionSectionProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const monthlyPrice = 79;
  const yearlyPrice = 60; // billed yearly (save ~24%)

  const premiumFeatures = [
    "Unlimited Content Generation",
    "Multi-Platform Content (Instagram, LinkedIn, Facebook)",
    "AI Caption Creation & Tailored Hooks",
    "Creative Post Idea Generation",
    "Targeted Hashtag Suggestions",
    "Social Presence Assistance & Copy Styling"
  ];

  const triggerRedirect = (planName: string) => {
    const subject = encodeURIComponent(`Premium Subscription Inquiry - ${planName}`);
    const body = encodeURIComponent(`Hi Tahmeena,\n\nI'm interested in subscribing to the "${planName}" plan of Ikonic Frames.\n\nPlease let me know the details for activating my premium account access.\n\nBest regards!`);
    window.location.href = `mailto:tahmeenasadaf01@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleSubscribeClick = (planName: string) => {
    setSelectedPlan(planName);
    triggerRedirect(planName);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("tahmeenasadaf01@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="pricing" className="py-20 bg-slate-50/50 relative overflow-hidden bg-dot-pattern">
      {/* Decorative gradient accents */}
      <div className="absolute top-[20%] left-[-10%] w-[300px] h-[300px] bg-purple-100 rounded-full blur-3xl opacity-60" />
      <div className="absolute bottom-[2%] right-[-10%] w-[350px] h-[350px] bg-pink-100 rounded-full blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-black font-mono bg-slate-250 px-4 py-1.5 rounded-full inline-block">
            Flexible Membership Plans
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight mt-4">
            Unleash Unlimited Digital Authority.
          </h2>
          <p className="text-slate-500 mt-4 leading-relaxed">
            Choose a premium tier to remove all generation restrictions and distribute optimized, system-curated posts.
          </p>

          {/* Billing Cycle Selector */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <span className={`text-xs font-semibold ${billingCycle === "monthly" ? "text-slate-900" : "text-slate-400"}`}>Billed Monthly</span>
            <button
              onClick={() => setBillingCycle(prev => prev === "monthly" ? "yearly" : "monthly")}
              className="w-12 h-6 bg-slate-200 hover:bg-slate-300 rounded-full p-1 transition duration-250 flex items-center"
            >
              <div className={`w-4 h-4 bg-purple-600 rounded-full shadow transition-all duration-200 ${billingCycle === "yearly" ? "translate-x-6" : "translate-x-0"}`} />
            </button>
            <span className={`text-xs font-semibold flex items-center gap-1.5 ${billingCycle === "yearly" ? "text-purple-600" : "text-slate-400"}`}>
              Annually <span className="bg-purple-100 text-purple-700 text-[10px] px-2 py-0.5 rounded-full font-bold">Save 24%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Transparent Tier */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, transition: { duration: 0.25 } }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white/70 backdrop-blur-md rounded-[32px] p-8 border border-slate-200/60 shadow-lg flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-mono uppercase text-slate-400 font-bold tracking-wider block">Standard Access</span>
              <h3 className="text-2xl font-bold text-slate-800 mt-2 font-outfit">Free Starter</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed font-sans font-light">
                Experience advanced branding capability with standard campaign draft allocations.
              </p>
              
              <div className="my-6">
                <span className="text-4xl font-extrabold text-slate-900 font-outfit">$0</span>
                <span className="text-xs text-slate-400 font-medium ml-1 font-mono">Forever free</span>
              </div>

              <div className="border-t border-slate-100 pt-6 space-y-4">
                <div className="flex items-center gap-2.5 text-xs text-slate-600">
                  <Check className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>3 Campaign Allocations Included</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-600">
                  <Check className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Standard AI Copy Tailor</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-600 opacity-50">
                  <X className="w-4 h-4 text-slate-300 shrink-0" />
                  <span>Interactive Hashtag Engine</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-600 opacity-50">
                  <X className="w-4 h-4 text-slate-300 shrink-0" />
                  <span>Unlimited Platform Formats</span>
                </div>
              </div>
            </div>

            <button
              disabled
              className="w-full mt-8 py-3 bg-slate-100 text-slate-500 font-semibold text-xs rounded-xl cursor-default text-center font-mono"
            >
              Current Active Plan
            </button>
          </motion.div>

          {/* Premium Plan Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, transition: { duration: 0.25 } }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-[32px] p-8 border-2 border-purple-500 shadow-2xl relative flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-gradient-pink-purple text-white text-[10px] uppercase font-bold tracking-widest px-4 py-1.5 rounded-bl-2xl shadow-md font-mono">
              POPULAR CHOICES
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-mono uppercase text-purple-600 font-bold tracking-wider">Premium Access</span>
                <Zap className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mt-2 font-outfit">Unlimited Professional</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed font-sans font-light">
                The ultimate companion for developers, marketers, creators, and startups.
              </p>

              <div className="my-6">
                <span className="text-4xl font-extrabold text-slate-900 font-outfit">
                  ${billingCycle === "monthly" ? monthlyPrice : yearlyPrice}
                </span>
                <span className="text-xs text-slate-500 font-medium ml-1 font-mono">
                  / mo {billingCycle === "yearly" && "billed annually"}
                </span>
              </div>

              {/* Verified Capability Lists */}
              <div className="border-t border-slate-100 pt-6 space-y-4">
                {premiumFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <Check className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <span className="font-medium">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSubscribeClick("Unlimited Professional")}
              className="w-full mt-8 py-3.5 bg-gradient-pink-purple text-white font-bold text-xs rounded-xl shadow-lg hover:shadow-purple-500/25 active:scale-[0.98] transition-all cursor-pointer text-center"
            >
              UPGRADE TO PREMIUM
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Email Redirection & Copy Modal */}
      <AnimatePresence>
        {selectedPlan && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-slate-100 relative text-left"
            >
              <button
                onClick={() => setSelectedPlan(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Contact Tahmeena Sadaf</h3>
                <p className="text-xs text-slate-500 mt-2">
                  To secure your <span className="font-bold text-purple-650">{selectedPlan}</span> membership, please complete checkout via direct email response.
                </p>
              </div>

              <div className="space-y-4">
                {/* Email Display / Copy Row */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">SUPPORT EMAIL</span>
                  <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/85 p-3 rounded-xl">
                    <span className="font-mono text-xs text-slate-700 flex-1 break-all select-all font-medium">
                      tahmeenasadaf01@gmail.com
                    </span>
                    <button
                      onClick={handleCopyEmail}
                      className="p-2 cursor-pointer bg-white text-slate-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg border border-slate-150 transition-colors"
                      title="Copy Email Address"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  {copied && (
                    <span className="text-[10px] text-emerald-600 font-bold font-mono tracking-wide block animate-pulse">
                      ✓ Copied to clipboard successfully!
                    </span>
                  )}
                </div>

                {/* Plan Highlights */}
                <div className="bg-purple-50/50 border border-purple-100/50 p-4 rounded-xl text-xs space-y-2.5">
                  <div className="flex justify-between font-bold text-slate-800">
                    <span>Plan Requested</span>
                    <span className="text-purple-700">{selectedPlan}</span>
                  </div>
                  <div className="flex justify-between text-slate-500 text-[11px]">
                    <span>Billing Option</span>
                    <span>{billingCycle === "monthly" ? "Monthly Billing Cycle" : "Annual Billing Cycle"}</span>
                  </div>
                  <div className="border-t border-purple-150 pt-2 flex justify-between font-bold text-slate-900 text-sm">
                    <span>Pricing Standard</span>
                    <span className="text-purple-700">
                      ${billingCycle === "monthly" ? monthlyPrice : yearlyPrice}.00/mo
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-[10px] text-slate-400 leading-relaxed">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Your license and priority campaign allocation limit increase will be manually provisioned upon email response confirmation.</span>
                </div>

                {/* Main Action Buttons */}
                <div className="pt-2 space-y-2">
                  <button
                    onClick={() => triggerRedirect(selectedPlan)}
                    className="w-full py-3.5 bg-gradient-pink-purple text-white font-bold text-xs rounded-xl shadow-lg hover:opacity-95 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Mail className="w-4 h-4 animate-pulse" /> OPEN EMAIL CLIENT
                  </button>
                  
                  <button
                    onClick={() => setSelectedPlan(null)}
                    className="w-full py-2.5 bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors font-bold text-xs rounded-xl text-center cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
