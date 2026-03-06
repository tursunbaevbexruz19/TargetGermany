"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Award, BookOpen, Building2, Fingerprint, GraduationCap, ShieldCheck } from "lucide-react";

const ENTRY_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const ACCREDITATION_ITEMS = [
    { key: "partner1", icon: ShieldCheck },
    { key: "partner2", icon: Award },
    { key: "partner3", icon: GraduationCap },
    { key: "partner4", icon: Building2 },
    { key: "partner5", icon: BookOpen },
    { key: "partner6", icon: Fingerprint },
] as const;

const UNIVERSITY_LOGOS = [
    {
        key: "uni1",
        src: "/universities/tu-munich.png",
        alt: "Technical University of Munich",
        code: "TUM",
    },
    {
        key: "uni2",
        src: "/universities/lmu-munich.png",
        alt: "Ludwig Maximilian University Munich",
        code: "LMU",
    },
    {
        key: "uni3",
        src: "/universities/heidelberg.png",
        alt: "Heidelberg University",
        code: "HU",
    },
    {
        key: "uni4",
        src: "/universities/humboldt.png",
        alt: "Humboldt University Berlin",
        code: "HUB",
    },
    {
        key: "uni5",
        src: "/universities/rwth-aachen.png",
        alt: "RWTH Aachen",
        code: "RWTH",
    },
    {
        key: "uni6",
        src: "/universities/fu-berlin.png",
        alt: "Free University of Berlin",
        code: "FUB",
    },
] as const;

export default function PartnerMarquee() {
    const t = useTranslations("PartnerMarquee");
    const uniT = useTranslations("Opportunities");
    const reduceMotion = useReducedMotion();

    const logos = UNIVERSITY_LOGOS.map((item) => ({
        ...item,
        name: uniT(item.key),
    }));

    const marqueeLogos = [...logos, ...logos];

    return (
        <section className="relative overflow-hidden border-y border-white/[0.07] bg-[linear-gradient(180deg,#040815_0%,#071021_100%)] py-14 sm:py-16">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.12),transparent_30%),radial-gradient(circle_at_bottom,rgba(59,130,246,0.08),transparent_28%)]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/14 to-transparent" />

            <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.85, ease: ENTRY_EASE }}
                className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-5 sm:px-8 lg:px-10"
            >
                <div className="max-w-3xl text-center">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/34 sm:text-xs">
                        {t("trustedBy")}
                    </p>
                </div>

                <div className="mt-8 grid w-full gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {ACCREDITATION_ITEMS.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <motion.div
                                key={item.key}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.45 }}
                                transition={{ duration: 0.65, delay: 0.08 * index, ease: ENTRY_EASE }}
                                className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(10,18,34,0.92),rgba(7,12,24,0.88))] p-4 shadow-[0_18px_45px_rgba(2,6,20,0.28)]"
                            >
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent_42%)]" />
                                <div className="relative z-10 flex items-center gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-red-300/18 bg-red-500/12 text-red-100">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <div className="min-w-0 text-sm font-semibold leading-6 text-white/82 sm:text-[15px]">{t(item.key)}</div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.8, delay: 0.12, ease: ENTRY_EASE }}
                    className="mt-8 w-full overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(8,14,28,0.94),rgba(6,10,21,0.9))] p-3 shadow-[0_28px_80px_rgba(2,6,23,0.36)] sm:p-4"
                >
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-2">
                        <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/42">
                            {t("partner4")}
                        </div>
                    </div>

                    <div className="partner-marquee-mask overflow-hidden rounded-[24px] border border-white/8 bg-[linear-gradient(180deg,rgba(5,11,22,0.95),rgba(7,12,24,0.92))] px-2 py-3 sm:px-3 sm:py-4">
                        <div
                            className={`partner-marquee-track flex w-max gap-3 sm:gap-4 ${reduceMotion ? "" : "partner-marquee-animate"}`}
                            style={reduceMotion ? undefined : ({ "--partner-marquee-duration": "34s" } as CSSProperties)}
                        >
                            {marqueeLogos.map((logo, index) => (
                                <div
                                    key={`${logo.key}-${index}`}
                                    className="group flex min-w-[260px] items-center gap-4 rounded-[24px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] px-4 py-4 shadow-[0_14px_36px_rgba(2,6,20,0.2)] transition-all duration-300 hover:-translate-y-1 hover:border-white/16 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.075),rgba(255,255,255,0.03))] sm:min-w-[320px]"
                                >
                                    <div className={`relative flex h-20 w-[7.5rem] shrink-0 items-center justify-center overflow-hidden rounded-[22px] border border-white/20 bg-white sm:h-24 sm:w-[8.75rem]`}>
                                        <Image
                                            src={logo.src}
                                            alt={logo.alt}
                                            fill
                                            className="object-contain p-3 drop-shadow-sm sm:p-4"
                                            sizes="140px"
                                        />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/28">Partner university</div>
                                        <div className="mt-1 text-sm font-semibold leading-6 text-white/84 sm:text-[15px]">{logo.name}</div>
                                        <div className="mt-3 inline-flex items-center rounded-full border border-white/8 bg-white/[0.04] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/44">
                                            {logo.code}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            <style jsx>{`
                .partner-marquee-mask {
                    -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                }

                .partner-marquee-track {
                    will-change: transform;
                }

                .partner-marquee-animate {
                    animation: partnerMarquee var(--partner-marquee-duration, 34s) linear infinite;
                }

                .partner-marquee-track:hover {
                    animation-play-state: paused;
                }

                @keyframes partnerMarquee {
                    from {
                        transform: translate3d(0, 0, 0);
                    }

                    to {
                        transform: translate3d(-50%, 0, 0);
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .partner-marquee-animate {
                        animation: none;
                    }
                }
            `}</style>
        </section>
    );
}