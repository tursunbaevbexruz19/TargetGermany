"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import { FileText, MessageSquare, CheckCircle, Plane, Send, Loader2, Check, AlertCircle } from "lucide-react";

const STEPS_ICONS = [FileText, MessageSquare, CheckCircle, Plane];
const STEP_COLOR = "#ef4444";

export default function Admissions() {
    const t = useTranslations("Admissions");
    const [activeStep, setActiveStep] = useState(0);
    const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");

    const steps = [
        { title: t("step1Title"), desc: t("step1Desc") },
        { title: t("step2Title"), desc: t("step2Desc") },
        { title: t("step3Title"), desc: t("step3Desc") },
        { title: t("step4Title"), desc: t("step4Desc") },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormState("submitting");
        setTimeout(() => setFormState("success"), 2000);
    };

    return (
        <section className="py-28 md:py-40 bg-[#0a0f1e] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-600/[0.03] rounded-full blur-[180px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
                    <span className="inline-block px-5 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase text-white/50 mb-8">{t("sectionLabel")}</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-[-0.02em]">{t("title")}</h2>
                    <p className="text-base md:text-lg text-white/45 max-w-2xl mx-auto leading-relaxed">{t("description")}</p>
                </motion.div>

                {/* Timeline — vertical on all widths for cleaner mobile-first design */}
                <div className="mb-20 max-w-2xl mx-auto">
                    <div className="relative">
                        <div className="absolute left-5 top-3 bottom-3 w-0.5 bg-white/[0.06] rounded-full" />
                        {steps.map((step, idx) => {
                            const Icon = STEPS_ICONS[idx];
                            const isActive = idx === activeStep;
                            return (
                                <motion.div key={idx} initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.12 }} onClick={() => setActiveStep(idx)} className="relative flex items-start gap-6 py-5 cursor-pointer group">
                                    <div className="relative z-10 shrink-0">
                                        <motion.div animate={{ scale: isActive ? 1 : 0.85 }} className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${isActive ? "shadow-lg" : "bg-white/[0.04] border border-white/[0.08]"}`} style={isActive ? { backgroundColor: STEP_COLOR } : {}}>
                                            <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-white/30"}`} />
                                        </motion.div>
                                    </div>
                                    <div className="pt-1.5">
                                        <h4 className={`text-base md:text-lg font-bold transition-colors ${isActive ? "text-white" : "text-white/40"}`}>{step.title}</h4>
                                        <AnimatePresence>
                                            {isActive && (
                                                <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-sm text-white/40 mt-2 leading-relaxed">{step.desc}</motion.p>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Application form */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto">
                    <div className="rounded-3xl p-8 md:p-10 bg-white/[0.02] border border-white/[0.06]">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{t("formTitle")}</h3>
                        <p className="text-white/35 text-sm mb-8">{t("formDesc")}</p>

                        <AnimatePresence mode="wait">
                            {formState === "success" ? (
                                <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-12 text-center">
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }}>
                                        <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                                            <Check className="w-8 h-8 text-emerald-400" />
                                        </div>
                                    </motion.div>
                                    <p className="text-white/60 text-lg font-medium">{t("success")}</p>
                                </motion.div>
                            ) : (
                                <motion.form key="form" onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-[11px] font-semibold uppercase tracking-wider text-white/30 block mb-2">{t("firstName")}</label>
                                            <input type="text" required className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-red-500/30 focus:ring-1 focus:ring-red-500/20 transition-colors" />
                                        </div>
                                        <div>
                                            <label className="text-[11px] font-semibold uppercase tracking-wider text-white/30 block mb-2">{t("lastName")}</label>
                                            <input type="text" required className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-red-500/30 focus:ring-1 focus:ring-red-500/20 transition-colors" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-[11px] font-semibold uppercase tracking-wider text-white/30 block mb-2">{t("email")}</label>
                                        <input type="email" required className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-red-500/30 focus:ring-1 focus:ring-red-500/20 transition-colors" />
                                    </div>
                                    <div>
                                        <label className="text-[11px] font-semibold uppercase tracking-wider text-white/30 block mb-2">{t("phone")}</label>
                                        <input type="tel" className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-red-500/30 focus:ring-1 focus:ring-red-500/20 transition-colors" />
                                    </div>
                                    <div>
                                        <label className="text-[11px] font-semibold uppercase tracking-wider text-white/30 block mb-2">{t("program")}</label>
                                        <select required className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-red-500/30 focus:ring-1 focus:ring-red-500/20 transition-colors appearance-none">
                                            <option value="" className="bg-[#0a0f1e]">—</option>
                                            <option value="foundation" className="bg-[#0a0f1e]">{t("programOption1")}</option>
                                            <option value="german" className="bg-[#0a0f1e]">{t("programOption2")}</option>
                                            <option value="satielts" className="bg-[#0a0f1e]">{t("programOption3")}</option>
                                            <option value="business" className="bg-[#0a0f1e]">{t("programOption4")}</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-[11px] font-semibold uppercase tracking-wider text-white/30 block mb-2">{t("message")}</label>
                                        <textarea rows={3} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-red-500/30 focus:ring-1 focus:ring-red-500/20 transition-colors resize-none" />
                                    </div>
                                    <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={formState === "submitting"} className="w-full py-4 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-[0_8px_30px_rgba(220,38,38,0.25)] disabled:opacity-70 transition-opacity">
                                        {formState === "submitting" ? <><Loader2 className="w-5 h-5 animate-spin" /> {t("submitting")}</> : <><Send className="w-5 h-5" /> {t("submit")}</>}
                                    </motion.button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
