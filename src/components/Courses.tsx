"use client";

import { useTranslations } from "next-intl";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Calculator, FlaskConical, Globe2, BookOpenCheck } from "lucide-react";
import React, { useRef } from "react";

export default function Courses() {
    const t = useTranslations("Courses");

    const courses = [
        {
            icon: Calculator,
            title: t("math"),
            description: t("mathDesc"),
            gradient: "from-blue-500/20 to-cyan-500/20",
            iconColor: "text-blue-400"
        },
        {
            icon: FlaskConical,
            title: t("science"),
            description: t("scienceDesc"),
            gradient: "from-purple-500/20 to-fuchsia-500/20",
            iconColor: "text-purple-400"
        },
        {
            icon: Globe2,
            title: t("humanities"),
            description: t("humanitiesDesc"),
            gradient: "from-emerald-500/20 to-teal-500/20",
            iconColor: "text-emerald-400"
        },
        {
            icon: BookOpenCheck,
            title: t("testPrep"),
            description: t("testPrepDesc"),
            gradient: "from-amber-500/20 to-orange-500/20",
            iconColor: "text-amber-400"
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full min-h-screen pt-32 pb-20 bg-[#050510] relative overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20 max-w-4xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 tracking-tight mb-6"
                    >
                        {t("title")}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-xl text-white/60 leading-relaxed font-medium"
                    >
                        {t("description")}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {courses.map((course, idx) => (
                        <CourseCard key={idx} course={course} index={idx} />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

function CourseCard({ course, index }: { course: any, index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / rect.width - 0.5;
        const yPct = mouseY / rect.height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: 1000 }}
            className="relative group w-full h-full"
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className={`h-full p-8 md:p-10 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-xl shadow-xl transition-colors duration-300 group-hover:bg-white/10`}
            >
                <div style={{ transform: "translateZ(50px)" }} className="relative z-10">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${course.gradient} flex items-center justify-center mb-8 border border-white/20`}>
                        <course.icon className={`w-8 h-8 ${course.iconColor}`} />
                    </div>

                    <h3 className="text-3xl font-bold text-white mb-4 tracking-wide">{course.title}</h3>

                    <p className="text-white/60 leading-relaxed text-lg font-medium">
                        {course.description}
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
}
