"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PartnerMarquee from "@/components/PartnerMarquee";

const About = dynamic(() => import("@/components/About"), { ssr: false });
const Comparison = dynamic(() => import("@/components/Comparison"), { ssr: false });
const Guidelines = dynamic(() => import("@/components/Guidelines"), { ssr: false });
const ROICalculator = dynamic(() => import("@/components/ROICalculator"), { ssr: false });
const PathwayQuiz = dynamic(() => import("@/components/PathwayQuiz"), { ssr: false });
const AlumniCarousel = dynamic(() => import("@/components/AlumniCarousel"), { ssr: false });
const RouteMap = dynamic(() => import("@/components/RouteMap"), { ssr: false });
const Programs = dynamic(() => import("@/components/Programs"), { ssr: false });
const GermanCourses = dynamic(() => import("@/components/GermanCourses"), { ssr: false });
const Opportunities = dynamic(() => import("@/components/Opportunities"), { ssr: false });
const CampusLife = dynamic(() => import("@/components/CampusLife"), { ssr: false });
const ContactUs = dynamic(() => import("@/components/ContactUs"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

const ENTRY_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const lightweightPreloaders = [
    () => import("@/components/About"),
    () => import("@/components/Programs"),
    () => import("@/components/ContactUs"),
];

type NavigatorWithDeviceMemory = Navigator & {
    deviceMemory?: number;
};

const pageVariants = {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
};

const reducedPageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
};

const pageTransition = {
    duration: 0.52,
    ease: ENTRY_EASE,
};

function LoadingScreen({ onComplete, reduceMotion }: { onComplete: () => void; reduceMotion: boolean }) {
    useEffect(() => {
        const timer = window.setTimeout(onComplete, reduceMotion ? 220 : 520);
        return () => window.clearTimeout(timer);
    }, [onComplete, reduceMotion]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0f1e]"
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.22 : 0.48, ease: ENTRY_EASE }}
        >
            <div className="pointer-events-none absolute inset-0">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: reduceMotion ? 0.45 : 1 }}
                    transition={{ duration: reduceMotion ? 0.2 : 0.8 }}
                    className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/[0.05] blur-[132px]"
                />
            </div>

            <motion.div
                initial={reduceMotion ? { opacity: 0 } : { scale: 0.84, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: reduceMotion ? 0.24 : 0.7, ease: ENTRY_EASE }}
                className="relative z-10"
            >
                <div className="relative mx-auto mb-7 h-14 w-56 md:h-16 md:w-64">
                    <Image
                        src="/logo-long-with-text.png"
                        alt="Target International"
                        fill
                        className="object-contain drop-shadow-[0_0_32px_rgba(220,38,38,0.26)]"
                        priority
                    />
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0.2 : 0.5, delay: reduceMotion ? 0.05 : 0.24, ease: ENTRY_EASE }}
                className="relative z-10 text-center"
            >
                <h1 className="font-[family-name:var(--font-outfit)] text-2xl font-black tracking-[-0.03em] text-white md:text-3xl">
                    Target International
                </h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: reduceMotion ? 0.2 : 0.4, delay: reduceMotion ? 0.12 : 0.5 }}
                    className="mt-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/30 md:text-xs"
                >
                    Improve your self-value
                </motion.p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: reduceMotion ? 0.12 : 0.72 }}
                className="absolute bottom-16 left-1/2 w-32 -translate-x-1/2"
            >
                <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/[0.06]">
                    <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: reduceMotion ? 0.45 : 0.8, delay: reduceMotion ? 0.12 : 0.72, ease: ENTRY_EASE }}
                        className="h-full rounded-full bg-gradient-to-r from-red-500 to-red-400"
                    />
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function HomeClient({ heroData, coursesData }: { heroData: any; coursesData?: any[] }) {
    const [activeTab, setActiveTab] = useState("home");
    const [isLoading, setIsLoading] = useState(true);
    const [autoReduceMotion] = useState(() => {
        if (typeof navigator === "undefined") {
            return false;
        }

        const navigatorWithDeviceMemory = navigator as NavigatorWithDeviceMemory;
        const cores = navigator.hardwareConcurrency ?? 8;
        const memory = navigatorWithDeviceMemory.deviceMemory ?? 8;
        return cores <= 4 || memory <= 4;
    });
    const reduceMotionPreference = useReducedMotion() ?? false;
    const reduceMotion = reduceMotionPreference || autoReduceMotion;
    const activePageVariants = reduceMotion ? reducedPageVariants : pageVariants;

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    }, [activeTab, reduceMotion]);

    useEffect(() => {
        if (isLoading) {
            return;
        }

        const timer = window.setTimeout(() => {
            let preloadIndex = 0;

            const preloadNext = () => {
                const preload = lightweightPreloaders[preloadIndex];
                if (!preload) {
                    return;
                }

                void preload();
                preloadIndex += 1;

                if (preloadIndex < lightweightPreloaders.length) {
                    window.setTimeout(preloadNext, reduceMotion ? 90 : 180);
                }
            };

            preloadNext();
        }, reduceMotion ? 140 : 360);

        return () => {
            window.clearTimeout(timer);
        };
    }, [isLoading, reduceMotion]);

    const renderContent = () => {
        switch (activeTab) {
            case "home":
                return (
                    <motion.div key="home" variants={activePageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
                        <Hero setActiveTab={setActiveTab} dynamicData={heroData} />
                        <PartnerMarquee />
                    </motion.div>
                );
            case "about":
                return (
                    <motion.div key="about" variants={activePageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
                        <About />
                        <Comparison />
                        <Guidelines />
                        <ROICalculator />
                        <AlumniCarousel />
                        <RouteMap />
                        <CampusLife />
                    </motion.div>
                );
            case "programs":
                return (
                    <motion.div key="programs" variants={activePageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
                        <PathwayQuiz setActiveTab={setActiveTab} />
                        <Programs setActiveTab={setActiveTab} />
                        <GermanCourses dynamicCourses={coursesData} />
                        <Opportunities />
                    </motion.div>
                );
            case "contact":
                return (
                    <motion.div key="contact" variants={activePageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
                        <ContactUs />
                    </motion.div>
                );
            default:
                return null;
        }
    };

    return (
        <main className="relative flex min-h-screen flex-col items-center justify-between overflow-x-hidden bg-[#0a0f1e]">
            <AnimatePresence mode="wait">
                {isLoading && <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} reduceMotion={reduceMotion} />}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoading ? 0 : 1 }}
                transition={{ duration: reduceMotion ? 0.18 : 0.36, delay: reduceMotion ? 0 : 0.08 }}
                className="w-full"
            >
                <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

                <div className={`relative z-10 flex min-h-screen w-full flex-grow flex-col justify-between ${activeTab === "home" ? "pt-0" : "pt-24"}`}>
                    <div className="flex-grow">
                        <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: reduceMotion ? 0.18 : 0.42, ease: ENTRY_EASE }}
                        >
                            <Footer setActiveTab={setActiveTab} />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </motion.div>
        </main>
    );
}
