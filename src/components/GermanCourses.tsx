"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, BookOpen, Award, TrendingUp, Zap, type LucideIcon } from "lucide-react";

const LEVELS = [
    { key: "A1", pct: 16.6 },
    { key: "A2", pct: 33.3 },
    { key: "B1", pct: 50 },
    { key: "B2", pct: 66.6 },
    { key: "C1", pct: 83.3 },
    { key: "C2", pct: 100 },
] as const;

type CourseFilter = "all" | "intensive" | "evening";

type CourseType = {
    id: string;
    type: Exclude<CourseFilter, "all">;
    title: string;
    desc: string;
    hours: number;
    weeks: number;
    icon: LucideIcon;
    highlight: boolean;
};

export default function GermanCourses() {
    const t = useTranslations("German");
    const [activeLevel, setActiveLevel] = useState(0);
    const [activeFilter, setActiveFilter] = useState<CourseFilter>("all");

    const courseTypes: CourseType[] = [
        { id: "int1", type: "intensive", title: t("intensiveCourse"), desc: t("intensiveDesc"), hours: 20, weeks: 8, icon: TrendingUp, highlight: false },
        { id: "int2", type: "intensive", title: t("superIntensive"), desc: t("superIntensiveDesc"), hours: 30, weeks: 6, icon: Zap, highlight: true },
        { id: "eve1", type: "evening", title: t("eveningCourse"), desc: t("eveningDesc"), hours: 8, weeks: 14, icon: Clock, highlight: false },
    ];

    const filters: Array<{ id: CourseFilter; label: string }> = [
        { id: "all", label: "All Formats" },
        { id: "intensive", label: "Intensive" },
        { id: "evening", label: "Evening" },
    ];

    const filteredCourses = courseTypes.filter((course) => activeFilter === "all" || course.type === activeFilter);
    const activeLevelKey = LEVELS[activeLevel].key;

    return (
        <section className="relative overflow-hidden bg-[#0a0f1e] py-28 md:py-40">
            <div className="absolute left-0 top-1/4 h-[600px] w-[600px] rounded-full bg-red-600/[0.03] blur-[180px] pointer-events-none" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20 text-center">
                    <span className="mb-8 inline-block rounded-full border border-white/[0.08] bg-white/[0.04] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-white/50 md:text-xs">{t("sectionLabel")}</span>
                    <h2 className="mb-6 font-[family-name:var(--font-outfit)] text-3xl font-black tracking-[-0.02em] text-white sm:text-4xl md:text-5xl lg:text-6xl">{t("title")}</h2>
                    <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/45 md:text-lg">{t("description")}</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
                    <div className="relative mb-8">
                        <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                            <motion.div initial={{ width: 0 }} whileInView={{ width: `${LEVELS[activeLevel].pct}%` }} animate={{ width: `${LEVELS[activeLevel].pct}%` }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="h-full rounded-full bg-gradient-to-r from-red-400 to-red-600" />
                        </div>
                        <div className="-mx-2 mt-4 flex justify-between">
                            {LEVELS.map((level, idx) => (
                                <button key={level.key} onClick={() => setActiveLevel(idx)} className="group flex flex-col items-center px-2">
                                    <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }} className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold transition-all md:h-12 md:w-12 md:text-base ${activeLevel === idx ? "bg-red-500 text-white shadow-lg shadow-red-500/25" : "border border-white/[0.08] bg-white/[0.04] text-white/35 hover:text-white/60"}`}>
                                        {level.key}
                                    </motion.div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <motion.div key={activeLevelKey} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="rounded-3xl border border-red-500/15 bg-red-500/[0.04] p-8 md:p-10">
                        <div className="mb-4 flex items-center gap-4">
                            <div className="rounded-lg bg-red-500 px-4 py-1.5 text-sm font-bold text-white">{activeLevelKey}</div>
                            <h4 className="text-xl font-bold text-white md:text-2xl">{t(`level${activeLevelKey}`)}</h4>
                        </div>
                        <p className="max-w-3xl text-base leading-relaxed text-white/45 md:text-lg">{t(`level${activeLevelKey}Desc`)}</p>
                    </motion.div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
                    <h3 className="mb-6 text-center font-[family-name:var(--font-outfit)] text-2xl font-bold text-white md:text-3xl">Course Formats</h3>

                    <div className="mb-12 flex flex-wrap justify-center gap-3">
                        {filters.map((filter) => (
                            <button key={filter.id} onClick={() => setActiveFilter(filter.id)} className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-300 ${activeFilter === filter.id ? "bg-red-500 text-white shadow-[0_4px_20px_rgba(239,68,68,0.3)]" : "bg-white/[0.04] text-white/40 hover:bg-white/[0.08] hover:text-white"}`}>
                                {filter.label}
                            </button>
                        ))}
                    </div>

                    <motion.div layout className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-3">
                        <AnimatePresence mode="popLayout">
                            {filteredCourses.map((course) => (
                                <motion.div key={course.id} layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} whileHover={{ y: -4, borderColor: "rgba(239,68,68,0.2)" }} className={`relative flex h-full flex-col rounded-3xl border p-8 transition-all duration-500 ${course.highlight ? "border-red-500/20 bg-gradient-to-br from-red-500/12 to-red-900/5 shadow-[0_8px_30px_rgba(239,68,68,0.1)]" : "border-white/[0.06] bg-white/[0.02] hover:bg-red-500/[0.04]"}`}>
                                    {course.highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2"><span className="rounded-full bg-red-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg shadow-red-500/20">Most Popular</span></div>}
                                    <course.icon className={`mb-6 h-10 w-10 shrink-0 ${course.highlight ? "text-red-400" : "text-red-400/60"}`} />
                                    <h4 className="mb-2 text-xl font-bold text-white">{course.title}</h4>
                                    <p className="mb-8 flex-grow text-sm leading-relaxed text-white/40">{course.desc}</p>
                                    <div className="flex shrink-0 items-end justify-between border-t border-white/[0.04] pt-4">
                                        <div>
                                            <div className="text-3xl font-black text-white">{course.hours}</div>
                                            <div className="text-[10px] font-semibold uppercase tracking-wider text-white/30">{t("hoursPerWeek")}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-3xl font-black text-white">{course.weeks}</div>
                                            <div className="text-[10px] font-semibold uppercase tracking-wider text-white/30">{t("weeksPerLevel")}</div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative overflow-hidden rounded-3xl border border-red-500/12 bg-gradient-to-r from-red-500/[0.07] via-red-900/[0.04] to-transparent p-8 md:p-12">
                    <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-red-500/8 blur-[100px]" />
                    <div className="relative z-10 flex flex-col items-center gap-8 md:flex-row md:gap-12">
                        <div className="flex-1">
                            <div className="mb-4 flex items-center gap-3">
                                <BookOpen className="h-8 w-8 text-red-400" />
                                <Award className="h-6 w-6 text-red-300/50" />
                            </div>
                            <h3 className="mb-4 font-[family-name:var(--font-outfit)] text-2xl font-black text-white md:text-3xl">{t("examPrepTitle")}</h3>
                            <p className="mb-6 leading-relaxed text-white/45">{t("examPrepDesc")}</p>
                            <div className="flex flex-wrap gap-3">
                                {["TestDaF", "DSH", "telc B1", "telc B2", "Goethe-Zertifikat"].map((exam) => (
                                    <span key={exam} className="rounded-lg border border-red-500/12 bg-red-500/8 px-3 py-1.5 text-xs font-semibold text-white/55">{exam}</span>
                                ))}
                            </div>
                        </div>
                        <div className="shrink-0 text-center">
                            <motion.div className="relative inline-block" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", bounce: 0.4, delay: 0.3 }}>
                                <svg className="h-32 w-32 md:h-40 md:w-40" viewBox="0 0 120 120">
                                    <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="6" />
                                    <motion.circle cx="60" cy="60" r="52" fill="none" stroke="#ef4444" strokeWidth="6" strokeLinecap="round" strokeDasharray="327" initial={{ strokeDashoffset: 327 }} whileInView={{ strokeDashoffset: 327 * (1 - 0.92) }} viewport={{ once: true }} transition={{ duration: 2, delay: 0.5 }} transform="rotate(-90 60 60)" />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-4xl font-black text-red-400 md:text-5xl">92%</span>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/35">{t("passRate")}</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
