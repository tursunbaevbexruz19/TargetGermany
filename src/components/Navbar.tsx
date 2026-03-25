"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Globe, Menu, X } from "lucide-react";
import clsx from "clsx";

const LOCALES = [
    { code: "en", label: "English" },
    { code: "de", label: "Deutsch" },
    { code: "uz", label: "Uzbek" },
    { code: "ru", label: "Russian" },
    { code: "es", label: "Spanish" },
    { code: "ar", label: "Arabic" },
    { code: "zh", label: "Chinese" },
    { code: "ko", label: "Korean" },
    { code: "tr", label: "Turkish" },
];

export default function Navbar({ activeTab = "home", setActiveTab }: { activeTab?: string; setActiveTab?: (t: string) => void }) {
    const t = useTranslations("Navbar");
    const currentLocale = useLocale();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const contactLabel = currentLocale === "de" ? "Kontakt" : "Contact";

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { id: "home", label: t("home") },
        { id: "about", label: t("about") },
        { id: "programs", label: t("programs") },
        { id: "contact", label: contactLabel },
    ];

    return (
        <nav
            className={clsx(
                "fixed left-0 right-0 top-0 z-50 transition-all duration-500",
                isScrolled
                    ? "border-b border-white/5 bg-[#0a0f1e]/85 py-2 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl"
                    : "bg-transparent py-3"
            )}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <button onClick={() => { if (setActiveTab) setActiveTab("home"); }} className="group relative z-50 flex cursor-pointer items-center gap-3">
                        <div className="relative h-12 w-52 overflow-hidden md:h-14 md:w-64">
                            <Image src="/logo-long-with-text.png" alt="Target International School" fill className="object-contain object-left" priority />
                        </div>
                    </button>

                    <div className="hidden items-center space-x-1 lg:flex xl:space-x-2">
                        {navLinks.map((link) => (
                            <button
                                key={link.id}
                                onClick={() => { if (setActiveTab) setActiveTab(link.id); }}
                                className={clsx(
                                    "group relative rounded-lg px-3 py-2 text-[13px] font-semibold uppercase tracking-wide transition-all duration-300 xl:px-4",
                                    activeTab === link.id ? "bg-white/10 text-white" : "text-white/50 hover:bg-white/[0.04] hover:text-white"
                                )}
                            >
                                {link.label}
                                {activeTab === link.id && (
                                    <motion.span
                                        layoutId="nav-indicator"
                                        className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="hidden items-center space-x-4 lg:flex">
                        <LanguageSwitcher />
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <button
                                onClick={() => { if (setActiveTab) setActiveTab("contact"); }}
                                className="rounded-full bg-gradient-to-r from-red-600 to-red-500 px-6 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(220,38,38,0.25)] transition-all duration-300 hover:from-red-500 hover:to-red-400 hover:shadow-[0_0_30px_rgba(220,38,38,0.4)]"
                            >
                                {t("applyNow")}
                            </button>
                        </motion.div>
                    </div>

                    <div className="relative z-50 flex items-center gap-4 lg:hidden">
                        <LanguageSwitcher isMobile />
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-white transition-colors hover:text-white/80 focus:outline-none"
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

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "100vh" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="fixed inset-0 top-0 z-40 overflow-hidden bg-[#0a0f1e]/95 px-6 pt-24 backdrop-blur-2xl lg:hidden"
                    >
                        <div className="flex flex-col space-y-5">
                            {navLinks.map((link, index) => (
                                <motion.div key={link.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.08 }}>
                                    <button
                                        onClick={() => {
                                            if (setActiveTab) setActiveTab(link.id);
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className={clsx(
                                            "inline-block text-2xl font-bold tracking-wide transition-colors",
                                            activeTab === link.id ? "text-red-400" : "text-white/90 hover:text-white"
                                        )}
                                    >
                                        {link.label}
                                    </button>
                                </motion.div>
                            ))}
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-4 border-t border-white/10 pt-6">
                                <button
                                    onClick={() => {
                                        if (setActiveTab) setActiveTab("contact");
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="block w-full rounded-full bg-gradient-to-r from-red-600 to-red-500 px-8 py-4 text-center text-lg font-bold text-white shadow-[0_0_30px_rgba(220,38,38,0.25)]"
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
    const currentLocale = LOCALES.find((locale) => locale.code === currentLocaleCode) ?? LOCALES[0];

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
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-white/80 transition-all hover:bg-white/10 hover:text-white"
                aria-label="Select language"
            >
                <Globe size={16} />
                <span className="text-xs font-semibold uppercase tracking-wider">{currentLocale.code}</span>
                {!isMobile && <span className="hidden text-xs text-white/58 xl:inline">{currentLocale.label}</span>}
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={12} />
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
                            "absolute z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-white/10 bg-[#0a0f1e]/95 shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl",
                            isMobile ? "right-0" : "right-1/2 translate-x-1/2"
                        )}
                    >
                        <div className="border-b border-white/8 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/34">
                            Language
                        </div>
                        <div className="max-h-72 overflow-y-auto py-2">
                            {LOCALES.map((locale) => (
                                <button
                                    key={locale.code}
                                    onClick={() => changeLanguage(locale.code)}
                                    className={clsx(
                                        "flex w-full items-center justify-between px-4 py-2 text-left text-sm transition-colors",
                                        currentLocale.code === locale.code
                                            ? "bg-red-500/15 font-semibold text-red-300"
                                            : "text-white/60 hover:bg-white/5 hover:text-white"
                                    )}
                                >
                                    <span>{locale.label}</span>
                                    {currentLocale.code === locale.code && <div className="h-1.5 w-1.5 rounded-full bg-red-500" />}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

