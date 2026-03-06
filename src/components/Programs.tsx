"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from "framer-motion";
import { GraduationCap, Languages, Trophy, Laptop, Check, ArrowRight, ChevronDown, Clock, Users, Star } from "lucide-react";

export default function Programs({ setActiveTab }: { setActiveTab?: (t: string) => void }) {
    const t = useTranslations("Programs");
    const [expandedIdx, setExpandedIdx] = useState<number | null>(0);

    const programs = [
        {
            title: t("program1Title"), desc: t("program1Desc"),
            features: [t("program1Feature1"), t("program1Feature2"), t("program1Feature3"), t("program1Feature4")],
            icon: GraduationCap,
            duration: "12 Months", students: "200+", rating: "4.9",
        },
        {
            title: t("program2Title"), desc: t("program2Desc"),
            features: [t("program2Feature1"), t("program2Feature2"), t("program2Feature3"), t("program2Feature4")],
            icon: Languages,
            duration: "6–8 Weeks/Level", students: "500+", rating: "4.8",
        },
        {
            title: t("program3Title"), desc: t("program3Desc"),
            features: [t("program3Feature1"), t("program3Feature2"), t("program3Feature3"), t("program3Feature4")],
            icon: Trophy,
            duration: "3–6 Months", students: "350+", rating: "4.9",
        },
        {
            title: t("program4Title"), desc: t("program4Desc"),
            features: [t("program4Feature1"), t("program4Feature2"), t("program4Feature3"), t("program4Feature4")],
            icon: Laptop,
            duration: "6–12 Months", students: "150+", rating: "4.7",
        },
    ];

    return (
        <section className="py-28 md:py-40 bg-[#0a0f1e] relative overflow-hidden">
            <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-red-600/[0.03] rounded-full blur-[180px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                    <span className="inline-block px-5 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase text-white/50 mb-8">{t("sectionLabel")}</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-[-0.02em]">{t("title")}</h2>
                    <p className="text-base md:text-lg text-white/45 max-w-2xl mx-auto leading-relaxed">{t("description")}</p>
                </motion.div>

                {/* Dot indicators — all red */}
                <div className="flex justify-center gap-2 mb-14">
                    {programs.map((_, idx) => (
                        <button key={idx} onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)} className={`w-2 h-2 rounded-full transition-all duration-300 ${expandedIdx === idx ? "bg-red-500 w-6" : "bg-white/15 hover:bg-white/25"}`} />
                    ))}
                </div>

                <div className="space-y-4">
                    {programs.map((program, idx) => (
                        <ProgramCard
                            key={idx}
                            program={program}
                            idx={idx}
                            isExpanded={expandedIdx === idx}
                            onToggle={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
                            t={t}
                            setActiveTab={setActiveTab}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ProgramCard({ program, idx, isExpanded, onToggle, t, setActiveTab }: { program: any, idx: number, isExpanded: boolean, onToggle: () => void, t: any, setActiveTab?: (t: string) => void }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            layout
            className="group relative rounded-3xl bg-gradient-to-r from-[#0a0f1e] to-[#0d1326] border border-white/5 hover:border-red-500/20 transition-all duration-500 overflow-hidden cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
            onClick={onToggle}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            600px circle at ${mouseX}px ${mouseY}px,
                            rgba(239, 68, 68, 0.1),
                            transparent 80%
                        )
                    `
                }}
            />

            <div className="relative z-10 flex items-center gap-4 md:gap-6 p-6 md:p-8">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-red-400 shrink-0 group-hover:bg-red-500/10 group-hover:border-red-500/20 group-hover:scale-110 transition-all duration-300">
                    <program.icon className="w-6 h-6 md:w-7 md:h-7" />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg md:text-xl font-bold text-white truncate group-hover:text-red-400 transition-colors">{program.title}</h3>
                    <div className="flex items-center gap-4 mt-1.5 flex-wrap">
                        <span className="flex items-center gap-1.5 text-xs text-white/40"><Clock className="w-3.5 h-3.5" />{program.duration}</span>
                        <span className="flex items-center gap-1.5 text-xs text-white/40"><Users className="w-3.5 h-3.5" />{program.students}</span>
                        <span className="flex items-center gap-1.5 text-xs text-white/40"><Star className="w-3.5 h-3.5 tracking-tighter" />{program.rating}</span>
                    </div>
                </div>
                <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} className="text-white/30 group-hover:text-red-400 transition-colors"><ChevronDown className="w-5 h-5" /></motion.div>
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4 }} className="relative z-10">
                        <div className="px-6 md:px-8 pb-8 border-t border-white/[0.04] pt-6">
                            <p className="text-white/50 leading-relaxed mb-6 max-w-2xl text-sm md:text-base">{program.desc}</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                                {program.features.map((f: string, fi: number) => (
                                    <motion.div key={fi} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: fi * 0.07 }} className="flex items-start gap-3">
                                        <div className="w-5 h-5 rounded-md bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
                                            <Check className="w-3 h-3 text-red-400" />
                                        </div>
                                        <span className="text-sm text-white/60">{f}</span>
                                    </motion.div>
                                ))}
                            </div>
                            <motion.button onClick={() => { if (setActiveTab) setActiveTab('admissions'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} whileHover={{ x: 5 }} className="flex items-center gap-2 text-red-400 font-semibold text-sm">{t("learnMore")} <ArrowRight className="w-4 h-4" /></motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

