"use client";

import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { GraduationCap, Award, BookCheck, BarChart3, Trophy, Globe2, BookOpen } from "lucide-react";
import React from "react";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    })
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

export default function Academics() {
    const t = useTranslations("Academics");

    const programs = [
        {
            icon: GraduationCap,
            title: t("apTutor"),
            desc: t("apTutorDesc"),
            color: "from-rose-500/20 to-red-600/5",
            accent: "text-rose-400",
            border: "border-rose-500/20",
            glow: "bg-rose-500/10",
            stats: "Advanced Placement",
            detail: "Accredited by the College Board, our rigid AP program provides college-level coursework in over 10 subjects, ensuring students earn university credits before graduation."
        },
        {
            icon: Award,
            title: t("satCenter"),
            desc: t("satCenterDesc"),
            color: "from-indigo-500/20 to-blue-600/5",
            accent: "text-indigo-400",
            border: "border-indigo-500/20",
            glow: "bg-indigo-500/10",
            stats: "Official Testing Center",
            detail: "As a highly recognized SAT testing center, we provide comprehensive preparation programs that yield scores in the absolute top percentiles globally."
        },
        {
            icon: Globe2,
            title: "International Curriculum",
            desc: "A globally recognized framework.",
            color: "from-emerald-500/20 to-green-600/5",
            accent: "text-emerald-400",
            border: "border-emerald-500/20",
            glow: "bg-emerald-500/10",
            stats: "Global Standards",
            detail: "Our curriculum aligns with the world's most demanding educational standards, integrating elements of the British A-Levels and international baccalaureate philosophies."
        },
        {
            icon: BookOpen,
            title: "Intensive IELTS Prep",
            desc: "Mastering the English language.",
            color: "from-amber-500/20 to-yellow-600/5",
            accent: "text-amber-400",
            border: "border-amber-500/20",
            glow: "bg-amber-500/10",
            stats: "Language Mastery",
            detail: "Daily intensive speaking, writing, reading, and listening modules designed by former IELTS examiners to guarantee scores above 7.0 for our graduates."
        }
    ];

    const ieltsData = [
        { range: "8.0+", percent: 18, color: "from-emerald-400 to-emerald-600" },
        { range: "7.0-7.5", percent: 42, color: "from-blue-400 to-blue-600" },
        { range: "6.0-6.5", percent: 30, color: "from-indigo-400 to-indigo-600" },
        { range: "5.0-5.5", percent: 10, color: "from-violet-400 to-violet-600" },
    ];

    const satData = [
        { range: "1400+", percent: 25, color: "from-amber-400 to-amber-600" },
        { range: "1200-1399", percent: 40, color: "from-orange-400 to-orange-600" },
        { range: "1000-1199", percent: 25, color: "from-rose-400 to-rose-600" },
        { range: "800-999", percent: 10, color: "from-pink-400 to-pink-600" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full bg-[#050510] text-white overflow-hidden relative"
        >
            {/* Background Orbs */}
            <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-rose-600/5 blur-[200px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 left-0 w-[50vw] h-[50vw] bg-indigo-600/5 blur-[200px] rounded-full pointer-events-none" />

            {/* Huge Hero */}
            <section className="min-h-[80vh] flex flex-col justify-center items-center px-6 md:px-16 pt-32 pb-20 text-center relative pointer-events-none z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="pointer-events-auto"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-8">
                        <Trophy className="w-4 h-4 text-rose-400" />
                        <span className="text-white/80 text-xs font-bold uppercase tracking-[0.2em]">{t("rigor")}</span>
                    </div>
                    <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] leading-none font-black tracking-tighter mb-8">
                        {t("title")}
                    </h1>
                    <p className="text-xl md:text-3xl text-white/50 font-light max-w-4xl mx-auto leading-relaxed">
                        {t("description")}
                    </p>
                </motion.div>
            </section>

            {/* Core Pillars */}
            <section className="py-24 px-6 md:px-16 relative z-10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {programs.map((program, i) => (
                        <motion.div
                            key={i}
                            custom={i}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className={`group relative p-10 md:p-14 rounded-[2.5rem] border ${program.border} bg-gradient-to-br ${program.color} backdrop-blur-sm overflow-hidden hover:scale-[1.02] transition-transform duration-500`}
                        >
                            <div className={`absolute -top-32 -right-32 w-64 h-64 rounded-full blur-[80px] ${program.glow} opacity-50 group-hover:opacity-100 transition-opacity duration-700`} />

                            <div className="relative z-10">
                                <div className={`w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 shadow-inner group-hover:bg-white/10 transition-colors`}>
                                    <program.icon className={`w-8 h-8 ${program.accent}`} />
                                </div>
                                <p className="text-xs uppercase tracking-[0.3em] text-white/40 font-bold mb-3">{program.stats}</p>
                                <h3 className={`text-3xl md:text-4xl font-black ${program.accent} mb-4 tracking-tight`}>{program.title}</h3>
                                <p className="text-xl text-white/80 font-medium leading-relaxed mb-6">{program.desc}</p>
                                <p className="text-base text-white/40 leading-relaxed font-light">{program.detail}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Data Visualization */}
            <section className="py-32 px-6 md:px-16 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-24"
                >
                    <p className="text-indigo-400 text-sm font-bold uppercase tracking-[0.3em] mb-4">Empirical Data</p>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tight">Proven Results</h2>
                </motion.div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {/* IELTS Column */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-10 md:p-14"
                    >
                        <div className="flex items-center gap-4 mb-12">
                            <div className="w-14 h-14 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                                <BookCheck className="w-7 h-7 text-emerald-400" />
                            </div>
                            <h3 className="text-3xl font-bold">IELTS Excellence</h3>
                        </div>
                        <div className="space-y-8">
                            {ieltsData.map((item, i) => (
                                <motion.div key={i} custom={i} variants={fadeUp}>
                                    <div className="flex justify-between items-end mb-3">
                                        <span className="text-xl text-white/90 font-bold tracking-tight">{item.range}</span>
                                        <span className="text-2xl text-emerald-400 font-black">{item.percent}%</span>
                                    </div>
                                    <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden shadow-inner flex items-center p-0.5 relative group">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${item.percent}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1.5, delay: 0.2 + (i * 0.1), ease: [0.22, 1, 0.36, 1] }}
                                            className={`h-full bg-gradient-to-r ${item.color} rounded-full relative overflow-hidden`}
                                        >
                                            <div className="absolute inset-0 bg-white/20 w-[200%] animate-[shimmer_2s_infinite] -translate-x-[150%] skew-x-[-20deg]" />
                                        </motion.div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* SAT Column */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-10 md:p-14"
                    >
                        <div className="flex items-center gap-4 mb-12">
                            <div className="w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                                <BarChart3 className="w-7 h-7 text-amber-400" />
                            </div>
                            <h3 className="text-3xl font-bold">SAT Success</h3>
                        </div>
                        <div className="space-y-8">
                            {satData.map((item, i) => (
                                <motion.div key={i} custom={i} variants={fadeUp}>
                                    <div className="flex justify-between items-end mb-3">
                                        <span className="text-xl text-white/90 font-bold tracking-tight">{item.range}</span>
                                        <span className="text-2xl text-amber-400 font-black">{item.percent}%</span>
                                    </div>
                                    <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden shadow-inner flex items-center p-0.5 relative group">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${item.percent}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1.5, delay: 0.2 + (i * 0.1), ease: [0.22, 1, 0.36, 1] }}
                                            className={`h-full bg-gradient-to-r ${item.color} rounded-full relative overflow-hidden`}
                                        >
                                            <div className="absolute inset-0 bg-white/20 w-[200%] animate-[shimmer_2s_infinite] -translate-x-[150%] skew-x-[-20deg]" />
                                        </motion.div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Rigor Statement */}
            <section className="py-32 px-6 md:px-16 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-5xl mx-auto text-center bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-[3rem] p-16 md:p-24 backdrop-blur-xl shadow-2xl"
                >
                    <Trophy className="w-20 h-20 text-amber-400/50 mx-auto mb-10" />
                    <h3 className="text-5xl md:text-6xl font-black tracking-tight mb-8">
                        {t("rigor")}
                    </h3>
                    <p className="text-2xl md:text-3xl text-white/50 font-light leading-relaxed max-w-3xl mx-auto">
                        {t("rigorDesc")}
                    </p>
                </motion.div>
            </section>
        </motion.div>
    );
}
