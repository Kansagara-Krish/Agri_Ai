"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { Leaf, Brain, LineChart } from "lucide-react";
import Image from "next/image";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F8FAF8] flex selection:bg-[#4CAF50]/30 selection:text-[#1B5E20] overflow-hidden relative font-body">
      {/* BACKGROUND LAYERS */}
      
      {/* Layer 1: Very soft green radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#4CAF50]/5 via-[#F8FAF8] to-[#F8FAF8]" />
      
      {/* Layer 4: Light grid pattern at 2% opacity (using a CSS pattern to avoid missing asset) */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}
      />

      {/* Layer 5: Very subtle animated lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ y: [0, -1000] }} 
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="absolute left-[10%] w-[1px] h-[1000px] bg-gradient-to-b from-transparent via-[#4CAF50]/10 to-transparent"
        />
        <motion.div 
          animate={{ y: [-1000, 0] }} 
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="absolute left-[30%] w-[1px] h-[1000px] bg-gradient-to-b from-transparent via-[#4CAF50]/5 to-transparent"
        />
      </div>

      {/* Layer 3 & Layer 2: Blur circles & Orbs */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#4CAF50]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-[#1B5E20]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* LEFT SIDE (Visual Story Section) - Split 60% */}
      <div className="hidden lg:flex lg:w-[60%] relative flex-col justify-between p-16 z-10">
        
        {/* Header Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-[#1B5E20] to-[#4CAF50] rounded-xl flex items-center justify-center shadow-lg shadow-green-900/20">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <span className="font-headline text-2xl font-bold text-[#1B5E20] tracking-tight">AgriAI</span>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-xl relative z-20"
          >
            <h1 className="text-6xl font-headline font-bold text-[#0F172A] leading-[1.1] mb-6">
              Grow Smarter.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B5E20] to-[#4CAF50]">Predict Better.</span>
            </h1>
            <p className="text-xl text-[#64748B] mb-12 leading-relaxed max-w-md font-medium">
              AI-powered crop monitoring, soil insights and disease prediction.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-4 mb-16">
              {[
                { icon: Leaf, text: "Crop Monitoring", color: "text-green-700", bg: "bg-green-100" },
                { icon: Brain, text: "AI Prediction", color: "text-blue-700", bg: "bg-blue-100" },
                { icon: LineChart, text: "Smart Analytics", color: "text-purple-700", bg: "bg-purple-100" }
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md rounded-full border border-white/80 shadow-sm"
                >
                  <div className={`p-1 rounded-full ${feature.bg}`}>
                    <feature.icon className={`w-3.5 h-3.5 ${feature.color}`} />
                  </div>
                  <span className="text-sm font-bold text-[#0F172A]">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Floating Illustration */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-[550px] h-[550px] pointer-events-none z-10"
          >
            <motion.div
              animate={{ y: [-15, 15, -15] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full h-full"
            >
              {/* Blur behind image */}
              <div className="absolute inset-0 bg-[#4CAF50]/15 rounded-full blur-[80px] scale-75" />
              <Image 
                src="/auth-sprout.png" 
                alt="AgriAI AI Agriculture Sprout" 
                fill 
                className="object-contain drop-shadow-2xl"
                priority
              />
              
              {/* Floating Leaf Particles */}
              <motion.div animate={{ y: [-20, 20], x: [-10, 10], rotate: [0, 15] }} transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }} className="absolute top-20 right-24 w-4 h-4 bg-[#4CAF50] rounded-tl-full rounded-br-full opacity-60 blur-[1px]" />
              <motion.div animate={{ y: [30, -30], x: [15, -15], rotate: [0, -25] }} transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }} className="absolute bottom-32 left-16 w-6 h-6 bg-[#1B5E20] rounded-tl-full rounded-br-full opacity-40 blur-[2px]" />
              <motion.div animate={{ y: [-15, 15], x: [10, -10], rotate: [0, 45] }} transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }} className="absolute top-1/3 left-10 w-3 h-3 bg-[#4CAF50] rounded-tl-full rounded-br-full opacity-50 blur-[1px]" />
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Trust Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center gap-12 border-t border-slate-200/50 pt-8 mt-auto z-20 relative"
        >
          {[
            { value: "50K+", label: "Analyses" },
            { value: "98%", label: "Accuracy" },
            { value: "24/7", label: "Insights" }
          ].map((stat, idx) => (
            <div key={idx}>
              <div className="text-2xl font-headline font-bold text-[#0F172A]">{stat.value}</div>
              <div className="text-sm font-semibold text-[#64748B]">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* RIGHT SIDE (Form Section) - Split 40% */}
      <div className="w-full lg:w-[40%] flex flex-col justify-center items-center p-6 sm:p-12 z-20 relative">
        {/* Mobile Logo Header */}
        <div className="lg:hidden flex items-center gap-2 mb-10">
          <div className="w-8 h-8 bg-gradient-to-br from-[#1B5E20] to-[#4CAF50] rounded-lg flex items-center justify-center shadow-md">
            <Leaf className="w-4 h-4 text-white" />
          </div>
          <span className="font-headline text-xl font-bold text-[#1B5E20] tracking-tight">AgriAI</span>
        </div>

        {children}
      </div>
    </div>
  );
}
