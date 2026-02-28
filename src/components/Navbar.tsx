"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

const LOCALES = [
    { code: "en", label: "English" },
    { code: "de", label: "Deutsch" },
    { code: "uz", label: "O'zbekcha" },
    { code: "ru", label: "Русский" },
    { code: "fr", label: "Français" },
    { code: "es", label: "Español" },
    { code: "ar", label: "العربية" },
    { code: "zh", label: "中文" },
    { code: "ko", label: "한국어" },
    { code: "tr", label: "Türkçe" }
];

export default function Navbar({ activeTab = "home", setActiveTab }: { activeTab?: string, setActiveTab?: (t: string) => void }) {
    const t = useTranslations("Navbar");
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { id: "home", label: t("home") },
        { id: "about", label: t("about") },
        { id: "academics", label: t("academics") },
        { id: "curriculum", label: t("curriculum") },
        { id: "results", label: t("results") },
        { id: "campus", label: t("campus") },
    ];

    return (
        <nav
            className={clsx(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                isScrolled
                    ? "bg-[#050510]/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-white/5 py-4"
                    : "bg-transparent py-6"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <button onClick={() => setActiveTab && setActiveTab("home")} className="flex items-center gap-4 group cursor-pointer relative z-50">
                        <div className="relative w-12 h-12 overflow-hidden rounded-xl border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] transition-all duration-300">
                            <Image src="/logo.jpg" alt="Target International School Logo" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <span className="sr-only">Target</span>
                    </button>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
                        {navLinks.map((link) => (
                            <button
                                key={link.id}
                                onClick={() => setActiveTab && setActiveTab(link.id)}
                                className={clsx(
                                    "relative text-sm font-semibold tracking-wider uppercase group transition-colors",
                                    activeTab === link.id ? "text-white" : "text-white/70 hover:text-white"
                                )}
                            >
                                {link.label}
                                {activeTab === link.id && (
                                    <motion.span layoutId="nav-indicator" className="absolute -bottom-2 left-0 w-full h-0.5 bg-blue-500 rounded-full" />
                                )}
                                {activeTab !== link.id && (
                                    <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="hidden lg:flex items-center space-x-6">
                        <LanguageSwitcher />
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <button
                                onClick={() => setActiveTab && setActiveTab("admissions")}
                                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                            >
                                {t("applyNow")}
                            </button>
                        </motion.div>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="lg:hidden flex items-center gap-5 relative z-50">
                        <LanguageSwitcher isMobile />
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-white hover:text-white/80 transition-colors focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            <AnimatePresence mode="wait">
                                {isMobileMenuOpen ? (
                                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                        <X size={28} />
                                    </motion.div>
                                ) : (
                                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                        <Menu size={28} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "100vh" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="fixed inset-0 top-0 left-0 right-0 bg-[#050510]/95 backdrop-blur-2xl z-40 lg:hidden overflow-hidden pt-28 px-6"
                    >
                        <div className="flex flex-col space-y-6">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <button
                                        onClick={() => {
                                            setActiveTab && setActiveTab(link.id);
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className={clsx(
                                            "text-2xl font-bold tracking-wide transition-colors inline-block",
                                            activeTab === link.id ? "text-blue-400" : "text-white/90 hover:text-white"
                                        )}
                                    >
                                        {link.label}
                                    </button>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="pt-8 mt-8 border-t border-white/10"
                            >
                                <button
                                    onClick={() => {
                                        setActiveTab && setActiveTab("admissions");
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="bg-white text-black px-8 py-4 rounded-full font-bold text-center w-full block text-lg shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                                >
                                    {t("applyNow")}
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

function LanguageSwitcher({ isMobile = false }: { isMobile?: boolean }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const currentLocaleCode = useLocale();
    const currentLocale = LOCALES.find(l => l.code === currentLocaleCode) || LOCALES[0];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const changeLanguage = (code: string) => {
        setIsOpen(false);
        router.replace(pathname, { locale: code });
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-4 py-2 text-white/80 hover:text-white transition-all duration-300"
                aria-label="Select language"
            >
                <Globe size={18} />
                <span className="font-semibold text-sm uppercase tracking-wider">{currentLocale.code}</span>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={14} />
                </motion.div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={clsx(
                            "absolute z-50 mt-2 w-40 bg-[#0a0a1a]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden",
                            isMobile ? "right-0" : "right-1/2 translate-x-1/2"
                        )}
                    >
                        <div className="py-2">
                            {LOCALES.map((locale) => (
                                <button
                                    key={locale.code}
                                    onClick={() => changeLanguage(locale.code)}
                                    className={clsx(
                                        "w-full text-left px-5 py-2.5 text-sm transition-colors flex items-center justify-between",
                                        currentLocale.code === locale.code
                                            ? "bg-white/10 text-white font-semibold"
                                            : "text-white/60 hover:bg-white/5 hover:text-white"
                                    )}
                                >
                                    {locale.label}
                                    {currentLocale.code === locale.code && (
                                        <motion.div layoutId="activeDot" className="w-1.5 h-1.5 rounded-full bg-white" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
