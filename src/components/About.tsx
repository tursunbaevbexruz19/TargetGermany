"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Shield, Heart, Globe, Landmark, Target, Award, Users, BookOpen } from "lucide-react";

function StaggerCard({ children, idx }: { children: React.ReactNode; idx: number }) {
    return (
        <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: idx * 0.08 }}>
            {children}
        </motion.div>
    );
}

export default function About() {
    const t = useTranslations("About");

    const reasons = [
        { title: t("reason1Title"), desc: t("reason1Desc"), icon: Landmark },
        { title: t("reason2Title"), desc: t("reason2Desc"), icon: GraduationCap },
        { title: t("reason3Title"), desc: t("reason3Desc"), icon: Briefcase },
        { title: t("reason4Title"), desc: t("reason4Desc"), icon: Shield },
        { title: t("reason5Title"), desc: t("reason5Desc"), icon: Heart },
        { title: t("reason6Title"), desc: t("reason6Desc"), icon: Globe },
    ];

    const highlights = [
        { icon: Award, label: "Official AP Tutor", value: "College Board" },
        { icon: Target, label: "SAT Test Center", value: "Certified" },
        { icon: Users, label: "Students Educated", value: "12,000+" },
        { icon: BookOpen, label: "Years of Excellence", value: "Since 2005" },
    ];

    return (
        <section className="py-28 md:py-40 bg-[#0a0f1e] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-600/[0.03] rounded-full blur-[200px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-900/[0.03] rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
                    <span className="inline-block px-5 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase text-white/50 mb-8">{t("sectionLabel")}</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-[-0.02em] leading-[1.1]">{t("title")}</h2>
                </motion.div>

                {/* Asymmetric layout: description + credential badges */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 mb-20">
                    <div className="lg:col-span-7">
                        <p className="text-base md:text-lg text-white/55 leading-[1.85] mb-6">{t("description1")}</p>
                        <p className="text-base md:text-lg text-white/55 leading-[1.85]">{t("description2")}</p>
                    </div>
                    <div className="lg:col-span-5">
                        <div className="grid grid-cols-2 gap-3">
                            {highlights.map((h, idx) => (
                                <motion.div key={idx} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 + idx * 0.1 }} whileHover={{ y: -3, borderColor: "rgba(239,68,68,0.2)" }} className="rounded-2xl p-4 bg-white/[0.03] border border-white/[0.06] text-center hover:bg-red-500/[0.04] transition-all duration-500">
                                    <h.icon className="w-5 h-5 text-red-400 mx-auto mb-2" />
                                    <div className="text-lg font-bold text-white mb-0.5">{h.value}</div>
                                    <div className="text-[10px] text-white/35 uppercase tracking-wider font-semibold">{h.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Mission & Vision — both use red accent */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-24">
                    <StaggerCard idx={0}>
                        <div className="group rounded-3xl p-8 md:p-10 bg-gradient-to-br from-red-500/[0.07] to-transparent border border-red-500/12 hover:border-red-400/25 transition-all duration-500 h-full">
                            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/15 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Target className="w-5 h-5 text-red-400" />
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">{t("mission")}</h3>
                            <p className="text-white/50 leading-relaxed">{t("missionText")}</p>
                        </div>
                    </StaggerCard>
                    <StaggerCard idx={1}>
                        <div className="group rounded-3xl p-8 md:p-10 bg-gradient-to-br from-red-500/[0.04] to-transparent border border-red-500/8 hover:border-red-400/20 transition-all duration-500 h-full">
                            <div className="w-10 h-10 rounded-xl bg-red-500/8 border border-red-500/12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Globe className="w-5 h-5 text-red-400" />
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">{t("vision")}</h3>
                            <p className="text-white/50 leading-relaxed">{t("visionText")}</p>
                        </div>
                    </StaggerCard>
                </div>

                {/* Divider */}
                <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="h-px w-full max-w-xs mx-auto bg-gradient-to-r from-transparent via-red-500/20 to-transparent my-16" />

                {/* Why Germany */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">{t("whyGermany")}</h3>
                    <p className="text-white/35 mt-4 max-w-lg mx-auto text-sm md:text-base">{t("whyGermanySubtitle")}</p>
                </motion.div>

                {/* Unified red-accent cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {reasons.map((r, idx) => (
                        <StaggerCard key={idx} idx={idx}>
                            <motion.div whileHover={{ y: -4, borderColor: "rgba(239,68,68,0.2)" }} className="group rounded-2xl p-6 md:p-7 bg-white/[0.03] border border-white/[0.06] hover:bg-red-500/[0.04] transition-all duration-500 h-full">
                                <div className="w-10 h-10 rounded-xl bg-red-500/8 border border-red-500/12 flex items-center justify-center mb-5 text-red-400 group-hover:scale-110 transition-transform">
                                    <r.icon className="w-5 h-5" />
                                </div>
                                <h4 className="text-base md:text-lg font-bold text-white mb-3">{r.title}</h4>
                                <p className="text-sm text-white/40 leading-relaxed">{r.desc}</p>
                            </motion.div>
                        </StaggerCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
