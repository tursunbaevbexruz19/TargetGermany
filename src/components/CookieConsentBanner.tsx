"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie, ShieldCheck } from "lucide-react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";

type ConsentPreferences = {
    necessary: true;
    analytics: boolean;
    marketing: boolean;
    consentGivenAt: string;
    version: string;
};

const CONSENT_COOKIE_NAME = "target_cookie_consent";
const CONSENT_VERSION = "2026-03";
const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 180;

type CopyContent = {
    title: string;
    description: string;
    manage: string;
    acceptAll: string;
    essentialOnly: string;
    saveSelection: string;
    categoriesTitle: string;
    required: string;
    analytics: string;
    marketing: string;
    requiredInfo: string;
    analyticsInfo: string;
    marketingInfo: string;
    privacy: string;
    terms: string;
    impressum: string;
};

const COPY: Record<"en" | "de", CopyContent> = {
    en: {
        title: "Cookie Preferences",
        description:
            "We use required cookies for core website functions. Optional analytics and marketing cookies are used only with your consent.",
        manage: "Customize",
        acceptAll: "Accept all",
        essentialOnly: "Essential only",
        saveSelection: "Save selection",
        categoriesTitle: "Cookie categories",
        required: "Required cookies",
        analytics: "Analytics cookies",
        marketing: "Marketing cookies",
        requiredInfo: "Always active. These cookies are necessary for security, language preferences, and consent records.",
        analyticsInfo: "Help us understand anonymous usage so we can improve performance and user experience.",
        marketingInfo: "Used for campaign measurement and ad personalization. Disabled by default.",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
        impressum: "Impressum",
    },
    de: {
        title: "Cookie-Einstellungen",
        description:
            "Wir verwenden notwendige Cookies fur die Kernfunktionen der Website. Optionale Analyse- und Marketing-Cookies werden nur mit Ihrer Einwilligung aktiviert.",
        manage: "Anpassen",
        acceptAll: "Alle akzeptieren",
        essentialOnly: "Nur notwendige",
        saveSelection: "Auswahl speichern",
        categoriesTitle: "Cookie-Kategorien",
        required: "Notwendige Cookies",
        analytics: "Analyse-Cookies",
        marketing: "Marketing-Cookies",
        requiredInfo: "Immer aktiv. Diese Cookies sind fur Sicherheit, Spracheinstellungen und Einwilligungsnachweise erforderlich.",
        analyticsInfo: "Helfen uns, die anonyme Nutzung zu verstehen, um Leistung und Nutzererlebnis zu verbessern.",
        marketingInfo: "Werden fur Kampagnenmessung und personalisierte Werbung verwendet. Standardmaessig deaktiviert.",
        privacy: "Datenschutz",
        terms: "Nutzungsbedingungen",
        impressum: "Impressum",
    },
};

function readCookie(name: string): string | null {
    if (typeof document === "undefined") {
        return null;
    }

    const match = document.cookie
        .split("; ")
        .find((entry) => entry.startsWith(`${name}=`));

    if (!match) {
        return null;
    }

    return decodeURIComponent(match.split("=").slice(1).join("="));
}

function parseConsent(rawValue: string | null): ConsentPreferences | null {
    if (!rawValue) {
        return null;
    }

    try {
        const parsed = JSON.parse(rawValue) as Partial<ConsentPreferences>;

        if (typeof parsed.analytics !== "boolean" || typeof parsed.marketing !== "boolean") {
            return null;
        }

        return {
            necessary: true,
            analytics: parsed.analytics,
            marketing: parsed.marketing,
            consentGivenAt: typeof parsed.consentGivenAt === "string" ? parsed.consentGivenAt : new Date().toISOString(),
            version: typeof parsed.version === "string" ? parsed.version : CONSENT_VERSION,
        };
    } catch {
        return null;
    }
}

function writeConsentCookie(consent: ConsentPreferences) {
    const secureAttribute = window.location.protocol === "https:" ? "; Secure" : "";

    document.cookie = `${CONSENT_COOKIE_NAME}=${encodeURIComponent(JSON.stringify(consent))}; Max-Age=${CONSENT_MAX_AGE_SECONDS}; Path=/; SameSite=Lax${secureAttribute}`;
}

function PreferenceToggle({
    checked,
    disabled = false,
    onChange,
}: {
    checked: boolean;
    disabled?: boolean;
    onChange: (next: boolean) => void;
}) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            disabled={disabled}
            onClick={() => onChange(!checked)}
            className={`relative h-7 w-12 rounded-full border transition ${checked ? "border-red-400/60 bg-red-500/35" : "border-white/15 bg-white/10"} ${disabled ? "cursor-not-allowed opacity-80" : "cursor-pointer hover:border-white/25"}`}
        >
            <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${checked ? "left-6" : "left-1"}`}
            />
        </button>
    );
}

export default function CookieConsentBanner() {
    const locale = useLocale();
    const initialConsent = useMemo(() => parseConsent(readCookie(CONSENT_COOKIE_NAME)), []);
    const [isVisible, setIsVisible] = useState(() => initialConsent === null);
    const [showSettings, setShowSettings] = useState(false);
    const [analytics, setAnalytics] = useState(() => initialConsent?.analytics ?? false);
    const [marketing, setMarketing] = useState(() => initialConsent?.marketing ?? false);

    const copy = useMemo(() => (locale === "de" ? COPY.de : COPY.en), [locale]);

    const persistConsent = (next: Pick<ConsentPreferences, "analytics" | "marketing">) => {
        const consent: ConsentPreferences = {
            necessary: true,
            analytics: next.analytics,
            marketing: next.marketing,
            consentGivenAt: new Date().toISOString(),
            version: CONSENT_VERSION,
        };

        writeConsentCookie(consent);
        setAnalytics(next.analytics);
        setMarketing(next.marketing);
        setIsVisible(false);
        setShowSettings(false);
        window.dispatchEvent(new CustomEvent("cookie-consent-updated", { detail: consent }));
    };

    useEffect(() => {
        const handleOpenSettings = () => {
            const existingConsent = parseConsent(readCookie(CONSENT_COOKIE_NAME));
            setAnalytics(existingConsent?.analytics ?? false);
            setMarketing(existingConsent?.marketing ?? false);
            setIsVisible(true);
            setShowSettings(true);
        };

        window.addEventListener("open-cookie-preferences", handleOpenSettings);

        return () => {
            window.removeEventListener("open-cookie-preferences", handleOpenSettings);
        };
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.section
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 24 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed bottom-4 left-1/2 z-[10020] w-[calc(100%-1.5rem)] max-w-3xl -translate-x-1/2 rounded-[26px] border border-white/12 bg-[#07101d]/95 p-5 text-white shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl md:bottom-6 md:p-6"
                    aria-live="polite"
                >
                    <div className="flex flex-col gap-4">
                        <div className="flex items-start gap-3">
                            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.04] text-red-300">
                                <Cookie className="h-4 w-4" />
                            </div>
                            <div>
                                <h3 className="font-[family-name:var(--font-outfit)] text-xl font-black tracking-[-0.02em] text-white">
                                    {copy.title}
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-white/62">{copy.description}</p>
                                <div className="mt-2 flex flex-wrap gap-3 text-xs">
                                    <Link href="/privacy" className="text-red-200/90 hover:text-red-100">
                                        {copy.privacy}
                                    </Link>
                                    <Link href="/terms" className="text-red-200/90 hover:text-red-100">
                                        {copy.terms}
                                    </Link>
                                    <Link href="/impressum" className="text-red-200/90 hover:text-red-100">
                                        {copy.impressum}
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <button
                                type="button"
                                onClick={() => setShowSettings((prev) => !prev)}
                                className="rounded-xl border border-white/14 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/88 hover:bg-white/[0.08]"
                            >
                                {copy.manage}
                            </button>
                            <button
                                type="button"
                                onClick={() => persistConsent({ analytics: false, marketing: false })}
                                className="rounded-xl border border-white/12 bg-transparent px-4 py-2 text-sm font-semibold text-white/78 hover:border-white/25 hover:text-white"
                            >
                                {copy.essentialOnly}
                            </button>
                            <button
                                type="button"
                                onClick={() => persistConsent({ analytics: true, marketing: true })}
                                className="rounded-xl bg-gradient-to-r from-red-600 to-red-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(220,38,38,0.3)] hover:from-red-500 hover:to-red-400"
                            >
                                {copy.acceptAll}
                            </button>
                        </div>

                        <AnimatePresence initial={false}>
                            {showSettings && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.24 }}
                                    className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                                >
                                    <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/35">
                                        <ShieldCheck className="h-3.5 w-3.5" />
                                        {copy.categoriesTitle}
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-start justify-between gap-4 rounded-xl border border-white/8 bg-white/[0.02] p-3">
                                            <div>
                                                <div className="text-sm font-semibold text-white">{copy.required}</div>
                                                <p className="mt-1 text-xs leading-5 text-white/52">{copy.requiredInfo}</p>
                                            </div>
                                            <PreferenceToggle checked disabled onChange={() => {}} />
                                        </div>

                                        <div className="flex items-start justify-between gap-4 rounded-xl border border-white/8 bg-white/[0.02] p-3">
                                            <div>
                                                <div className="text-sm font-semibold text-white">{copy.analytics}</div>
                                                <p className="mt-1 text-xs leading-5 text-white/52">{copy.analyticsInfo}</p>
                                            </div>
                                            <PreferenceToggle checked={analytics} onChange={setAnalytics} />
                                        </div>

                                        <div className="flex items-start justify-between gap-4 rounded-xl border border-white/8 bg-white/[0.02] p-3">
                                            <div>
                                                <div className="text-sm font-semibold text-white">{copy.marketing}</div>
                                                <p className="mt-1 text-xs leading-5 text-white/52">{copy.marketingInfo}</p>
                                            </div>
                                            <PreferenceToggle checked={marketing} onChange={setMarketing} />
                                        </div>
                                    </div>

                                    <div className="mt-4 flex justify-end">
                                        <button
                                            type="button"
                                            onClick={() => persistConsent({ analytics, marketing })}
                                            className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/16"
                                        >
                                            {copy.saveSelection}
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.section>
            )}
        </AnimatePresence>
    );
}
