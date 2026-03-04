"use client";

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';

const About = dynamic(() => import('@/components/About'), { ssr: false });
const Programs = dynamic(() => import('@/components/Programs'), { ssr: false });
const GermanCourses = dynamic(() => import('@/components/GermanCourses'), { ssr: false });
const Opportunities = dynamic(() => import('@/components/Opportunities'), { ssr: false });
const CampusLife = dynamic(() => import('@/components/CampusLife'), { ssr: false });
const Admissions = dynamic(() => import('@/components/Admissions'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });

const pageVariants = {
  initial: { opacity: 0, y: 20, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -15, filter: "blur(4px)" },
};

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <motion.div key="home" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}>
            <Hero />
            <About />
          </motion.div>
        );
      case 'about':
        return (
          <motion.div key="about" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}>
            <About />
          </motion.div>
        );
      case 'programs':
        return (
          <motion.div key="programs" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}>
            <Programs />
          </motion.div>
        );
      case 'german':
        return (
          <motion.div key="german" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}>
            <GermanCourses />
          </motion.div>
        );
      case 'opportunities':
        return (
          <motion.div key="opportunities" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}>
            <Opportunities />
          </motion.div>
        );
      case 'campus':
        return (
          <motion.div key="campus" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}>
            <CampusLife />
          </motion.div>
        );
      case 'admissions':
        return (
          <motion.div key="admissions" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}>
            <Admissions />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-x-hidden bg-[#0a0f1e] relative">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="w-full flex-grow pt-24 min-h-screen flex flex-col justify-between relative z-10">
        <div className="flex-grow">
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </div>

        <Footer setActiveTab={setActiveTab} />
      </div>
    </main>
  );
}
