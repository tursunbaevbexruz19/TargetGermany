"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, X } from "lucide-react";

type FeatureRow = {
    key: string;
    name: string;
    target: string;
    others: string;
};

const ENTRY_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Comparison() {
    const t = useTranslations("Comparison");

    const features: FeatureRow[] = [
        { key: "feature1", name: t("feature1"), target: t("feature1Target"), others: t("feature1Others") },
        { key: "feature2", name: t("feature2"), target: t("feature2Target"), others: t("feature2Others") },
        { key: "feature3", name: t("feature3"), target: t("feature3Target"), others: t("feature3Others") },
        { key: "feature4", name: t("feature4"), target: t("feature4Target"), others: t("feature4Others") },
        { key: "feature5", name: t("feature5"), target: t("feature5Target"), others: t("feature5Others") },
    ];

    return (
        <section className="relative overflow-hidden bg-[#0a0f1e] py-24 md:py-32">
            <div className="pointer-events-none absolute left-0 top-0 h-[480px] w-[480px] rounded-full bg-red-600/[0.04] blur-[160px]" />
            <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:80px_80px] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-[minmax(280px,0.72fr)_minmax(0,1.28fr)] lg:items-end">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.35 }}
                        transition={{ duration: 0.8, ease: ENTRY_EASE }}
                    >
                        <span className="inline-flex rounded-full border border-white/[0.08] bg-white/[0.04] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-white/50 md:text-xs">
                            {t("sectionLabel")}
                        </span>
                        <h2 className="mt-8 max-w-md font-[family-name:var(--font-outfit)] text-3xl font-black tracking-[-0.03em] text-white sm:text-4xl md:text-5xl lg:text-6xl">
                            {t("title")}
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.35 }}
                        transition={{ duration: 0.8, delay: 0.08, ease: ENTRY_EASE }}
                        className="max-w-2xl text-base leading-8 text-white/48 md:justify-self-end md:text-lg"
                    >
                        {t("description")}
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.85, delay: 0.12, ease: ENTRY_EASE }}
                    className="mt-14 overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(8,14,28,0.95),rgba(5,9,20,0.92))] p-4 shadow-[0_28px_80px_rgba(0,0,0,0.28)] sm:p-5"
                >
                    <div className="hidden rounded-[24px] border border-white/8 bg-white/[0.02] p-3 md:grid md:grid-cols-[minmax(200px,0.8fr)_minmax(0,1fr)_minmax(0,1fr)] md:items-center md:gap-3">
                        <div className="px-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/32">Comparison board</div>
                        <div className="rounded-2xl border border-red-400/22 bg-[linear-gradient(90deg,rgba(239,68,68,0.18),rgba(239,68,68,0.08))] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-red-100">
                            {t("target")}
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/52">
                            {t("others")}
                        </div>
                    </div>

                    <div className="mt-0 space-y-3 md:mt-4">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.key}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.65, delay: index * 0.06, ease: ENTRY_EASE }}
                                className="group relative overflow-hidden rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.015))] p-3 transition-all duration-300 hover:border-white/14 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.022))] sm:p-4"
                            >
                                <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-red-400/55 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                <div className="grid gap-3 xl:grid-cols-[minmax(220px,0.76fr)_minmax(0,1.02fr)_minmax(0,0.92fr)] xl:items-stretch">
                                    <div className="flex h-full flex-col justify-between rounded-[24px] border border-white/8 bg-[#08101f]/86 p-5">
                                        <div className="flex items-center justify-between gap-4">
                                            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/26">{String(index + 1).padStart(2, "0")}</div>
                                            <ArrowUpRight className="h-4 w-4 text-white/18 transition-colors duration-300 group-hover:text-red-300/70" />
                                        </div>
                                        <h3 className="mt-12 text-xl font-black leading-tight tracking-[-0.03em] text-white sm:text-[1.35rem]">{feature.name}</h3>
                                    </div>

                                    <ComparisonPanel title={t("target")} text={feature.target} positive />
                                    <ComparisonPanel title={t("others")} text={feature.others} positive={false} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function ComparisonPanel({ title, text, positive }: { title: string; text: string; positive: boolean }) {
    return (
        <div
            className={`relative overflow-hidden rounded-[24px] border p-5 ${
                positive
                    ? "border-red-400/18 bg-[linear-gradient(180deg,rgba(239,68,68,0.12),rgba(255,255,255,0.025))]"
                    : "border-white/8 bg-white/[0.03]"
            }`}
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent_42%)]" />
            <div className="relative z-10 flex h-full flex-col">
                <div className="flex items-start gap-3">
                    <div
                        className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border ${
                            positive
                                ? "border-red-300/18 bg-red-500/12 text-red-100"
                                : "border-white/10 bg-white/[0.04] text-white/40"
                        }`}
                    >
                        {positive ? <CheckCircle2 className="h-4 w-4" /> : <X className="h-4 w-4" />}
                    </div>
                    <div>
                        <div className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${positive ? "text-red-100/78" : "text-white/32"}`}>
                            {title}
                        </div>
                        <div className={`mt-3 h-px w-14 ${positive ? "bg-gradient-to-r from-red-400/55 to-transparent" : "bg-gradient-to-r from-white/18 to-transparent"}`} />
                    </div>
                </div>
                <p className={`mt-5 text-sm leading-7 ${positive ? "text-white/78" : "text-white/48"}`}>{text}</p>
            </div>
        </div>
    );
}
