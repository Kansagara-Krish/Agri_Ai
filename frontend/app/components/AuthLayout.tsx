"use client";

import React, { ReactNode, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Leaf, Brain, LineChart } from "lucide-react";
import Image from "next/image";

interface AuthLayoutProps {
  children: ReactNode;
}

function AnimatedCounter({ value }: { value: string }) {
  const [displayValue, setDisplayValue] = useState("0");
  
  useEffect(() => {
    if (value === "24/7") {
      let start = 0;
      const interval = setInterval(() => {
        start += 1;
        if (start >= 24) {
          clearInterval(interval);
          setDisplayValue("24/7");
        } else {
          setDisplayValue(`${start}/7`);
        }
      }, 40);
      return () => clearInterval(interval);
    } else {
      const target = parseInt(value.replace(/[^0-9]/g, ""), 10);
      const suffix = value.replace(/[0-9]/g, "");
      let start = 0;
      const step = Math.max(1, Math.ceil(target / 30));
      const interval = setInterval(() => {
        start += step;
        if (start >= target) {
          clearInterval(interval);
          setDisplayValue(value);
        } else {
          setDisplayValue(`${start}${suffix}`);
        }
      }, 40);
      return () => clearInterval(interval);
    }
  }, [value]);

  return <span>{displayValue}</span>;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  // Client-side hydration flag
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Mouse positions for parallax
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX - window.innerWidth / 2) / 45,
        y: (e.clientY - window.innerHeight / 2) / 45,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAF8] flex selection:bg-[#4CAF50]/30 selection:text-[#1B5E20] overflow-hidden relative font-body">
      
      {/* BACKGROUND LAYERS */}
      
      {/* Layer 1: Soft green radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(76,175,80,0.06),_transparent_45%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(27,94,32,0.04),_transparent_50%)] pointer-events-none" />
      
      {/* Layer 2: Glass Circles (Background Orbs) with Mouse Parallax */}
      <motion.div 
        style={{ x: mousePos.x * 0.5, y: mousePos.y * 0.5 }}
        className="absolute top-[15%] left-[5%] w-[450px] h-[450px] bg-gradient-to-tr from-[#4CAF50]/8 to-[#1B5E20]/3 rounded-full blur-[100px] pointer-events-none" 
      />
      <motion.div 
        style={{ x: -mousePos.x * 0.4, y: -mousePos.y * 0.4 }}
        className="absolute bottom-[10%] left-[35%] w-[350px] h-[350px] bg-[#4CAF50]/5 rounded-full blur-[80px] pointer-events-none" 
      />
      <div className="absolute top-[5%] right-[5%] w-[600px] h-[600px] bg-white/60 rounded-full blur-[120px] pointer-events-none" />

      {/* Layer 4: AI Grid lines (2% opacity) */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(to right, #1B5E20 1px, transparent 1px), linear-gradient(to bottom, #1B5E20 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }}
      />

      {/* Concentric AI Orbit Lines (centered near sprout) */}
      <div className="absolute top-1/2 -translate-y-1/2 left-[25%] w-[900px] h-[900px] pointer-events-none opacity-[0.08] z-0 hidden lg:block">
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#4CAF50]">
          <circle cx="50" cy="50" r="12" fill="none" stroke="currentColor" strokeWidth="0.08" strokeDasharray="1 1.5" />
          <circle cx="50" cy="50" r="22" fill="none" stroke="currentColor" strokeWidth="0.06" />
          <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth="0.1" strokeDasharray="2 1.5" />
          <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="0.05" />
        </svg>
      </div>

      {/* Large Blurred Foreground / Background Leaf SVGs (Mockup Theme Leaf Framing) */}
      <div className="absolute -bottom-10 -left-10 w-48 h-48 pointer-events-none opacity-70 blur-[3px] rotate-[15deg] z-40 hidden lg:block">
        <svg viewBox="0 0 100 100" className="w-full h-full text-green-700 fill-green-800/10">
          <path d="M10,90 Q40,30 90,10 Q80,70 10,90 Z" />
          <path d="M10,90 Q50,50 90,10" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
      <div className="absolute -bottom-14 -right-14 w-56 h-56 pointer-events-none opacity-75 blur-[4px] -rotate-[45deg] z-40 hidden lg:block">
        <svg viewBox="0 0 100 100" className="w-full h-full text-green-600 fill-green-700/10">
          <path d="M10,90 Q40,30 90,10 Q80,70 10,90 Z" />
          <path d="M10,90 Q50,50 90,10" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
      <div className="absolute -top-20 -right-20 w-64 h-64 pointer-events-none opacity-60 blur-[5px] rotate-[110deg] z-40 hidden lg:block">
        <svg viewBox="0 0 100 100" className="w-full h-full text-green-600 fill-green-700/5">
          <path d="M10,90 Q40,30 90,10 Q80,70 10,90 Z" />
          <path d="M10,90 Q50,50 90,10" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Layer 5: Tiny glowing particles floating (Client-only to avoid SSR hydration mismatch) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {isMounted && [...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#4CAF50]/30 blur-[1px]"
            style={{
              width: Math.random() * 6 + 4 + "px",
              height: Math.random() * 6 + 4 + "px",
              left: Math.random() * 80 + 10 + "%",
              top: Math.random() * 80 + 10 + "%",
            }}
            animate={{
              y: [0, -60, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 8 + Math.random() * 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 4,
            }}
          />
        ))}
      </div>

      {/* LEFT SIDE (Visual Story Section) - Split 60% */}
      <div className="hidden lg:flex lg:w-[60%] relative flex-col justify-between p-16 xl:p-20 z-10">
        
        {/* Header Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-11 h-11 bg-gradient-to-br from-[#1B5E20] to-[#4CAF50] rounded-2xl flex items-center justify-center shadow-md shadow-green-900/10 border border-white/20">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <span className="font-headline text-2xl font-black text-[#1B5E20] tracking-tight">AgriAI</span>
        </div>

        {/* Main Content Container - Side-by-side Grid to prevent image overlap */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative my-auto w-full">
          <div className="col-span-1 lg:col-span-7 relative z-20">
            
            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-6"
            >
              <h1 className="text-6xl xl:text-[72px] font-headline font-extrabold text-[#0F172A] leading-[1.05] tracking-tight mb-2">
                Grow Smarter.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B5E20] to-[#4CAF50]">
                  Predict Better.
                </span>
              </h1>
              {/* Soft decorative green accent line */}
              <div className="w-12 h-1 bg-[#4CAF50] rounded-full mt-4" />
            </motion.div>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg xl:text-xl text-slate-500 mb-10 leading-relaxed max-w-[520px] font-medium"
            >
              AI-powered crop monitoring, soil insights and disease prediction.
            </motion.p>

            {/* Feature Pills - Redesigned as Premium Vertical Cards to match theme */}
            <div className="flex gap-4 mb-10">
              {[
                { icon: Leaf, text: "Crop Monitoring", color: "text-[#1B5E20]", bg: "bg-[#1B5E20]/8" },
                { icon: Brain, text: "AI Prediction", color: "text-blue-500", bg: "bg-blue-500/8" },
                { icon: LineChart, text: "Smart Analytics", color: "text-purple-500", bg: "bg-purple-500/8" }
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1, duration: 0.5 }}
                  whileHover={{ y: -4 }}
                  className="flex flex-col items-center justify-center text-center w-28 h-24 bg-white/70 backdrop-blur-md rounded-2xl border border-slate-100 shadow-[0_4px_12px_rgba(15,23,42,0.02)] transition-shadow duration-300 cursor-default"
                >
                  <div className={`p-2 rounded-xl ${feature.bg} mb-2`}>
                    <feature.icon className={`w-5 h-5 ${feature.color}`} />
                  </div>
                  <span className="text-[11px] font-bold text-slate-700">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Premium Floating Hero Image Section (Relative inside the grid column to prevent overlap) */}
          <div className="col-span-1 lg:col-span-5 relative pointer-events-auto z-10 flex items-center justify-center w-full">
            
            {/* Parallax Container */}
            <motion.div
              style={{ x: mousePos.x, y: mousePos.y }}
              className="relative w-full aspect-square max-w-[420px] xl:max-w-[480px] flex items-center justify-center"
            >
              {/* Glass Halo / Radial Glow Backplate */}
              <div 
                className="absolute w-[95%] h-[95%] rounded-full opacity-80 mix-blend-multiply filter blur-[60px]"
                style={{
                  background: "radial-gradient(circle, rgba(76,175,80,0.18) 0%, rgba(27,94,32,0.06) 50%, transparent 70%)"
                }}
              />
              
              {/* Central Soft White/Glass Circle Backplate */}
              <div className="absolute w-[80%] h-[80%] rounded-full bg-gradient-to-b from-white/75 to-white/10 backdrop-blur-sm border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.02)]" />
              
              {/* 3D Transform Sprout Image Wrapper */}
              <motion.div
                animate={{ y: [-12, 12, -12] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.03, y: -16 }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative w-[75%] h-[75%] transition-transform duration-600 ease-[0.16,1,0.3,1] cursor-pointer"
              >
                <div 
                  style={{ transform: "perspective(1000px) rotateY(-8deg)" }}
                  className="w-full h-full relative"
                >
                  <Image 
                    src="/auth-sprout.png" 
                    alt="AgriAI Premium 3D Sprout" 
                    fill 
                    className="object-contain drop-shadow-[0_25px_40px_rgba(27,94,32,0.15)]"
                    priority
                  />
                </div>
              </motion.div>

              {/* Floating Leaf Particles / Layers */}
              <motion.div 
                animate={{ y: [-15, 15], rotate: [0, 20] }} 
                transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }} 
                className="absolute top-[18%] right-[10%] w-10 h-10 pointer-events-none opacity-80"
              >
                <Leaf className="w-5 h-5 text-[#4CAF50] fill-[#4CAF50]/20 rotate-[35deg]" />
              </motion.div>
              <motion.div 
                animate={{ y: [15, -15], rotate: [0, -15] }} 
                transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }} 
                className="absolute bottom-[20%] left-[8%] w-8 h-8 pointer-events-none opacity-60"
              >
                <Leaf className="w-4 h-4 text-[#1B5E20] fill-[#1B5E20]/20 -rotate-[15deg]" />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Trust Section - Redesigned as grouped rounded pill cards */}
        <div className="flex flex-col gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex items-center gap-4 bg-white/40 backdrop-blur-md p-3.5 rounded-[24px] border border-white/60 shadow-[0_8px_32px_rgba(15,23,42,0.02)] max-w-xl z-20 relative"
          >
            {[
              { value: "50K+", label: "Analyses", icon: Leaf, color: "text-green-600", bg: "bg-green-50" },
              { value: "98%", label: "Accuracy", icon: Brain, color: "text-blue-500", bg: "bg-blue-50" },
              { value: "24/7", label: "Insights", icon: LineChart, color: "text-amber-500", bg: "bg-amber-50" }
            ].map((stat, idx) => (
              <div key={idx} className="flex-1 flex items-center gap-3 bg-white/90 p-3 rounded-2xl border border-slate-50 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                <div className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center flex-shrink-0`}>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <div>
                  <div className="text-base font-black text-[#0F172A] tracking-tight leading-none mb-1">
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Secure Reliable Intelligent Footer */}
          <div className="flex items-center gap-4 text-xs font-bold text-slate-400/80 mt-2 pl-2">
            <span>🔒 Secure</span>
            <span>•</span>
            <span>Reliable</span>
            <span>•</span>
            <span>Intelligent</span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE (Form Card Section) - Split 40% */}
      <div className="w-full lg:w-[40%] flex flex-col justify-center items-center p-6 sm:p-12 z-20 relative">
        {/* Mobile Logo Header */}
        <div className="lg:hidden flex items-center gap-2.5 mb-10">
          <div className="w-9 h-9 bg-gradient-to-br from-[#1B5E20] to-[#4CAF50] rounded-xl flex items-center justify-center shadow-md shadow-green-900/10">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <span className="font-headline text-xl font-black text-[#1B5E20] tracking-tight">AgriAI</span>
        </div>

        {children}
      </div>
    </div>
  );
}
