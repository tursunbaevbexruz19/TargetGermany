"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform, useSpring, useMotionValue, type Variants } from "framer-motion";
import { Trophy, Medal, Bot, Cpu, Award, Globe2, Star, Sparkles, Target } from "lucide-react";
import React, { useRef } from "react";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    })
};

const universityAdmissions = [
    {
        region: "North America",
        color: "from-rose-500/30 to-rose-600/10",
        accent: "text-rose-400",
        border: "border-rose-500/30",
        glow: "bg-rose-500/20",
        topTier: ["University of Toronto (2x)", "Gettysburg College"],
        others: ["Arizona State University", "University of South Florida", "Florida Atlantic University"]
    },
    {
        region: "Asia & Middle East",
        color: "from-emerald-500/30 to-emerald-600/10",
        accent: "text-emerald-400",
        border: "border-emerald-500/30",
        glow: "bg-emerald-500/20",
        topTier: ["NYU Shanghai (4x)", "HKUST", "King Fahd University (KFUPM)"],
        others: ["Top Chinese Universities", "City University of Hong Kong", "PolyU"]
    },
    {
        region: "Europe",
        color: "from-blue-500/30 to-blue-600/10",
        accent: "text-blue-400",
        border: "border-blue-500/30",
        glow: "bg-blue-500/20",
        topTier: ["Constructor University (Germany)", "EU Business School"],
        others: ["Schiller International University", "GISMA University of Applied Sciences", "Berlin School of Business"]
    },
];

const achievements = [
    {
        icon: Trophy,
        title: "World Scholars Cup",
        highlight: "Debate Champions",
        desc: "Dominating the international stage with Gold and Silver medals.",
        color: "from-amber-400 to-orange-600",
        shadow: "shadow-amber-500/30"
    },
    {
        icon: Award,
        title: "WAMAS 2024",
        highlight: "Gold Trophy",
        desc: "Student Zulayho outscored 500+ global participants from 24 nations.",
        color: "from-rose-400 to-pink-600",
        shadow: "shadow-rose-500/30"
    },
    {
        icon: Medal,
        title: "Mental Arithmetic ASIAN CUP",
        highlight: "6 Gold Medals",
        desc: "Also securing 8 Silver and 7 Bronze at the global olympiad.",
        color: "from-blue-400 to-cyan-600",
        shadow: "shadow-blue-500/30"
    },
    {
        icon: Cpu,
        title: "President Tech Award",
        highlight: "National 2nd Place",
        desc: "Breakthrough innovation with the 'Speaklish' tech project.",
        color: "from-purple-400 to-violet-600",
        shadow: "shadow-purple-500/30"
    },
    {
        icon: Bot,
        title: "National Robotics",
        highlight: "Sweeping Podiums",
        desc: "Transforming theoretical physics into physical reality.",
        color: "from-emerald-400 to-green-600",
        shadow: "shadow-emerald-500/30"
    },
    {
        icon: Globe2,
        title: "Asian Arithmetics",
        highlight: "Top Percentiles",
        desc: "Proving unmatched cognitive processing speed globally.",
        color: "from-indigo-400 to-blue-600",
        shadow: "shadow-indigo-500/30"
    },
];

function ParallaxCard({ children, className, speed = 1 }: { children: React.ReactNode, className?: string, speed?: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
    const springY = useSpring(y, { stiffness: 100, damping: 30, restDelta: 0.001 });

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"]), { stiffness: 300, damping: 30 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"]), { stiffness: 300, damping: 30 });

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ y: springY, rotateX, rotateY, transformStyle: "preserve-3d" }}
            className={`relative [perspective:1000px] ${className || ''}`}
        >
            <motion.div style={{ transform: "translateZ(50px)" }} className="w-full h-full">
                {children}
            </motion.div>
        </motion.div>
    );
}

export default function Results() {
    const t = useTranslations("Results");
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    return (
        <motion.div
            ref={containerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full bg-[#030308] text-white overflow-hidden relative"
        >
            {/* Immersive Parallax Background */}
            <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0 pointer-events-none opacity-40">
                <div className="absolute top-0 right-0 w-[80vw] h-[80vw] rounded-full bg-blue-900/10 blur-[150px] mix-blend-screen" />
                <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] rounded-full bg-purple-900/10 blur-[150px] mix-blend-screen" />
            </motion.div>

            {/* Massive Hero Section */}
            <section className="min-h-screen flex flex-col justify-center items-center px-6 md:px-16 pt-32 pb-32 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 pointer-events-none flex items-center justify-center -z-10 opacity-20"
                >
                    <Target className="w-[80vw] h-[80vw] text-blue-500/20 animate-spin-slow" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-12 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                        <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" />
                        <span className="text-white text-sm font-bold uppercase tracking-[0.2em]">{t("title")}</span>
                    </div>
                    <h1 className="text-5xl md:text-8xl lg:text-[9rem] leading-[0.9] font-black tracking-tighter mb-12 text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/40">
                        Global Elite
                        <br />Placements.
                    </h1>
                    <p className="text-2xl md:text-4xl text-white/60 font-medium max-w-4xl mx-auto leading-tight">
                        {t("description")}
                    </p>
                </motion.div>
            </section>

            {/* University Admissions - Deep Parallax Stack */}
            <section className="py-32 px-6 md:px-16 relative z-10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
                    {universityAdmissions.map((region, i) => (
                        <ParallaxCard key={i} speed={0.5 + (i * 0.2)} className="h-full">
                            <motion.div
                                custom={i}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-100px" }}
                                className={`relative h-full flex flex-col p-10 md:p-14 rounded-[3rem] border ${region.border} bg-gradient-to-br ${region.color} backdrop-blur-xl group overflow-hidden shadow-2xl`}
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 pointer-events-none" />
                                <div className={`absolute -top-32 -right-32 w-[300px] h-[300px] rounded-full blur-[100px] ${region.glow} opacity-60 group-hover:opacity-100 transition-opacity duration-1000`} />

                                <div className="relative z-10 flex-grow">
                                    <h3 className={`text-5xl font-black ${region.accent} mb-12 tracking-tight flex items-center gap-4`}>
                                        {region.region}
                                    </h3>

                                    <div className="space-y-8">
                                        <div>
                                            <p className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4">Tier 1 Target Schools</p>
                                            <ul className="space-y-4">
                                                {region.topTier.map((uni, j) => (
                                                    <li key={j} className="flex items-center gap-4">
                                                        <Star className={`w-5 h-5 ${region.accent} fill-current flex-shrink-0 animate-pulse`} />
                                                        <span className="text-xl md:text-2xl text-white font-bold tracking-tight">
                                                            {uni}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="h-px w-full bg-white/10" />

                                        <div>
                                            <p className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4">Notable Acceptances</p>
                                            <ul className="space-y-3">
                                                {region.others.map((uni, j) => (
                                                    <li key={j} className="flex items-center gap-4">
                                                        <div className={`w-1.5 h-1.5 rounded-full ${region.accent.replace('text-', 'bg-')} flex-shrink-0 opacity-50`} />
                                                        <span className="text-lg text-white/60 font-medium">
                                                            {uni}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </ParallaxCard>
                    ))}
                </div>
            </section>

            {/* Epic Achievement Matrix */}
            <section className="py-40 px-6 md:px-16 relative z-10 bg-black/50 backdrop-blur-3xl border-t border-white/5 mt-32">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-32"
                >
                    <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-6">{t("achievements")}</h2>
                    <p className="text-2xl text-white/50 max-w-2xl mx-auto">Forging a legacy of absolute intellectual dominance across international arenas.</p>
                </motion.div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {achievements.map((item, i) => (
                        <ParallaxCard key={i} speed={0.3 * (i % 3)}>
                            <div className="group relative p-1 rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent overflow-hidden h-full">
                                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-20 transition-opacity duration-700`} />
                                <div className="relative h-full bg-[#080812]/90 backdrop-blur-xl p-10 md:p-12 rounded-[2.4rem] border border-white/5 hover:border-white/20 transition-colors duration-500 flex flex-col items-start">

                                    <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-10 shadow-2xl ${item.shadow} group-hover:scale-110 group-hover:-rotate-6 transition-all duration-700 ease-out`}>
                                        <item.icon className="w-12 h-12 text-white" />
                                    </div>

                                    <p className={`text-sm font-bold uppercase tracking-widest mb-3 bg-clip-text text-transparent bg-gradient-to-r ${item.color}`}>
                                        {item.highlight}
                                    </p>

                                    <h4 className="text-3xl font-black text-white mb-4 leading-tight">
                                        {item.title}
                                    </h4>

                                    <p className="text-lg text-white/50 leading-relaxed font-medium">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        </ParallaxCard>
                    ))}
                </div>
            </section>
        </motion.div>
    );
}
