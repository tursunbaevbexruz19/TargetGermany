"use client";

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';

const Stats = dynamic(() => import('@/components/Stats'), { ssr: false });
const Academics = dynamic(() => import('@/components/Academics'), { ssr: false });
const About = dynamic(() => import('@/components/About'), { ssr: false });
const Curriculum = dynamic(() => import('@/components/Curriculum'), { ssr: false });
const Results = dynamic(() => import('@/components/Results'), { ssr: false });
const CampusLife = dynamic(() => import('@/components/CampusLife'), { ssr: false });
const Admissions = dynamic(() => import('@/components/Admissions'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <motion.div key="home" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
            <Hero />
            <Stats />
          </motion.div>
        );
      case 'about':
        return <About key="about" />;
      case 'academics':
        return (
          <motion.div key="academics" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
            <Academics />
          </motion.div>
        );
      case 'curriculum':
        return <Curriculum key="curriculum" />;
      case 'results':
        return <Results key="results" />;
      case 'campus':
        return <CampusLife key="campus" />;
      case 'admissions':
        return <Admissions key="admissions" />;
      default:
        return null;
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-x-hidden bg-[#050510] relative">
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
