"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { type LucideIcon, ArrowUpRight, Award, BookOpen, Briefcase, Download, Globe, GraduationCap, Heart, Landmark, Shield, Target, Users } from "lucide-react";

type ReasonItem = {
    title: string;
    desc: string;
    icon: LucideIcon;
};

type HighlightItem = {
    icon: LucideIcon;
    label: string;
    value: string;
};

type EssentialItem = {
    title: string;
    desc: string;
    value: string;
    icon: LucideIcon;
};

const ENTRY_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, delay, ease: ENTRY_EASE }}
        >
            {children}
        </motion.div>
    );
}

export default function About() {
    const t = useTranslations("About");
    const heroT = useTranslations("Hero");
    const guideT = useTranslations("Guidelines");
    const [activeEssential, setActiveEssential] = useState(0);

    const highlights: HighlightItem[] = [
        { icon: Users, label: heroT("stat1Label"), value: heroT("stat1Value") },
        { icon: Target, label: heroT("stat2Label"), value: heroT("stat2Value") },
        { icon: Award, label: heroT("stat3Label"), value: heroT("stat3Value") },
        { icon: BookOpen, label: heroT("stat4Label"), value: heroT("stat4Value") },
    ];

    const essentials: EssentialItem[] = [
        { title: t("reason1Title"), desc: t("reason1Desc"), value: "EUR 0", icon: Landmark },
        { title: guideT("step3Title"), desc: guideT("step3Desc"), value: "140 / 280", icon: Briefcase },
        { title: t("reason3Title"), desc: t("reason3Desc"), value: "18 Months", icon: Shield },
        { title: t("reason6Title"), desc: t("reason6Desc"), value: "EUR 700-950", icon: Globe },
    ];

    const supportHighlights = [
        { label: "Decision time", value: "3-5 business days" },
        { label: "Visa desk", value: "Blocked account and embassy prep" },
        { label: "Arrival support", value: "Housing, banking, city registration" },
        { label: "Career path", value: "18-month post-study work route" },
    ];

    const reasons: ReasonItem[] = [
        { title: t("reason1Title"), desc: t("reason1Desc"), icon: Landmark },
        { title: t("reason2Title"), desc: t("reason2Desc"), icon: GraduationCap },
        { title: t("reason3Title"), desc: t("reason3Desc"), icon: Briefcase },
        { title: t("reason4Title"), desc: t("reason4Desc"), icon: Shield },
        { title: t("reason5Title"), desc: t("reason5Desc"), icon: Heart },
        { title: t("reason6Title"), desc: t("reason6Desc"), icon: Globe },
    ];

    const activeItem = essentials[activeEssential] ?? essentials[0];
    const ActiveIcon = activeItem.icon;

    return (
        <section className="relative overflow-hidden bg-[#0a0f1e] py-24 md:py-32">
            <div className="pointer-events-none absolute right-0 top-0 h-[560px] w-[560px] rounded-full bg-red-600/[0.04] blur-[180px]" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-[420px] w-[420px] rounded-full bg-blue-500/[0.04] blur-[160px]" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <Reveal>
                    <div className="mx-auto max-w-3xl text-center">
                        <span className="inline-flex rounded-full border border-white/[0.08] bg-white/[0.04] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-white/50 md:text-xs">
                            {t("sectionLabel")}
                        </span>
                        <h2 className="mt-8 font-[family-name:var(--font-outfit)] text-3xl font-black leading-[1.04] tracking-[-0.03em] text-white sm:text-4xl md:text-5xl lg:text-6xl">
                            {t("title")}
                        </h2>
                    </div>
                </Reveal>

                <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-[minmax(0,1.04fr)_minmax(320px,0.96fr)] lg:gap-8">
                    <Reveal delay={0.06}>
                        <div className="flex h-full flex-col justify-between rounded-[30px] border border-white/8 bg-[linear-gradient(180deg,rgba(10,16,30,0.95),rgba(7,11,21,0.92))] p-6 shadow-[0_18px_54px_rgba(0,0,0,0.22)] md:p-8">
                            <div>
                                <div className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/36">
                                    Built on proven outcomes
                                </div>
                                <p className="mt-5 text-[15px] leading-8 text-white/60 md:text-base">{t("description1")}</p>
                            </div>
                            <div className="mt-6 border-t border-white/8 pt-5">
                                <p className="text-[15px] leading-8 text-white/58 md:text-base">{t("description2")}</p>
                            </div>
                        </div>
                    </Reveal>

                    <div className="grid auto-rows-fr gap-3 sm:grid-cols-2">
                        {highlights.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <Reveal key={item.label} delay={0.1 + index * 0.05}>
                                    <div className="group flex h-full min-h-[154px] flex-col rounded-[24px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-red-400/18 hover:bg-[linear-gradient(180deg,rgba(239,68,68,0.08),rgba(255,255,255,0.03))]">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-red-300/16 bg-red-500/12 text-red-100">
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <div className="mt-auto pt-8">
                                            <div className="text-3xl font-black tracking-[-0.05em] text-white">{item.value}</div>
                                            <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/38">{item.label}</div>
                                        </div>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-10 grid items-start gap-6 lg:grid-cols-[minmax(280px,0.64fr)_minmax(0,1.36fr)] lg:gap-8">
                    <Reveal>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
                            <div className="rounded-[28px] border border-red-500/14 bg-[linear-gradient(180deg,rgba(239,68,68,0.08),rgba(255,255,255,0.02))] p-6 md:p-7">
                                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl border border-red-300/18 bg-red-500/12 text-red-100">
                                    <Target className="h-5 w-5" />
                                </div>
                                <h3 className="text-2xl font-black tracking-[-0.03em] text-white">{t("mission")}</h3>
                                <p className="mt-3 text-sm leading-7 text-white/56">{t("missionText")}</p>
                            </div>

                            <div className="rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,rgba(10,16,30,0.92),rgba(7,11,21,0.9))] p-6 md:p-7">
                                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white/78">
                                    <Globe className="h-5 w-5" />
                                </div>
                                <h3 className="text-2xl font-black tracking-[-0.03em] text-white">{t("vision")}</h3>
                                <p className="mt-3 text-sm leading-7 text-white/56">{t("visionText")}</p>
                            </div>
                        </div>
                    </Reveal>

                    <Reveal delay={0.08}>
                        <div className="overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(8,14,28,0.94),rgba(5,9,20,0.92))] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.26)] md:p-6">
                            <div className="flex flex-col gap-4 border-b border-white/8 pb-5 md:flex-row md:items-start md:justify-between">
                                <div>
                                    <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/38">
                                        {guideT("sectionLabel")}
                                    </div>
                                    <h3 className="mt-4 max-w-xl font-[family-name:var(--font-outfit)] text-2xl font-black tracking-[-0.03em] text-white md:text-3xl">
                                        {guideT("title")}
                                    </h3>
                                    <p className="mt-3 max-w-2xl text-sm leading-7 text-white/54 md:text-[15px]">
                                        {guideT("description")}
                                    </p>
                                </div>

                                <motion.a
                                    href="/Study_and_Work_in_Germany.pdf"
                                    download
                                    target="_blank"
                                    whileHover={{ y: -2 }}
                                    className="inline-flex items-center gap-2 self-start rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white/70 transition-colors hover:border-red-400/20 hover:text-white"
                                >
                                    <Download className="h-4 w-4 text-red-300" />
                                    PDF Handbook
                                </motion.a>
                            </div>

                            <div className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,0.98fr)_minmax(0,1.02fr)] xl:items-start">
                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.div
                                        key={activeItem.title}
                                        initial={{ opacity: 0, y: 14, scale: 0.99 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.99 }}
                                        transition={{ duration: 0.35, ease: ENTRY_EASE }}
                                        className="relative overflow-hidden rounded-[26px] border border-red-400/16 bg-[linear-gradient(180deg,rgba(40,16,26,0.24),rgba(10,17,29,0.96))] p-5 md:p-6 xl:min-h-[438px]"
                                    >
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent_40%)]" />
                                        <div className="relative z-10 flex h-full flex-col">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-red-300/20 bg-red-500/12 text-red-100">
                                                    <ActiveIcon className="h-5 w-5" />
                                                </div>
                                                <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
                                                    Germany essentials
                                                </div>
                                            </div>

                                            <div className="mt-6 whitespace-nowrap text-[clamp(2.5rem,5vw,4rem)] font-black tracking-[-0.05em] text-white">{activeItem.value}</div>
                                            <div className="mt-2 flex items-center gap-2 text-white">
                                                <h4 className="text-lg font-bold tracking-[-0.02em]">{activeItem.title}</h4>
                                                <ArrowUpRight className="h-4 w-4 text-red-200" />
                                            </div>
                                            <p className="mt-4 max-w-xl text-sm leading-7 text-white/62 md:text-[15px] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:6] overflow-hidden">{activeItem.desc}</p>

                                            <div className="mt-5 grid gap-2 sm:grid-cols-2">
                                                {supportHighlights.map((item) => (
                                                    <div key={item.label} className="min-h-[88px] rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
                                                        <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/28">{item.label}</div>
                                                        <div className="mt-2 text-sm leading-6 text-white/66">{item.value}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>

                                <div className="grid gap-3 sm:grid-cols-2">
                                    {essentials.map((item, index) => {
                                        const Icon = item.icon;
                                        const isActive = index === activeEssential;

                                        return (
                                            <button
                                                key={item.title}
                                                type="button"
                                                onMouseEnter={() => setActiveEssential(index)}
                                                onFocus={() => setActiveEssential(index)}
                                                onClick={() => setActiveEssential(index)}
                                                className={`group flex min-h-[148px] flex-col rounded-[22px] border p-4 text-left transition-all duration-300 ${
                                                    isActive
                                                        ? "border-red-400/24 bg-[linear-gradient(180deg,rgba(239,68,68,0.12),rgba(255,255,255,0.03))] shadow-[0_18px_40px_rgba(15,23,42,0.18)]"
                                                        : "border-white/8 bg-white/[0.03] hover:-translate-y-1 hover:border-white/14 hover:bg-white/[0.05]"
                                                }`}
                                            >
                                                <div className="flex items-start justify-between gap-3">
                                                    <div className={`flex h-10 w-10 items-center justify-center rounded-2xl border ${isActive ? "border-red-300/20 bg-red-500/12 text-red-100" : "border-white/8 bg-white/[0.03] text-white/62"}`}>
                                                        <Icon className="h-4 w-4" />
                                                    </div>
                                                    <div className={`text-[10px] font-semibold uppercase tracking-[0.24em] ${isActive ? "text-red-100/75" : "text-white/26"}`}>
                                                        0{index + 1}
                                                    </div>
                                                </div>
                                                <div className="mt-auto pt-8">
                                                    <div className="text-2xl font-black tracking-[-0.04em] text-white">{item.value}</div>
                                                    <div className={`mt-2 text-sm font-semibold leading-6 ${isActive ? "text-white/82" : "text-white/58"}`}>{item.title}</div>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>

                <Reveal>
                    <div className="mx-auto mt-20 max-w-3xl text-center md:mt-20">
                        <h3 className="font-[family-name:var(--font-outfit)] text-2xl font-black tracking-[-0.03em] text-white sm:text-3xl md:text-4xl">
                            {t("whyGermany")}
                        </h3>
                        <p className="mt-4 text-sm leading-7 text-white/42 md:text-base">{t("whyGermanySubtitle")}</p>
                    </div>
                </Reveal>

                <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {reasons.map((reason, index) => {
                        const Icon = reason.icon;

                        return (
                            <Reveal key={reason.title} delay={index * 0.05}>
                                <motion.div
                                    whileHover={{ y: -4, borderColor: "rgba(239,68,68,0.2)" }}
                                    className="group h-full rounded-[24px] border border-white/[0.06] bg-[linear-gradient(180deg,rgba(10,16,30,0.9),rgba(7,11,21,0.92))] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition-all duration-300"
                                >
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-red-400 transition-all duration-300 group-hover:border-red-400/20 group-hover:bg-red-500/10 group-hover:text-red-300">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <h4 className="mt-5 text-lg font-bold tracking-[-0.02em] text-white transition-colors duration-300 group-hover:text-red-300">
                                        {reason.title}
                                    </h4>
                                    <p className="mt-3 text-sm leading-7 text-white/52">{reason.desc}</p>
                                </motion.div>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}


