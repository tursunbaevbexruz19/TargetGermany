"use client";

import { useTranslations } from "next-intl";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Users, Building2, GraduationCap, Award } from "lucide-react";

export default function Stats() {
    const t = useTranslations("Stats");

    const stats = [
        { id: 1, name: t("students"), value: 12000, suffix: "+", icon: Users },
        { id: 2, name: t("branches"), value: 5, suffix: "", icon: Building2 },
        { id: 3, name: t("acceptances"), value: 95, suffix: "%", icon: GraduationCap },
        { id: 4, name: t("years"), value: 20, suffix: "+", icon: Award },
    ];

    return (
        <section className="py-20 md:py-28 bg-[#050510] relative z-20 overflow-hidden">
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                    {stats.map((stat, index) => (
                        <TiltCard key={stat.id}>
                            <StatCard stat={stat} index={index} />
                        </TiltCard>
                    ))}
                </div>
            </div>
        </section>
    );
}

function TiltCard({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set(e.clientX / rect.width - 0.5);
        y.set(e.clientY / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="w-full relative [perspective:1000px] group"
        >
            {children}
        </motion.div>
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function StatCard({ stat, index }: { stat: any; index: number }) {
    const [count, setCount] = useState(0);
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    useEffect(() => {
        let startTime: number | null = null;
        let animationFrame: number;
        const duration = 2000;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);
            const easing = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
            setCount(Math.floor(easing * stat.value));

            if (progress < duration) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    animationFrame = requestAnimationFrame(animate);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        if (cardRef.current) observer.observe(cardRef.current);

        return () => {
            if (animationFrame) cancelAnimationFrame(animationFrame);
            observer.disconnect();
        };
    }, [stat.value]);

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative flex flex-col items-center justify-center py-8 px-4 md:py-12 md:px-6 rounded-2xl md:rounded-3xl bg-white/[0.03] border border-white/[0.06] hover:bg-[#0a0f1e] hover:border-red-500/20 transition-all duration-500 hover:shadow-[0_10px_30px_rgba(239,68,68,0.15)] overflow-hidden"
        >
            <motion.div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 mix-blend-screen"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            300px circle at ${mouseX}px ${mouseY}px,
                            rgba(239, 68, 68, 0.15),
                            transparent 80%
                        )
                    `
                }}
            />

            <div className="relative z-10 flex flex-col items-center pointer-events-none">
                <div className="mb-4 md:mb-6 p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/5 border border-white/[0.06] group-hover:bg-red-500/10 group-hover:border-red-500/20 group-hover:scale-110 transition-all duration-300 pointer-events-auto">
                    <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-white/60 group-hover:text-red-400 transition-colors" />
                </div>

                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter mb-2 md:mb-3 flex items-baseline justify-center tabular-nums group-hover:text-red-400 transition-colors">
                    {count.toLocaleString()}
                    <span className="text-white/40 text-xl sm:text-2xl md:text-3xl ml-0.5">{stat.suffix}</span>
                </div>

                <div className="text-[10px] sm:text-xs md:text-sm text-white/40 font-semibold uppercase tracking-[0.15em] md:tracking-[0.2em] text-center leading-tight">
                    {stat.name}
                </div>
            </div>
        </motion.div>
    );
}

