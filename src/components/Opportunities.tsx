"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Building2, Users, GraduationCap, Euro, Briefcase, CheckCircle2, ArrowUpRight, Globe } from "lucide-react";

export default function Opportunities() {
    const t = useTranslations("Opportunities");

    const stats = [
        { icon: Building2, value: t("stat1Value"), label: t("stat1") },
        { icon: Users, value: t("stat2Value"), label: t("stat2") },
        { icon: GraduationCap, value: t("stat3Value"), label: t("stat3") },
        { icon: Euro, value: t("stat4Value"), label: t("stat4") },
    ];

    const universities = [
        { name: t("uni1"), desc: t("uni1Desc"), rank: "#1 Germany" },
        { name: t("uni2"), desc: t("uni2Desc"), rank: "#2 Germany" },
        { name: t("uni3"), desc: t("uni3Desc"), rank: "#3 Germany" },
        { name: t("uni4"), desc: t("uni4Desc"), rank: "#4 Germany" },
        { name: t("uni5"), desc: t("uni5Desc"), rank: "#5 Germany" },
        { name: t("uni6"), desc: t("uni6Desc"), rank: "#6 Germany" },
    ];

    const pathways = [t("pathway1"), t("pathway2"), t("pathway3"), t("pathway4"), t("pathway5"), t("pathway6")];

    return (
        <section className="py-28 md:py-40 bg-[#0a0f1e] relative overflow-hidden">
            <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-red-600/[0.03] rounded-full blur-[200px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
                    <span className="inline-block px-5 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase text-white/50 mb-8">{t("sectionLabel")}</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-[-0.02em]">{t("title")}</h2>
                    <p className="text-base md:text-lg text-white/45 max-w-2xl mx-auto leading-relaxed">{t("description")}</p>
                </motion.div>

                {/* Stats grid — unified red */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
                    {stats.map((s, idx) => (
                        <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} whileHover={{ y: -3, borderColor: "rgba(239,68,68,0.2)" }} className="group rounded-2xl p-6 bg-white/[0.03] border border-white/[0.06] text-center hover:bg-red-500/[0.04] transition-all duration-500">
                            <s.icon className="w-8 h-8 text-red-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                            <div className="text-2xl md:text-3xl font-black text-white mb-1">{s.value}</div>
                            <div className="text-[11px] text-white/35 uppercase tracking-wider font-semibold leading-tight">{s.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Universities — unified red badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
                    {universities.map((uni, idx) => (
                        <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08 }} whileHover={{ y: -4, borderColor: "rgba(239,68,68,0.2)", boxShadow: "0 8px 40px rgba(239,68,68,0.08)" }} className="group rounded-2xl p-6 bg-white/[0.02] border border-white/[0.06] transition-all duration-500 cursor-pointer relative overflow-hidden hover:bg-red-500/[0.03]">
                            <div className="flex items-center justify-between mb-4">
                                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-white bg-red-500">{uni.rank}</span>
                                <ArrowUpRight className="w-4 h-4 text-white/15 group-hover:text-red-400/60 transition-colors" />
                            </div>
                            <h4 className="text-base md:text-lg font-bold text-white mb-2">{uni.name}</h4>
                            <p className="text-sm text-white/35 leading-relaxed">{uni.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Career pathways */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-3xl p-8 md:p-12 bg-gradient-to-br from-red-500/[0.07] via-red-900/[0.03] to-transparent border border-red-500/12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-2">
                            <Briefcase className="w-7 h-7 text-red-400" />
                            <Globe className="w-5 h-5 text-red-300/40" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black text-white mb-2">{t("pathwaysTitle")}</h3>
                        <p className="text-white/35 mb-8 text-sm">Your career starts with your education in Germany</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {pathways.map((p, idx) => (
                                <motion.div key={idx} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08 }} className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-red-400 shrink-0" />
                                    <span className="text-sm text-white/55">{p}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
