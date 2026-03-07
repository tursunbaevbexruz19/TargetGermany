"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Building2, GraduationCap, Home, Landmark, MapPin, PlaneTakeoff, ShieldCheck, X, type LucideIcon } from "lucide-react";

type CampusId = "tashkent" | "germany";

type Fact = {
    value: string;
    label: string;
};

type CampusData = {
    id: CampusId;
    city: string;
    country: string;
    badge: string;
    image: string;
    summary: string;
    shortLabel: string;
    facts: Fact[];
    support: string[];
    drawerTitle: string;
    drawerText: string;
};

const ENTRY_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function RouteMap() {
    const t = useTranslations("RouteMap");
    const reduceMotion = useReducedMotion();
    const [activeCampusId, setActiveCampusId] = useState<CampusId>("germany");
    const [drawerCampusId, setDrawerCampusId] = useState<CampusId | null>(null);

    const campuses: CampusData[] = [
        {
            id: "tashkent",
            city: "Tashkent",
            country: t("uzbekistan"),
            badge: `5 ${t("campuses")}`,
            image: "/tashkent.webp",
            summary: "Five preparatory campuses across Tashkent give students a structured launchpad for language mastery, exam prep, visa readiness, and their first transition into Europe.",
            shortLabel: "Preparation network",
            facts: [
                { value: "5", label: "city campuses" },
                { value: "2,400+", label: "students served yearly" },
                { value: "A1-C1", label: "language preparation" },
                { value: "1 stop", label: "visa and document desk" },
            ],
            support: [
                "German language foundation with native-speaking instructors",
                "Studienkolleg, SAT, IELTS, and university prep tracks",
                "Visa consultation, blocked account planning, and interview prep",
                "Academic advising before departure to Germany",
            ],
            drawerTitle: "Tashkent preparation network",
            drawerText:
                "Our Tashkent locations are designed as the first stage of the Germany pathway. Students train academically, prepare their documents, and build the language level required to move into European study with a more reliable transition.",
        },
        {
            id: "germany",
            city: "Germany",
            country: "Europe",
            badge: t("flagship"),
            image: "/Germany-Berlin.jpg",
            summary: "The Germany flagship functions as the arrival, integration, and progression hub for students moving from preparation into university access, city onboarding, and long-term career direction.",
            shortLabel: "Flagship hub",
            facts: [
                { value: "1", label: "flagship campus" },
                { value: "40+", label: "partner universities" },
                { value: "18", label: "month post-study route" },
                { value: "24h", label: "student support response" },
            ],
            support: [
                "Arrival support for registration, banking, insurance, and housing",
                "German academic integration and university application guidance",
                "Study spaces, language labs, and collaborative classrooms",
                "Career mentoring for internships, placement, and next steps",
            ],
            drawerTitle: "German flagship campus",
            drawerText:
                "Once students arrive in Germany, the flagship campus becomes their operational base for integration. It supports the move from paperwork and city setup into classes, campus life, university applications, and long-term career planning.",
        },
    ];

    const activeCampus = campuses.find((campus) => campus.id === activeCampusId) ?? campuses[0];
    const drawerCampus = campuses.find((campus) => campus.id === drawerCampusId) ?? null;
    const milestones = ["Language prep", "Visa documents", "Arrival", "University entry"];

    useEffect(() => {
        document.body.style.overflow = drawerCampusId ? "hidden" : "unset";

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [drawerCampusId]);

    const activateCampus = (id: CampusId) => setActiveCampusId(id);
    const openCampus = (id: CampusId) => {
        setActiveCampusId(id);
        setDrawerCampusId(id);
    };

    return (
        <section className="relative overflow-hidden border-t border-white/[0.04] bg-[#050812] py-16 md:py-20">
            <div className="pointer-events-none absolute left-1/4 top-1/2 h-[240px] w-[560px] -translate-y-1/2 rotate-12 rounded-full bg-red-600/[0.03] blur-[100px]" />
            <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] [background-size:42px_42px] [mask-image:radial-gradient(circle_at_center,black,transparent_82%)]" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <span className="inline-block rounded-full border border-white/[0.08] bg-white/[0.04] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-white/50 md:text-xs">
                        {t("sectionLabel")}
                    </span>
                    <h2 className="mt-8 font-[family-name:var(--font-outfit)] text-3xl font-black tracking-[-0.03em] text-white sm:text-4xl md:text-5xl lg:text-6xl">
                        {t("title")}
                    </h2>
                    <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/46 md:text-lg">{t("description")}</p>
                </div>

                <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                    {[
                        { value: "6", label: "campuses" },
                        { value: "2", label: "countries" },
                        { value: "1", label: "joined pathway" },
                    ].map((item) => (
                        <div key={item.label} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-center">
                            <span className="text-sm font-bold text-white">{item.value}</span>
                            <span className="ml-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/34">{item.label}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1.04fr)_minmax(330px,0.96fr)] lg:items-stretch">
                    <motion.div
                        initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.65, ease: ENTRY_EASE }}
                        className="flex h-full flex-col overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(8,14,28,0.95),rgba(5,9,20,0.92))] p-4 shadow-[0_24px_70px_rgba(0,0,0,0.26)] md:p-5"
                    >
                        <div className="flex flex-col gap-3 border-b border-white/8 pb-5 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/30">Connected campus system</div>
                                <div className="mt-2 max-w-md text-xl font-black tracking-[-0.03em] text-white md:text-2xl">From preparation to arrival support</div>
                            </div>
                            <div className="max-w-[180px] text-xs leading-5 text-white/38">Hover on desktop or tap on mobile to inspect each stop.</div>
                        </div>

                        <div className="mt-4 hidden min-h-[340px] flex-1 rounded-[20px] border border-white/8 bg-[#08101d]/88 p-4 md:block lg:min-h-[380px]">
                            <div className="relative h-full overflow-hidden rounded-[16px] bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))]">
                                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.12),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.09),transparent_28%)]" />

                                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 280" preserveAspectRatio="none">
                                    <path d="M 165 210 C 300 220, 462 170, 594 104 S 758 72, 830 68" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" strokeLinecap="round" />
                                    <motion.path d="M 165 210 C 300 220, 462 170, 594 104 S 758 72, 830 68" fill="none" stroke="rgba(239,68,68,0.88)" strokeWidth="3.5" strokeLinecap="round" initial={{ pathLength: 0.12, opacity: 0.6 }} whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: reduceMotion ? 0.25 : 0.95, ease: ENTRY_EASE }} className="drop-shadow-[0_0_14px_rgba(239,68,68,0.45)]" />
                                </svg>

                                <motion.div className="absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/18 bg-[#07101d]/90 p-1.5 text-red-300 shadow-[0_0_24px_rgba(239,68,68,0.35)]" initial={{ left: "16.5%", top: "75%" }} animate={reduceMotion ? { left: "58%", top: "44%" } : { left: ["16.5%", "83%"], top: ["75%", "24.5%"] }} transition={reduceMotion ? { duration: 0.2 } : { duration: 4.8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}>
                                    <PlaneTakeoff className="h-3.5 w-3.5" />
                                </motion.div>

                                <DesktopCampusNode title="Tashkent" subtitle={t("uzbekistan")} badge={`5 ${t("campuses")}`} active={activeCampusId === "tashkent"} positionClass="bottom-14 left-6 mb-4" alignClass="items-start text-left" onHover={() => activateCampus("tashkent")} onOpen={() => openCampus("tashkent")} />
                                <DesktopCampusNode title="Germany" subtitle={t("flagship")} badge="Flagship hub" active={activeCampusId === "germany"} positionClass="right-6 top-6" alignClass="items-end text-right" onHover={() => activateCampus("germany")} onOpen={() => openCampus("germany")} />

                                <div className="absolute bottom-4 left-4 right-4 grid grid-cols-4 gap-1.5">
                                    {milestones.map((item) => (
                                        <div key={item} className="rounded-full border border-white/10 bg-[#09111f]/90 px-3 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">{item}</div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 rounded-[24px] border border-white/8 bg-[#08101d]/88 p-4 md:hidden">
                            <div className="relative overflow-hidden rounded-[20px] bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))] p-4">
                                <div className="absolute bottom-12 left-5 top-12 w-px bg-gradient-to-b from-white/10 via-red-400/40 to-white/10" />
                                <motion.div className="absolute left-[14px] -translate-y-1/2 rounded-full border border-white/18 bg-[#07101d]/90 p-1.5 text-red-300 shadow-[0_0_18px_rgba(239,68,68,0.3)]" initial={{ top: "18%" }} animate={reduceMotion ? { top: "52%" } : { top: ["18%", "70%"] }} transition={reduceMotion ? { duration: 0.2 } : { duration: 4.1, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}>
                                    <PlaneTakeoff className="h-3.5 w-3.5" />
                                </motion.div>

                                <div className="space-y-5 pl-7">
                                    <MobileCampusNode title="Tashkent" subtitle={t("uzbekistan")} badge={`5 ${t("campuses")}`} active={activeCampusId === "tashkent"} onHover={() => activateCampus("tashkent")} onOpen={() => openCampus("tashkent")} />
                                    <div className="grid gap-2 pl-1">
                                        {milestones.map((item) => (
                                            <div key={item} className="rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/36">{item}</div>
                                        ))}
                                    </div>
                                    <MobileCampusNode title="Germany" subtitle={t("flagship")} badge="Flagship hub" active={activeCampusId === "germany"} onHover={() => activateCampus("germany")} onOpen={() => openCampus("germany")} />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.65, delay: 0.06, ease: ENTRY_EASE }}
                        className="h-full overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(8,14,28,0.95),rgba(5,9,20,0.92))] p-4 shadow-[0_24px_70px_rgba(0,0,0,0.26)] md:p-5"
                    >
                        <div className="relative flex h-full flex-col overflow-hidden rounded-[20px] border border-white/8 bg-[#08101d]/88">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_42%)]" />
                            <div className="relative h-32 w-full overflow-hidden border-b border-white/8 sm:h-40">
                                <Image src={activeCampus.image} alt={activeCampus.city} fill className="object-cover" sizes="(max-width: 1280px) 100vw, 40vw" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#08101d] via-[#08101d]/28 to-transparent" />
                                <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-red-300/24 bg-red-500/14 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-red-100"><MapPin className="h-3 w-3" />{activeCampus.badge}</div>
                            </div>

                            <div className="relative z-10 flex flex-1 flex-col p-4 md:p-5 lg:min-h-[380px]">
                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.div key={activeCampus.id} initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduceMotion ? 0 : -10 }} transition={{ duration: 0.32, ease: ENTRY_EASE }} className="flex h-full flex-col">
                                        <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/28">{activeCampus.shortLabel}</div>
                                        <h3 className="mt-3 font-[family-name:var(--font-outfit)] text-2xl font-black tracking-[-0.03em] text-white md:text-[2rem]">{activeCampus.city}</h3>
                                        <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/30">{activeCampus.country}</div>
                                        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/58">{activeCampus.summary}</p>

                                        <div className="mt-4 grid auto-rows-fr gap-2 sm:grid-cols-2">
                                            {activeCampus.facts.map((fact) => (
                                                <div key={fact.label} className="rounded-[16px] border border-white/8 bg-white/[0.03] p-3">
                                                    <div className="text-xl font-black tracking-[-0.04em] text-white">{fact.value}</div>
                                                    <div className="mt-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/34">{fact.label}</div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-4 grid gap-2">
                                            {activeCampus.support.map((item) => (
                                                <div key={item} className="flex items-start gap-2.5 rounded-[12px] border border-white/8 bg-white/[0.02] px-3 py-2.5"><ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-300" /><div className="text-xs leading-5 text-white/62">{item}</div></div>
                                            ))}
                                        </div>

                                        <button type="button" onClick={() => openCampus(activeCampus.id)} className="mt-5 inline-flex items-center gap-2 self-start rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/76 transition-all duration-300 hover:border-red-400/20 hover:text-white">
                                            Open campus details
                                            <ArrowRight className="h-3.5 w-3.5" />
                                        </button>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {typeof document !== "undefined" && createPortal(
                <AnimatePresence>
                    {drawerCampus && (
                        <div className="fixed inset-0 z-[10000]">
                            <motion.div key="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDrawerCampusId(null)} className="absolute inset-0 bg-[#050812]/82 backdrop-blur-sm" />
                            <motion.div key="drawer" initial={{ x: "100%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: "100%", opacity: 0 }} transition={{ type: "spring", damping: 26, stiffness: 220 }} className="absolute right-0 top-0 h-full w-full overflow-y-auto border-l border-white/10 bg-[#0a0f1e] shadow-[0_0_100px_rgba(0,0,0,0.8)] sm:w-[520px]">
                                <div className="p-6 md:p-8">
                                    <div className="mb-8 flex items-center justify-between gap-4">
                                        <div>
                                            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/28">Campus details</div>
                                            <h2 className="mt-2 font-[family-name:var(--font-outfit)] text-2xl font-black text-white md:text-3xl">{drawerCampus.drawerTitle}</h2>
                                        </div>
                                        <button type="button" onClick={() => setDrawerCampusId(null)} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/60 transition-colors hover:bg-white/[0.1] hover:text-white"><X className="h-5 w-5" /></button>
                                    </div>

                                    <div className="relative mb-6 h-60 overflow-hidden rounded-[24px] border border-white/10 shadow-2xl">
                                        <Image src={drawerCampus.image} alt={drawerCampus.city} fill className="object-cover" sizes="520px" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-[#0a0f1e]/20 to-transparent" />
                                        <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-red-500/88 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white"><PlaneTakeoff className="h-3.5 w-3.5" />{drawerCampus.badge}</div>
                                    </div>

                                    <p className="text-sm leading-7 text-white/62">{drawerCampus.drawerText}</p>

                                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                                        {drawerCampus.id === "tashkent" ? [{ icon: Building2, title: "Preparation hubs", text: "Academic specialization across language, STEM, business, and admissions preparation." }, { icon: Landmark, title: "Visa readiness", text: "Blocked account, document checks, and embassy-facing preparation before departure." }].map((item) => (<DetailCard key={item.title} title={item.title} text={item.text} Icon={item.icon} />)) : [{ icon: Home, title: "Arrival onboarding", text: "Housing, registration, banking, and practical city setup after landing." }, { icon: GraduationCap, title: "University access", text: "Application guidance, integration support, and academic progression into Germany." }].map((item) => (<DetailCard key={item.title} title={item.title} text={item.text} Icon={item.icon} />))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </section>
    );
}

function DesktopCampusNode({ title, subtitle, badge, active, positionClass, alignClass, onHover, onOpen }: { title: string; subtitle: string; badge: string; active: boolean; positionClass: string; alignClass: string; onHover: () => void; onOpen: () => void; }) {
    return (
        <button type="button" onMouseEnter={onHover} onFocus={onHover} onClick={onOpen} className={`absolute z-20 flex w-[200px] flex-col ${alignClass} ${positionClass}`}>
            <motion.div whileHover={{ y: -2, scale: 1.01 }} className={`rounded-[20px] border px-4 py-3 shadow-[0_16px_40px_rgba(0,0,0,0.22)] transition-all duration-300 ${active ? "border-red-400/22 bg-[linear-gradient(180deg,rgba(239,68,68,0.16),rgba(8,16,28,0.9))]" : "border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(8,16,28,0.88))]"}`}>
                <div className={`inline-flex rounded-full border px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] ${active ? "border-red-300/24 bg-red-500/12 text-red-100" : "border-white/10 bg-white/[0.04] text-white/46"}`}>{badge}</div>
                <div className="mt-2 text-xl font-black tracking-[-0.03em] text-white">{title}</div>
                <div className="mt-0.5 text-xs text-white/48">{subtitle}</div>
                <div className="mt-3 inline-flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/34">Explore this stop<ArrowRight className="h-3 w-3" /></div>
            </motion.div>
        </button>
    );
}

function MobileCampusNode({ title, subtitle, badge, active, onHover, onOpen }: { title: string; subtitle: string; badge: string; active: boolean; onHover: () => void; onOpen: () => void; }) {
    return (
        <button type="button" onMouseEnter={onHover} onFocus={onHover} onClick={onOpen} className={`w-full rounded-[22px] border p-4 text-left transition-all duration-300 ${active ? "border-red-400/22 bg-[linear-gradient(180deg,rgba(239,68,68,0.14),rgba(8,16,28,0.92))]" : "border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(8,16,28,0.88))]"}`}>
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">{badge}</div>
            <div className="mt-2 text-xl font-black tracking-[-0.03em] text-white">{title}</div>
            <div className="mt-1 text-sm text-white/48">{subtitle}</div>
        </button>
    );
}

function DetailCard({ title, text, Icon }: { title: string; text: string; Icon: LucideIcon }) {
    return (
        <div className="rounded-[20px] border border-white/[0.06] bg-white/[0.02] p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-red-300"><Icon className="h-4 w-4" /></div>
            <h4 className="mt-4 text-sm font-bold text-white">{title}</h4>
            <p className="mt-2 text-xs leading-6 text-white/42">{text}</p>
        </div>
    );
}
