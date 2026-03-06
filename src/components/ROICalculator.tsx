"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function ROICalculator() {
    const t = useTranslations("ROICalculator");
    const [years, setYears] = useState(3);

    const usTuition = 45000;
    const usLiving = 20000;
    const deTuition = 0;
    const deLiving = 11000;

    const usTotal = (usTuition + usLiving) * years;
    const deTotal = (deTuition + deLiving) * years;
    const savings = usTotal - deTotal;

    return (
        <section className="relative overflow-hidden bg-[#0a0f1e] py-24">
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-center">
                    <span className="mb-8 inline-block rounded-full border border-white/[0.08] bg-white/[0.04] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-white/50 md:text-xs">
                        {t("sectionLabel")}
                    </span>
                    <h2 className="font-[family-name:var(--font-outfit)] text-3xl font-black tracking-[-0.02em] text-white sm:text-4xl md:text-5xl lg:text-6xl">
                        {t("title")}
                    </h2>
                    <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/45 md:text-lg">{t("description")}</p>
                </motion.div>

                <div className="mx-auto max-w-4xl rounded-3xl border border-white/[0.06] bg-white/[0.02] p-8 shadow-[0_8px_40px_rgba(0,0,0,0.2)] md:p-12">
                    <div className="mb-12">
                        <div className="mb-6 flex items-end justify-between">
                            <label className="font-semibold text-white/60">{t("duration")}</label>
                            <span className="font-[family-name:var(--font-outfit)] text-3xl font-black text-white md:text-4xl">
                                {years} <span className="text-lg text-white/40">{t("yearsSmall")}</span>
                            </span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="6"
                            value={years}
                            onChange={(event) => setYears(Number(event.target.value))}
                            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/[0.1] accent-red-500"
                        />
                        <div className="mt-3 flex justify-between text-xs font-semibold uppercase tracking-widest text-white/30">
                            <span>1 {t("year")}</span>
                            <span>6 {t("years")}</span>
                        </div>
                    </div>

                    <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
                        <div className="relative">
                            <div className="mb-3 flex items-center justify-between">
                                <span className="font-bold text-white/50">{t("usuk")}</span>
                                <span className="text-xl font-bold text-white">${usTotal.toLocaleString()}</span>
                            </div>
                            <div className="h-4 w-full overflow-hidden rounded-full bg-white/[0.04]">
                                <motion.div
                                    layout
                                    className="h-full rounded-full bg-white/20"
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ type: "spring", bounce: 0, duration: 0.8 }}
                                />
                            </div>
                            <div className="mt-3 flex justify-between text-xs text-white/30">
                                <span>{t("tuition")}: ${usTuition.toLocaleString()}/yr</span>
                                <span>{t("living")}: ${usLiving.toLocaleString()}/yr</span>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="mb-3 flex items-center justify-between">
                                <span className="font-bold text-red-400">{t("germany")}</span>
                                <span className="text-xl font-bold text-white">EUR {deTotal.toLocaleString()}</span>
                            </div>
                            <div className="h-4 w-full overflow-hidden rounded-full bg-white/[0.04]">
                                <motion.div
                                    layout
                                    className="h-full rounded-full bg-red-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(deTotal / usTotal) * 100}%` }}
                                    transition={{ type: "spring", bounce: 0, duration: 0.8 }}
                                />
                            </div>
                            <div className="mt-3 flex justify-between text-xs text-white/30">
                                <span className="font-bold text-red-400/80">{t("tuitionZero")}</span>
                                <span>{t("living")}: EUR {deLiving.toLocaleString()}/yr</span>
                            </div>
                        </div>
                    </div>

                    <motion.div
                        layout
                        className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-red-500/20 bg-gradient-to-r from-red-600/10 via-red-500/5 to-transparent p-6 md:flex-row md:p-8"
                    >
                        <div>
                            <h4 className="mb-1 text-lg font-bold text-white">{t("totalSavings")}</h4>
                            <p className="max-w-sm text-sm text-white/40">{t("savingsDesc")}</p>
                        </div>
                        <div className="text-right">
                            <motion.span
                                key={savings}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="font-[family-name:var(--font-outfit)] text-4xl font-black text-transparent bg-gradient-to-r from-red-400 to-red-600 bg-clip-text md:text-5xl"
                            >
                                ~${savings.toLocaleString()}
                            </motion.span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
