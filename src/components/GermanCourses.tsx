"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Clock, BookOpen, Award, TrendingUp, Zap } from "lucide-react";

const LEVELS = [
    { key: "A1", pct: 16.6 },
    { key: "A2", pct: 33.3 },
    { key: "B1", pct: 50 },
    { key: "B2", pct: 66.6 },
    { key: "C1", pct: 83.3 },
    { key: "C2", pct: 100 },
];

export default function GermanCourses() {
    const t = useTranslations("German");
    const [activeLevel, setActiveLevel] = useState(0);

    const courseTypes = [
        { title: t("intensiveCourse"), desc: t("intensiveDesc"), hours: 20, weeks: 8, icon: TrendingUp, highlight: false },
        { title: t("superIntensive"), desc: t("superIntensiveDesc"), hours: 30, weeks: 6, icon: Zap, highlight: true },
        { title: t("eveningCourse"), desc: t("eveningDesc"), hours: 8, weeks: 14, icon: Clock, highlight: false },
    ];

    return (
        <section className="py-28 md:py-40 bg-[#0a0f1e] relative overflow-hidden">
            <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-red-600/[0.03] rounded-full blur-[180px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
                    <span className="inline-block px-5 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase text-white/50 mb-8">{t("sectionLabel")}</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-[-0.02em]">{t("title")}</h2>
                    <p className="text-base md:text-lg text-white/45 max-w-2xl mx-auto leading-relaxed">{t("description")}</p>
                </motion.div>

                {/* Interactive CEFR selector — red gradient */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
                    <div className="relative mb-8">
                        <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} whileInView={{ width: `${LEVELS[activeLevel].pct}%` }} animate={{ width: `${LEVELS[activeLevel].pct}%` }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="h-full rounded-full bg-gradient-to-r from-red-400 to-red-600" />
                        </div>
                        <div className="flex justify-between mt-4 -mx-2">
                            {LEVELS.map((level, idx) => (
                                <button key={level.key} onClick={() => setActiveLevel(idx)} className="flex flex-col items-center group px-2">
                                    <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }} className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center font-bold text-sm md:text-base transition-all ${activeLevel === idx ? "text-white bg-red-500 shadow-lg shadow-red-500/25" : "bg-white/[0.04] border border-white/[0.08] text-white/35 hover:text-white/60"}`}>
                                        {level.key}
                                    </motion.div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <motion.div key={activeLevel} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="rounded-3xl p-8 md:p-10 border border-red-500/15 bg-red-500/[0.04]">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="px-4 py-1.5 rounded-lg font-bold text-sm text-white bg-red-500">{LEVELS[activeLevel].key}</div>
                            <h4 className="text-xl md:text-2xl font-bold text-white">{t(`level${LEVELS[activeLevel].key}` as any)}</h4>
                        </div>
                        <p className="text-white/45 leading-relaxed text-base md:text-lg max-w-3xl">{t(`level${LEVELS[activeLevel].key}Desc` as any)}</p>
                    </motion.div>
                </motion.div>

                {/* Course formats — unified red */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
                    <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">Course Formats</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {courseTypes.map((course, idx) => (
                            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} whileHover={{ y: -4, borderColor: "rgba(239,68,68,0.2)" }} className={`relative rounded-3xl p-8 border transition-all duration-500 ${course.highlight ? "bg-gradient-to-br from-red-500/12 to-red-900/5 border-red-500/20" : "bg-white/[0.02] border-white/[0.06] hover:bg-red-500/[0.04]"}`}>
                                {course.highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2"><span className="px-3 py-1 bg-red-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-full">Most Popular</span></div>}
                                <course.icon className={`w-10 h-10 ${course.highlight ? "text-red-400" : "text-red-400/60"} mb-6`} />
                                <h4 className="text-xl font-bold text-white mb-2">{course.title}</h4>
                                <p className="text-white/40 text-sm mb-8 leading-relaxed">{course.desc}</p>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <div className="text-3xl font-black text-white">{course.hours}</div>
                                        <div className="text-[10px] text-white/30 uppercase tracking-wider font-semibold">{t("hoursPerWeek")}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-3xl font-black text-white">{course.weeks}</div>
                                        <div className="text-[10px] text-white/30 uppercase tracking-wider font-semibold">{t("weeksPerLevel")}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Exam prep — already red, kept consistent */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-3xl p-8 md:p-12 bg-gradient-to-r from-red-500/[0.07] via-red-900/[0.04] to-transparent border border-red-500/12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/8 rounded-full blur-[100px] pointer-events-none" />
                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-4">
                                <BookOpen className="w-8 h-8 text-red-400" />
                                <Award className="w-6 h-6 text-red-300/50" />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-black text-white mb-4">{t("examPrepTitle")}</h3>
                            <p className="text-white/45 leading-relaxed mb-6">{t("examPrepDesc")}</p>
                            <div className="flex flex-wrap gap-3">
                                {["TestDaF", "DSH", "telc B1", "telc B2", "Goethe-Zertifikat"].map((exam) => (
                                    <span key={exam} className="px-3 py-1.5 rounded-lg bg-red-500/8 border border-red-500/12 text-xs font-semibold text-white/55">{exam}</span>
                                ))}
                            </div>
                        </div>
                        <div className="text-center shrink-0">
                            <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", bounce: 0.4, delay: 0.3 }}>
                                <svg className="w-32 h-32 md:w-40 md:h-40" viewBox="0 0 120 120">
                                    <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="6" />
                                    <motion.circle cx="60" cy="60" r="52" fill="none" stroke="#ef4444" strokeWidth="6" strokeLinecap="round" strokeDasharray="327" initial={{ strokeDashoffset: 327 }} whileInView={{ strokeDashoffset: 327 * (1 - 0.92) }} viewport={{ once: true }} transition={{ duration: 2, delay: 0.5 }} transform="rotate(-90 60 60)" />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-4xl md:text-5xl font-black text-red-400">92%</span>
                                    <span className="text-[10px] text-white/35 uppercase tracking-wider font-bold">{t("passRate")}</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
