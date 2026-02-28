"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { Quote, BrainCircuit, Lightbulb, Calculator, GraduationCap, Dumbbell, Globe2, Building2, BookOpen, FlaskConical, Home, ChevronRight, TrendingUp } from "lucide-react";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: (i: number) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    })
};

const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i: number) => ({
        opacity: 1, scale: 1,
        transition: { delay: i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    })
};

export default function About() {
    const t = useTranslations("About");
    const [activeValue, setActiveValue] = useState<number | null>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start center", "end center"] });
    const timelineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    const coreValues = [
        { icon: TrendingUp, title: t("value1Title", { fallback: "Business & Finance" }), desc: t("value1Desc", { fallback: "Rigorous immersion in financial modeling, macroeconomics, and modern entrepreneurship." }), color: "from-amber-500/20 to-orange-600/5", accent: "text-amber-400", border: "border-amber-500/20", glow: "from-amber-500/10 to-transparent" },
        { icon: BrainCircuit, title: t("value2Title", { fallback: "Advanced IT & STEM" }), desc: t("value2Desc", { fallback: "Elite engineering curriculum encompassing robotics, AI training, and robust CS architecture." }), color: "from-blue-500/20 to-cyan-600/5", accent: "text-blue-400", border: "border-blue-500/20", glow: "from-blue-500/10 to-transparent" },
        { icon: Lightbulb, title: t("value3Title", { fallback: "Critical Thinking" }), desc: t("value3Desc", { fallback: "Developing unshakable analytical frameworks through intensive formal debate and logic." }), color: "from-emerald-500/20 to-green-600/5", accent: "text-emerald-400", border: "border-emerald-500/20", glow: "from-emerald-500/10 to-transparent" },
        { icon: Calculator, title: t("value4Title", { fallback: "Mental Arithmetic" }), desc: t("value4Desc", { fallback: "Accelerated cognitive training producing global WAMAS champions year over year." }), color: "from-rose-500/20 to-pink-600/5", accent: "text-rose-400", border: "border-rose-500/20", glow: "from-rose-500/10 to-transparent" },
        { icon: GraduationCap, title: t("value5Title", { fallback: "A-Level & AP Mastery" }), desc: t("value5Desc", { fallback: "Pinpoint accuracy in preparing scholars for Top 1% Ivy League and Russell Group placements." }), color: "from-purple-500/20 to-violet-600/5", accent: "text-purple-400", border: "border-purple-500/20", glow: "from-purple-500/10 to-transparent" },
        { icon: Dumbbell, title: t("value6Title", { fallback: "Athletic Excellence" }), desc: t("value6Desc", { fallback: "Forging unbreakable physical and mental resilience through professional-tier sports facilities." }), color: "from-indigo-500/20 to-blue-600/5", accent: "text-indigo-400", border: "border-indigo-500/20", glow: "from-indigo-500/10 to-transparent" },
    ];

    const facilities = [
        { icon: BrainCircuit, title: t("fac1Title", { fallback: "Next-Gen Tech Labs" }), desc: t("fac1Desc", { fallback: "Latest hardware for AI, Web3, and advanced algorithmic programming." }) },
        { icon: Building2, title: t("fac2Title", { fallback: "Business Incubation" }), desc: t("fac2Desc", { fallback: "Real-world simulation hubs designed for young entrepreneurs." }) },
        { icon: BookOpen, title: t("fac3Title", { fallback: "Digital Library" }), desc: t("fac3Desc", { fallback: "Vast multimedia resources supporting massive research initiatives." }) },
        { icon: Dumbbell, title: t("fac4Title", { fallback: "Elite Sports Complex" }), desc: t("fac4Desc", { fallback: "Olympic-standard facilities forging physical resilience and teamwork." }) },
        { icon: FlaskConical, title: t("fac5Title", { fallback: "Advanced STEM Labs" }), desc: t("fac5Desc", { fallback: "University-grade equipment for quantum mechanics and biotech." }) },
        { icon: Home, title: t("fac6Title", { fallback: "Premium Residences" }), desc: t("fac6Desc", { fallback: "A sanctuary of comfort and focus for our boarding scholars." }) },
    ];

    const timeline = [
        { year: "2005", event: t("time1", { fallback: "Inception in Tashkent with a vision to redefine education." }) },
        { year: "2010", event: t("time2", { fallback: "First major integration of Business & IT specialized tracks." }) },
        { year: "2015", event: t("time3", { fallback: "International accreditation achieved; expanded to a second campus." }) },
        { year: "2020", event: t("time4", { fallback: "Deployed a customized digital learning ecosystem across all levels." }) },
        { year: "2024", event: t("time5", { fallback: "Grew to 4 sprawling campuses serving thousands of elite students." }) },
        { year: "2026", event: t("time6", { fallback: "Global expansion: launching our monumental European flagship in Germany." }) },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full bg-[#050510] text-white overflow-hidden relative"
        >
            {/* Performance Optimized Ambient Glows - purely CSS radial gradients without SVG filters */}
            <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.05)_0%,transparent_60%)] pointer-events-none transform-gpu" />
            <div className="absolute bottom-1/4 left-0 w-[50vw] h-[50vw] bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.05)_0%,transparent_60%)] pointer-events-none transform-gpu" />

            {/* ===== SECTION 1: CEO MESSAGE ===== */}
            <section className="min-h-screen flex flex-col lg:flex-row items-center justify-center px-6 md:px-16 py-32 gap-16 lg:gap-24 relative z-10 max-w-screen-2xl mx-auto">
                {/* CEO Portrait */}
                <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="relative w-[85vw] h-[85vw] md:w-[45vw] md:h-[55vw] lg:w-[32vw] lg:h-[42vw] max-h-[70vh] flex-shrink-0 group perspective-1000 transform-gpu"
                >
                    <div className="absolute -inset-6 bg-gradient-to-br from-blue-500/20 via-transparent to-transparent rounded-[3.5rem] opacity-50 group-hover:opacity-100 transition-all duration-700 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.3)_0%,transparent_70%)]" />
                    <div className="relative w-full h-full rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] bg-gradient-to-b from-white/5 to-transparent transform-gpu transition-all duration-700 group-hover:rotate-y-2 group-hover:-rotate-x-2">
                        <Image
                            src="/ceo.png"
                            alt="Bekhzod Jalilov - CEO & Founder"
                            fill
                            className="object-cover object-top scale-100 group-hover:scale-105 transition-transform duration-1000 will-change-transform"
                            sizes="(max-width: 768px) 85vw, (max-width: 1024px) 45vw, 32vw"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050510] via-[#050510]/40 to-transparent" />
                        <div className="absolute bottom-8 left-8 right-8 text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                            <p className="text-xs md:text-sm uppercase tracking-[0.4em] text-blue-400 font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">CEO & Founder</p>
                        </div>
                    </div>
                </motion.div>

                {/* CEO Message */}
                <motion.div
                    initial={{ opacity: 0, x: 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="flex-1 max-w-4xl transform-gpu"
                >
                    <Quote className="w-16 h-16 text-blue-500/30 mb-8 transform-gpu" />
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight mb-8">
                        &ldquo;At Target International School, education transcends academia; it is the forging of absolute leaders. We don't just teach the future—we build those who will command it.&rdquo;
                    </h2>
                    <p className="text-xl md:text-3xl text-white/50 font-light leading-relaxed mb-12">
                        {t("description2")}
                    </p>
                    <div className="flex items-center gap-6">
                        <div className="h-[2px] w-20 bg-gradient-to-r from-blue-500 to-indigo-400" />
                        <div>
                            <h4 className="text-2xl md:text-4xl font-black text-white tracking-tight">Bekhzod Jalilov</h4>
                            <p className="text-sm md:text-base text-blue-400 font-bold tracking-[0.2em] uppercase mt-1">Visionary</p>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* ===== SECTION 2: TIMELINE ===== */}
            <section className="py-32 px-6 md:px-16 relative z-10" ref={timelineRef}>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-5xl mx-auto text-center mb-32 transform-gpu"
                >
                    <p className="text-blue-400 text-sm font-bold uppercase tracking-[0.3em] mb-4">The Legacy Continues</p>
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8">Our Trajectory</h2>
                </motion.div>

                <div className="max-w-5xl mx-auto relative">
                    {/* Ghost Line */}
                    <div className="absolute left-[29px] md:left-1/2 top-4 bottom-4 w-px bg-white/5 md:-translate-x-1/2 hidden md:block" />
                    {/* Glowing Progress Line */}
                    <motion.div
                        className="absolute left-[29px] md:left-1/2 top-4 w-1 bg-gradient-to-b from-blue-500 to-indigo-500 md:-translate-x-1/2 origin-top rounded-full hidden md:block transform-gpu shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                        style={{ height: timelineHeight }}
                    />

                    {timeline.map((item, i) => (
                        <motion.div
                            key={i}
                            custom={i}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-24 last:mb-0 relative group transform-gpu ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
                        >
                            <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'} pt-4 transition-transform duration-500 group-hover:-translate-y-2`}>
                                <h3 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-white/20 inline-block leading-none mb-4 group-hover:from-blue-400 group-hover:to-blue-600/50 transition-colors duration-500">{item.year}</h3>
                                <p className="text-xl md:text-2xl text-white/60 font-medium leading-relaxed">{item.event}</p>
                            </div>

                            {/* Marker */}
                            <div className="hidden md:flex absolute left-1/2 top-10 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#050510] border-4 border-[#050510] items-center justify-center z-10">
                                <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] group-hover:scale-150 transition-transform duration-500" />
                            </div>

                            <div className="w-full md:w-1/2 hidden md:block" />
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ===== SECTION 4: CORE VALUES (Data Injected) ===== */}
            <section className="py-32 px-6 md:px-16 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-24 transform-gpu"
                >
                    <p className="text-rose-400 text-sm font-bold uppercase tracking-[0.3em] mb-4">Target Pillars</p>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tight">Academic Specializations</h2>
                </motion.div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {coreValues.map((value, i) => (
                        <motion.div
                            key={i}
                            custom={i}
                            variants={scaleIn}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            onHoverStart={() => setActiveValue(i)}
                            onHoverEnd={() => setActiveValue(null)}
                            className={`group relative p-10 md:p-12 rounded-[2.5rem] border transition-all duration-700 bg-[#080812] transform-gpu ${activeValue === i ? `${value.border} scale-[1.02] shadow-[0_20px_40px_rgba(0,0,0,0.5)]` : 'border-white/5'
                                }`}
                        >
                            {/* Replaced expensive blur-[60px] with radial-gradient */}
                            <div className={`absolute inset-0 rounded-[2.5rem] bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-from)_0%,var(--tw-gradient-to)_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none ${value.glow}`} />

                            <div className="relative z-10">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-colors duration-500 ${activeValue === i ? 'bg-white/10 shadow-inner' : 'bg-white/5 border border-white/10'
                                    }`}>
                                    <value.icon className={`w-8 h-8 transition-colors duration-500 ${activeValue === i ? value.accent : 'text-white/50'}`} />
                                </div>
                                <h4 className={`text-2xl md:text-3xl font-black mb-4 tracking-tight transition-colors duration-500 ${activeValue === i ? value.accent : 'text-white'}`}>{value.title}</h4>
                                <p className="text-white/60 text-lg leading-relaxed font-medium">{value.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ===== SECTION 5: FACILITIES ===== */}
            <section className="py-32 px-6 md:px-16 relative z-10 bg-white/[0.01]">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-24 max-w-4xl mx-auto transform-gpu"
                >
                    <p className="text-cyan-400 text-sm font-bold uppercase tracking-[0.3em] mb-4">Infrastructure</p>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-8">Modern Facilities</h2>
                    <p className="text-xl text-white/50 font-medium">Engineered to support the highest echelons of academic inquiry and physical development.</p>
                </motion.div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {facilities.map((facility, i) => (
                        <motion.div
                            key={i}
                            custom={i}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="group flex flex-col items-start gap-6 p-8 rounded-[2rem] border border-white/5 hover:border-white/15 bg-white/[0.01] hover:bg-white/[0.05] transition-all duration-500 transform-gpu"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 group-hover:scale-110 transition-all duration-500">
                                <facility.icon className="w-7 h-7 text-white/50 group-hover:text-cyan-400 transition-colors duration-500" />
                            </div>
                            <div>
                                <h4 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{facility.title}</h4>
                                <p className="text-white/50 text-base font-medium leading-relaxed">{facility.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ===== SECTION 7: GERMANY EXPANSION CTA ===== */}
            <section className="py-40 px-6 md:px-16 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 40 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-6xl mx-auto text-center relative overflow-hidden rounded-[4rem] border border-white/10 bg-gradient-to-br from-blue-900/40 via-[#050510] to-indigo-900/30 p-12 md:p-32 shadow-2xl backdrop-blur-3xl transform-gpu"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_60%)] pointer-events-none" />

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md mb-8 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_10px_rgba(96,165,250,1)]" />
                            <span className="text-white text-sm font-bold uppercase tracking-[0.2em]">Launching 2026</span>
                        </div>

                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">
                            Target International School <br className="hidden md:block" /> Expanding to Germany
                        </h2>
                        <p className="text-xl md:text-2xl text-white/60 font-medium leading-relaxed max-w-4xl mx-auto mb-16">
                            Bringing our monumental Business & IT education paradigm directly to the heart of Europe. Prepare for the next era of global education.
                        </p>

                        <motion.a
                            href="#apply"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-4 px-10 py-5 rounded-3xl bg-white text-black font-black text-xl hover:bg-blue-50 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.2)]"
                        >
                            Enquire Now <ChevronRight className="w-6 h-6" />
                        </motion.a>
                    </div>
                </motion.div>
            </section>
        </motion.div>
    );
}
