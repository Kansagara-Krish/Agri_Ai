"use client";

import { Check, Plus, Minus, Crosshair, Download, Play, BarChart2, Sparkles } from "lucide-react";
import Image from "next/image";

export default function MapInsights() {
  return (
    <div className="absolute inset-0 pt-[72px] pl-64 overflow-hidden animate-fade-in">
      {/* Background Map Image */}
      <div className="relative w-full h-full">
        <Image 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXqKvVrRI4b__XPJjFqAZgxsT_Iyp0XA_EsWAAOPXPpvm6_RTkbKIlfkaykybkCG_3MLS-ATNFIpgnaohu8l2vK94phMTmZs1NQOYJSsu3LSV4-NvyU9fIOzbkX4DUkNcyz3BL4ue2u6Jhnu3bIvjL2BqPP0lhiwzcqDp7LwqQ3vTp0Cbiw8PhGmMBI6L6ki_sQVAMBBCLvJfwPXSHHJ0B0fA4F71IoimLVnAxvA_Yn16GV1oUCTYJaF9rZHLKWxQVKbiroDf7j6SZ"
          alt="Satellite Map Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/10"></div> {/* Slight overlay to make panels pop */}

        {/* Map Markers */}
        <div className="absolute top-[35%] left-[45%] w-8 h-8 rounded-full border-2 border-[#16a34a] bg-[#16a34a]/30 flex items-center justify-center animate-pulse">
          <div className="w-2 h-2 rounded-full bg-[#16a34a]"></div>
        </div>
        <div className="absolute top-[60%] left-[30%] w-8 h-8 rounded-full border-2 border-[#ef4444] bg-[#ef4444]/30 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-[#ef4444]"></div>
        </div>

        {/* Left Floating Panel */}
        <div className="absolute top-6 left-6 bottom-6 w-80 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white p-6 flex flex-col z-10">
          <h3 className="font-label text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">MAP OVERLAYS</h3>
          
          <div className="space-y-3 mb-8">
            <div className="bg-white rounded-xl p-3 flex justify-between items-center shadow-sm cursor-pointer border border-outline-variant/30 hover:border-primary/50 transition-colors">
              <span className="font-label text-sm font-bold text-slate-800 flex items-center gap-2">
                <div className="w-4 h-4 bg-slate-800 rounded-sm"></div>
                Satellite View
              </span>
              <div className="w-5 h-5 bg-[#164e28] rounded flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-3 flex justify-between items-center shadow-sm cursor-pointer border border-outline-variant/30 hover:border-primary/50 transition-colors">
              <span className="font-label text-sm font-bold text-slate-800 flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-sm"></div>
                NDVI Heatmap
              </span>
              <div className="w-5 h-5 bg-[#164e28] rounded flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-3 flex justify-between items-center shadow-sm cursor-pointer border border-outline-variant/30 hover:border-primary/50 transition-colors">
              <span className="font-label text-sm font-bold text-slate-500 flex items-center gap-2">
                <div className="w-4 h-4 bg-[#7bd1fa] rounded-sm opacity-50"></div>
                EVI Index
              </span>
              <div className="w-5 h-5 border-2 border-slate-300 rounded"></div>
            </div>
          </div>

          <h3 className="font-label text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">CROP TYPES</h3>
          <div className="space-y-1 flex-1">
            <div className="flex justify-between items-center p-3 bg-[#e8f5e9] rounded-xl cursor-pointer">
              <span className="font-label text-sm font-bold text-[#164e28]">All Crops</span>
              <span className="bg-[#164e28] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">12</span>
            </div>
            <div className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors">
              <span className="font-label text-sm font-semibold text-slate-600">Organic Wheat</span>
              <span className="bg-slate-200 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full">4</span>
            </div>
            <div className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors">
              <span className="font-label text-sm font-semibold text-slate-600">Vineyards</span>
              <span className="bg-slate-200 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full">3</span>
            </div>
            <div className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors">
              <span className="font-label text-sm font-semibold text-slate-600">Almond Trees</span>
              <span className="bg-slate-200 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full">5</span>
            </div>
          </div>

          {/* AI Insight Box inside panel */}
          <div className="mt-4 bg-[#dcfce7] rounded-2xl p-5 border border-[#86efac]">
            <h4 className="font-label text-[10px] font-bold text-[#16a34a] flex items-center gap-1.5 uppercase tracking-widest mb-2">
              <Sparkles className="w-3 h-3" /> AI INSIGHT
            </h4>
            <p className="text-xs text-[#166534] font-medium leading-relaxed">
              Strong vegetation growth detected in North Sector. Recommend adjusting fertilizer dosage in Grid B-4.
            </p>
          </div>
        </div>

        {/* Right Map Controls */}
        <div className="absolute top-6 right-6 flex flex-col gap-3 z-10">
          <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-white flex flex-col overflow-hidden">
            <button className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-100 border-b border-slate-100 transition-colors">
              <Plus className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors">
              <Minus className="w-5 h-5" />
            </button>
          </div>
          <button className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-white flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors">
            <Crosshair className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom Historical Analysis Scrubber */}
        <div className="absolute bottom-6 right-6 left-[370px] bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white p-4 flex items-center gap-6 z-10">
          <button className="w-12 h-12 rounded-full bg-[#164e28] text-white flex items-center justify-center shrink-0 hover:bg-[#1b6332] transition-colors shadow-md">
            <Play className="w-5 h-5 ml-1" />
          </button>
          
          <div className="flex-1">
            <h4 className="font-label text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">HISTORICAL ANALYSIS</h4>
            <p className="font-headline text-sm font-bold text-slate-800">March 1st — May 24th, 2024</p>
          </div>

          <div className="h-8 flex items-end gap-0.5 opacity-50 px-8 border-x border-slate-200">
            {/* Mock mini bar chart */}
            {[4,6,5,8,7,9,10,8,7,6,5,7,8,6,5,4].map((h, i) => (
              <div key={i} className="w-1.5 bg-[#164e28] rounded-t-sm" style={{ height: `${h * 3}px` }}></div>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <h4 className="font-label text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">AVG NDVI</h4>
              <p className="font-headline text-lg font-bold text-[#16a34a]">0.74</p>
            </div>
            
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#164e28] text-white font-label text-sm font-bold shadow-md hover:bg-[#1b6332] transition-colors">
              <Download className="w-4 h-4" />
              Report
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
