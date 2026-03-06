"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

type AlumniItem = {
    name: string;
    uni: string;
    quote: string;
    image: string;
};

const ENTRY_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function AlumniCarousel() {
    const t = useTranslations("AlumniCarousel");
    const reduceMotion = useReducedMotion();
    const [currentIndex, setCurrentIndex] = useState(0);

    const alumni: AlumniItem[] = [
        {
            name: "Rustam K.",
            uni: t("uni1"),
            quote: t("quote1"),
            image: "/alumni/alumnus_1.png",
        },
        {
            name: "Malika A.",
            uni: t("uni2"),
            quote: t("quote2"),
            image: "/alumni/alumna_2.png",
        },
        {
            name: "Jasur M.",
            uni: t("uni3"),
            quote: t("quote3"),
            image: "/alumni/alumnus_3.png",
        },
    ];

    useEffect(() => {
        if (reduceMotion) return;

        const timer = window.setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % alumni.length);
        }, 6500);

        return () => window.clearInterval(timer);
    }, [alumni.length, reduceMotion]);

    const activeAlumni = alumni[currentIndex];

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === alumni.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? alumni.length - 1 : prev - 1));
    };

    return (
        <section className="relative overflow-hidden bg-[#0a0f1e] py-24 md:py-32">
            <div className="pointer-events-none absolute left-1/2 top-0 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-red-600/[0.04] blur-[180px]" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.8, ease: ENTRY_EASE }}
                    className="mx-auto max-w-3xl text-center"
                >
                    <span className="inline-flex rounded-full border border-white/[0.08] bg-white/[0.04] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-red-500/80 md:text-xs">
                        {t("sectionLabel")}
                    </span>
                    <h2 className="mt-8 font-[family-name:var(--font-outfit)] text-3xl font-black tracking-[-0.03em] text-white sm:text-4xl md:text-5xl lg:text-6xl">
                        {t("title")}
                    </h2>
                    <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/46 md:text-lg">{t("description")}</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.85, delay: 0.1, ease: ENTRY_EASE }}
                    className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,0.76fr)_minmax(0,1.24fr)] lg:items-stretch"
                >
                    <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(9,15,28,0.95),rgba(7,12,22,0.9))] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.28)] sm:p-6">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_38%)]" />
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeAlumni.name}
                                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -18, scale: 0.98 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 18, scale: 0.98 }}
                                transition={{ duration: 0.45, ease: ENTRY_EASE }}
                                className="relative z-10 flex h-full flex-col"
                            >
                                <div className="inline-flex self-start rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/36">
                                    Alumni spotlight
                                </div>
                                <div className="relative mt-5 aspect-[0.88] overflow-hidden rounded-[28px] border border-white/10 bg-[#08101f]">
                                    <Image
                                        src={activeAlumni.image}
                                        alt={activeAlumni.name}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 1024px) 100vw, 34vw"
                                    />
                                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(4,8,20,0.1)_45%,rgba(4,8,20,0.72)_100%)]" />
                                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                                        <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/34">Graduate story</div>
                                        <div className="mt-2 text-2xl font-black tracking-[-0.03em] text-white">{activeAlumni.name}</div>
                                        <div className="mt-2 inline-flex rounded-full border border-red-300/16 bg-red-500/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-red-100/82">
                                            {activeAlumni.uni}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(8,14,28,0.94),rgba(5,9,20,0.92))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.28)] md:p-8">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent_42%)]" />
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, filter: "blur(8px)" }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12, filter: "blur(8px)" }}
                                    transition={{ duration: 0.45, ease: ENTRY_EASE }}
                                    className="relative z-10"
                                >
                                    <div className="flex items-center justify-between gap-4">
                                        <Quote className="h-12 w-12 text-red-400/18" />
                                        <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/26">
                                            {String(currentIndex + 1).padStart(2, "0")} / {String(alumni.length).padStart(2, "0")}
                                        </div>
                                    </div>
                                    <p className="mt-8 text-xl font-medium leading-[1.7] text-white/82 md:text-2xl lg:text-[1.9rem]">
                                        &ldquo;{activeAlumni.quote}&rdquo;
                                    </p>
                                    <div className="mt-8 border-t border-white/8 pt-5">
                                        <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/28">Placed at</div>
                                        <div className="mt-2 text-lg font-bold text-white">{activeAlumni.uni}</div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <div className="grid gap-3 rounded-[30px] border border-white/8 bg-white/[0.02] p-4 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:p-5">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={prevSlide}
                                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition-all duration-300 hover:border-white/18 hover:bg-white/[0.08]"
                                    aria-label="Previous alumni story"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={nextSlide}
                                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition-all duration-300 hover:border-white/18 hover:bg-white/[0.08]"
                                    aria-label="Next alumni story"
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="flex flex-wrap gap-2 sm:justify-center">
                                {alumni.map((item, index) => (
                                    <button
                                        key={item.name}
                                        type="button"
                                        onClick={() => setCurrentIndex(index)}
                                        className={`rounded-full border px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 ${
                                            index === currentIndex
                                                ? "border-red-300/24 bg-red-500/10 text-red-100"
                                                : "border-white/8 bg-white/[0.03] text-white/50 hover:border-white/14 hover:text-white"
                                        }`}
                                    >
                                        {item.name}
                                    </button>
                                ))}
                            </div>

                            <div className="flex items-center gap-2 sm:justify-end">
                                {alumni.map((item, index) => (
                                    <button
                                        key={`${item.name}-dot`}
                                        type="button"
                                        onClick={() => setCurrentIndex(index)}
                                        className={`h-2.5 rounded-full transition-all duration-300 ${index === currentIndex ? "w-8 bg-red-400" : "w-2.5 bg-white/16 hover:bg-white/28"}`}
                                        aria-label={`Go to ${item.name}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}


