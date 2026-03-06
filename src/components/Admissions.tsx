"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, MessageSquare, CheckCircle, Plane, Send, Loader2, Check, AlertCircle } from "lucide-react";

const STEPS_ICONS = [FileText, MessageSquare, CheckCircle, Plane];
const STEP_COLOR = "#ef4444";

type FormState = "idle" | "submitting" | "success" | "error";

type FormDataState = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    program: string;
    message: string;
};

export default function Admissions() {
    const t = useTranslations("Admissions");
    const [activeStep, setActiveStep] = useState(0);
    const [formState, setFormState] = useState<FormState>("idle");
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [formData, setFormData] = useState<FormDataState>({ firstName: "", lastName: "", email: "", phone: "", program: "", message: "" });

    const programOptions = [
        { value: "foundation", label: t("programOption1") },
        { value: "german", label: t("programOption2") },
        { value: "satielts", label: t("programOption3") },
        { value: "business", label: t("programOption4") },
    ];

    const calculateProgressIndex = () => {
        let filledCount = 0;
        if (formData.firstName.length > 2) filledCount++;
        if (formData.lastName.length > 2) filledCount++;
        if (formData.email.includes("@")) filledCount++;
        if (formData.phone.length > 5) filledCount++;
        if (formData.program !== "") filledCount++;

        if (filledCount === 0) return 0;
        if (filledCount <= 2) return 1;
        if (filledCount < 5) return 2;
        return 3;
    };

    const progressLevel = calculateProgressIndex();
    const effectiveStep = Math.max(activeStep, progressLevel);

    const steps = [
        { title: t("step1Title"), desc: t("step1Desc") },
        { title: t("step2Title"), desc: t("step2Desc") },
        { title: t("step3Title"), desc: t("step3Desc") },
        { title: t("step4Title"), desc: t("step4Desc") },
    ];

    const updateField = (field: keyof FormDataState, value: string) => {
        setFormData((current) => ({ ...current, [field]: value }));
        if (formState === "error") {
            setFormState("idle");
            setSubmitError(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormState("submitting");
        setSubmitError(null);

        try {
            const selectedProgram = programOptions.find((option) => option.value === formData.program);
            const response = await fetch("/api/telegram", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    program: selectedProgram?.label ?? formData.program,
                    source: "website_admissions_form",
                }),
            });

            const result = (await response.json()) as { success?: boolean; error?: string };

            if (!response.ok || !result.success) {
                throw new Error(result.error || "Failed to send your inquiry.");
            }

            setFormState("success");
            setFormData({ firstName: "", lastName: "", email: "", phone: "", program: "", message: "" });
            setActiveStep(steps.length - 1);
        } catch (error) {
            setFormState("error");
            setSubmitError(error instanceof Error ? error.message : "Failed to send your inquiry.");
        }
    };

    return (
        <section id="admissions" className="relative overflow-hidden bg-[#0a0f1e] py-28 md:py-40">
            <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-red-600/[0.03] blur-[180px] pointer-events-none" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20 text-center">
                    <span className="mb-8 inline-block rounded-full border border-white/[0.08] bg-white/[0.04] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-white/50 md:text-xs">{t("sectionLabel")}</span>
                    <h2 className="mb-6 font-[family-name:var(--font-outfit)] text-3xl font-black tracking-[-0.02em] text-white sm:text-4xl md:text-5xl lg:text-6xl">{t("title")}</h2>
                    <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/45 md:text-lg">{t("description")}</p>
                </motion.div>

                <div className="mx-auto mb-20 max-w-2xl">
                    <div className="relative">
                        <div className="absolute bottom-3 left-5 top-3 w-0.5 rounded-full bg-white/[0.06]" />
                        <motion.div className="absolute left-5 top-3 w-0.5 origin-top rounded-full bg-gradient-to-b from-red-500 to-red-400" initial={{ height: 0 }} animate={{ height: `${((effectiveStep + 1) / steps.length) * 100}%` }} transition={{ type: "spring", stiffness: 100, damping: 20 }} style={{ maxHeight: "calc(100% - 24px)" }} />

                        {steps.map((step, idx) => {
                            const Icon = STEPS_ICONS[idx];
                            const isActive = idx === effectiveStep;
                            const isCompleted = idx < effectiveStep;

                            return (
                                <motion.div key={step.title} initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.12 }} onClick={() => setActiveStep(idx)} className="group relative flex cursor-pointer items-start gap-6 py-5">
                                    <div className="relative z-10 shrink-0">
                                        <motion.div animate={{ scale: isActive ? 1.08 : 0.86 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-500 ${isActive ? "shadow-[0_0_20px_rgba(239,68,68,0.4)]" : isCompleted ? "border border-red-500/25 bg-red-500/20" : "border border-white/[0.08] bg-white/[0.04]"}`} style={isActive ? { backgroundColor: STEP_COLOR } : undefined}>
                                            {isCompleted ? <Check className="h-4 w-4 text-red-400" /> : <Icon className={`h-5 w-5 ${isActive ? "text-white" : "text-white/30"}`} />}
                                        </motion.div>
                                    </div>
                                    <div className="pt-1.5">
                                        <h4 className={`font-[family-name:var(--font-outfit)] text-base font-bold transition-colors duration-300 md:text-lg ${isActive ? "text-white" : isCompleted ? "text-white/60" : "text-white/35"}`}>{step.title}</h4>
                                        <AnimatePresence>
                                            {isActive && (
                                                <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="mt-2 text-sm leading-relaxed text-white/45">
                                                    {step.desc}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-2xl">
                    <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-8 shadow-[0_8px_40px_rgba(0,0,0,0.15)] md:p-10">
                        <h3 className="mb-2 font-[family-name:var(--font-outfit)] text-2xl font-bold text-white md:text-3xl">{t("formTitle")}</h3>
                        <p className="mb-8 text-sm text-white/35">{t("formDesc")}</p>

                        <AnimatePresence mode="wait">
                            {formState === "success" ? (
                                <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-12 text-center">
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }}>
                                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/15"><Check className="h-8 w-8 text-emerald-400" /></div>
                                    </motion.div>
                                    <p className="text-lg font-medium text-white/60">{t("success")}</p>
                                </motion.div>
                            ) : (
                                <motion.form key="form" onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <FormField label={t("firstName")} type="text" value={formData.firstName} onChange={(value) => updateField("firstName", value)} autoComplete="given-name" required />
                                        <FormField label={t("lastName")} type="text" value={formData.lastName} onChange={(value) => updateField("lastName", value)} autoComplete="family-name" required />
                                    </div>
                                    <FormField label={t("email")} type="email" value={formData.email} onChange={(value) => updateField("email", value)} autoComplete="email" required />
                                    <FormField label={t("phone")} type="tel" value={formData.phone} onChange={(value) => updateField("phone", value)} autoComplete="tel" />
                                    <div>
                                        <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-white/30">{t("program")}</label>
                                        <select required value={formData.program} onChange={(e) => updateField("program", e.target.value)} className="w-full appearance-none rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white transition-all duration-300 hover:border-white/15 hover:bg-white/[0.06] focus:border-red-500/30 focus:outline-none focus:ring-1 focus:ring-red-500/20">
                                            <option value="" className="bg-[#0a0f1e]">-</option>
                                            {programOptions.map((option) => (
                                                <option key={option.value} value={option.value} className="bg-[#0a0f1e]">{option.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-white/30">{t("message")}</label>
                                        <textarea rows={4} value={formData.message} onChange={(e) => updateField("message", e.target.value)} className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white transition-all duration-300 placeholder:text-white/20 hover:border-white/15 hover:bg-white/[0.06] focus:border-red-500/30 focus:outline-none focus:ring-1 focus:ring-red-500/20" />
                                    </div>

                                    {submitError && (
                                        <div className="flex items-start gap-3 rounded-2xl border border-red-500/18 bg-red-500/[0.06] px-4 py-3 text-sm text-red-100/80"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-300" /><span>{submitError}</span></div>
                                    )}

                                    <motion.button type="submit" whileHover={{ scale: 1.02, boxShadow: "0 8px 40px rgba(220,38,38,0.35)" }} whileTap={{ scale: 0.98 }} disabled={formState === "submitting"} className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 to-red-500 py-4 font-bold text-white shadow-[0_8px_30px_rgba(220,38,38,0.25)] transition-all duration-300 disabled:opacity-70">
                                        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                                        <span className="relative flex items-center gap-2">
                                            {formState === "submitting" ? <><Loader2 className="h-5 w-5 animate-spin" />{t("submitting")}</> : <><Send className="h-5 w-5" />{t("submit")}</>}
                                        </span>
                                    </motion.button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function FormField({ label, type, value, onChange, autoComplete, required = false }: { label: string; type: string; value: string; onChange: (value: string) => void; autoComplete?: string; required?: boolean; }) {
    return (
        <div>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-white/30">{label}</label>
            <input type={type} required={required} value={value} autoComplete={autoComplete} onChange={(e) => onChange(e.target.value)} className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white transition-all duration-300 placeholder:text-white/20 hover:border-white/15 hover:bg-white/[0.06] focus:border-red-500/30 focus:outline-none focus:ring-1 focus:ring-red-500/20" />
        </div>
    );
}
