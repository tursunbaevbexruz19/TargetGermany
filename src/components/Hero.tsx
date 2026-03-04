"use client";

import { useRef, useEffect, useState, useCallback, memo } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import Image from "next/image";

/* ── Ambient floating particles (pure CSS animation — zero JS overhead) ── */
const ParticleField = memo(function ParticleField() {
    const [dots, setDots] = useState<Array<{ x: number; y: number; s: number; d: number; dl: number }>>([]);
    useEffect(() => {
        setDots(Array.from({ length: 14 }, () => ({
            x: Math.random() * 100, y: Math.random() * 100,
            s: 1 + Math.random() * 2.5, d: 10 + Math.random() * 14, dl: Math.random() * 6,
        })));
    }, []);
    return (
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden" aria-hidden="true">
            {dots.map((p, i) => (
                <div key={i} className="absolute rounded-full bg-red-400/[0.12] animate-float"
                    style={{
                        width: p.s, height: p.s, left: `${p.x}%`, top: `${p.y}%`,
                        animationDuration: `${p.d}s`, animationDelay: `${p.dl}s`,
                    }}
                />
            ))}
            <style jsx>{`
                @keyframes float { 0%, 100% { opacity: 0; transform: translateY(0); } 50% { opacity: 0.35; transform: translateY(-25px); } }
                .animate-float { animation: float ease-in-out infinite; }
            `}</style>
        </div>
    );
});

/* ── Animated counter with intersection observer ── */
function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } }, { threshold: 0.3 });
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    useEffect(() => {
        if (!started) return;
        let frame: number;
        const start = performance.now();
        const dur = 2000;
        const animate = (now: number) => {
            const p = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setCount(Math.floor(eased * target));
            if (p < 1) frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, [started, target]);

    return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ── Stat card with hover glow ── */
function StatCard({ target, suffix, label, delay }: { target: number; suffix: string; label: string; delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            whileHover={{ y: -4, scale: 1.03 }}
            className="group relative text-center px-5 py-4 rounded-2xl border border-white/[0.05] bg-white/[0.02] backdrop-blur-sm hover:border-red-500/20 hover:bg-red-500/[0.04] transition-all duration-500 cursor-default"
        >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-red-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
                <div className="text-2xl md:text-3xl font-black text-white tabular-nums tracking-tight">
                    <AnimatedNumber target={target} suffix={suffix} />
                </div>
                <div className="text-[9px] md:text-[10px] text-white/25 uppercase tracking-[0.18em] font-semibold mt-1.5 group-hover:text-white/40 transition-colors">{label}</div>
            </div>
        </motion.div>
    );
}

export default function Hero() {
    const t = useTranslations("Hero");
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    /* Parallax + fade on scroll */
    const bgY = useTransform(scrollY, [0, 800], ["0%", "18%"]);
    const contentOpacity = useTransform(scrollY, [0, 350], [1, 0]);
    const contentScale = useTransform(scrollY, [0, 350], [1, 0.97]);

    /* 3D tilt on mouse move */
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const spring = { damping: 35, stiffness: 70 };
    const rx = useSpring(useTransform(my, [-0.5, 0.5], [1.2, -1.2]), spring);
    const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-1.2, 1.2]), spring);

    const onMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
        const r = containerRef.current?.getBoundingClientRect();
        if (!r) return;
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
    }, [mx, my]);

    const onLeave = useCallback(() => { mx.set(0); my.set(0); }, [mx, my]);

    /* Smooth stagger utility */
    const fadeUp = (delay: number) => ({
        initial: { opacity: 0, y: 22 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    });

    return (
        <section
            ref={containerRef}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden [perspective:1200px]"
        >
            {/* Background with parallax + 3D tilt */}
            <motion.div className="absolute inset-0 z-0 h-[120%] w-[106%] -left-[3%] -top-[6%] will-change-transform" style={{ y: bgY }}>
                <motion.div className="w-full h-full relative" style={{ rotateX: rx as any, rotateY: ry as any }}>
                    <Image src="/Germany-Berlin.jpg" alt="Berlin, Germany" fill className="object-cover object-center" priority quality={85} sizes="100vw" />
                    {/* Multi-layer gradient overlay for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-[#0a0f1e]/60 to-[#0a0f1e]/20" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,#0a0f1e_100%)]" />
                </motion.div>
            </motion.div>

            <ParticleField />

            {/* ─── Main content ─── */}
            <motion.div
                className="relative z-30 w-full max-w-5xl mx-auto px-5 sm:px-8 flex flex-col items-center text-center"
                style={{ opacity: contentOpacity, scale: contentScale, rotateX: rx as any, rotateY: ry as any, transformStyle: "preserve-3d" }}
            >
                {/* Logo mark */}
                <motion.div {...fadeUp(0.15)} className="mb-6">
                    <div className="relative w-12 h-12 md:w-16 md:h-16 mx-auto">
                        <Image src="/logo-white.png" alt="Target" fill className="object-contain drop-shadow-[0_0_25px_rgba(220,38,38,0.2)]" priority />
                    </div>
                </motion.div>

                {/* Live intake badge */}
                <motion.div {...fadeUp(0.35)} className="mb-8">
                    <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-red-500/15 bg-red-500/[0.06] backdrop-blur-xl">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inset-0 rounded-full bg-red-500 opacity-50" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                        </span>
                        <span className="text-[11px] md:text-xs font-semibold tracking-[0.12em] uppercase text-red-200/70">{t("badge")}</span>
                    </div>
                </motion.div>

                {/* Headline — clean, bold, impactful */}
                <motion.h1 {...fadeUp(0.55)} className="mb-5">
                    <span className="block text-[2.2rem] leading-[1.05] sm:text-[3rem] md:text-[4rem] lg:text-[5rem] font-black tracking-[-0.035em] text-white">
                        {t("title1")}
                    </span>
                    <span className="block text-[2.2rem] leading-[1.05] sm:text-[3rem] md:text-[4rem] lg:text-[5rem] font-black tracking-[-0.035em] bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-red-400 to-red-600 pb-2">
                        {t("title2")}
                    </span>
                </motion.h1>

                {/* Subtitle tags — clean visual hierarchy */}
                <motion.div {...fadeUp(0.75)} className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-8">
                    {["Foundation Year", "German Language", "University Pathway"].map((tag, i) => (
                        <motion.span
                            key={tag}
                            whileHover={{ scale: 1.06, borderColor: "rgba(239,68,68,0.3)" }}
                            className="px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-[11px] md:text-xs font-semibold tracking-[0.14em] uppercase text-white/40 hover:text-white/60 transition-colors cursor-default"
                        >
                            {tag}
                        </motion.span>
                    ))}
                </motion.div>

                {/* Short punchy description */}
                <motion.p {...fadeUp(0.9)} className="text-sm sm:text-[15px] md:text-base text-white/40 font-light max-w-xl mx-auto leading-[1.9] mb-10">
                    {t("description")}
                </motion.p>

                {/* CTA */}
                <motion.div {...fadeUp(1.1)} className="mb-14 z-50">
                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 0 60px rgba(220,38,38,0.35)" }}
                        whileTap={{ scale: 0.97 }}
                        className="group relative px-10 py-4 md:px-12 md:py-[18px] text-sm md:text-[15px] font-bold text-white bg-gradient-to-r from-red-600 via-red-500 to-red-600 rounded-2xl shadow-[0_8px_30px_rgba(220,38,38,0.25)] transition-all duration-300 overflow-hidden"
                    >
                        {/* Shine effect on hover */}
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        <span className="relative flex items-center gap-2.5">
                            {t("cta")}
                            <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>→</motion.span>
                        </span>
                    </motion.button>
                </motion.div>

                {/* Stats row — interactive cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full max-w-2xl">
                    <StatCard target={12000} suffix="+" label={t("stat1Label")} delay={1.4} />
                    <StatCard target={95} suffix="%" label={t("stat2Label")} delay={1.5} />
                    <StatCard target={40} suffix="+" label={t("stat3Label")} delay={1.6} />
                    <StatCard target={2005} suffix="" label={t("stat4Label")} delay={1.7} />
                </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8 }} className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
                <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} className="flex flex-col items-center gap-2">
                    <span className="text-[8px] uppercase tracking-[0.3em] text-white/12 font-semibold">Scroll</span>
                    <div className="w-[1px] h-7 bg-gradient-to-b from-red-500/20 to-transparent" />
                </motion.div>
            </motion.div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#0a0f1e] to-transparent z-20 pointer-events-none" />
        </section>
    );
}
