"use client";

import { useTranslations } from "next-intl";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Building2, Users, GraduationCap, Euro, Briefcase, CheckCircle2, ArrowUpRight, Globe, Info } from "lucide-react";

export default function Opportunities() {
    const t = useTranslations("Opportunities");

    const stats = [
        { icon: Building2, value: t("stat1Value"), label: t("stat1") },
        { icon: Users, value: t("stat2Value"), label: t("stat2") },
        { icon: GraduationCap, value: t("stat3Value"), label: t("stat3") },
        { icon: Euro, value: t("stat4Value"), label: t("stat4") },
    ];

    const universities = [
        { name: t("uni1"), desc: t("uni1Desc"), rank: "#1 Germany", image: "/universities/tu-munich.png", stats: [{ label: "Acceptance", value: "8%" }, { label: "Top Majors", value: "Engineering, CS" }, { label: "Students", value: "50,000+" }] },
        { name: t("uni2"), desc: t("uni2Desc"), rank: "#2 Germany", image: "/universities/lmu-munich.png", stats: [{ label: "Acceptance", value: "11%" }, { label: "Top Majors", value: "Medicine, Law" }, { label: "Students", value: "52,000+" }] },
        { name: t("uni3"), desc: t("uni3Desc"), rank: "#3 Germany", image: "/universities/heidelberg.png", stats: [{ label: "Acceptance", value: "16%" }, { label: "Top Majors", value: "Biology, Physics" }, { label: "Students", value: "30,000+" }] },
        { name: t("uni4"), desc: t("uni4Desc"), rank: "#4 Germany", image: "/universities/humboldt.png", stats: [{ label: "Acceptance", value: "18%" }, { label: "Top Majors", value: "Humanities, Arts" }, { label: "Students", value: "35,000+" }] },
        { name: t("uni5"), desc: t("uni5Desc"), rank: "#5 Germany", image: "/universities/rwth-aachen.png", stats: [{ label: "Acceptance", value: "15%" }, { label: "Top Majors", value: "Mech Eng, Tech" }, { label: "Students", value: "45,000+" }] },
        { name: t("uni6"), desc: t("uni6Desc"), rank: "#6 Germany", image: "/universities/fu-berlin.png", stats: [{ label: "Acceptance", value: "15%" }, { label: "Top Majors", value: "Social Sci, Pol" }, { label: "Students", value: "33,000+" }] },
    ];

    const pathways = [t("pathway1"), t("pathway2"), t("pathway3"), t("pathway4"), t("pathway5"), t("pathway6")];

    return (
        <section className="py-28 md:py-40 bg-[#0a0f1e] relative overflow-hidden">
            <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-red-600/[0.03] rounded-full blur-[200px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} className="text-center mb-20">
                    <span className="inline-block px-5 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase text-white/50 mb-8">{t("sectionLabel")}</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-[-0.02em] font-[family-name:var(--font-outfit)]">{t("title")}</h2>
                    <p className="text-base md:text-lg text-white/45 max-w-2xl mx-auto leading-relaxed">{t("description")}</p>
                </motion.div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
                    {stats.map((s, idx) => (
                        <SpotlightStatCard key={idx} stat={s} idx={idx} />
                    ))}
                </div>

                {/* Universities */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
                    {universities.map((uni, idx) => (
                        <UniversityCard key={idx} uni={uni} idx={idx} />
                    ))}
                </div>

                {/* Career pathways */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} className="rounded-3xl p-8 md:p-12 bg-gradient-to-br from-red-500/[0.07] via-red-900/[0.03] to-transparent border border-red-500/12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-2">
                            <Briefcase className="w-7 h-7 text-red-400" />
                            <Globe className="w-5 h-5 text-red-300/40" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black text-white mb-2 font-[family-name:var(--font-outfit)]">{t("pathwaysTitle")}</h3>
                        <p className="text-white/35 mb-8 text-sm">Your career starts with your education in Germany</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {pathways.map((p, idx) => (
                                <motion.div key={idx} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ delay: idx * 0.08 }} className="flex items-center gap-3 group">
                                    <CheckCircle2 className="w-5 h-5 text-red-400 shrink-0 group-hover:scale-110 transition-transform" />
                                    <span className="text-sm text-white/55 group-hover:text-white/75 transition-colors">{p}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SpotlightStatCard({ stat, idx }: { stat: any, idx: number }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
    };

    const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -3 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative rounded-2xl p-6 bg-[#0a0f1e] border border-white/[0.06] text-center overflow-hidden hover:border-red-500/20 transition-all duration-500 shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(300px circle at ${mouseX}px ${mouseY}px, rgba(239, 68, 68, 0.12), transparent 80%)
                    `
                }}
            />
            <div className="relative z-10">
                <stat.icon className="w-8 h-8 text-red-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-2xl md:text-3xl font-black text-white mb-1 group-hover:text-red-400 transition-colors">{stat.value}</div>
                <div className="text-[11px] text-white/35 uppercase tracking-wider font-semibold leading-tight">{stat.label}</div>
            </div>
        </motion.div>
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function UniversityCard({ uni, idx }: { uni: any, idx: number }) {
    const [isFlipped, setIsFlipped] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
    };

    const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); setIsFlipped(false); };

    return (
        <div
            className="group relative h-[340px] perspective-1000 cursor-pointer"
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: idx * 0.08 }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative w-full h-full rounded-2xl transition-all duration-700 ease-in-out shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_30px_rgba(239,68,68,0.15)]"
            >
                {/* Front Side */}
                <div
                    className="absolute inset-0 backface-hidden rounded-2xl p-5 bg-[#0a0f1e] border border-white/[0.06] overflow-hidden flex flex-col"
                    style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                >
                    <motion.div
                        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 z-0"
                        style={{ background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(239, 68, 68, 0.1), transparent 80%)` }}
                    />
                    <div className="relative h-40 w-full rounded-xl overflow-hidden mb-4 shrink-0 z-10 bg-white/[0.02]">
                        <Image src={uni.image} alt="University" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-transparent to-transparent opacity-90" />
                        <div className="absolute top-3 left-3 flex items-center justify-between w-[calc(100%-24px)]">
                            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-white bg-red-500 shadow-md">{uni.rank}</span>
                            <div className="w-6 h-6 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white/70">
                                <Info className="w-3.5 h-3.5" />
                            </div>
                        </div>
                    </div>
                    <div className="relative z-10 flex-grow flex flex-col">
                        <div className="flex items-start justify-between mb-2">
                            <h4 className="text-base md:text-lg font-bold text-white group-hover:text-red-400 transition-colors font-[family-name:var(--font-outfit)] leading-tight pr-3">{uni.name}</h4>
                            <ArrowUpRight className="w-5 h-5 text-white/15 group-hover:text-red-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0 mt-0.5" />
                        </div>
                        <p className="text-sm text-white/40 leading-relaxed line-clamp-3">{uni.desc}</p>
                    </div>
                </div>

                {/* Back Side */}
                <div
                    className="absolute inset-0 backface-hidden rounded-2xl p-6 bg-gradient-to-br from-[#0f1528] to-[#0a0f1e] border border-red-500/20 overflow-hidden flex flex-col justify-center items-center text-center"
                    style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-[50px] rounded-full" />

                    <h4 className="relative z-10 text-xl font-bold text-white mb-6 font-[family-name:var(--font-outfit)]">{uni.name}</h4>

                    <div className="relative z-10 w-full space-y-4">
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {uni.stats.map((stat: any, i: number) => (
                            <div key={i} className="flex flex-col items-center p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                                <span className="text-[10px] uppercase tracking-widest text-white/40 font-semibold mb-1">{stat.label}</span>
                                <span className="text-sm font-bold text-red-100">{stat.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}


