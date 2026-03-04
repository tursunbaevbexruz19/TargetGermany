"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, ArrowUpRight, Heart } from "lucide-react";

const socials = [
    { label: "Instagram", href: "#", icon: "IG" },
    { label: "Facebook", href: "#", icon: "FB" },
    { label: "LinkedIn", href: "#", icon: "LI" },
    { label: "YouTube", href: "#", icon: "YT" },
    { label: "Telegram", href: "#", icon: "TG" },
];

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

    return (
        <footer className="relative bg-[#060b16] pt-24 pb-8 w-full overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-red-600/[0.02] rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 mb-20">
                    <div className="md:col-span-5">
                        <button onClick={() => setActiveTab && setActiveTab("home")} className="flex items-center gap-3 mb-6 group cursor-pointer">
                            <div className="relative w-8 h-8 overflow-hidden"><Image src="/logo-white.png" alt="Logo" fill className="object-contain" /></div>
                            <div className="flex flex-col items-start">
                                <span className="font-black text-lg tracking-tight text-white leading-none">Target International</span>
                                <span className="text-[9px] font-semibold tracking-[0.2em] uppercase text-white/25 leading-none mt-0.5">School · Germany</span>
                            </div>
                        </button>
                        <p className="text-sm text-white/35 leading-[1.8] mb-8 max-w-sm">{t("aboutText")}</p>
                        <div className="flex gap-2">
                            {socials.map((s) => (
                                <motion.a key={s.label} href={s.href} whileHover={{ y: -2, backgroundColor: "rgba(220,38,38,0.12)", borderColor: "rgba(220,38,38,0.3)" }} className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-[10px] font-bold text-white/30 hover:text-red-400 transition-colors" title={s.label}>{s.icon}</motion.a>
                            ))}
                        </div>
                    </div>

                    <div className="md:col-span-3">
                        {navSections.map((section, idx) => (
                            <div key={idx}>
                                <h4 className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/25 mb-5">{section.title}</h4>
                                <ul className="space-y-3">
                                    {section.links.map((link, li) => (
                                        <li key={li}>
                                            <button onClick={() => setActiveTab && setActiveTab(link.tab)} className="group flex items-center gap-2 text-sm text-white/40 hover:text-white transition-all">
                                                <span className="w-0 group-hover:w-3 h-px bg-red-400 transition-all duration-300" />{link.label}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="md:col-span-4">
                        <h4 className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/25 mb-5">{t("contactUs")}</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center shrink-0"><MapPin className="w-3.5 h-3.5 text-red-400/60" /></div>
                                <div><span className="text-sm text-white/50 block">{t("address")}</span><span className="text-xs text-white/25">Sprachzentrum & Akademie</span></div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center shrink-0"><Phone className="w-3.5 h-3.5 text-red-400/60" /></div>
                                <div><span className="text-sm text-white/50 block">+49 30 1234 5678</span><span className="text-xs text-white/25">Mo–Fr, 09:00–18:00 CET</span></div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center shrink-0"><Mail className="w-3.5 h-3.5 text-red-400/60" /></div>
                                <div><span className="text-sm text-white/50 block break-all">info@target-germany.de</span><span className="text-xs text-white/25">Response within 24h</span></div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* CTA */}
                <div className="rounded-2xl p-6 md:p-8 bg-white/[0.02] border border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
                    <div><h4 className="text-base font-bold text-white mb-1">Start your journey to Germany today</h4><p className="text-xs text-white/35">Join thousands of students who chose Target International for their education pathway</p></div>
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setActiveTab && setActiveTab("admissions")} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl font-semibold text-sm whitespace-nowrap shadow-[0_4px_20px_rgba(220,38,38,0.2)]">
                        Apply Now <ArrowUpRight className="w-4 h-4" />
                    </motion.button>
                </div>

                {/* Bottom */}
                <div className="border-t border-white/[0.04] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-[11px] text-white/20 flex items-center gap-1">&copy; {new Date().getFullYear()} {t("rights")} <span className="text-white/10">·</span> Made with <Heart className="w-3 h-3 text-red-500/40 inline" /> in Germany</p>
                    <div className="flex gap-6">
                        <span className="text-[11px] text-white/20 hover:text-white/40 cursor-pointer transition-colors">{t("privacy")}</span>
                        <span className="text-[11px] text-white/20">·</span>
                        <span className="text-[11px] text-white/20 hover:text-white/40 cursor-pointer transition-colors">{t("terms")}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
