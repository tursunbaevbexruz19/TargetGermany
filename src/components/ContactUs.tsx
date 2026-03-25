"use client";

import type { FormEvent, ReactNode } from "react";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle2, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { useLocale } from "next-intl";

type ContactFormData = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
};

type FormState = "idle" | "submitting" | "success" | "error";

type CopyContent = {
    badge: string;
    title: string;
    description: string;
    locationLabel: string;
    locationValue: string;
    addressLine: string;
    phoneLabel: string;
    phoneValue: string;
    phoneHours: string;
    emailLabel: string;
    emailValue: string;
    emailHint: string;
    formTitle: string;
    formDescription: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
    success: string;
    requiredError: string;
};

const COPY: Record<"en" | "de", CopyContent> = {
    en: {
        badge: "Contact us",
        title: "Let's build your Germany plan",
        description:
            "Reach our Berlin guidance desk for language pathway, application support, and onboarding preparation.",
        locationLabel: "Location",
        locationValue: "Berlin, Germany",
        addressLine: "Sprachzentrum & Akademie",
        phoneLabel: "Phone",
        phoneValue: "+49 30 1234 5678",
        phoneHours: "Mon-Fri, 09:00-18:00 CET",
        emailLabel: "Email",
        emailValue: "info@target-germany.de",
        emailHint: "Typical response within 24 hours",
        formTitle: "Send a message",
        formDescription: "Share your goals and our team will contact you shortly.",
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email",
        phone: "Phone (optional)",
        message: "Message",
        messagePlaceholder: "Tell us about your study or career goal in Germany.",
        submit: "Send inquiry",
        submitting: "Sending...",
        success: "Thanks. Your message has been sent successfully.",
        requiredError: "Please fill in first name, last name, email, and message.",
    },
    de: {
        badge: "Kontakt",
        title: "Gemeinsam zu Ihrem Deutschland-Plan",
        description:
            "Kontaktieren Sie unser Berliner Beratungsteam fuer Sprachpfad, Bewerbung und Ankunftsvorbereitung.",
        locationLabel: "Standort",
        locationValue: "Berlin, Deutschland",
        addressLine: "Sprachzentrum & Akademie",
        phoneLabel: "Telefon",
        phoneValue: "+49 30 1234 5678",
        phoneHours: "Mo-Fr, 09:00-18:00 CET",
        emailLabel: "E-Mail",
        emailValue: "info@target-germany.de",
        emailHint: "Antwort in der Regel innerhalb von 24 Stunden",
        formTitle: "Nachricht senden",
        formDescription: "Teilen Sie uns Ihr Ziel mit, wir melden uns zeitnah.",
        firstName: "Vorname",
        lastName: "Nachname",
        email: "E-Mail",
        phone: "Telefon (optional)",
        message: "Nachricht",
        messagePlaceholder: "Beschreiben Sie kurz Ihr Studien- oder Karriereziel in Deutschland.",
        submit: "Anfrage senden",
        submitting: "Wird gesendet...",
        success: "Vielen Dank. Ihre Nachricht wurde erfolgreich gesendet.",
        requiredError: "Bitte Vorname, Nachname, E-Mail und Nachricht ausfuellen.",
    },
};

const ENTRY_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function ContactUs() {
    const locale = useLocale();
    const copy = useMemo(() => (locale === "de" ? COPY.de : COPY.en), [locale]);
    const [formState, setFormState] = useState<FormState>("idle");
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [formData, setFormData] = useState<ContactFormData>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
    });

    const updateField = (field: keyof ContactFormData, value: string) => {
        setFormData((current) => ({ ...current, [field]: value }));

        if (formState === "error") {
            setFormState("idle");
            setSubmitError(null);
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.message.trim()) {
            setFormState("error");
            setSubmitError(copy.requiredError);
            return;
        }

        setFormState("submitting");
        setSubmitError(null);

        try {
            const response = await fetch("/api/telegram", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    program: locale === "de" ? "Allgemeine Kontaktanfrage" : "General contact inquiry",
                    source: "website_contact_form",
                }),
            });

            const result = (await response.json()) as { success?: boolean; error?: string };

            if (!response.ok || !result.success) {
                throw new Error(result.error || "Failed to send your inquiry.");
            }

            setFormState("success");
            setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
        } catch (error) {
            setFormState("error");
            setSubmitError(error instanceof Error ? error.message : "Failed to send your inquiry.");
        }
    };

    return (
        <section id="contact-us" className="relative overflow-hidden bg-[#0a0f1e] py-28 md:py-40">
            <div className="pointer-events-none absolute left-1/3 top-0 h-[520px] w-[520px] rounded-full bg-red-600/[0.03] blur-[180px]" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mx-auto mb-14 max-w-3xl text-center"
                >
                    <span className="mb-7 inline-block rounded-full border border-white/[0.08] bg-white/[0.04] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-white/50 md:text-xs">
                        {copy.badge}
                    </span>
                    <h2 className="font-[family-name:var(--font-outfit)] text-3xl font-black tracking-[-0.02em] text-white sm:text-4xl md:text-5xl lg:text-6xl">
                        {copy.title}
                    </h2>
                    <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/46 md:text-lg">
                        {copy.description}
                    </p>
                </motion.div>

                <div className="grid gap-6 lg:grid-cols-[minmax(280px,0.95fr)_minmax(0,1.05fr)] lg:items-start">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.5, ease: ENTRY_EASE }}
                        className="rounded-[28px] border border-white/8 bg-white/[0.02] p-6"
                    >
                        <div className="space-y-4">
                            <ContactCard
                                icon={<MapPin className="h-4 w-4" />}
                                label={copy.locationLabel}
                                value={copy.locationValue}
                                hint={copy.addressLine}
                            />
                            <ContactCard
                                icon={<Phone className="h-4 w-4" />}
                                label={copy.phoneLabel}
                                value={copy.phoneValue}
                                hint={copy.phoneHours}
                            />
                            <ContactCard
                                icon={<Mail className="h-4 w-4" />}
                                label={copy.emailLabel}
                                value={copy.emailValue}
                                hint={copy.emailHint}
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.55, ease: ENTRY_EASE, delay: 0.04 }}
                        className="rounded-[28px] border border-white/[0.06] bg-white/[0.02] p-6 shadow-[0_8px_40px_rgba(0,0,0,0.2)] md:p-8"
                    >
                        <h3 className="font-[family-name:var(--font-outfit)] text-2xl font-bold text-white md:text-3xl">
                            {copy.formTitle}
                        </h3>
                        <p className="mt-2 text-sm text-white/40">{copy.formDescription}</p>

                        <AnimatePresence mode="wait">
                            {formState === "success" ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.96 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="py-10 text-center"
                                >
                                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/15">
                                        <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                                    </div>
                                    <p className="text-base font-semibold text-white/78">{copy.success}</p>
                                </motion.div>
                            ) : (
                                <motion.form key="form" onSubmit={handleSubmit} className="mt-6 space-y-5">
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <InputField
                                            label={copy.firstName}
                                            value={formData.firstName}
                                            onChange={(value) => updateField("firstName", value)}
                                            autoComplete="given-name"
                                            required
                                        />
                                        <InputField
                                            label={copy.lastName}
                                            value={formData.lastName}
                                            onChange={(value) => updateField("lastName", value)}
                                            autoComplete="family-name"
                                            required
                                        />
                                    </div>
                                    <InputField
                                        label={copy.email}
                                        type="email"
                                        value={formData.email}
                                        onChange={(value) => updateField("email", value)}
                                        autoComplete="email"
                                        required
                                    />
                                    <InputField
                                        label={copy.phone}
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(value) => updateField("phone", value)}
                                        autoComplete="tel"
                                    />

                                    <div>
                                        <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-white/30">
                                            {copy.message}
                                        </label>
                                        <textarea
                                            rows={4}
                                            required
                                            value={formData.message}
                                            onChange={(event) => updateField("message", event.target.value)}
                                            placeholder={copy.messagePlaceholder}
                                            className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white transition-all duration-300 placeholder:text-white/22 hover:border-white/15 hover:bg-white/[0.06] focus:border-red-500/30 focus:outline-none focus:ring-1 focus:ring-red-500/20"
                                        />
                                    </div>

                                    {submitError && (
                                        <div className="flex items-start gap-3 rounded-2xl border border-red-500/18 bg-red-500/[0.06] px-4 py-3 text-sm text-red-100/80">
                                            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-300" />
                                            <span>{submitError}</span>
                                        </div>
                                    )}

                                    <motion.button
                                        type="submit"
                                        whileHover={{ scale: 1.02, boxShadow: "0 8px 40px rgba(220,38,38,0.35)" }}
                                        whileTap={{ scale: 0.98 }}
                                        disabled={formState === "submitting"}
                                        className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 to-red-500 py-4 font-bold text-white shadow-[0_8px_30px_rgba(220,38,38,0.25)] transition-all duration-300 disabled:opacity-70"
                                    >
                                        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                                        <span className="relative flex items-center gap-2">
                                            {formState === "submitting" ? (
                                                <>
                                                    <Loader2 className="h-5 w-5 animate-spin" />
                                                    {copy.submitting}
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="h-5 w-5" />
                                                    {copy.submit}
                                                </>
                                            )}
                                        </span>
                                    </motion.button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function ContactCard({
    icon,
    label,
    value,
    hint,
}: {
    icon: ReactNode;
    label: string;
    value: string;
    hint: string;
}) {
    return (
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4">
            <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.04] text-red-300">
                    {icon}
                </div>
                <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/30">{label}</div>
                    <div className="mt-1 text-sm font-semibold text-white/78">{value}</div>
                    <div className="mt-1 text-xs text-white/38">{hint}</div>
                </div>
            </div>
        </div>
    );
}

function InputField({
    label,
    value,
    onChange,
    type = "text",
    autoComplete,
    required = false,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
    autoComplete?: string;
    required?: boolean;
}) {
    return (
        <div>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-white/30">{label}</label>
            <input
                type={type}
                value={value}
                required={required}
                autoComplete={autoComplete}
                onChange={(event) => onChange(event.target.value)}
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white transition-all duration-300 placeholder:text-white/20 hover:border-white/15 hover:bg-white/[0.06] focus:border-red-500/30 focus:outline-none focus:ring-1 focus:ring-red-500/20"
            />
        </div>
    );
}
