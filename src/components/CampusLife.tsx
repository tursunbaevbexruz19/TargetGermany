"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, BookOpen, Coffee, Dumbbell, FlaskConical, Flag, MapPin, Monitor, PenTool, Sparkles, Wifi, type LucideIcon } from "lucide-react";

type CampusItem = {
    name: string;
    desc: string;
    focus: string;
    cadence: string;
    icon: LucideIcon;
    highlights: string[];
};

const ENTRY_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function CampusLife() {
    const t = useTranslations("Campus");
    const heroT = useTranslations("Hero");
    const reduceMotion = useReducedMotion();
    const [activeCampusIndex, setActiveCampusIndex] = useState(0);

    const germanFeatures = [
        { icon: Wifi, label: t("germanyFeature1") },
        { icon: BookOpen, label: t("germanyFeature2") },
        { icon: Coffee, label: t("germanyFeature3") },
        { icon: MapPin, label: t("germanyFeature4") },
    ];

    const germanyActivities = [
        { title: "Arrival desk", text: "Onboarding for housing, health insurance, city registration, and daily setup." },
        { title: "Study support", text: "Structured advising for language progression, university readiness, and weekly rhythm." },
        { title: "Career mentoring", text: "Internship direction, CV refinement, and post-study planning for Germany." },
        { title: "Student life", text: "Quiet study zones, collaboration areas, and a calmer day-to-day learning environment." },
    ];

    const tashkentCampuses: CampusItem[] = [
        {
            name: t("qoraqamish"),
            desc: t("qoraqamishDesc"),
            focus: "Strong technical foundation before Germany.",
            cadence: "Best for STEM-intensive schedules and lab-style preparation.",
            icon: FlaskConical,
            highlights: ["Math and physics reinforcement", "Structured progression for engineering pathways", "Academic problem-solving workshops", "Exam-readiness coaching"],
        },
        {
            name: t("tinchlik"),
            desc: t("tinchlikDesc"),
            focus: "Business, IT, and digital thinking in one hub.",
            cadence: "Best for software, product, analytics, and business applicants.",
            icon: Monitor,
            highlights: ["IT and business pathway advising", "Presentation and teamwork practice", "Digital tools and workflow training", "Modern classroom setup"],
        },
        {
            name: t("yunusabad"),
            desc: t("yunusabadDesc"),
            focus: "University-facing preparation and standardized exam discipline.",
            cadence: "Best for applicants targeting SAT, IELTS, and direct admissions.",
            icon: PenTool,
            highlights: ["SAT and IELTS preparation blocks", "Application strategy support", "Interview and statement guidance", "Academic English polishing"],
        },
        {
            name: t("sergeli"),
            desc: t("sergeliDesc"),
            focus: "Balanced student life with activity, discipline, and energy.",
            cadence: "Best for students who want academics with a stronger activity culture.",
            icon: Dumbbell,
            highlights: ["Sports and physical activity culture", "Community events and student routines", "Structured mentoring touchpoints", "Confidence-building environment"],
        },
    ];

    const activeCampus = tashkentCampuses[activeCampusIndex] ?? tashkentCampuses[0];
    const ActiveIcon = activeCampus.icon;

    const statRail = [
        { value: heroT("stat1Value"), label: heroT("stat1Label") },
        { value: heroT("stat2Value"), label: heroT("stat2Label") },
        { value: heroT("stat3Value"), label: heroT("stat3Label") },
        { value: "6", label: "2-country network" },
    ];

    return (
        <section className="relative overflow-hidden bg-[#0a0f1e] py-24 md:py-32">
            <div className="pointer-events-none absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-red-600/[0.03] blur-[180px]" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: ENTRY_EASE }} className="mx-auto mb-14 max-w-3xl text-center">
                    <span className="inline-flex rounded-full border border-white/[0.08] bg-white/[0.04] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-white/50 md:text-xs">Campus experience</span>
                    <h2 className="mt-8 font-[family-name:var(--font-outfit)] text-3xl font-black tracking-[-0.03em] text-white sm:text-4xl md:text-5xl lg:text-6xl">{t("title")}</h2>
                    <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/46 md:text-lg">{t("description")}</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7, ease: ENTRY_EASE }} className="overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(8,14,28,0.95),rgba(5,9,20,0.92))] shadow-[0_24px_70px_rgba(0,0,0,0.26)]">
                    <div className="grid gap-0 xl:grid-cols-[minmax(0,1fr)_minmax(360px,1fr)] xl:items-stretch">
                        <div className="relative min-h-[320px] overflow-hidden xl:min-h-[100%]">
                            <Image src="/Germany-Berlin.jpg" alt="Germany Campus" fill className="object-cover" sizes="(max-width: 1280px) 100vw, 48vw" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-[#0a0f1e]/32 to-transparent" />
                            <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-red-500/88 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white md:left-6 md:top-6"><Flag className="h-3.5 w-3.5" />European flagship</div>
                            <div className="absolute bottom-5 left-5 right-5 rounded-[24px] border border-white/10 bg-[#07101d]/82 p-4 backdrop-blur-md md:left-6 md:right-6 md:p-5">
                                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/32">Germany campus</div>
                                <h3 className="mt-2 font-[family-name:var(--font-outfit)] text-2xl font-black text-white md:text-3xl">{t("germany")}</h3>
                                <p className="mt-3 max-w-xl text-sm leading-7 text-white/58">{t("germanyDesc")}</p>
                            </div>
                        </div>

                        <div className="flex h-full flex-col p-5 md:p-6">
                            <div className="grid gap-3 sm:grid-cols-2">
                                {germanFeatures.map((feature, index) => (
                                    <motion.div key={feature.label} initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.45, delay: index * 0.05, ease: ENTRY_EASE }} whileHover={{ y: -2 }} className="min-h-[132px] rounded-[22px] border border-white/[0.08] bg-white/[0.03] p-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-red-300"><feature.icon className="h-4 w-4" /></div>
                                        <p className="mt-4 text-sm leading-6 text-white/64">{feature.label}</p>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                {germanyActivities.map((item, index) => (
                                    <motion.div key={item.title} initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.45, delay: 0.16 + index * 0.05, ease: ENTRY_EASE }} className="min-h-[132px] rounded-[22px] border border-red-400/12 bg-[linear-gradient(180deg,rgba(239,68,68,0.08),rgba(255,255,255,0.02))] p-4">
                                        <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-red-100/72">{item.title}</div>
                                        <p className="mt-3 text-sm leading-6 text-white/60">{item.text}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {statRail.map((item, index) => (
                        <motion.div key={item.label} initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.45, delay: index * 0.05, ease: ENTRY_EASE }} className="rounded-[22px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.015))] p-4">
                            <div className="text-3xl font-black tracking-[-0.04em] text-white">{item.value}</div>
                            <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/34">{item.label}</div>
                        </motion.div>
                    ))}
                </div>

                <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, delay: 0.08, ease: ENTRY_EASE }} className="mt-10 overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(8,14,28,0.95),rgba(5,9,20,0.92))] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.26)] md:p-6">
                    <div className="grid gap-6 xl:grid-cols-[minmax(320px,0.94fr)_minmax(0,1.06fr)] xl:items-stretch">
                        <div className="flex h-full flex-col">
                            <div>
                                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/28">Tashkent network</div>
                                <h3 className="mt-3 font-[family-name:var(--font-outfit)] text-2xl font-black text-white md:text-3xl">{t("tashkent")}</h3>
                                <p className="mt-3 max-w-lg text-sm leading-7 text-white/52">{t("tashkentDesc")}</p>
                            </div>

                            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                                {tashkentCampuses.map((campus, index) => {
                                    const Icon = campus.icon;
                                    const isActive = index === activeCampusIndex;

                                    return (
                                        <button key={campus.name} type="button" onMouseEnter={() => setActiveCampusIndex(index)} onFocus={() => setActiveCampusIndex(index)} onClick={() => setActiveCampusIndex(index)} className={`group flex min-h-[104px] w-full items-start gap-3 rounded-[22px] border p-4 text-left transition-all duration-300 ${isActive ? "border-red-400/22 bg-[linear-gradient(180deg,rgba(239,68,68,0.14),rgba(8,16,28,0.92))]" : "border-white/8 bg-white/[0.03] hover:border-white/14 hover:bg-white/[0.05]"}`}>
                                            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border ${isActive ? "border-red-300/20 bg-red-500/12 text-red-100" : "border-white/10 bg-white/[0.04] text-white/60"}`}><Icon className="h-4 w-4" /></div>
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center justify-between gap-3">
                                                    <div className="text-sm font-bold text-white">{campus.name}</div>
                                                    <ArrowRight className={`h-4 w-4 transition-transform duration-300 ${isActive ? "translate-x-0 text-red-300" : "text-white/20 group-hover:translate-x-0.5"}`} />
                                                </div>
                                                <p className="mt-1 text-xs leading-6 text-white/40">{campus.desc}</p>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="h-full rounded-[26px] border border-white/8 bg-[#08101d]/88 p-5 md:p-6 xl:min-h-[496px]">
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.div key={activeCampus.name} initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduceMotion ? 0 : -12 }} transition={{ duration: 0.35, ease: ENTRY_EASE }} className="flex h-full flex-col">
                                    <div className="grid gap-4 lg:grid-cols-[minmax(0,0.98fr)_minmax(0,1.02fr)] lg:items-start">
                                        <div className="rounded-[24px] border border-red-400/14 bg-[linear-gradient(180deg,rgba(239,68,68,0.1),rgba(255,255,255,0.02))] p-5">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-300/18 bg-red-500/12 text-red-100"><ActiveIcon className="h-5 w-5" /></div>
                                            <h4 className="mt-5 text-2xl font-black tracking-[-0.03em] text-white">{activeCampus.name}</h4>
                                            <p className="mt-3 text-sm leading-7 text-white/56">{activeCampus.desc}</p>
                                            <div className="mt-5 rounded-[20px] border border-white/8 bg-white/[0.03] p-4">
                                                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/26">Focus</div>
                                                <div className="mt-2 text-sm leading-6 text-white/68">{activeCampus.focus}</div>
                                            </div>
                                            <div className="mt-3 rounded-[20px] border border-white/8 bg-white/[0.03] p-4">
                                                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/26">Best fit</div>
                                                <div className="mt-2 text-sm leading-6 text-white/68">{activeCampus.cadence}</div>
                                            </div>
                                        </div>

                                        <div className="grid auto-rows-fr gap-3 sm:grid-cols-2">
                                            {activeCampus.highlights.map((item) => (
                                                <div key={item} className="min-h-[142px] rounded-[22px] border border-white/8 bg-white/[0.03] p-4">
                                                    <div className="flex items-center gap-2 text-red-300"><Sparkles className="h-4 w-4" /><span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/32">Campus activity</span></div>
                                                    <p className="mt-4 text-sm leading-6 text-white/60">{item}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
