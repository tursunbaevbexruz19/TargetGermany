"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Languages, Briefcase, ArrowRight, CheckCircle2, RotateCcw } from "lucide-react";

type QuizState = "q1" | "q2" | "computing" | "result";

export default function PathwayQuiz({ setActiveTab }: { setActiveTab?: (t: string) => void }) {
    const t = useTranslations("PathwayQuiz");

    const [state, setState] = useState<QuizState>("q1");
    const [germanLevel, setGermanLevel] = useState<string | null>(null);
    const [goal, setGoal] = useState<string | null>(null);

    const handleLevelSelect = (level: string) => {
        setGermanLevel(level);
        setState("q2");
    };

    const handleGoalSelect = (selectedGoal: string) => {
        setGoal(selectedGoal);
        setState("computing");
        setTimeout(() => setState("result"), 2000);
    };

    const resetQuiz = () => {
        setGermanLevel(null);
        setGoal(null);
        setState("q1");
    };

    const getRecommendation = () => {
        if (!germanLevel || !goal) return null;

        let program = "";
        let duration = "";
        let details = "";

        if (goal === "bachelors") {
            if (germanLevel === "none" || germanLevel === "a1" || germanLevel === "a2") {
                program = "Intensive German + Studienkolleg";
                duration = "1.5 - 2 Years";
                details = "Start with our Super-Intensive German Language course to reach B2 level rapidly, followed by our 1-year Studienkolleg to prepare for the Feststellungsprüfung and guarantee your university spot.";
            } else {
                program = "Studienkolleg Direct Entry";
                duration = "1 Year";
                details = "Since you already have strong German skills, you can enter our Studienkolleg directly. Prepare for the FSP exam and transition straight into a German public university.";
            }
        } else if (goal === "masters") {
            if (germanLevel === "none" || germanLevel === "a1" || germanLevel === "a2") {
                program = "Masters Pathway (German Intensive)";
                duration = "9 - 12 Months";
                details = "You need C1 level for most German-taught Masters. Enroll in our Super-Intensive academy from your current level straight through to TestDaF/DSH certification.";
            } else {
                program = "TestDaF/DSH Exam Prep";
                duration = "2 - 3 Months";
                details = "You are almost there. Enroll in our specialized exam preparation course to secure the exact certification your target Masters program requires.";
            }
        } else {
            program = "CEFR Language Academy";
            duration = "Flexible";
            details = "Join our language academy at your current level. Progress through the CEFR levels with our certified native instructors until you reach your personal fluency goals.";
        }

        return { program, duration, details };
    };

    const recommendation = getRecommendation();

    return (
        <section className="py-24 bg-[#0a0f1e] relative overflow-hidden border-y border-white/[0.04]">
            <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-red-600/[0.02] rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12">
                    <span className="inline-block px-5 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase text-white/50 mb-4">{t("sectionLabel")}</span>
                    <h2 className="text-3xl md:text-4xl font-black text-white font-[family-name:var(--font-outfit)]">{t("title")}</h2>
                </div>

                <div className="bg-[#0a0f1e] border border-white/[0.08] rounded-3xl p-6 md:p-10 shadow-[0_8px_40px_rgba(0,0,0,0.3)] relative overflow-hidden min-h-[400px] flex flex-col justify-center">
                    <AnimatePresence mode="wait">
                        {state === "q1" && (
                            <motion.div
                                key="q1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="w-full"
                            >
                                <h3 className="text-2xl font-bold text-white mb-8 text-center">{t("q1")}</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {[
                                        { id: "none", label: t("levelNone") },
                                        { id: "a1", label: "A1" },
                                        { id: "a2", label: "A2" },
                                        { id: "b1", label: "B1+" }
                                    ].map(lvl => (
                                        <button
                                            key={lvl.id}
                                            onClick={() => handleLevelSelect(lvl.id)}
                                            className="py-6 px-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-red-500/30 hover:bg-white/[0.05] transition-all group flex flex-col items-center gap-3"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-white/[0.04] group-hover:bg-red-500/10 flex items-center justify-center transition-colors">
                                                <Languages className="w-5 h-5 text-white/40 group-hover:text-red-400 transition-colors" />
                                            </div>
                                            <span className="text-sm font-semibold text-white/70 group-hover:text-white transition-colors">{lvl.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {state === "q2" && (
                            <motion.div
                                key="q2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="w-full"
                            >
                                <h3 className="text-2xl font-bold text-white mb-8 text-center">{t("q2")}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {[
                                        { id: "bachelors", label: t("goal1"), icon: GraduationCap },
                                        { id: "masters", label: t("goal2"), icon: Briefcase },
                                        { id: "language", label: t("goal3"), icon: Languages }
                                    ].map(g => (
                                        <button
                                            key={g.id}
                                            onClick={() => handleGoalSelect(g.id)}
                                            className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-red-500/30 hover:bg-white/[0.05] transition-all group text-left flex flex-col gap-4"
                                        >
                                            <div className="w-12 h-12 rounded-xl bg-white/[0.04] group-hover:bg-red-500/10 flex items-center justify-center transition-colors">
                                                <g.icon className="w-6 h-6 text-white/40 group-hover:text-red-400 transition-colors" />
                                            </div>
                                            <span className="text-lg font-bold text-white/90 group-hover:text-white transition-colors">{g.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {state === "computing" && (
                            <motion.div
                                key="computing"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.1 }}
                                className="w-full flex flex-col items-center justify-center py-10"
                            >
                                <div className="relative w-20 h-20 mb-6">
                                    <svg className="w-full h-full animate-spin text-red-500/20" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" />
                                    </svg>
                                    <svg className="w-full h-full animate-spin absolute inset-0 text-red-500" viewBox="0 0 100 100" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}>
                                        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="70 200" strokeLinecap="round" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{t("computing")}</h3>
                                <p className="text-white/40 text-sm">{t("computingDesc")}</p>
                            </motion.div>
                        )}

                        {state === "result" && recommendation && (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="w-full"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <CheckCircle2 className="w-8 h-8 text-red-500" />
                                    <h3 className="text-2xl font-bold text-white">{t("resultTitle")}</h3>
                                </div>

                                <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 md:p-8 mb-8">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                        <h4 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 font-[family-name:var(--font-outfit)]">
                                            {recommendation.program}
                                        </h4>
                                        <span className="px-3 py-1 rounded-md bg-white/[0.06] text-xs font-bold text-white/70 uppercase tracking-widest self-start md:self-auto">
                                            Est. {recommendation.duration}
                                        </span>
                                    </div>
                                    <p className="text-white/60 leading-relaxed">
                                        {recommendation.details}
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                                    <button onClick={resetQuiz} className="flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors text-sm font-semibold">
                                        <RotateCcw className="w-4 h-4" /> {t("retake")}
                                    </button>
                                    <button onClick={() => { if (setActiveTab) { setActiveTab('admissions'); return; } document.getElementById('admissions')?.scrollIntoView({ behavior: 'smooth' }); }} className="group px-8 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)] flex items-center gap-2">
                                        {t("applyCta")}
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}

