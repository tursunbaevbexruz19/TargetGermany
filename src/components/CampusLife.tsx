"use client";

import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { MapPin, Globe2, Building2, Terminal, Code2, Activity } from "lucide-react";
import React from "react";
import Image from "next/image";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    })
};

export default function CampusLife() {
    const t = useTranslations("Campus");

    const campuses = [
        {
            icon: Globe2,
            title: t("germany"),
            description: t("germanyDesc"),
            image: "/Germany-Berlin.jpg",
            color: "from-blue-500 to-indigo-600",
            badge: "Coming 2026",
            detail: "Our European Flagship Campus in Germany will bring Target's proven Business & IT education model to Europe, opening doors for students across the continent."
        },
        {
            icon: Building2,
            title: t("istirohat"),
            description: t("istirohatDesc"),
            image: null,
            color: "from-emerald-500 to-teal-600",
            badge: "Established",
            detail: "Our Istirohat campus is the STEM Innovation Core, equipped with state-of-the-art computer labs and science facilities for hands-on learning."
        },
        {
            icon: Terminal,
            title: t("tinchlik"),
            description: t("tinchlikDesc"),
            image: null,
            color: "from-amber-500 to-orange-600",
            badge: "Established",
            detail: "The Tinchlik campus houses our dedicated Business & IT Laboratories, providing students with cutting-edge technology for practical learning."
        },
        {
            icon: Code2,
            title: t("yunusabad"),
            description: t("yunusabadDesc"),
            image: null,
            color: "from-purple-500 to-violet-600",
            badge: "Established",
            detail: "Our Yunusabad Academic Excellence Center focuses on rigorous academic preparation with specialized SAT and IELTS training facilities."
        },
        {
            icon: Activity,
            title: t("sergeli"),
            description: t("sergeliDesc"),
            image: null,
            color: "from-rose-500 to-pink-600",
            badge: "Established",
            detail: "The Sergeli campus features our Elite Athletics Complex with gymnasium, football field, and basketball courts alongside academic facilities."
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full bg-[#050510] text-white overflow-hidden"
        >
            {/* Hero */}
            <section className="min-h-[70vh] flex flex-col justify-center items-center px-6 md:px-16 pt-32 pb-16 text-center relative">
                <div className="absolute top-0 right-1/4 w-[50vw] h-[50vw] bg-[radial-gradient(circle_at_center,rgba(5,150,105,0.05)_0%,transparent_60%)] rounded-full pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="transform-gpu"
                >
                    <p className="text-emerald-400 text-sm font-bold uppercase tracking-[0.3em] mb-4">Global Network</p>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8">
                        {t("title")}
                    </h1>
                    <p className="text-xl md:text-2xl text-white/50 font-light max-w-3xl mx-auto leading-relaxed">
                        {t("description")}
                    </p>
                </motion.div>
            </section>

            {/* Featured: Germany Campus */}
            <section className="py-24 px-6 md:px-16">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-6xl mx-auto relative rounded-3xl overflow-hidden border border-white/10"
                >
                    <div className="absolute inset-0">
                        <Image
                            src="/Germany-Berlin.jpg"
                            alt="Germany Campus"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 80vw"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#050510] via-[#050510]/80 to-transparent" />
                        <div className="absolute inset-0 bg-[#050510]/40" />
                    </div>

                    <div className="relative z-10 p-12 md:p-20 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-sm font-semibold mb-6">
                            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                            Coming 2026
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">{t("germany")}</h2>
                        <p className="text-xl text-white/60 font-light leading-relaxed mb-4">{t("germanyDesc")}</p>
                        <p className="text-lg text-white/40 leading-relaxed">
                            Our European Flagship Campus will bring Target&apos;s proven Business & IT education model to Germany, opening doors for students across Europe to experience our world-class academic programs.
                        </p>
                    </div>
                </motion.div>
            </section>

            {/* Campus Grid */}
            <section className="py-24 px-6 md:px-16">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <p className="text-white/30 text-sm font-bold uppercase tracking-[0.3em] mb-4">Tashkent, Uzbekistan</p>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight">Our Uzbekistan Campuses</h2>
                </motion.div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    {campuses.slice(1).map((campus, i) => (
                        <motion.div
                            key={i}
                            custom={i}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="group p-8 rounded-2xl border border-white/5 hover:border-white/15 transition-all duration-500 relative"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${campus.color} rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                            <div className="flex items-start gap-5">
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${campus.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                                    <campus.icon className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-2xl font-bold text-white">{campus.title}</h3>
                                        <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/40 font-semibold">{campus.badge}</span>
                                    </div>
                                    <p className="text-base text-white/50 mb-3">{campus.description}</p>
                                    <p className="text-sm text-white/30 leading-relaxed">{campus.detail}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Stats Banner */}
            <section className="py-24 px-6 md:px-16">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
                >
                    {[
                        { value: "5", label: "Campuses" },
                        { value: "2", label: "Countries" },
                        { value: "12K+", label: "Students" },
                        { value: "20+", label: "Years" },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            <p className="text-4xl md:text-5xl font-black text-white mb-2">{stat.value}</p>
                            <p className="text-sm text-white/40 uppercase tracking-[0.2em] font-semibold">{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>
        </motion.div>
    );
}
