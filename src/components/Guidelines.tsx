"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Briefcase, CopyCheck, Download, Landmark, Plane, type LucideIcon } from "lucide-react";

type StepItem = {
    icon: LucideIcon;
    title: string;
    desc: string;
};

const ENTRY_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Guidelines() {
    const t = useTranslations("Guidelines");
    const reduceMotion = useReducedMotion() ?? false;

    const steps: StepItem[] = [
        { icon: CopyCheck, title: t("step1Title"), desc: t("step1Desc") },
        { icon: Landmark, title: t("step2Title"), desc: t("step2Desc") },
        { icon: Briefcase, title: t("step3Title"), desc: t("step3Desc") },
        { icon: Plane, title: t("step4Title"), desc: t("step4Desc") },
    ];

    return (
        <section className="relative overflow-hidden bg-[#0a0f1e] py-24 md:py-28">
            <div className="pointer-events-none absolute bottom-0 right-[10%] h-[520px] w-[520px] rounded-full bg-red-600/[0.03] blur-[180px]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.35 }}
                        transition={{ duration: 0.7, ease: ENTRY_EASE }}
                    >
                        <span className="inline-flex rounded-full border border-white/[0.08] bg-white/[0.04] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-white/50 md:text-xs">
                            {t("sectionLabel")}
                        </span>
                        <h2 className="mt-8 max-w-4xl font-[family-name:var(--font-outfit)] text-3xl font-black tracking-[-0.03em] text-white sm:text-4xl md:text-5xl lg:text-6xl">
                            {t("title")}
                        </h2>
                        <p className="mt-5 max-w-3xl text-base leading-8 text-white/48 md:text-lg">{t("description")}</p>
                    </motion.div>

                    <motion.a
                        href="/Study_and_Work_in_Germany.pdf"
                        download
                        target="_blank"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.35 }}
                        transition={{ duration: 0.65, delay: 0.06, ease: ENTRY_EASE }}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center gap-2 self-start rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-white/72 transition-all duration-300 hover:border-red-400/20 hover:bg-white/[0.06] hover:text-white lg:self-end"
                    >
                        <Download className="h-4 w-4 text-red-300" />
                        Download Handbook
                    </motion.a>
                </div>

                <div className="relative mt-12">
                    <div className="pointer-events-none absolute left-[28px] top-0 bottom-0 w-px bg-gradient-to-b from-red-400/50 via-white/10 to-transparent md:hidden" />
                    <div className="pointer-events-none absolute left-8 right-8 top-10 hidden h-px bg-gradient-to-r from-red-400/35 via-white/10 to-transparent xl:block" />

                    <div className="grid auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {steps.map((step, index) => (
                            <StepCard key={step.title} step={step} index={index} reduceMotion={reduceMotion} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function StepCard({ step, index, reduceMotion }: { step: StepItem; index: number; reduceMotion: boolean }) {
    const Icon = step.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: index * 0.06, ease: ENTRY_EASE }}
            whileHover={{ y: -4 }}
            className="group relative flex h-full pl-14 md:pl-0"
        >
            <div className="absolute left-0 top-6 h-14 w-14 rounded-full border border-red-300/18 bg-[#0c1324] shadow-[0_0_0_10px_rgba(10,15,30,0.75)] md:left-6 xl:left-1/2 xl:-translate-x-1/2" />
            <div className="absolute left-4 top-10 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white md:left-10 xl:left-1/2 xl:-translate-x-1/2">
                {index + 1}
            </div>

            <div className="flex h-full min-h-[272px] w-full flex-col rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.018))] p-6 pt-7 shadow-[0_18px_50px_rgba(0,0,0,0.2)] transition-all duration-300 group-hover:border-white/14 group-hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.022))] md:min-h-[296px] md:p-7 md:pt-16">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-red-300 transition-colors duration-300 group-hover:border-red-300/20 group-hover:bg-red-500/10 group-hover:text-red-200">
                    <Icon className="h-5 w-5" />
                </div>
                <div className="mt-6 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/28">Step 0{index + 1}</div>
                <h3 className="mt-3 min-h-[58px] text-xl font-black leading-[1.18] tracking-[-0.03em] text-white">{step.title}</h3>
                <p className="mt-4 flex-1 text-sm leading-7 text-white/50">{step.desc}</p>
            </div>
        </motion.div>
    );
}

