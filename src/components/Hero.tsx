"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowRight, BookOpen, CheckCircle2, GraduationCap, MapPin } from "lucide-react";

const ENTRY_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const PROGRAM_FALLBACKS = ["Foundation Year", "German Language", "University Pathway"];
const TRUST_FALLBACKS = [
    "Official AP Tutor",
    "Certified SAT Center",
    "College Board Accredited",
    "CEFR-Aligned German Academy",
];

function splitList(value: string, fallback: string[]) {
    const items = value
        .split("·")
        .map((item) => item.trim())
        .filter(Boolean);

    return items.length > 0 ? items : fallback;
}

const CinematicOrbLayer = memo(function CinematicOrbLayer({ reduceMotion }: { reduceMotion: boolean }) {
    return (
        <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden="true">
            <motion.div
                className="absolute left-[10%] top-[10%] h-[60vw] w-[60vw] rounded-full bg-[#8c1c1c]/[0.16] blur-[96px] mix-blend-screen md:h-[45vw] md:w-[45vw] md:blur-[128px]"
                animate={
                    reduceMotion
                        ? { opacity: 0.48, scale: 1 }
                        : {
                              x: ["0%", "10%", "-4%", "0%"],
                              y: ["0%", "8%", "14%", "0%"],
                              scale: [1, 1.08, 0.94, 1],
                              opacity: [0.48, 0.72, 0.42, 0.48],
                          }
                }
                transition={reduceMotion ? { duration: 0.2 } : { duration: 26, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                className="absolute bottom-[10%] right-[10%] h-[50vw] w-[50vw] rounded-full bg-[#0a1f44]/[0.22] blur-[76px] mix-blend-screen md:h-[35vw] md:w-[35vw] md:blur-[116px]"
                animate={
                    reduceMotion
                        ? { opacity: 0.42, scale: 1 }
                        : {
                              x: ["0%", "-10%", "8%", "0%"],
                              y: ["0%", "-8%", "-12%", "0%"],
                              scale: [0.94, 1.1, 0.97, 0.94],
                              opacity: [0.4, 0.6, 0.34, 0.4],
                          }
                }
                transition={reduceMotion ? { duration: 0.2 } : { duration: 30, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.18)_1px,transparent_0)] [background-size:24px_24px] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]" />
        </div>
    );
});

function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStarted(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.45 }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!started) return;

        let frame = 0;
        const startedAt = performance.now();
        const duration = 1800;

        const animate = (now: number) => {
            const progress = Math.min((now - startedAt) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));

            if (progress < 1) {
                frame = requestAnimationFrame(animate);
            }
        };

        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, [started, target]);

    return (
        <span ref={ref}>
            {count.toLocaleString()}
            {suffix}
        </span>
    );
}

function StatCard({ target, suffix, label, delay }: { target: number; suffix: string; label: string; delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay, ease: ENTRY_EASE }}
            whileHover={{ y: -4, borderColor: "rgba(248, 113, 113, 0.26)" }}
            className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(7,13,25,0.82),rgba(7,12,22,0.66))] px-5 py-5 shadow-[0_18px_40px_rgba(2,6,23,0.24)] backdrop-blur-md"
        >
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0))]" />
            <div className="relative z-10">
                <div className="text-3xl font-black tracking-[-0.04em] text-white">
                    <AnimatedNumber target={target} suffix={suffix} />
                </div>
                <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45 transition-colors group-hover:text-white/70">
                    {label}
                </div>
            </div>
        </motion.div>
    );
}

/* ── Interactive Roadmap Component ── */
function InteractiveRoadmap() {
    const [activeStep, setActiveStep] = useState<number | null>(null);

    const steps = [
        { id: 1, title: "Language Mastery", desc: "Achieve C1 proficiency with native German educators in just 8-10 months.", icon: BookOpen },
        { id: 2, title: "University Prep", desc: "Pass the Studienkolleg entrance exam or directly apply with our advanced foundation courses.", icon: GraduationCap },
        { id: 3, title: "Arrival in Germany", desc: "Get full support with visa, local accommodation, and official university enrollment.", icon: MapPin },
        { id: 4, title: "Academic Success", desc: "Join 12,000+ Target alumni studying in Germany's tuition-free universities.", icon: CheckCircle2 }
    ];

    return (
        <div className="w-full max-w-4xl mx-auto mt-20 mb-8 relative z-40">
            <h3 className="text-white/60 text-[11px] font-bold uppercase tracking-[0.2em] text-center mb-8">Your Journey to Germany</h3>

            <div className="relative">
                {/* Connecting Line */}
                <div className="absolute top-6 left-[10%] right-[10%] h-[2px] bg-white/[0.05] hidden md:block" />

                <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-0 relative z-10">
                    {steps.map((step, idx) => {
                        const isActive = activeStep === idx;
                        return (
                            <div
                                key={step.id}
                                className="flex flex-col items-center relative group cursor-pointer"
                                onClick={() => setActiveStep(isActive ? null : idx)}
                                onMouseEnter={() => setActiveStep(idx)}
                                onMouseLeave={() => setActiveStep(null)}
                            >
                                <motion.div
                                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 relative z-10 
                                        ${isActive ? "bg-red-500 shadow-[0_0_30px_rgba(239,68,68,0.5)] scale-110" : "bg-[#0a0f1e] border-2 border-white/[0.1] group-hover:border-red-500/50"}`}
                                >
                                    <step.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-white/40 group-hover:text-red-400"}`} />
                                </motion.div>

                                <div className="mt-4 text-center">
                                    <h4 className={`text-sm md:text-base font-bold transition-colors ${isActive ? "text-white" : "text-white/60"}`}>
                                        {step.title}
                                    </h4>
                                </div>

                                <AnimatePresence>
                                    {isActive && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                            className="absolute md:-bottom-24 md:left-1/2 md:-translate-x-1/2 mt-4 md:mt-0 w-[240px] p-4 rounded-xl bg-[linear-gradient(180deg,rgba(7,13,25,0.9),rgba(7,12,22,0.8))] border border-white/[0.08] backdrop-blur-xl z-50 shadow-[0_24px_60px_rgba(2,6,23,0.5)] pointer-events-none"
                                        >
                                            <p className="text-xs text-white/60 leading-relaxed text-center">{step.desc}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default function Hero({ setActiveTab }: { setActiveTab?: (tab: string) => void }) {
    const t = useTranslations("Hero");
    const navT = useTranslations("Navbar");
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const [activePillar, setActivePillar] = useState(0);
    const reduceMotion = useReducedMotion() ?? false;

    const bgY = useTransform(scrollY, [0, 900], reduceMotion ? ["0%", "0%"] : ["0%", "10%"]);
    const contentOpacity = useTransform(scrollY, [0, 320], [1, 0.72]);
    const contentScale = useTransform(scrollY, [0, 320], [1, 0.992]);

    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const spring = { damping: 32, stiffness: 88 };
    const rx = useSpring(useTransform(my, [-0.5, 0.5], reduceMotion ? [0, 0] : [0.65, -0.65]), spring);
    const ry = useSpring(useTransform(mx, [-0.5, 0.5], reduceMotion ? [0, 0] : [-0.8, 0.8]), spring);

    const programItems = splitList(t("subtitle"), PROGRAM_FALLBACKS);
    const trustItems = splitList(t("trustLine"), TRUST_FALLBACKS);
    const languageTrust =
        trustItems.find((item) => /cefr|german/i.test(item)) ?? trustItems[trustItems.length - 1] ?? TRUST_FALLBACKS[3];

    const pillars = [
        {
            title: programItems[0] ?? PROGRAM_FALLBACKS[0],
            kicker: navT("admissions"),
            value: "95%",
            detail: t("stat2Label"),
            icon: GraduationCap,
        },
        {
            title: programItems[1] ?? PROGRAM_FALLBACKS[1],
            kicker: navT("german"),
            value: "A1-C2",
            detail: languageTrust,
            icon: BookOpen,
        },
        {
            title: programItems[2] ?? PROGRAM_FALLBACKS[2],
            kicker: navT("opportunities"),
            value: "40+",
            detail: t("stat3Label"),
            icon: CheckCircle2,
        },
    ];

    const activeItem = pillars[activePillar] ?? pillars[0];
    const ActiveIcon = activeItem.icon;

    const onMove = useCallback(
        (event: React.MouseEvent<HTMLElement>) => {
            if (reduceMotion) return;

            const bounds = containerRef.current?.getBoundingClientRect();
            if (!bounds) return;

            mx.set((event.clientX - bounds.left) / bounds.width - 0.5);
            my.set((event.clientY - bounds.top) / bounds.height - 0.5);
        },
        [mx, my, reduceMotion]
    );

    const onLeave = useCallback(() => {
        mx.set(0);
        my.set(0);
    }, [mx, my]);

    const fadeUp = (delay: number) => ({
        initial: { opacity: 0, y: 22 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, delay, ease: ENTRY_EASE },
    });

    const changeTab = (tab: string) => {
        if (setActiveTab) {
            setActiveTab(tab);
        }

        window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    };

    return (
        <section
            ref={containerRef}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className="relative min-h-[100svh] w-full overflow-hidden [perspective:1200px]"
        >
            <motion.div className="absolute inset-0 z-0 h-[114%] w-[106%] -left-[3%] -top-[5%] will-change-transform" style={{ y: bgY }}>
                <motion.div className="relative h-full w-full" style={{ rotateX: rx, rotateY: ry }}>
                    <Image
                        src="/Germany-Berlin.jpg"
                        alt="Berlin, Germany"
                        fill
                        priority
                        quality={84}
                        sizes="100vw"
                        className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,18,0.88)_0%,rgba(4,10,23,0.54)_24%,rgba(5,11,22,0.3)_52%,rgba(2,6,18,0.84)_100%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(17,39,78,0.36),transparent_40%),radial-gradient(circle_at_bottom,rgba(0,0,0,0.48),transparent_38%),radial-gradient(circle_at_left,rgba(0,0,0,0.32),transparent_44%)]" />
                </motion.div>
            </motion.div>

            <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-48 bg-gradient-to-b from-[#020611] via-[#020611]/78 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[28%] bg-gradient-to-t from-[#040814] via-[#040814]/70 to-transparent" />
            <CinematicOrbLayer reduceMotion={reduceMotion} />

            <motion.div
                className="relative z-30 mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col items-center justify-center px-5 pb-10 pt-24 text-center sm:px-8 sm:pb-12 sm:pt-32 lg:px-10"
                style={{ opacity: contentOpacity, scale: contentScale }}
            >
                <motion.div {...fadeUp(0.08)} className="flex justify-center">
                    <div className="inline-flex max-w-full flex-wrap items-center gap-2.5 rounded-full border border-red-400/18 bg-[#0c1730]/68 px-4 py-2.5 shadow-[0_12px_30px_rgba(2,6,20,0.2)] backdrop-blur-xl sm:px-5">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="absolute inset-0 animate-ping rounded-full bg-red-400 opacity-55" />
                            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-400 shadow-[0_0_14px_rgba(248,113,113,0.85)]" />
                        </span>
                        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-red-100/88 sm:text-xs">
                            {t("badge")}
                        </span>
                    </div>
                </motion.div>

                <motion.h1 {...fadeUp(0.18)} className="mt-6 max-w-5xl text-balance">
                    <span className="block font-[family-name:var(--font-outfit)] text-[2.95rem] font-black leading-[0.94] tracking-[-0.05em] text-white sm:text-[4.1rem] md:text-[5.15rem] xl:text-[6rem]">
                        {t("title1")}
                    </span>
                    <span className="mt-2 block bg-gradient-to-r from-[#ff9d9d] via-[#ff6a6a] to-[#ef4444] bg-clip-text pb-2 font-[family-name:var(--font-outfit)] text-[2.95rem] font-black leading-[0.94] tracking-[-0.05em] text-transparent sm:text-[4.1rem] md:text-[5.15rem] xl:text-[6rem]">
                        {t("title2")}
                    </span>
                </motion.h1>

                <motion.p
                    {...fadeUp(0.28)}
                    className="mx-auto mt-6 max-w-3xl text-[15px] leading-8 text-white/74 sm:text-base"
                >
                    {t("description")}
                </motion.p>

                <motion.div {...fadeUp(0.38)} className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
                    {pillars.map((item, index) => (
                        <button
                            key={item.title}
                            type="button"
                            onMouseEnter={() => setActivePillar(index)}
                            onFocus={() => setActivePillar(index)}
                            onClick={() => setActivePillar(index)}
                            className={`rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] backdrop-blur-xl transition-all duration-300 ${activePillar === index
                                ? "border-red-300/28 bg-red-500/12 text-red-100 shadow-[0_0_30px_rgba(239,68,68,0.14)]"
                                : "border-white/12 bg-white/[0.04] text-white/70 hover:border-white/24 hover:text-white"
                                }`}
                        >
                            {item.title}
                        </button>
                    ))}
                </motion.div>

                <motion.div {...fadeUp(0.46)} className="mt-6 w-full max-w-2xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeItem.title}
                            initial={{ opacity: 0, y: 12, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.98 }}
                            transition={{ duration: 0.35, ease: ENTRY_EASE }}
                            className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(7,13,25,0.82),rgba(8,12,22,0.66))] px-5 py-5 shadow-[0_24px_60px_rgba(2,6,23,0.28)] backdrop-blur-xl sm:px-6"
                        >
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_42%)]" />
                            <div className="relative z-10 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
                                <div className="flex items-center gap-4 text-left">
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-red-300/20 bg-red-500/12 text-red-100">
                                        <ActiveIcon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/34">{activeItem.kicker}</div>
                                        <div className="mt-2 text-xl font-bold tracking-[-0.03em] text-white">{activeItem.title}</div>
                                        <div className="mt-1 text-sm text-white/56">{activeItem.detail}</div>
                                    </div>
                                </div>
                                <div className="text-center sm:text-right">
                                    <div className="text-4xl font-black tracking-[-0.05em] text-white">{activeItem.value}</div>
                                    <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/30">Target pathway</div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>

                <motion.div
                    {...fadeUp(0.54)}
                    className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
                >
                    <motion.button
                        type="button"
                        onClick={() => changeTab("admissions")}
                        whileHover={{ scale: 1.03, boxShadow: "0 20px 60px rgba(239, 68, 68, 0.35)" }}
                        whileTap={{ scale: 0.98 }}
                        className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 via-red-500 to-red-600 px-8 py-4 text-sm font-bold text-white shadow-[0_16px_40px_rgba(220,38,38,0.28)] transition-all duration-300 sm:px-10"
                    >
                        <span>{t("cta")}</span>
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </motion.button>

                    <motion.button
                        type="button"
                        onClick={() => changeTab("programs")}
                        whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.22)" }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center justify-center rounded-2xl border border-white/14 bg-[#0b1326]/62 px-8 py-4 text-sm font-semibold text-white/82 backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.08]"
                    >
                        {navT("programs")}
                    </motion.button>
                </motion.div>

                <motion.div {...fadeUp(0.66)} className="mt-7 flex max-w-4xl flex-wrap items-center justify-center gap-3">
                    {trustItems.slice(0, 4).map((item) => (
                        <div
                            key={item}
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-2 text-[11px] text-white/64 backdrop-blur-md"
                        >
                            <CheckCircle2 className="h-3.5 w-3.5 text-red-300" />
                            <span>{item}</span>
                        </div>
                    ))}
                </motion.div>

                <div className="mt-10 grid w-full max-w-4xl gap-3 grid-cols-2 lg:grid-cols-4">
                    <StatCard target={12000} suffix="+" label={t("stat1Label")} delay={0.8} />
                    <StatCard target={95} suffix="%" label={t("stat2Label")} delay={0.88} />
                    <StatCard target={40} suffix="+" label={t("stat3Label")} delay={0.96} />
                    <StatCard target={2005} suffix="" label={t("stat4Label")} delay={1.04} />
                </div>

                <motion.div {...fadeUp(1.12)} className="w-full">
                    <InteractiveRoadmap />
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.15 }}
                className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 2.3, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-2"
                >
                    <span className="text-[9px] font-semibold uppercase tracking-[0.32em] text-white/18">Scroll</span>
                    <div className="h-8 w-px bg-gradient-to-b from-red-400/45 to-transparent" />
                </motion.div>
            </motion.div>
        </section>
    );
}




