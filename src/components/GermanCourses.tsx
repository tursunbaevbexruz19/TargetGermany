"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
    Clock, BookOpen, Award, TrendingUp, Zap, Globe,
    X, ChevronRight, Hash,
    type LucideIcon
} from "lucide-react";

/* ── CEFR Level bar ── */
const LEVELS = [
    { key: "A1", pct: 16.6 },
    { key: "A2", pct: 33.3 },
    { key: "B1", pct: 50 },
    { key: "B2", pct: 66.6 },
    { key: "C1", pct: 83.3 },
    { key: "C2", pct: 100 },
] as const;

type CourseFilter = "all" | "intensive" | "evening" | "weekend" | "online";

/* ── Sanity Course shape ── */
export interface SanityCourse {
    _id: string;
    title: string;
    shortDescription: string;
    fullDescriptionHtml?: string;
    courseType: string;
    levels?: string[];
    hoursPerWeek?: number;
    durationWeeks?: number;
    schedule?: string;
    price?: string;
    isFeatured?: boolean;
    iconType?: string;
    tags?: string[];
    imageUrl?: string;
}

const ICON_MAP: Record<string, LucideIcon> = {
    trending: TrendingUp,
    zap: Zap,
    clock: Clock,
    book: BookOpen,
    globe: Globe,
    award: Award,
};

/* ── Rich-text renderer (portable-text blocks → plain HTML) ── */
function blocksToHtml(blocks: any[]): string {
    if (!blocks || !Array.isArray(blocks)) return "";
    return blocks
        .map((block: any) => {
            if (block._type !== "block" || !block.children) return "";
            const text = block.children.map((c: any) => c.text).join("");
            switch (block.style) {
                case "h2": return `<h2 class="text-xl font-bold text-white mb-3 mt-5">${text}</h2>`;
                case "h3": return `<h3 class="text-lg font-bold text-white/90 mb-2 mt-4">${text}</h3>`;
                case "h4": return `<h4 class="text-base font-semibold text-white/80 mb-2 mt-3">${text}</h4>`;
                case "blockquote": return `<blockquote class="border-l-2 border-red-500/40 pl-4 italic text-white/50 my-3">${text}</blockquote>`;
                default: return `<p class="text-white/50 leading-relaxed mb-2">${text}</p>`;
            }
        })
        .join("");
}

/* ── Expandable Detail Modal ── */
function CourseDetailModal({ course, onClose }: { course: SanityCourse; onClose: () => void }) {
    const Icon = ICON_MAP[course.iconType || "book"] || BookOpen;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-[#0d1224] p-8 shadow-[0_25px_60px_rgba(0,0,0,0.6)] md:p-10"
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 rounded-full bg-white/5 p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                >
                    <X size={20} />
                </button>

                {/* Header with image */}
                {course.imageUrl && (
                    <div className="relative mb-6 h-48 w-full overflow-hidden rounded-2xl md:h-56">
                        <Image
                            src={course.imageUrl}
                            alt={course.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 640px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1224] via-transparent to-transparent" />
                    </div>
                )}

                {/* Title + badge */}
                <div className="mb-4 flex items-start gap-4">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                        <Icon className="h-7 w-7 text-red-400" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-2xl font-black text-white md:text-3xl">{course.title}</h3>
                        {course.isFeatured && (
                            <span className="mt-1 inline-block rounded-full bg-red-500/20 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-400">
                                Most Popular
                            </span>
                        )}
                    </div>
                </div>

                {/* Stats grid */}
                <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {course.hoursPerWeek && (
                        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-center">
                            <div className="text-2xl font-black text-white">{course.hoursPerWeek}</div>
                            <div className="text-[10px] font-semibold uppercase tracking-wider text-white/30">hrs/week</div>
                        </div>
                    )}
                    {course.durationWeeks && (
                        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-center">
                            <div className="text-2xl font-black text-white">{course.durationWeeks}</div>
                            <div className="text-[10px] font-semibold uppercase tracking-wider text-white/30">weeks</div>
                        </div>
                    )}
                    {course.schedule && (
                        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-center sm:col-span-2">
                            <div className="text-sm font-bold text-white">{course.schedule}</div>
                            <div className="text-[10px] font-semibold uppercase tracking-wider text-white/30">schedule</div>
                        </div>
                    )}
                </div>

                {/* Levels */}
                {course.levels && course.levels.length > 0 && (
                    <div className="mb-6">
                        <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-white/30">CEFR Levels</div>
                        <div className="flex flex-wrap gap-2">
                            {course.levels.map((lvl) => (
                                <span key={lvl} className="rounded-lg bg-red-500/15 px-3 py-1 text-xs font-bold text-red-400">
                                    {lvl}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Price */}
                {course.price && (
                    <div className="mb-6 rounded-2xl border border-red-500/15 bg-red-500/[0.05] p-4 text-center">
                        <div className="text-2xl font-black text-white">{course.price}</div>
                    </div>
                )}

                {/* Full description */}
                {course.fullDescriptionHtml && (
                    <div
                        className="prose prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: course.fullDescriptionHtml }}
                    />
                )}

                {/* Tags */}
                {course.tags && course.tags.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2 border-t border-white/[0.06] pt-4">
                        {course.tags.map((tag) => (
                            <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-white/40">
                                <Hash size={10} className="text-white/25" />
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
}

/* ── Main Component ── */
export default function GermanCourses({ dynamicCourses }: { dynamicCourses?: SanityCourse[] }) {
    const t = useTranslations("German");
    const [activeLevel, setActiveLevel] = useState(0);
    const [activeFilter, setActiveFilter] = useState<CourseFilter>("all");
    const [expandedCourse, setExpandedCourse] = useState<SanityCourse | null>(null);

    /* Fallback static courses when Sanity has no data */
    const fallbackCourses: SanityCourse[] = [
        { _id: "int1", title: t("intensiveCourse"), shortDescription: t("intensiveDesc"), courseType: "intensive", hoursPerWeek: 20, durationWeeks: 8, iconType: "trending", isFeatured: false },
        { _id: "int2", title: t("superIntensive"), shortDescription: t("superIntensiveDesc"), courseType: "intensive", hoursPerWeek: 30, durationWeeks: 6, iconType: "zap", isFeatured: true },
        { _id: "eve1", title: t("eveningCourse"), shortDescription: t("eveningDesc"), courseType: "evening", hoursPerWeek: 8, durationWeeks: 14, iconType: "clock", isFeatured: false },
    ];

    const courses = dynamicCourses && dynamicCourses.length > 0 ? dynamicCourses : fallbackCourses;

    const filterOptions: Array<{ id: CourseFilter; label: string }> = [
        { id: "all", label: "All Formats" },
        { id: "intensive", label: "Intensive" },
        { id: "evening", label: "Evening" },
        { id: "weekend", label: "Weekend" },
        { id: "online", label: "Online" },
    ];

    /* Only show filter buttons that have matching courses */
    const availableFilters = filterOptions.filter(
        (f) => f.id === "all" || courses.some((c) => c.courseType === f.id)
    );

    const filteredCourses = courses.filter((c) => activeFilter === "all" || c.courseType === activeFilter);
    const activeLevelKey = LEVELS[activeLevel].key;

    return (
        <section className="relative overflow-hidden bg-[#0a0f1e] py-28 md:py-40">
            <div className="absolute left-0 top-1/4 h-[600px] w-[600px] rounded-full bg-red-600/[0.03] blur-[180px] pointer-events-none" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20 text-center">
                    <span className="mb-8 inline-block rounded-full border border-white/[0.08] bg-white/[0.04] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-white/50 md:text-xs">{t("sectionLabel")}</span>
                    <h2 className="mb-6 font-[family-name:var(--font-outfit)] text-3xl font-black tracking-[-0.02em] text-white sm:text-4xl md:text-5xl lg:text-6xl">{t("title")}</h2>
                    <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/45 md:text-lg">{t("description")}</p>
                </motion.div>

                {/* CEFR Level Progress Bar */}
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

                {/* Course Format Filters + Cards */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
                    <h3 className="mb-6 text-center font-[family-name:var(--font-outfit)] text-2xl font-bold text-white md:text-3xl">Course Formats</h3>

                    {availableFilters.length > 2 && (
                        <div className="mb-12 flex flex-wrap justify-center gap-3">
                            {availableFilters.map((filter) => (
                                <button key={filter.id} onClick={() => setActiveFilter(filter.id)} className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-300 ${activeFilter === filter.id ? "bg-red-500 text-white shadow-[0_4px_20px_rgba(239,68,68,0.3)]" : "bg-white/[0.04] text-white/40 hover:bg-white/[0.08] hover:text-white"}`}>
                                    {filter.label}
                                </button>
                            ))}
                        </div>
                    )}

                    <motion.div layout className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
                        <AnimatePresence mode="popLayout">
                            {filteredCourses.map((course) => {
                                const Icon = ICON_MAP[course.iconType || "book"] || BookOpen;
                                return (
                                    <motion.div
                                        key={course._id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                                        whileHover={{ y: -4 }}
                                        onClick={() => setExpandedCourse(course)}
                                        className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-3xl border transition-all duration-500 ${
                                            course.isFeatured
                                                ? "border-red-500/20 bg-gradient-to-br from-red-500/12 to-red-900/5 shadow-[0_8px_30px_rgba(239,68,68,0.1)]"
                                                : "border-white/[0.06] bg-white/[0.02] hover:border-red-500/15 hover:bg-red-500/[0.04]"
                                        }`}
                                    >
                                        {/* Featured badge */}
                                        {course.isFeatured && (
                                            <div className="absolute -top-0 right-4 z-10">
                                                <span className="inline-block rounded-b-lg bg-red-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg shadow-red-500/20">
                                                    Most Popular
                                                </span>
                                            </div>
                                        )}

                                        {/* Preview image */}
                                        {course.imageUrl && (
                                            <div className="relative h-40 w-full overflow-hidden">
                                                <Image
                                                    src={course.imageUrl}
                                                    alt={course.title}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-[#0a0f1e]/40 to-transparent" />
                                            </div>
                                        )}

                                        <div className="flex flex-1 flex-col p-7">
                                            <Icon className={`mb-4 h-9 w-9 shrink-0 ${course.isFeatured ? "text-red-400" : "text-red-400/60"}`} />
                                            <h4 className="mb-2 text-lg font-bold text-white">{course.title}</h4>

                                            {/* Level badges */}
                                            {course.levels && course.levels.length > 0 && (
                                                <div className="mb-3 flex flex-wrap gap-1.5">
                                                    {course.levels.map((lvl) => (
                                                        <span key={lvl} className="rounded-md bg-red-500/10 px-2 py-0.5 text-[10px] font-bold text-red-400">{lvl}</span>
                                                    ))}
                                                </div>
                                            )}

                                            <p className="mb-5 flex-grow text-sm leading-relaxed text-white/40">{course.shortDescription}</p>

                                            {/* Tags */}
                                            {course.tags && course.tags.length > 0 && (
                                                <div className="mb-4 flex flex-wrap gap-1.5">
                                                    {course.tags.slice(0, 3).map((tag) => (
                                                        <span key={tag} className="inline-flex items-center gap-0.5 rounded-full bg-white/[0.04] px-2 py-0.5 text-[10px] text-white/30">
                                                            <Hash size={8} />
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Stats footer */}
                                            <div className="flex shrink-0 items-end justify-between border-t border-white/[0.04] pt-4">
                                                <div>
                                                    <div className="text-2xl font-black text-white">{course.hoursPerWeek || "—"}</div>
                                                    <div className="text-[10px] font-semibold uppercase tracking-wider text-white/30">{t("hoursPerWeek")}</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-2xl font-black text-white">{course.durationWeeks || "—"}</div>
                                                    <div className="text-[10px] font-semibold uppercase tracking-wider text-white/30">{t("weeksPerLevel")}</div>
                                                </div>
                                                <div className="flex items-center gap-1 text-xs font-semibold text-red-400 opacity-0 transition-opacity group-hover:opacity-100">
                                                    Details <ChevronRight size={14} />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>

                {/* Exam Prep Section */}
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

            {/* Detail Modal */}
            <AnimatePresence>
                {expandedCourse && (
                    <CourseDetailModal course={expandedCourse} onClose={() => setExpandedCourse(null)} />
                )}
            </AnimatePresence>
        </section>
    );
}
