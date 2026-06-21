"use client";

import { useEffect } from "react";
import { Download, FlaskConical, AlertTriangle, Bug, Droplet, ChevronLeft, ChevronRight, Calendar, Sun, Sparkles, Leaf } from "lucide-react";

export default function FertilizerIntelligence() {
  useEffect(() => {
    localStorage.setItem("has_soil_data", "true");
  }, []);
  return (
    <div className="animate-fade-in pb-12">
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <span className="font-label text-[10px] font-bold uppercase tracking-widest text-[#16a34a] mb-2 block">
            Field Analysis • North Sector 4
          </span>
          <h2 className="font-headline text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Fertilizer Intelligence</h2>
          <p className="font-label text-sm text-slate-500">Precision recommendations based on real-time soil nitrogen and moisture levels.</p>
        </div>
        <div>
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#164e28] text-white font-label text-sm font-semibold shadow-md shadow-primary/10 hover:bg-[#1b6332] transition-colors">
            <Download className="w-4 h-4" />
            Export to PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Main Recommendation Card */}
          <div className="bg-surface rounded-3xl p-8 border border-outline-variant/40 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#e8f5e9] to-transparent opacity-50 rounded-bl-full pointer-events-none"></div>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-[#bbf7d0] flex items-center justify-center">
                <FlaskConical className="w-6 h-6 text-[#16a34a]" />
              </div>
              <h3 className="font-headline text-xl font-bold text-slate-900">Fertilizer Recommendation</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="font-label text-xs font-bold text-slate-500 mb-2">Primary Formula</h4>
                <div className="font-headline text-5xl font-black text-[#164e28] mb-4">NPK 20-10-10</div>
                <div className="inline-flex items-center gap-1.5 bg-[#e8f5e9] text-[#16a34a] px-3 py-1.5 rounded-full text-[11px] font-bold">
                  <div className="w-1.5 h-1.5 bg-[#16a34a] rounded-full"></div>
                  Optimal for current stage
                </div>
              </div>
              <div>
                <h4 className="font-label text-xs font-bold text-slate-500 mb-2">Dosage Strategy</h4>
                <div className="font-headline text-5xl font-black text-slate-900 mb-4">45<span className="text-2xl text-slate-400">kg <span className="text-base">/ha</span></span></div>
                <p className="text-xs text-slate-500 leading-relaxed max-w-[200px]">
                  Apply via side-dressing for maximum absorption during peak vegetative growth.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-[#f8fafc] rounded-2xl p-4 flex gap-4 items-center">
                <div className="w-1.5 h-10 bg-[#164e28] rounded-full"></div>
                <div>
                  <div className="font-label text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">NITROGEN</div>
                  <div className="font-headline text-sm font-bold text-slate-800">Low (12%)</div>
                </div>
              </div>
              <div className="bg-[#f8fafc] rounded-2xl p-4 flex gap-4 items-center">
                <div className="w-1.5 h-10 bg-[#bef264] rounded-full"></div>
                <div>
                  <div className="font-label text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">PHOSPHORUS</div>
                  <div className="font-headline text-sm font-bold text-slate-800">Stable (34%)</div>
                </div>
              </div>
              <div className="bg-[#f8fafc] rounded-2xl p-4 flex gap-4 items-center">
                <div className="w-1.5 h-10 bg-[#f59e0b] rounded-full"></div>
                <div>
                  <div className="font-label text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">POTASSIUM</div>
                  <div className="font-headline text-sm font-bold text-slate-800">Target (22%)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Split Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Irrigation Schedule */}
            <div className="bg-surface rounded-3xl p-6 border border-outline-variant/40 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#dbeafe] flex items-center justify-center">
                      <Droplet className="w-5 h-5 text-[#3b82f6]" />
                    </div>
                    <h3 className="font-headline text-lg font-bold text-slate-900">Irrigation Schedule</h3>
                  </div>
                  <div className="flex gap-2">
                    <button className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-700">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-700">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-8 px-2">
                  {[
                    { day: 'MON', date: '14' },
                    { day: 'TUE', date: '15' },
                    { day: 'WED', date: '16', dot: true },
                    { day: 'THU', date: '17' },
                    { day: 'FRI', date: '18' },
                    { day: 'SAT', date: '19', active: true },
                    { day: 'SUN', date: '20' },
                  ].map((d, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">{d.day}</div>
                      <div className={`w-10 h-12 rounded-xl flex flex-col items-center justify-center relative transition-colors ${
                        d.active ? 'bg-[#3b82f6] text-white shadow-md shadow-blue-500/20' : 
                        d.dot ? 'bg-[#164e28] text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                      }`}>
                        <span className="font-headline font-bold text-sm">{d.date}</span>
                        {d.dot && <div className="absolute bottom-1.5 w-1 h-1 bg-[#16a34a] rounded-full"></div>}
                        {d.active && <div className="absolute bottom-1 text-[8px] font-bold text-blue-100 uppercase">Full</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-[#eff6ff] rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:bg-blue-100/50 transition-colors">
                <div className="bg-white p-2 rounded-lg text-[#3b82f6]">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-[#1e3a8a] text-xs">Next cycle: Sat, Oct 19</div>
                  <div className="text-[#3b82f6] text-[11px] font-medium mt-0.5">Early morning drip irrigation (2.5hrs)</div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#3b82f6]" />
              </div>
            </div>

            {/* Best Sowing Time */}
            <div className="bg-surface rounded-3xl p-6 border border-outline-variant/40 shadow-sm flex flex-col items-center text-center">
              <div className="w-full flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#ffedd5] flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-[#d97706]" />
                </div>
                <h3 className="font-headline text-lg font-bold text-slate-900">Best Sowing Time</h3>
              </div>
              
              <div className="relative w-32 h-32 mb-6">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="64" cy="64" r="56" stroke="#f1f5f9" strokeWidth="12" fill="none" />
                  <circle cx="64" cy="64" r="56" stroke="#84cc16" strokeWidth="12" fill="none" strokeDasharray="351" strokeDashoffset="100" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Leaf className="w-5 h-5 text-[#164e28] mb-1" />
                  <span className="font-headline text-xl font-bold text-slate-900">Oct 24</span>
                </div>
              </div>
              
              <h4 className="font-headline text-base font-bold text-slate-900 mb-2">Optimal Window</h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-6">
                Conditions will be ideal for <span className="font-bold text-[#4d7c0f]">Maize (Hybrid)</span> in 8 days based on soil temperature trend.
              </p>
              
              <div className="w-full flex justify-between items-center pt-6 border-t border-slate-100">
                <div className="text-left">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">SOIL TEMP</div>
                  <div className="font-headline text-sm font-bold text-slate-800">22.4°C</div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">HUMIDITY</div>
                  <div className="font-headline text-sm font-bold text-slate-800">64%</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">FORECAST</div>
                  <div className="font-headline text-sm font-bold text-blue-400"><Sun className="w-4 h-4 inline" /></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Alerts */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#fff1f2] rounded-3xl p-8 border border-red-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-100 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
            
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-[#fecdd3] flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-[#e11d48]" />
              </div>
              <span className="bg-[#e11d48] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                High Risk
              </span>
            </div>
            
            <h3 className="font-headline text-2xl font-bold text-slate-900 mb-4 relative z-10">Pest Alerts</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-8 relative z-10">
              Invasive <span className="font-semibold italic">Spodoptera frugiperda</span> detected in neighboring plots. Immediate preventive spraying advised.
            </p>
            
            <div className="bg-white rounded-xl p-4 flex gap-4 items-center mb-6 shadow-sm border border-red-50 relative z-10">
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center shrink-0">
                <Bug className="w-5 h-5 text-[#e11d48]" />
              </div>
              <div>
                <h5 className="font-bold text-slate-800 text-sm">Fall Armyworm</h5>
                <p className="text-xs text-slate-500 mt-0.5">Probability: 88%</p>
              </div>
            </div>
            
            <button className="w-full py-3.5 bg-white border-2 border-[#e11d48] text-[#e11d48] font-label font-bold text-sm rounded-xl hover:bg-red-50 transition-colors relative z-10">
              View Prevention Protocol
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Banner */}
      <div className="mt-6 w-full bg-[#1b432a] rounded-2xl p-6 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-64 h-64 bg-white/5 rounded-full blur-[60px] pointer-events-none"></div>
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6 text-[#4edea3]" />
          </div>
          <div>
            <h3 className="font-headline text-lg font-bold text-white mb-1">AI Insight: Yield Projection</h3>
            <p className="text-sm text-white/80">
              Current fertilizer plan increases estimated harvest by <span className="text-[#4edea3] font-bold">14.2%</span> compared to last season.
            </p>
          </div>
        </div>
        <button className="shrink-0 px-6 py-3 bg-white text-[#1b432a] font-label font-bold text-sm rounded-lg shadow-sm hover:bg-slate-100 transition-colors relative z-10">
          Deep Analysis
        </button>
      </div>
    </div>
  );
}
