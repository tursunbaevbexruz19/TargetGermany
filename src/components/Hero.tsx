"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import Image from "next/image";

export default function Hero() {
    const t = useTranslations("Hero");
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    const backgroundY = useTransform(scrollY, [0, 1000], ["0%", "30%"]);
    const opacity = useTransform(scrollY, [0, 500], [1, 0]);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden [perspective:1000px]"
        >
            {/* Background Parallax */}
            <motion.div
                className="absolute inset-0 z-0 h-[120%] w-[110%] -left-[5%] transform-gpu will-change-transform"
                style={{ y: backgroundY, scale: 1.05 }}
            >
                <motion.div className="w-full h-full relative transform-gpu will-change-transform" style={{ rotateX: rotateX as any, rotateY: rotateY as any }}>
                    <Image
                        src="/Germany-Berlin.jpg"
                        alt="Germany Berlin Campus"
                        fill
                        className="object-cover object-center"
                        priority
                        quality={90}
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050510] via-[#050510]/50 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050510]/70 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-black/15" />
                </motion.div>
            </motion.div>

            {/* Content */}
            <motion.div
                className="relative z-30 w-full max-w-6xl mx-auto px-6 md:px-8 flex flex-col items-center justify-center text-center transform-gpu will-change-transform"
                style={{ opacity, rotateX: rotateX as any, rotateY: rotateY as any, transformStyle: "preserve-3d" }}
            >
                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", duration: 1.2, bounce: 0.3 }}
                    className="mb-6 transform-gpu"
                >
                    <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.5)] border border-white/15">
                        <Image src="/logo.jpg" alt="Target Logo" fill className="object-cover" priority />
                    </div>
                </motion.div>

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-xl"
                >
                    <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse" />
                    <span className="text-xs md:text-sm font-semibold tracking-[0.15em] uppercase text-white/80">
                        {t("subtitle")}
                    </span>
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-[2.5rem] leading-[1.1] sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-4 md:mb-6"
                >
                    <span className="block text-white">{t("title")}</span>
                </motion.h1>

                {/* Subtitle line */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.7 }}
                    className="text-lg sm:text-xl md:text-2xl text-white/60 font-light mb-10 md:mb-14 max-w-2xl mx-auto leading-relaxed px-2"
                >
                    {t("description")}
                </motion.p>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.9 }}
                    className="relative z-50 pointer-events-auto"
                >
                    <button
                        className="group relative inline-flex items-center justify-center px-8 py-4 md:px-10 md:py-5 text-base md:text-lg font-bold text-[#050510] bg-white rounded-full overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] transition-all duration-300 transform hover:scale-105 active:scale-95"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            {t("cta")}
                            <motion.span
                                className="inline-block"
                                animate={{ x: [0, 4, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            >
                                →
                            </motion.span>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white via-blue-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-6 h-10 rounded-full border border-white/20 flex justify-center p-1.5"
                >
                    <motion.div
                        animate={{ height: ["20%", "50%", "20%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-1 bg-white/50 rounded-full"
                    />
                </motion.div>
            </motion.div>
        </section>
    );
}
