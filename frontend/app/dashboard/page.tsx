"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { createClient } from "@/utils/supabase/client";
import { Calendar, Download, TrendingUp, AlertTriangle, Droplets, Sun, CloudRain, Bug, FlaskConical, Camera, Lightbulb, PlayCircle, BarChart3, UploadCloud, FileSpreadsheet, Map, CheckCircle2, Circle, Leaf } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

function AnalyticsDashboard({ data }: { data: any }) {
  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="font-headline text-3xl font-extrabold text-slate-900 tracking-tight mb-1">Farm Overview</h2>
          <p className="font-label text-sm text-slate-500">Real-time intelligence for Sector 7-B Greenhouse</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-outline-variant text-slate-700 font-label text-sm font-semibold hover:bg-slate-50 transition-colors">
            <Calendar className="w-4 h-4" />
            Last 30 Days
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#164e28] text-white font-label text-sm font-semibold shadow-md shadow-primary/10 hover:bg-[#1b6332] transition-colors">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-surface rounded-2xl p-6 shadow-sm border border-outline-variant/40 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-label text-xs font-bold text-slate-500 uppercase tracking-widest">Predicted Yield</h3>
            <div className="w-8 h-8 rounded-lg bg-[#e8f5e9] flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-[#10b981]" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="font-headline text-4xl font-extrabold text-slate-900">{data?.predicted_yield || "84.2"}</span>
              <span className="text-slate-500 font-medium">tons</span>
            </div>
            <p className="font-label text-xs font-bold text-[#10b981] mt-2">↑ +12% vs last harvest</p>
          </div>
        </div>

        <div className="bg-surface rounded-2xl p-6 shadow-sm border border-outline-variant/40 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-label text-xs font-bold text-slate-500 uppercase tracking-widest">Risk Score</h3>
            <div className="w-8 h-8 rounded-lg bg-[#fee2e2] flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-[#ef4444]" />
            </div>
          </div>
          <div>
            <div className="font-headline text-4xl font-extrabold text-slate-900">{data?.risk_score || "Low"}</div>
            <div className="mt-4 w-full h-1.5 bg-slate-100 rounded-full flex overflow-hidden">
              <div className={`h-full ${data?.risk_score === 'Low' ? 'bg-[#a3e635]' : 'bg-[#f59e0b]'} w-[25%]`}></div>
            </div>
          </div>
        </div>

        <div className="bg-surface rounded-2xl p-6 shadow-sm border border-outline-variant/40 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-label text-xs font-bold text-slate-500 uppercase tracking-widest">Soil Health</h3>
            <div className="w-8 h-8 rounded-lg bg-[#fef3c7] flex items-center justify-center">
              <Droplets className="w-4 h-4 text-[#d97706]" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="font-headline text-4xl font-extrabold text-slate-900">{data?.soil_health || 92}</span>
              <span className="text-slate-400 font-medium">/100</span>
            </div>
            <p className="font-label text-xs text-slate-500 mt-2">Optimum Nitrogen Levels</p>
          </div>
        </div>

        <div className="bg-[#3a6111] rounded-2xl p-6 shadow-sm text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <h3 className="font-label text-xs font-bold text-white/80 uppercase tracking-widest">Local Weather</h3>
            <Sun className="w-6 h-6 text-white" />
          </div>
          <div className="relative z-10">
            <div className="font-headline text-4xl font-extrabold">{data?.temperature || 24}°C</div>
            <p className="font-label text-xs text-white/80 mt-2">Humidity {data?.humidity || 84}% • Winds {data?.wind_speed || 12}km/h</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-surface rounded-2xl p-6 shadow-sm border border-outline-variant/40">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="font-headline text-lg font-bold text-slate-900">Yield Trends</h3>
              <p className="font-label text-xs text-slate-500">Annual production analytics (kg/m²)</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-label text-slate-600">
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#1b432a]"></div>Current</div>
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#e8f5e9]"></div>Projected</div>
            </div>
          </div>
          
          <div className="h-48 w-full flex items-end justify-between px-2 gap-4">
            {[
              { label: 'JAN', current: 30, projected: 10 },
              { label: 'MAR', current: 40, projected: 20 },
              { label: 'MAY', current: 65, projected: 15 },
              { label: 'JUL', current: 25, projected: 25 },
              { label: 'SEP', current: 55, projected: 25 },
              { label: 'NOV', current: 80, projected: 15 },
              { label: 'DEC', current: 35, projected: 25 },
            ].map((col) => (
              <div key={col.label} className="flex-1 flex flex-col justify-end h-full gap-1 group">
                <div 
                  className="w-full bg-[#f1f8f3] rounded-t-sm transition-all duration-300"
                  style={{ height: `${col.projected}%` }}
                ></div>
                <div 
                  className="w-full bg-[#1b432a] rounded-t-md rounded-b-sm group-hover:bg-[#255c3a] transition-all duration-300"
                  style={{ height: `${col.current}%` }}
                ></div>
                <div className="text-center mt-3 text-[10px] font-label font-bold text-slate-400">{col.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#f4f6f5] rounded-2xl p-6 shadow-sm border border-outline-variant/40 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline text-lg font-bold text-slate-900">Live Alerts</h3>
            <span className="bg-[#ef4444] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">3 NEW</span>
          </div>
          
          <div className="space-y-4 overflow-y-auto pr-2">
            <div className="bg-white p-4 rounded-xl border-l-4 border-[#ef4444] shadow-sm flex gap-4">
              <div className="mt-0.5"><CloudRain className="w-5 h-5 text-[#ef4444]" /></div>
              <div>
                <h4 className="font-label text-sm font-bold text-slate-800 mb-1">Heavy Rain Warning</h4>
                <p className="text-xs text-slate-500 leading-relaxed mb-2">Expect 40mm precipitation within next 6 hours. Check drainage.</p>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">12 MIN AGO</div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl border-l-4 border-[#d97706] shadow-sm flex gap-4">
              <div className="mt-0.5"><Bug className="w-5 h-5 text-[#d97706]" /></div>
              <div>
                <h4 className="font-label text-sm font-bold text-slate-800 mb-1">Pest Probability High</h4>
                <p className="text-xs text-slate-500 leading-relaxed mb-2">Conditions favorable for Aphids in North Plot. Monitor daily.</p>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">2 HOURS AGO</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 bg-surface rounded-2xl p-6 shadow-sm border border-outline-variant/40">
          <h3 className="font-headline text-sm font-bold text-slate-900 mb-6">Weather Analysis</h3>
          <div className="grid grid-cols-2 gap-y-6 gap-x-4">
            <div>
              <div className="text-[10px] font-label font-bold text-slate-400 uppercase tracking-widest mb-1">PRECIPITATION</div>
              <div className="font-headline text-lg font-bold text-slate-800">12%</div>
            </div>
            <div>
              <div className="text-[10px] font-label font-bold text-slate-400 uppercase tracking-widest mb-1">UV INDEX</div>
              <div className="font-headline text-lg font-bold text-slate-800">4 (Med)</div>
            </div>
            <div>
              <div className="text-[10px] font-label font-bold text-slate-400 uppercase tracking-widest mb-1">VISIBILITY</div>
              <div className="font-headline text-lg font-bold text-slate-800">14 km</div>
            </div>
            <div>
              <div className="text-[10px] font-label font-bold text-slate-400 uppercase tracking-widest mb-1">DEW POINT</div>
              <div className="font-headline text-lg font-bold text-slate-800">18°C</div>
            </div>
          </div>
        </div>

        <div className="md:col-span-1 bg-surface rounded-2xl p-6 shadow-sm border border-outline-variant/40 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer group">
          <div className="w-14 h-14 bg-[#e8f5e9] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <FlaskConical className="w-6 h-6 text-[#10b981]" />
          </div>
          <h4 className="font-headline text-sm font-bold text-slate-800">Predict Yield</h4>
          <p className="text-[11px] text-slate-500 mt-1">ML Analysis for plots</p>
        </div>

        <div className="md:col-span-1 bg-surface rounded-2xl p-6 shadow-sm border border-outline-variant/40 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer group">
          <div className="w-14 h-14 bg-[#ecfccb] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Camera className="w-6 h-6 text-[#65a30d]" />
          </div>
          <h4 className="font-headline text-sm font-bold text-slate-800">Upload Image</h4>
          <p className="text-[11px] text-slate-500 mt-1">Disease scanner tool</p>
        </div>

        <div className="md:col-span-1 bg-surface rounded-2xl p-6 shadow-sm border border-outline-variant/40 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer group">
          <div className="w-14 h-14 bg-[#ffedd5] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Lightbulb className="w-6 h-6 text-[#d97706]" />
          </div>
          <h4 className="font-headline text-sm font-bold text-slate-800">Recommendations</h4>
          <p className="text-[11px] text-slate-500 mt-1">Personalized advice</p>
        </div>
      </div>

      <div className="bg-surface rounded-2xl shadow-sm border border-outline-variant/40 overflow-hidden relative min-h-[300px]">
        <div className="p-6 pb-4 flex justify-between items-center bg-white border-b border-outline-variant/20 relative z-10">
          <div>
            <h3 className="font-headline text-lg font-bold text-slate-900">Farm Plots Health Map</h3>
            <p className="font-label text-xs text-slate-500">Live satellite composite overview</p>
          </div>
          <div className="flex bg-[#f1f5f9] p-1 rounded-lg">
            <button className="px-4 py-1.5 text-[11px] font-bold text-slate-800 bg-white shadow-sm rounded-md uppercase">Sat View</button>
            <button className="px-4 py-1.5 text-[11px] font-bold text-slate-500 hover:text-slate-800 uppercase">Heatmap</button>
          </div>
        </div>
        
        <div className="relative w-full h-[320px]">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXqKvVrRI4b__XPJjFqAZgxsT_Iyp0XA_EsWAAOPXPpvm6_RTkbKIlfkaykybkCG_3MLS-ATNFIpgnaohu8l2vK94phMTmZs1NQOYJSsu3LSV4-NvyU9fIOzbkX4DUkNcyz3BL4ue2u6Jhnu3bIvjL2BqPP0lhiwzcqDp7LwqQ3vTp0Cbiw8PhGmMBI6L6ki_sQVAMBBCLvJfwPXSHHJ0B0fA4F71IoimLVnAxvA_Yn16GV1oUCTYJaF9rZHLKWxQVKbiroDf7j6SZ"
            alt="Satellite Map"
            fill
            className="object-cover"
          />
          
          <div className="absolute top-6 left-6 space-y-3">
            <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2 border border-white">
              <div className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></div>
              <span className="text-xs font-bold text-slate-800">Sector A-1: Optimal</span>
            </div>
            <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2 border border-white">
              <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]"></div>
              <span className="text-xs font-bold text-slate-800">Sector B-2: Needs Water</span>
            </div>
          </div>
          
          <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm p-5 rounded-xl shadow-xl border border-white max-w-[240px]">
            <h5 className="font-label text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Live Insights</h5>
            <p className="text-xs text-slate-800 font-medium leading-relaxed mb-2">Current soil moisture avg: 68%</p>
            <p className="text-xs text-slate-800 font-medium">Sunlight exposure: <span className="text-[#65a30d]">8.2 hrs</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyStateDashboard() {
  const { user, updateUser } = useAuth();
  
  const [isStep2Done, setIsStep2Done] = useState(false);
  const [isStep3Done, setIsStep3Done] = useState(false);
  const [isStep4Done, setIsStep4Done] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsStep2Done(!!localStorage.getItem("has_uploaded_leaf"));
      setIsStep3Done(!!localStorage.getItem("has_soil_data"));
      setIsStep4Done(!!localStorage.getItem("has_run_prediction"));
    }
  }, [user]);

  const isStep1Done = !!(user?.farmName && user?.location);

  // Compute progress percentage (each of the 4 steps is 25%)
  let doneCount = 0;
  if (isStep1Done) doneCount++;
  if (isStep2Done) doneCount++;
  if (isStep3Done) doneCount++;
  if (isStep4Done) doneCount++;
  const progressPercent = doneCount * 25;
  const strokeDashoffset = 125.6 - (125.6 * progressPercent) / 100;

  const handleClearFarmDetails = async () => {
    await updateUser({ farmName: "", location: "" });
    localStorage.removeItem("has_uploaded_leaf");
    localStorage.removeItem("has_soil_data");
    localStorage.removeItem("has_run_prediction");
    if (user) {
      localStorage.removeItem(`dashboard_data_${user.id}`);
    }
    window.location.reload();
  };

  const steps = [
    { 
      title: "Create Farm Profile", 
      desc: "Add location and size", 
      href: "/dashboard/profile",
      done: isStep1Done, 
      active: !isStep1Done 
    },
    { 
      title: "Upload Leaf Images", 
      desc: "Scan crops for disease", 
      href: "/dashboard/disease-detection",
      done: isStep2Done, 
      active: isStep1Done && !isStep2Done 
    },
    { 
      title: "Add Soil Parameters", 
      desc: "N-P-K & pH levels", 
      href: "/dashboard/recommendations",
      done: isStep3Done, 
      active: isStep2Done && !isStep3Done 
    },
    { 
      title: "Run Prediction", 
      desc: "Generate ML yield report", 
      href: "/dashboard/yield-prediction",
      done: isStep4Done, 
      active: isStep3Done && !isStep4Done 
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const premiumCardClass = "bg-[rgba(255,255,255,0.75)] backdrop-blur-xl rounded-[28px] border border-[rgba(27,94,32,0.08)] shadow-[0_12px_40px_rgba(15,23,42,0.05)] hover:scale-[1.01] transition-all duration-300";

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-7xl mx-auto space-y-8 pb-12 px-2"
    >
      {/* Hero Section */}
      <motion.div 
        variants={item} 
        className={`${premiumCardClass} p-10 md:p-12 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden`}
        style={{
          background: 'linear-gradient(to right, rgba(255,255,255,0.9), rgba(255,255,255,0.7)), radial-gradient(circle at top right, rgba(76,175,80,0.12), transparent 65%)'
        }}
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/micro-carbon.png')] opacity-[0.03] mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-400/10 rounded-full blur-[80px] -z-10 translate-x-1/3 -translate-y-1/3"></div>
        
        <div className="flex-1 space-y-6 relative z-10">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-green-50 text-[#1B5E20] text-xs font-bold rounded-full border border-green-100/50 flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> AI Ready
            </span>
            <span className="px-3 py-1 bg-slate-50 text-slate-600 text-xs font-bold rounded-full border border-slate-100 flex items-center gap-1.5 shadow-sm">
              <CheckCircle2 className="w-3 h-3" /> Fast Setup
            </span>
            <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-full border border-amber-100 flex items-center gap-1.5 shadow-sm">
              <Lightbulb className="w-3 h-3" /> Smart Prediction
            </span>
          </div>

          <h1 className="font-headline text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B5E20] to-[#4CAF50]">AgriAI</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-xl leading-relaxed font-medium">
            Start your first farm analysis to unlock AI-powered insights, crop health monitoring, and personalized yield prediction reports.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <Link 
              href="/dashboard/disease-detection"
              className="bg-gradient-to-r from-[#1B5E20] to-[#2E7D32] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-green-900/20 text-white px-8 py-3.5 rounded-2xl font-bold transition-all duration-300 flex items-center gap-2 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              <UploadCloud className="w-5 h-5 relative z-10" /> 
              <span className="relative z-10">Upload Crop Images</span>
            </Link>
            <button className="bg-white/50 backdrop-blur-md hover:bg-white text-slate-700 border border-slate-200/60 shadow-sm px-8 py-3.5 rounded-2xl font-bold hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 group">
              <PlayCircle className="w-5 h-5 text-[#4CAF50] group-hover:scale-110 transition-transform" /> Explore Demo
            </button>
          </div>
        </div>

        <div className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0 animate-float drop-shadow-2xl opacity-90">
          <Image 
            src="/sprout.jpg" 
            alt="Farmer Plant Sprout Illustration" 
            fill 
            className="object-cover rounded-full border-8 border-white shadow-inner"
          />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="xl:col-span-2 space-y-8">
          
          {/* Quick Actions Grid */}
          <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/dashboard/disease-detection" className={`${premiumCardClass} p-8 group relative overflow-hidden flex flex-col justify-between h-48 hover:-translate-y-1.5`}>
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
              
              <div className="w-14 h-14 bg-green-50/80 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-green-100 transition-all duration-300">
                <Camera className="w-7 h-7 text-[#1B5E20]" />
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-slate-900 text-lg">Upload Leaf Images</h3>
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <span className="text-slate-400">→</span>
                  </div>
                </div>
                <p className="text-sm text-slate-500 mt-1 font-medium">Scan for diseases instantly</p>
              </div>
            </Link>

            <Link href="/dashboard/recommendations" className={`${premiumCardClass} p-8 group relative overflow-hidden flex flex-col justify-between h-48 hover:-translate-y-1.5`}>
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
              
              <div className="w-14 h-14 bg-amber-50/80 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-amber-100 transition-all duration-300">
                <FlaskConical className="w-7 h-7 text-amber-600" />
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-slate-900 text-lg">Add Soil Data</h3>
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <span className="text-slate-400">→</span>
                  </div>
                </div>
                <p className="text-sm text-slate-500 mt-1 font-medium">Get fertilizer advice</p>
              </div>
            </Link>

            <Link href="/dashboard/map-insights" className={`${premiumCardClass} p-8 group relative overflow-hidden flex flex-col justify-between h-48 hover:-translate-y-1.5`}>
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
              
              <div className="w-14 h-14 bg-blue-50/80 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300">
                <Map className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-slate-900 text-lg">View Demo Map</h3>
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <span className="text-slate-400">→</span>
                  </div>
                </div>
                <p className="text-sm text-slate-500 mt-1 font-medium">Explore interactive analytics</p>
              </div>
            </Link>

            <div className={`${premiumCardClass} p-8 group relative overflow-hidden flex flex-col justify-between h-48 hover:-translate-y-1.5 cursor-pointer`}>
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
              
              <div className="w-14 h-14 bg-purple-50/80 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-purple-100 transition-all duration-300">
                <FileSpreadsheet className="w-7 h-7 text-purple-600" />
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-slate-900 text-lg">Import Dataset</h3>
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <span className="text-slate-400">→</span>
                  </div>
                </div>
                <p className="text-sm text-slate-500 mt-1 font-medium">Upload CSV farm history</p>
              </div>
            </div>
          </motion.div>

          {/* Analytics Placeholder */}
          <motion.div 
            variants={item} 
            className={`${premiumCardClass} p-12 text-center flex flex-col items-center justify-center min-h-[360px] relative overflow-hidden`}
            style={{ background: 'linear-gradient(135deg, #ffffff, #F3FAF3)' }}
          >
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
            
            {/* Background decorative chart */}
            <div className="absolute inset-x-0 bottom-0 h-48 opacity-10 pointer-events-none flex items-end justify-center gap-4 px-12">
              {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                <div key={i} className="w-16 bg-[#1B5E20] rounded-t-xl" style={{ height: `${h}%` }}></div>
              ))}
            </div>

            <div className="w-24 h-24 bg-white/80 backdrop-blur-sm rounded-[24px] shadow-lg flex items-center justify-center mb-8 relative z-10 border border-white">
              <BarChart3 className="w-12 h-12 text-[#1B5E20]/40" />
              <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-gradient-to-br from-[#4CAF50] to-[#2E7D32] rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                <Leaf className="w-5 h-5 text-white" />
              </div>
            </div>
            
            <h3 className="font-headline text-2xl font-bold text-slate-900 mb-3 relative z-10">No Analytics Available Yet</h3>
            <p className="text-slate-600 max-w-lg mx-auto mb-10 font-medium relative z-10 leading-relaxed">
              Your yield trends, risk scores, and health analytics will beautifully render here immediately after your first ML prediction.
            </p>
            
            <Link 
              href="/dashboard/yield-prediction" 
              className="relative z-10 bg-gradient-to-r from-[#1B5E20] to-[#2E7D32] text-white px-10 py-4 rounded-2xl font-bold shadow-lg shadow-green-900/20 hover:shadow-xl hover:shadow-green-900/30 hover:-translate-y-1 transition-all duration-300 flex items-center gap-3"
            >
              Start Analysis <span className="text-green-200">→</span>
            </Link>
          </motion.div>
        </div>

        {/* Right Panel */}
        <div className="space-y-8">
          {/* Setup Progress */}
          <motion.div variants={item} className={`${premiumCardClass} p-8 relative overflow-hidden`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -z-10"></div>
            
            <h3 className="font-bold text-slate-900 text-lg mb-8 flex items-center justify-between relative z-10">
              Setup Progress 
              <div className="relative w-12 h-12 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-100" />
                  <circle 
                    cx="24" 
                    cy="24" 
                    r="20" 
                    stroke="currentColor" 
                    strokeWidth="4" 
                    fill="transparent" 
                    strokeDasharray="125.6" 
                    strokeDashoffset={strokeDashoffset} 
                    className="text-[#4CAF50] transition-all duration-500" 
                  />
                </svg>
                <span className="absolute text-xs font-bold text-slate-700">{progressPercent}%</span>
              </div>
            </h3>
            
            <div className="space-y-8 relative z-10">
              {/* Vertical Line */}
              <div className="absolute left-[11px] top-2 bottom-6 w-[2px] bg-slate-100 -z-10"></div>

              {steps.map((step, i) => (
                <Link key={i} href={step.href} className="flex gap-5 group relative cursor-pointer">
                  <div className="mt-0.5 relative">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors bg-white
                      ${step.done ? 'border-[#4CAF50] bg-green-50' : step.active ? 'border-[#4CAF50] ring-4 ring-green-50' : 'border-slate-200 group-hover:border-slate-300'}
                    `}>
                      {step.done ? (
                        <CheckCircle2 className="w-4 h-4 text-[#4CAF50]" />
                      ) : step.active ? (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#4CAF50] animate-pulse"></div>
                      ) : null}
                    </div>
                  </div>
                  <div>
                    <div className={`font-bold text-sm ${step.done ? 'text-slate-500' : step.active ? 'text-slate-900' : 'text-slate-600 group-hover:text-slate-900'} transition-colors`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-slate-500 mt-1 font-medium">{step.desc}</div>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col gap-3">
              {isStep1Done ? (
                <button 
                  onClick={handleClearFarmDetails}
                  className="w-full py-3 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-bold rounded-xl transition-all border border-red-100 hover:border-red-200"
                >
                  Clear Farm Profile (Test Onboarding)
                </button>
              ) : (
                <Link 
                  href="/dashboard/profile"
                  className="w-full py-3 bg-slate-50 hover:bg-green-50 text-slate-600 hover:text-[#1B5E20] text-sm font-bold rounded-xl transition-colors border border-slate-100 hover:border-green-200 flex justify-center items-center"
                >
                  Complete setup to unlock insights
                </Link>
              )}
            </div>
          </motion.div>

          {/* Getting Started */}
          <motion.div variants={item} className={`${premiumCardClass} p-8 bg-[#F3FAF3] border-[#4CAF50]/10 relative overflow-hidden`}>
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/40 rounded-full blur-2xl"></div>
            
            <div className="flex items-start gap-4 relative z-10">
              <div className="w-12 h-12 bg-white rounded-[16px] shadow-sm flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🚀</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg mb-1">Getting Started</h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed mb-5">Complete your farm setup in ~2 minutes.</p>
                
                <div className="space-y-3">
                  <div className="bg-white/60 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/60 shadow-sm flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#1B5E20]/10 flex items-center justify-center">
                      <CheckCircle2 className="w-3 h-3 text-[#1B5E20]" />
                    </div>
                    <span className="text-sm font-bold text-slate-700">Connect Soil Sensor</span>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/60 shadow-sm flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-[#1B5E20]/20 flex items-center justify-center">
                    </div>
                    <span className="text-sm font-bold text-slate-700">Generate First Report</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (!user) return;
      
      const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project-id");
      
      if (isSupabaseConfigured) {
        const supabase = createClient();
        const { data: dbData } = await supabase.from('dashboard_data').select('*').eq('user_id', user.id).single();
        
        if (dbData) {
          setData(dbData);
          setHasData(true);
        } else {
          setHasData(false);
        }
      } else {
        // Fallback Local Storage pseudo-database
        const localKey = `dashboard_data_${user.id}`;
        const stored = localStorage.getItem(localKey);
        if (stored) {
          setData(JSON.parse(stored));
          setHasData(true);
        } else {
          setHasData(false);
        }
      }
      setLoading(false);
    }
    loadData();
  }, [user]);

  if (loading) {
    return (
      <div className="animate-pulse space-y-6 pt-4 max-w-6xl mx-auto">
        <div className="h-48 bg-slate-200 rounded-3xl w-full"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="h-32 bg-slate-200 rounded-3xl"></div>
              <div className="h-32 bg-slate-200 rounded-3xl"></div>
              <div className="h-32 bg-slate-200 rounded-3xl"></div>
              <div className="h-32 bg-slate-200 rounded-3xl"></div>
            </div>
            <div className="h-64 bg-slate-200 rounded-3xl"></div>
          </div>
          <div className="h-96 bg-slate-200 rounded-3xl"></div>
        </div>
      </div>
    );
  }

  if (!hasData) {
    return <EmptyStateDashboard />;
  }

  return <AnalyticsDashboard data={data} />;
}
