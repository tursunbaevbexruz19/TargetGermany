"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Globe, Menu, X } from "lucide-react";
import clsx from "clsx";
import type { ProgramMenuGroup, ProgramMenuSelection } from "@/lib/programMenu";

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

type NavbarProps = {
    activeTab?: string;
    setActiveTab?: (tab: string) => void;
    programMenu?: ProgramMenuGroup[];
    onProgramMenuSelect?: (selection: ProgramMenuSelection) => void;
};

export default function Navbar({
    activeTab = "home",
    setActiveTab,
    programMenu = [],
    onProgramMenuSelect,
}: NavbarProps) {
    const t = useTranslations("Navbar");
    const currentLocale = useLocale();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProgramsMenuOpen, setIsProgramsMenuOpen] = useState(false);
    const [isMobileProgramsOpen, setIsMobileProgramsOpen] = useState(false);
    const [activeProgramCategoryId, setActiveProgramCategoryId] = useState<string | null>(null);
    const [activeMobileCategoryId, setActiveMobileCategoryId] = useState<string | null>(null);
    const programsDropdownRef = useRef<HTMLDivElement>(null);
    const contactLabel = currentLocale === "de" ? "Kontakt" : "Contact";
    const hasProgramMenu = programMenu.length > 0;

    const effectiveActiveProgramCategoryId =
        activeProgramCategoryId && programMenu.some((category) => category.id === activeProgramCategoryId)
            ? activeProgramCategoryId
            : programMenu[0]?.id ?? null;

    const effectiveActiveMobileCategoryId =
        activeMobileCategoryId && programMenu.some((category) => category.id === activeMobileCategoryId)
            ? activeMobileCategoryId
            : effectiveActiveProgramCategoryId;

    const activeProgramCategory =
        programMenu.find((category) => category.id === effectiveActiveProgramCategoryId) ?? programMenu[0];

    const activeMobileCategory =
        programMenu.find((category) => category.id === effectiveActiveMobileCategoryId) ??
        activeProgramCategory ??
        programMenu[0];

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (programsDropdownRef.current && !programsDropdownRef.current.contains(event.target as Node)) {
                setIsProgramsMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const navLinks = [
        { id: "home", label: t("home") },
        { id: "about", label: t("about") },
        { id: "programs", label: t("programs") },
        { id: "contact", label: contactLabel },
    ];

    const switchTab = (tabId: string) => {
        if (setActiveTab) {
            setActiveTab(tabId);
        }

        if (tabId !== "programs") {
            setIsProgramsMenuOpen(false);
            setIsMobileProgramsOpen(false);
        }
    };

    const selectProgramCategory = (categoryId: string, closeMenus: boolean) => {
        switchTab("programs");
        setActiveProgramCategoryId(categoryId);
        setActiveMobileCategoryId(categoryId);
        onProgramMenuSelect?.({ categoryId });

        if (closeMenus) {
            setIsProgramsMenuOpen(false);
            setIsMobileProgramsOpen(false);
            setIsMobileMenuOpen(false);
        }
    };

    const selectProgramCourse = (categoryId: string, courseId: string) => {
        switchTab("programs");
        setActiveProgramCategoryId(categoryId);
        setActiveMobileCategoryId(categoryId);
        onProgramMenuSelect?.({ categoryId, courseId });
        setIsProgramsMenuOpen(false);
        setIsMobileProgramsOpen(false);
        setIsMobileMenuOpen(false);
    };

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
                    <button
                        onClick={() => {
                            switchTab("home");
                        }}
                        className="group relative z-50 flex cursor-pointer items-center gap-3"
                    >
                        <div className="relative h-12 w-52 overflow-hidden md:h-14 md:w-64">
                            <Image src="/logo-long-with-text.png" alt="Target International School" fill className="object-contain object-left" priority />
                        </div>
                    </button>

                    <div className="hidden items-center space-x-1 lg:flex xl:space-x-2">
                        {navLinks.map((link) => {
                            if (link.id === "programs" && hasProgramMenu) {
                                return (
                                    <div
                                        key={link.id}
                                        ref={programsDropdownRef}
                                        className="relative"
                                        onMouseEnter={() => setIsProgramsMenuOpen(true)}
                                        onMouseLeave={() => setIsProgramsMenuOpen(false)}
                                    >
                                        <button
                                            onClick={() => {
                                                switchTab("programs");
                                                if (activeProgramCategory) {
                                                    onProgramMenuSelect?.({ categoryId: activeProgramCategory.id });
                                                }
                                                setIsProgramsMenuOpen((prev) => !prev);
                                            }}
                                            className={clsx(
                                                "group relative flex items-center gap-1 rounded-lg px-3 py-2 text-[13px] font-semibold uppercase tracking-wide transition-all duration-300 xl:px-4",
                                                activeTab === link.id
                                                    ? "bg-white/10 text-white"
                                                    : "text-white/50 hover:bg-white/[0.04] hover:text-white"
                                            )}
                                            aria-expanded={isProgramsMenuOpen}
                                            aria-haspopup="menu"
                                        >
                                            {link.label}
                                            <motion.span animate={{ rotate: isProgramsMenuOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                                <ChevronDown size={13} />
                                            </motion.span>
                                            {activeTab === link.id && (
                                                <motion.span
                                                    layoutId="nav-indicator"
                                                    className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                                />
                                            )}
                                        </button>

                                        <AnimatePresence>
                                            {isProgramsMenuOpen && activeProgramCategory && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="absolute left-1/2 top-full z-50 mt-3 w-[min(90vw,700px)] -translate-x-1/2 overflow-hidden rounded-2xl border border-white/10 bg-[#0a0f1e]/95 shadow-[0_16px_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
                                                >
                                                    <div className="grid grid-cols-[220px_minmax(0,1fr)]">
                                                        <div className="border-r border-white/10 p-3">
                                                            <div className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">Categories</div>
                                                            <div className="space-y-1">
                                                                {programMenu.map((category) => (
                                                                    <button
                                                                        key={category.id}
                                                                        onMouseEnter={() => setActiveProgramCategoryId(category.id)}
                                                                        onFocus={() => setActiveProgramCategoryId(category.id)}
                                                                        onClick={() => selectProgramCategory(category.id, true)}
                                                                        className={clsx(
                                                                            "w-full rounded-xl px-3 py-2 text-left text-sm transition-colors",
                                                                            activeProgramCategory.id === category.id
                                                                                ? "bg-red-500/15 font-semibold text-red-300"
                                                                                : "text-white/60 hover:bg-white/5 hover:text-white"
                                                                        )}
                                                                    >
                                                                        {category.label}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        <div className="p-3">
                                                            <div className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">{activeProgramCategory.label}</div>
                                                            <div className="max-h-80 space-y-1 overflow-y-auto pr-1">
                                                                {activeProgramCategory.items.map((item) => (
                                                                    <button
                                                                        key={item.id}
                                                                        onClick={() => selectProgramCourse(activeProgramCategory.id, item.courseId)}
                                                                        className="w-full rounded-xl px-3 py-2 text-left text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                                                                    >
                                                                        {item.label}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            }

                            return (
                                <button
                                    key={link.id}
                                    onClick={() => switchTab(link.id)}
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
                            );
                        })}
                    </div>

                    <div className="hidden items-center space-x-4 lg:flex">
                        <LanguageSwitcher />
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <button
                                onClick={() => {
                                    switchTab("contact");
                                }}
                                className="rounded-full bg-gradient-to-r from-red-600 to-red-500 px-6 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(220,38,38,0.25)] transition-all duration-300 hover:from-red-500 hover:to-red-400 hover:shadow-[0_0_30px_rgba(220,38,38,0.4)]"
                            >
                                {t("applyNow")}
                            </button>
                        </motion.div>
                    </div>

                    <div className="relative z-50 flex items-center gap-4 lg:hidden">
                        <LanguageSwitcher isMobile />
                        <button
                            onClick={() =>
                                setIsMobileMenuOpen((prev) => {
                                    const next = !prev;
                                    if (!next) {
                                        setIsMobileProgramsOpen(false);
                                    }
                                    return next;
                                })
                            }
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
                        <div className="flex flex-col space-y-5 overflow-y-auto pb-8">
                            {navLinks.map((link, index) => {
                                if (link.id === "programs" && hasProgramMenu && activeMobileCategory) {
                                    return (
                                        <motion.div key={link.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.08 }}>
                                            <button
                                                onClick={() => {
                                                    switchTab("programs");
                                                    onProgramMenuSelect?.({ categoryId: activeMobileCategory.id });
                                                    setIsMobileProgramsOpen((prev) => !prev);
                                                }}
                                                className={clsx(
                                                    "flex w-full items-center justify-between text-2xl font-bold tracking-wide transition-colors",
                                                    activeTab === link.id ? "text-red-400" : "text-white/90 hover:text-white"
                                                )}
                                            >
                                                <span>{link.label}</span>
                                                <motion.span animate={{ rotate: isMobileProgramsOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                                    <ChevronDown size={20} />
                                                </motion.span>
                                            </button>

                                            <AnimatePresence>
                                                {isMobileProgramsOpen && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: -8 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -8 }}
                                                        className="mt-3 rounded-2xl border border-white/10 bg-white/[0.02] p-3"
                                                    >
                                                        <div className="mb-3 flex flex-wrap gap-2">
                                                            {programMenu.map((category) => (
                                                                <button
                                                                    key={category.id}
                                                                    onClick={() => {
                                                                        setActiveMobileCategoryId(category.id);
                                                                        selectProgramCategory(category.id, false);
                                                                    }}
                                                                    className={clsx(
                                                                        "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
                                                                        activeMobileCategory.id === category.id
                                                                            ? "bg-red-500 text-white"
                                                                            : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                                                                    )}
                                                                >
                                                                    {category.label}
                                                                </button>
                                                            ))}
                                                        </div>

                                                        <div className="space-y-1">
                                                            {activeMobileCategory.items.map((item) => (
                                                                <button
                                                                    key={item.id}
                                                                    onClick={() => selectProgramCourse(activeMobileCategory.id, item.courseId)}
                                                                    className="w-full rounded-xl px-3 py-2 text-left text-sm text-white/75 transition-colors hover:bg-white/5 hover:text-white"
                                                                >
                                                                    {item.label}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    );
                                }

                                return (
                                    <motion.div key={link.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.08 }}>
                                        <button
                                            onClick={() => {
                                                switchTab(link.id);
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
                                );
                            })}

                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-4 border-t border-white/10 pt-6">
                                <button
                                    onClick={() => {
                                        switchTab("contact");
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
                onClick={() => setIsOpen((prev) => !prev)}
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
