"use client";

import { useTranslations } from "next-intl";
import { Link as I18nLink } from "@/i18n/routing";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Linkedin, MapPin, Mail, Phone } from "lucide-react";

export default function Footer({ setActiveTab }: { setActiveTab?: (t: string) => void }) {
    const t = useTranslations("Footer");
    const navT = useTranslations("Navbar");

    return (
        <footer className="bg-slate-950 border-t border-white/10 pt-20 pb-10 text-white/80 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

                    <div className="col-span-1 lg:col-span-2">
                        <button onClick={() => setActiveTab && setActiveTab("home")} className="flex items-center gap-4 mb-6 group cursor-pointer">
                            <div className="relative w-12 h-12 overflow-hidden rounded-xl border border-white/20 group-hover:border-white/50 transition-colors">
                                <Image src="/logo.jpg" alt="Logo" fill className="object-cover" />
                            </div>
                            <span className="font-bold text-xl tracking-tight text-white">Target</span>
                        </button>
                        <p className="text-lg leading-relaxed mb-8 max-w-md">
                            {t("aboutText")}
                        </p>
                        <div className="flex gap-4">
                            <SocialIcon Icon={Facebook} />
                            <SocialIcon Icon={Instagram} />
                            <SocialIcon Icon={Twitter} />
                            <SocialIcon Icon={Linkedin} />
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold text-lg mb-6 uppercase tracking-wider">{t("quickLinks")}</h4>
                        <ul className="space-y-4">
                            <li><FooterLink tab="about" setActiveTab={setActiveTab}>{navT("about")}</FooterLink></li>
                            <li><FooterLink tab="academics" setActiveTab={setActiveTab}>{navT("academics")}</FooterLink></li>
                            <li><FooterLink tab="courses" setActiveTab={setActiveTab}>{navT("curriculum")}</FooterLink></li>
                            <li><FooterLink tab="admissions" setActiveTab={setActiveTab}>{navT("admissions")}</FooterLink></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold text-lg mb-6 uppercase tracking-wider">{t("contactUs")}</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                <span>{t("address")}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-blue-400 shrink-0" />
                                <span>+49 30 1234 5678</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-blue-400 shrink-0" />
                                <span className="break-all">admissions.de@targetis.com</span>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-white/50">
                    <p>&copy; {new Date().getFullYear()} {t("rights")}</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <I18nLink href="/privacy" className="hover:text-white transition-colors">{t("privacy")}</I18nLink>
                        <I18nLink href="/terms" className="hover:text-white transition-colors">{t("terms")}</I18nLink>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialIcon({ Icon }: { Icon: any }) {
    return (
        <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-500 hover:border-blue-500 hover:text-white transition-all transform hover:-translate-y-1">
            <Icon className="w-5 h-5" />
        </button>
    );
}

function FooterLink({ tab, setActiveTab, children }: { tab: string, setActiveTab?: (t: string) => void, children: React.ReactNode }) {
    return (
        <button
            onClick={() => setActiveTab && setActiveTab(tab)}
            className="hover:text-white hover:translate-x-2 transition-all inline-block text-left"
        >
            {children}
        </button>
    );
}
