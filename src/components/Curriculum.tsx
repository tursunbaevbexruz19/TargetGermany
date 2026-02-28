"use client";

import { useTranslations } from "next-intl";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Briefcase, Code2, Calculator, Languages, BookOpen, Brain, Activity, ArrowRight } from "lucide-react";
import React, { useState } from "react";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    })
};

export default function Curriculum() {
    const t = useTranslations("Curriculum");
    const [activeIdx, setActiveIdx] = useState(0);

    const curriculumItems = [
        {
            icon: Briefcase,
            title: t("business"),
            description: t("businessDesc"),
            color: "from-amber-500/20 to-orange-600/5",
            accent: "text-amber-400",
            border: "border-amber-500/20",
            glow: "bg-amber-500/10",
            detail: "Our comprehensive business program covers Financial Literacy, Entrepreneurship, Marketing, and Business Management. Students participate in real-world business simulations and develop commercial acumen through practical projects and case studies."
        },
        {
            icon: Code2,
            title: t("it"),
            description: t("itDesc"),
            color: "from-blue-500/20 to-cyan-600/5",
            accent: "text-blue-400",
            border: "border-blue-500/20",
            glow: "bg-blue-500/10",
            detail: "Cutting-edge IT education covering programming languages (Python, JavaScript, Java), web development, database management, systems architecture, and cybersecurity. Students build real applications from day one."
        },
        {
            icon: Calculator,
            title: t("math"),
            description: t("mathDesc"),
            color: "from-purple-500/20 to-violet-600/5",
            accent: "text-purple-400",
            border: "border-purple-500/20",
            glow: "bg-purple-500/10",
            detail: "Rigorous mathematical training tailored specifically for SAT preparation. Advanced algebra, geometry, data analysis, and problem-solving strategies that consistently produce scores above 1400."
        },
        {
            icon: Languages,
            title: t("english"),
            description: t("englishDesc"),
            color: "from-emerald-500/20 to-green-600/5",
            accent: "text-emerald-400",
            border: "border-emerald-500/20",
            glow: "bg-emerald-500/10",
            detail: "Intensive English language program with dedicated IELTS preparation. Academic writing, critical reading, speaking fluency, and listening comprehension — our students regularly achieve Band 7.0+ scores."
        },
        {
            icon: BookOpen,
            title: t("ap"),
            description: t("apDesc"),
            color: "from-rose-500/20 to-red-600/5",
            accent: "text-rose-400",
            border: "border-rose-500/20",
            glow: "bg-rose-500/10",
            detail: "College Board accredited Advanced Placement courses in Mathematics, Sciences, Computer Science, and more. A-Level pathways are available for students targeting UK universities."
        },
        {
            icon: Brain,
            title: t("logic"),
            description: t("logicDesc"),
            color: "from-indigo-500/20 to-blue-600/5",
            accent: "text-indigo-400",
            border: "border-indigo-500/20",
            glow: "bg-indigo-500/10",
            detail: "A foundational course designed to develop deep analytical and critical thinking skills. Students learn logical reasoning, problem decomposition, and systematic analysis — essential skills for all academic disciplines."
        },
        {
            icon: Activity,
            title: t("sport"),
            description: t("sportDesc"),
            color: "from-teal-500/20 to-cyan-600/5",
            accent: "text-teal-400",
            border: "border-teal-500/20",
            glow: "bg-teal-500/10",
            detail: "Comprehensive sports programs including football, basketball, swimming, and fitness training. We believe in developing the whole student — physical fitness complements academic rigor and builds teamwork and discipline."
        },
    ];

    const active = curriculumItems[activeIdx];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full bg-[#050510] text-white overflow-hidden relative"
        >
            {/* Background Effects */}
            <div className="absolute top-0 left-1/4 w-[60vw] h-[60vw] bg-purple-600/5 blur-[200px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/3 right-1/4 w-[50vw] h-[50vw] bg-blue-600/5 blur-[200px] rounded-full pointer-events-none" />

            {/* Huge Hero */}
            <section className="min-h-[70vh] flex flex-col justify-center items-center px-6 md:px-16 pt-32 pb-20 text-center relative pointer-events-none z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="pointer-events-auto"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-8">
                        <Activity className="w-4 h-4 text-purple-400" />
                        <span className="text-white/80 text-xs font-bold uppercase tracking-[0.2em]">Business · IT · STEM</span>
                    </div>
                    <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] leading-none font-black tracking-tighter mb-8">
                        {t("title")}
                    </h1>
                    <p className="text-xl md:text-3xl text-white/50 font-light max-w-4xl mx-auto leading-relaxed">
                        {t("description")}
                    </p>
                </motion.div>
            </section>

            {/* Interactive Desktop Split View / Mobile Tab View */}
            <section className="py-24 px-6 md:px-16 relative z-10 max-w-screen-2xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

                    {/* Left Side: Navigation Menu */}
                    <div className="w-full lg:w-1/3 flex flex-col gap-3 lg:sticky lg:top-32">
                        <motion.h3
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-white/30 text-xs font-bold uppercase tracking-[0.3em] pl-6 mb-6"
                        >
                            Programs Index
                        </motion.h3>
                        {curriculumItems.map((item, i) => (
                            <motion.button
                                key={i}
                                custom={i}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                onClick={() => setActiveIdx(i)}
                                className={`group flex items-center justify-between w-full px-6 py-5 rounded-2xl transition-all duration-500 border relative overflow-hidden ${activeIdx === i
                                        ? `border-${item.accent.split('-')[1]}-500/30 bg-white/[0.03]`
                                        : 'border-transparent hover:bg-white/[0.02] hover:border-white/5 text-white/50'
                                    }`}
                            >
                                {activeIdx === i && (
                                    <motion.div
                                        layoutId="activeIndicator"
                                        className={`absolute left-0 top-0 bottom-0 w-1 ${item.glow.replace('10', '50')}`}
                                    />
                                )}
                                <div className="flex items-center gap-4 relative z-10">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${activeIdx === i ? `bg-${item.accent.split('-')[1]}-500/20` : 'bg-white/5 group-hover:bg-white/10'
                                        }`}>
                                        <item.icon className={`w-5 h-5 ${activeIdx === i ? item.accent : 'text-white/50 group-hover:text-white/80'}`} />
                                    </div>
                                    <span className={`text-lg font-bold transition-colors duration-300 ${activeIdx === i ? 'text-white' : 'text-white/60 group-hover:text-white/90'
                                        }`}>
                                        {item.title}
                                    </span>
                                </div>
                                <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${activeIdx === i ? `opacity-100 ${item.accent} translate-x-0` : 'opacity-0 -translate-x-4 group-hover:opacity-50'
                                    }`} />
                            </motion.button>
                        ))}
                    </div>

                    {/* Right Side: Dynamic Content Panel */}
                    <div className="w-full lg:w-2/3 min-h-[600px] relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIdx}
                                initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, y: -40, filter: "blur(10px)" }}
                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                className={`w-full rounded-[3rem] p-10 md:p-16 lg:p-20 border ${active.border} bg-gradient-to-br ${active.color} backdrop-blur-xl relative overflow-hidden`}
                            >
                                <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] ${active.glow} opacity-50 mix-blend-screen pointer-events-none -translate-y-1/2 translate-x-1/3`} />

                                <div className="relative z-10">
                                    <div className={`w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-12 shadow-2xl backdrop-blur-md`}>
                                        <active.icon className={`w-10 h-10 ${active.accent}`} />
                                    </div>

                                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-[1.1]">
                                        {active.title}
                                    </h2>

                                    <p className={`text-2xl md:text-3xl font-medium ${active.accent} mb-8 leading-snug`}>
                                        {active.description}
                                    </p>

                                    <div className="h-px w-full bg-white/10 mb-8" />

                                    <p className="text-lg md:text-xl text-white/60 leading-relaxed font-light">
                                        {active.detail}
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </section>
        </motion.div>
    );
}
