"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { Wifi, BookOpen, Coffee, MapPin, Flag } from "lucide-react";

export default function CampusLife() {
    const t = useTranslations("Campus");

    const germanFeatures = [
        { icon: Wifi, label: t("germanyFeature1") },
        { icon: BookOpen, label: t("germanyFeature2") },
        { icon: Coffee, label: t("germanyFeature3") },
        { icon: MapPin, label: t("germanyFeature4") },
    ];

    const tashkentCampuses = [
        { name: t("istirohat"), desc: t("istirohatDesc"), emoji: "🔬" },
        { name: t("tinchlik"), desc: t("tinchlikDesc"), emoji: "💻" },
        { name: t("yunusabad"), desc: t("yunusabadDesc"), emoji: "📝" },
        { name: t("sergeli"), desc: t("sergeliDesc"), emoji: "⚽" },
    ];

    return (
        <section className="py-28 md:py-40 bg-[#0a0f1e] relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-600/[0.03] rounded-full blur-[180px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-[-0.02em]">{t("title")}</h2>
                    <p className="text-base md:text-lg text-white/45 max-w-2xl mx-auto leading-relaxed">{t("description")}</p>
                </motion.div>

                {/* Germany flagship */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
                    <div className="group relative rounded-3xl overflow-hidden border border-red-500/12 bg-gradient-to-br from-red-500/[0.06] to-transparent">
                        <div className="relative h-64 md:h-80">
                            <Image src="/Germany-Berlin.jpg" alt="Germany Campus" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-[#0a0f1e]/40 to-transparent" />
                            <div className="absolute top-3 left-3 md:top-5 md:left-5 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/90 text-white text-[10px] md:text-xs font-bold uppercase tracking-wider">
                                <Flag className="w-3.5 h-3.5" /> European Flagship
                            </div>
                        </div>
                        <div className="p-8 md:p-10 -mt-8 relative z-10">
                            <h3 className="text-2xl md:text-3xl font-black text-white mb-3">{t("germany")} 🇩🇪</h3>
                            <p className="text-white/45 max-w-2xl leading-relaxed mb-8">{t("germanyDesc")}</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {germanFeatures.map((f, idx) => (
                                    <motion.div key={idx} whileHover={{ y: -2 }} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                                        <f.icon className="w-4 h-4 text-red-400 shrink-0" />
                                        <span className="text-xs text-white/50 leading-tight">{f.label}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Tashkent campuses */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-6">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-6">{t("tashkent")} — <span className="text-white/35">5 campuses</span></h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {tashkentCampuses.map((campus, idx) => (
                            <motion.div key={idx} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08 }} whileHover={{ y: -3 }} className="rounded-2xl p-5 bg-white/[0.02] border border-white/[0.06] hover:border-white/12 transition-all group">
                                <span className="text-3xl block mb-3">{campus.emoji}</span>
                                <h4 className="text-sm font-bold text-white mb-1">{campus.name}</h4>
                                <p className="text-[11px] text-white/30">{campus.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
