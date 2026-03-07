"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Send, Youtube } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type SocialItem = {
    label: string;
    href: string;
    icon: LucideIcon;
};

const socials: SocialItem[] = [
    { label: "Instagram", href: "#", icon: Instagram },
    { label: "Facebook", href: "#", icon: Facebook },
    { label: "LinkedIn", href: "#", icon: Linkedin },
    { label: "YouTube", href: "#", icon: Youtube },
    { label: "Telegram", href: "#", icon: Send },
];

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};

const staggerItem = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function Footer({ setActiveTab }: { setActiveTab?: (t: string) => void }) {
    const t = useTranslations("Footer");

    const navSections = [
        {
            title: t("quickLinks"),
            links: [
                { label: t("programs"), tab: "programs" },
                { label: t("germanCourses"), tab: "german" },
                { label: t("opportunities"), tab: "opportunities" },
                { label: t("admissions"), tab: "admissions" },
            ],
        },
    ];

    const jumpTo = (tab: string) => {
        if (setActiveTab) {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <footer className="relative w-full overflow-hidden bg-[#060b16] pb-6 pt-16 md:pt-20">
            <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute left-1/2 top-0 h-px w-40 -translate-x-1/2 bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
            <div className="pointer-events-none absolute bottom-0 left-1/2 h-[220px] w-[420px] -translate-x-1/2 rounded-full bg-red-600/[0.02] blur-[120px]" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-40px" }}
                    className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(220px,0.66fr)_minmax(280px,0.9fr)]"
                >
                    <motion.div variants={staggerItem} className="rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] p-6 md:p-7">
                        <button onClick={() => jumpTo("home")} className="group flex cursor-pointer items-center gap-3 text-left">
                            <div className="relative h-10 w-10 overflow-hidden rounded-[10px]">
                                <Image src="/logo.jpg" alt="Logo" fill className="object-cover" />
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="font-[family-name:var(--font-outfit)] text-lg font-black leading-none tracking-tight text-white">Target International</span>
                                <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.24em] text-white/28">Tashkent to Germany pathway</span>
                            </div>
                        </button>

                        <p className="mt-5 max-w-xl text-sm leading-7 text-white/42">{t("aboutText")}</p>

                        <div className="mt-6 flex flex-wrap gap-2">
                            {socials.map((social) => {
                                const Icon = social.icon;

                                return (
                                    <motion.a
                                        key={social.label}
                                        href={social.href}
                                        whileHover={{ y: -2, backgroundColor: "rgba(220,38,38,0.12)", borderColor: "rgba(220,38,38,0.3)" }}
                                        className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.03] text-white/42 transition-colors hover:text-red-300"
                                        title={social.label}
                                    >
                                        <Icon className="h-4 w-4" />
                                    </motion.a>
                                );
                            })}
                        </div>
                    </motion.div>

                    <motion.div variants={staggerItem} className="rounded-[28px] border border-white/8 bg-white/[0.02] p-6">
                        {navSections.map((section, idx) => (
                            <div key={idx}>
                                <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/25">{section.title}</h4>
                                <ul className="mt-5 space-y-3">
                                    {section.links.map((link) => (
                                        <li key={link.tab}>
                                            <button
                                                onClick={() => jumpTo(link.tab)}
                                                className="group flex w-full items-center justify-between rounded-2xl border border-transparent px-3 py-2 text-left text-sm text-white/48 transition-all duration-300 hover:border-white/8 hover:bg-white/[0.03] hover:text-white"
                                            >
                                                <span>{link.label}</span>
                                                <ArrowUpRight className="h-4 w-4 text-white/18 transition-colors duration-300 group-hover:text-red-300" />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div variants={staggerItem} className="rounded-[28px] border border-white/8 bg-white/[0.02] p-6">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/25">{t("contactUs")}</h4>
                        <ul className="mt-5 space-y-4">
                            <li className="flex items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.03] text-red-300">
                                    <MapPin className="h-4 w-4" />
                                </div>
                                <div>
                                    <span className="block text-sm text-white/58">{t("address")}</span>
                                    <span className="text-xs text-white/28">Sprachzentrum & Akademie</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.03] text-red-300">
                                    <Phone className="h-4 w-4" />
                                </div>
                                <div>
                                    <span className="block text-sm text-white/58">+49 30 1234 5678</span>
                                    <span className="text-xs text-white/28">Mon-Fri, 09:00-18:00 CET</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.03] text-red-300">
                                    <Mail className="h-4 w-4" />
                                </div>
                                <div>
                                    <span className="block break-all text-sm text-white/58">info@target-germany.de</span>
                                    <span className="text-xs text-white/28">Response within 24h</span>
                                </div>
                            </li>
                        </ul>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-8 flex flex-col gap-4 rounded-[28px] border border-white/[0.06] bg-[linear-gradient(180deg,rgba(255,255,255,0.025),rgba(255,255,255,0.01))] p-5 md:flex-row md:items-center md:justify-between md:p-6"
                >
                    <div>
                        <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/28">Admissions desk</div>
                        <h4 className="mt-2 font-[family-name:var(--font-outfit)] text-lg font-bold text-white md:text-xl">Start your journey to Germany today</h4>
                        <p className="mt-1 text-sm text-white/38">Join thousands of students who chose Target International for their pathway.</p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(220,38,38,0.28)" }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => jumpTo("admissions")}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_26px_rgba(220,38,38,0.22)]"
                    >
                        Apply Now
                        <ArrowUpRight className="h-4 w-4" />
                    </motion.button>
                </motion.div>

                <div className="mt-6 flex flex-col gap-2 border-t border-white/6 pt-4 text-xs text-white/24 md:flex-row md:items-center md:justify-between">
                    <span>Target International</span>
                    <span>Germany pathway and admissions support</span>
                </div>
            </div>
        </footer>
    );
}
