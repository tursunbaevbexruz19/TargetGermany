"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform, type Variants, AnimatePresence } from "framer-motion";
import { CheckCircle, GraduationCap, Globe2, Calendar, Users, ArrowRight, UserPlus, FileCheck, Search, Send, Sparkles } from "lucide-react";
import React, { useState, useRef } from "react";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    })
};

const timelineSteps = [
    { icon: UserPlus, title: "Initial Inquiry", desc: "Submit your basic information so our admissions team can learn about your child's background and aspirations." },
    { icon: Search, title: "Assessment & Interview", desc: "Selected candidates will be invited for an academic assessment and a personal interview with our academic board." },
    { icon: FileCheck, title: "Document Verification", desc: "Provide necessary academic transcripts, recommendation letters, and standardized test scores if applicable." },
    { icon: Send, title: "Final Decision & Enrollment", desc: "Following a successful review, you will receive an official offer letter and instructions for enrollment." }
];

export default function Admissions() {
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start center", "end center"] });
    const timelineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitted(true); // visually transition to loading/processing state

        const formData = new FormData(e.currentTarget);
        const data = {
            firstName: formData.get('firstName') || '',
            lastName: formData.get('lastName') || '',
            email: formData.get('email') || '',
            phone: formData.get('phone') || '',
            goals: formData.get('goals') || '',
        };

        try {
            const res = await fetch('/api/telegram', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await res.json();

            if (result.success) {
                // Sent successfully via API! Provide success feedback.
                setTimeout(() => {
                    setIsSubmitting(false);
                    setSubmitted(false);
                    (e.target as HTMLFormElement).reset();
                }, 2000);
            } else {
                // If API fails (e.g. no existing active chat ID is known to the bot yet)
                // We show an error or just softly fail so they don't get redirected
                alert("Our Admissions Manager is currently offline. Please try again later or contact us directly!");
                setTimeout(() => {
                    setIsSubmitting(false);
                    setSubmitted(false);
                }, 1000);
            }
        } catch (error) {
            alert("A network error occurred. Please try again later.");
            setTimeout(() => {
                setIsSubmitting(false);
                setSubmitted(false);
            }, 1000);
        }
    };

    const benefits = [
        { icon: GraduationCap, text: "Access to world-class AP & SAT preparation programs" },
        { icon: Globe2, text: "International faculty with Ivy League level certifications" },
        { icon: Calendar, text: "Flexible enrollment pathways for all grade levels 1-11" },
        { icon: Users, text: "Extremely small class sizes ensuring absolute personalization" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full bg-[#050510] text-white overflow-hidden relative"
        >
            {/* Massive Hero */}
            <section className="min-h-[80vh] flex flex-col justify-center items-center px-6 md:px-16 pt-32 pb-16 text-center relative pointer-events-none">
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/5 blur-[200px] rounded-full" />
                <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-emerald-600/5 blur-[200px] rounded-full" />

                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-10 pointer-events-auto flex flex-col items-center"
                >
                    <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-blue-500/20 bg-blue-500/10 backdrop-blur-md mb-8">
                        <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
                        <span className="text-blue-400 text-sm font-bold uppercase tracking-[0.2em]">Germany Campus · Fall 2026</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl lg:text-7xl font-black tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
                        Join Target <br /> International School
                    </h1>
                    <p className="text-xl md:text-3xl text-white/50 font-medium max-w-3xl mx-auto leading-relaxed">
                        Admissions for the highly anticipated Germany campus will open soon. Prepare your application.
                    </p>
                </motion.div>
            </section>

            {/* Benefits & Pre-requisites */}
            <section className="py-24 px-6 md:px-16 relative">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-8">
                    {benefits.map((benefit, i) => (
                        <motion.div
                            key={i}
                            custom={i}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="group relative flex flex-col items-start p-10 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-blue-500/20 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all duration-500 relative z-10">
                                <benefit.icon className="w-8 h-8 text-blue-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2 leading-snug relative z-10">{benefit.text}</h3>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Process Timeline */}
            <section className="py-32 px-6 md:px-16 relative" ref={containerRef}>
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-24"
                    >
                        <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">Admission Process</h2>
                        <p className="text-xl md:text-2xl text-white/40 font-medium">Our rigorous and selective 4-step pathway.</p>
                    </motion.div>

                    <div className="relative pl-8 md:pl-0">
                        {/* Timeline line */}
                        <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-1 bg-white/5 md:-translate-x-1/2 rounded-full" />
                        <motion.div
                            className="absolute left-[39px] md:left-1/2 top-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-rose-500 md:-translate-x-1/2 origin-top rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                            style={{ height: timelineHeight }}
                        />

                        {timelineSteps.map((step, i) => (
                            <motion.div
                                key={i}
                                custom={i}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-150px" }}
                                className={`relative flex flex-col md:flex-row items-center justify-between mb-16 md:mb-32 last:mb-0 group ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                            >
                                <div className="absolute left-[-49px] md:left-1/2 md:-translate-x-1/2 w-16 h-16 rounded-full bg-[#050510] border-4 border-[#050510] flex items-center justify-center z-10">
                                    <div className="w-full h-full rounded-full bg-white/5 border border-white/20 flex items-center justify-center text-white/50 group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-400 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] group-hover:scale-110 transition-all duration-500">
                                        <step.icon className="w-6 h-6" />
                                    </div>
                                </div>
                                <div className={`w-full md:w-[45%] ${i % 2 === 0 ? 'md:text-left md:pl-16' : 'md:text-right md:pr-16'} transition-transform duration-500 group-hover:-translate-y-2`}>
                                    <h4 className="text-xl md:text-3xl font-black text-white mb-4 tracking-tight group-hover:text-blue-400 transition-colors duration-300">0{i + 1}. {step.title}</h4>
                                    <p className="text-lg text-white/50 leading-relaxed font-medium">{step.desc}</p>
                                </div>
                                <div className="hidden md:block w-[45%]" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Premium Application Form */}
            <section className="py-32 px-6 md:px-16" id="apply">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="relative rounded-[3rem] border border-white/10 bg-[#080812]/50 p-8 md:p-16 backdrop-blur-2xl shadow-2xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/5 pointer-events-none" />

                        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none opacity-50" />
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 blur-[100px] rounded-full pointer-events-none opacity-50" />

                        <div className="relative z-10 text-center mb-16">
                            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">
                                Express Your Interest
                            </h2>
                            <p className="text-xl text-white/50 max-w-2xl mx-auto font-medium">
                                Direct your inquiry automatically to our Telegram Admissions Manager.
                            </p>
                        </div>

                        <form className="relative z-10 space-y-8" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="relative group">
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        required
                                        className="peer w-full bg-white/5 border border-white/10 rounded-2xl px-6 pt-8 pb-3 text-white text-lg placeholder-transparent focus:outline-none focus:border-blue-500 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300"
                                        placeholder="First Name"
                                    />
                                    <label htmlFor="firstName" className="absolute left-6 top-5 text-white/40 text-sm font-bold uppercase tracking-widest transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-6 peer-placeholder-shown:normal-case peer-focus:text-xs peer-focus:top-3 peer-focus:text-blue-400 peer-focus:uppercase peer-focus:tracking-widest cursor-text pointer-events-none">
                                        First Name
                                    </label>
                                </div>
                                <div className="relative group">
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        required
                                        className="peer w-full bg-white/5 border border-white/10 rounded-2xl px-6 pt-8 pb-3 text-white text-lg placeholder-transparent focus:outline-none focus:border-blue-500 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300"
                                        placeholder="Last Name"
                                    />
                                    <label htmlFor="lastName" className="absolute left-6 top-5 text-white/40 text-sm font-bold uppercase tracking-widest transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-6 peer-placeholder-shown:normal-case peer-focus:text-xs peer-focus:top-3 peer-focus:text-blue-400 peer-focus:uppercase peer-focus:tracking-widest cursor-text pointer-events-none">
                                        Last Name
                                    </label>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="relative group">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        className="peer w-full bg-white/5 border border-white/10 rounded-2xl px-6 pt-8 pb-3 text-white text-lg placeholder-transparent focus:outline-none focus:border-blue-500 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300"
                                        placeholder="Email Address"
                                    />
                                    <label htmlFor="email" className="absolute left-6 top-5 text-white/40 text-sm font-bold uppercase tracking-widest transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-6 peer-placeholder-shown:normal-case peer-focus:text-xs peer-focus:top-3 peer-focus:text-blue-400 peer-focus:uppercase peer-focus:tracking-widest cursor-text pointer-events-none">
                                        Email Address
                                    </label>
                                </div>
                                <div className="relative group">
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        className="peer w-full bg-white/5 border border-white/10 rounded-2xl px-6 pt-8 pb-3 text-white text-lg placeholder-transparent focus:outline-none focus:border-blue-500 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300"
                                        placeholder="Phone Number"
                                    />
                                    <label htmlFor="phone" className="absolute left-6 top-5 text-white/40 text-sm font-bold uppercase tracking-widest transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-6 peer-placeholder-shown:normal-case peer-focus:text-xs peer-focus:top-3 peer-focus:text-blue-400 peer-focus:uppercase peer-focus:tracking-widest cursor-text pointer-events-none">
                                        Phone Number (Optional)
                                    </label>
                                </div>
                            </div>

                            <div className="relative group">
                                <textarea
                                    id="goals"
                                    name="goals"
                                    rows={5}
                                    className="peer w-full bg-white/5 border border-white/10 rounded-2xl px-6 pt-10 pb-4 text-white text-lg placeholder-transparent focus:outline-none focus:border-blue-500 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300 resize-none"
                                    placeholder="Tell Us Your Goals"
                                />
                                <label htmlFor="goals" className="absolute left-6 top-5 text-white/40 text-sm font-bold uppercase tracking-widest transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-8 peer-placeholder-shown:normal-case peer-focus:text-xs peer-focus:top-4 peer-focus:text-blue-400 peer-focus:uppercase peer-focus:tracking-widest cursor-text pointer-events-none">
                                    Tell Us Your Goals
                                </label>
                            </div>

                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`w-full font-bold text-xl py-6 rounded-2xl transition-all duration-500 flex items-center justify-center gap-3 overflow-hidden relative ${submitted
                                    ? 'bg-[#2AABEE] text-white shadow-[0_0_60px_rgba(42,171,238,0.5)] border border-[#2AABEE]'
                                    : 'bg-white text-black hover:bg-blue-50 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)]'
                                    }`}
                            >
                                <AnimatePresence mode="wait">
                                    {submitted ? (
                                        <motion.div
                                            key="success"
                                            initial={{ scale: 0.5, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0.5, opacity: 0 }}
                                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                            className="flex items-center gap-3"
                                        >
                                            <CheckCircle className="w-7 h-7" /> Application Sent!
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="submit"
                                            initial={{ scale: 0.5, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0.5, opacity: 0 }}
                                            className="flex items-center gap-3 relative z-10"
                                        >
                                            Submit Application <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        </form>
                    </div>
                </motion.div>
            </section>
        </motion.div>
    );
}
