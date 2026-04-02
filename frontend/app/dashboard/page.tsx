"use client";

import { Upload, PlusCircle, Tractor, ShieldAlert, FlaskConical, Sun, CloudRain, Lightbulb, Bug, Droplets } from "lucide-react";

export default function DashboardOverview() {
  return (
    <div className="mt-8 animate-fade-in">
      <div className="mb-10 flex justify-between items-end">
        <div>
          <span className="font-label text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2 block">
            System Overview
          </span>
          <h2 className="font-headline text-4xl font-extrabold tracking-tight">Main Dashboard</h2>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-surface-container-high border border-outline-variant/10 text-on-surface font-label text-sm font-semibold hover:bg-surface-container-highest transition-all duration-300">
            <Upload className="text-primary w-5 h-5" />
            Upload Disease Image
          </button>
          <button className="flex items-center gap-2 px-6 py-3 rounded-full liquid-pill text-surface font-label text-sm font-bold hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-primary/20">
            <PlusCircle className="w-5 h-5" />
            Predict New Yield
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {[
          {
            title: "Predicted Yield",
            value: "2.4",
            unit: "t/ha",
            icon: Tractor,
            iconClass: "text-primary",
            bgClass: "bg-primary/10",
            pill: "+12% vs last cycle",
          },
          {
            title: "Risk Score",
            value: "Low",
            unit: "",
            icon: ShieldAlert,
            iconClass: "text-tertiary",
            bgClass: "bg-tertiary/10",
            pill: "Stable",
          },
          {
            title: "Soil Health",
            value: "88",
            unit: "%",
            icon: FlaskConical,
            iconClass: "text-[#10b981]",
            bgClass: "bg-[#10b981]/10",
            pill: "Nitrogen-Rich",
          },
          {
            title: "Forecast",
            value: "28",
            unit: "°C",
            icon: Sun,
            iconClass: "text-orange-400",
            bgClass: "bg-orange-400/10",
            pill: "Next 7 Days",
          },
        ].map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className="glass-panel p-6 rounded-xl border border-outline-variant/5 shadow-xl hover:translate-y-[-4px] transition-transform duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-xl ${kpi.bgClass} flex items-center justify-center`}>
                  <Icon className={`${kpi.iconClass} w-6 h-6`} />
                </div>
                <span className={`font-label text-[10px] ${kpi.iconClass} font-bold px-2 py-1 ${kpi.bgClass} rounded-md`}>
                  {kpi.pill}
                </span>
              </div>
              <p className="font-label text-xs uppercase tracking-widest text-slate-400 mb-1">{kpi.title}</p>
              <h3 className="font-headline text-3xl font-black">
                {kpi.value}
                {kpi.unit && <span className="text-lg font-medium text-slate-500 ml-1">{kpi.unit}</span>}
              </h3>
            </div>
          );
        })}
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Yield Projection Chart */}
        <div className="col-span-8 glass-panel rounded-xl p-8 border border-outline-variant/5 relative overflow-hidden">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h4 className="font-headline text-xl font-bold">Yield Projection Analysis</h4>
              <p className="font-label text-sm text-slate-400">Projected output versus seasonal baseline</p>
            </div>
            <div className="flex gap-2 bg-surface-container-low p-1 rounded-lg">
              <button className="px-4 py-1.5 text-xs font-label font-bold bg-surface-container-highest rounded-md">
                Weekly
              </button>
              <button className="px-4 py-1.5 text-xs font-label text-slate-500 hover:text-on-surface">Monthly</button>
            </div>
          </div>
          {/* Chart SVG */}
          <div className="h-64 w-full relative">
            <svg className="w-full h-full drop-shadow-2xl" viewBox="0 0 800 240">
              <line className="text-outline-variant/10" stroke="currentColor" strokeWidth="1" x1="0" x2="800" y1="40" y2="40" />
              <line className="text-outline-variant/10" stroke="currentColor" strokeWidth="1" x1="0" x2="800" y1="100" y2="100" />
              <line className="text-outline-variant/10" stroke="currentColor" strokeWidth="1" x1="0" x2="800" y1="160" y2="160" />
              <line className="text-outline-variant/10" stroke="currentColor" strokeWidth="1" x1="0" x2="800" y1="220" y2="220" />
              <defs>
                <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#4edea3" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#4edea3" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,220 Q50,180 100,190 T200,140 T300,160 T400,90 T500,110 T600,50 T700,70 T800,40 V220 H0 Z" fill="url(#chartGradient)" />
              <path d="M0,220 Q50,180 100,190 T200,140 T300,160 T400,90 T500,110 T600,50 T700,70 T800,40" fill="none" stroke="#4edea3" strokeLinecap="round" strokeWidth="4" />
              <circle cx="400" cy="90" fill="#4edea3" r="6" />
              <circle cx="600" cy="50" fill="#4edea3" r="6" />
            </svg>
          </div>
          <div className="mt-6 flex justify-between px-2 text-[10px] font-label font-bold uppercase tracking-widest text-slate-500">
            <span>Week 01</span><span>Week 04</span><span>Week 08</span><span>Week 12</span><span>Week 16</span><span>Week 20</span>
          </div>
        </div>

        {/* Environment Radar */}
        <div className="col-span-4 glass-panel rounded-xl p-8 border border-outline-variant/5">
          <h4 className="font-headline text-xl font-bold mb-6">Environment Radar</h4>
          <div className="flex justify-center py-4">
            <div className="relative w-48 h-48">
              <div className="absolute inset-0 rounded-full border border-outline-variant/10" />
              <div className="absolute inset-4 rounded-full border border-outline-variant/10" />
              <div className="absolute inset-8 rounded-full border border-outline-variant/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[1px] h-full bg-outline-variant/10" />
                <div className="h-[1px] w-full bg-outline-variant/10 absolute" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100">
                  <polygon fill="rgba(123, 209, 250, 0.2)" points="50,10 85,30 90,70 50,90 10,70 15,30" stroke="#7bd1fa" strokeWidth="2" />
                </svg>
              </div>
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 font-label text-[10px] uppercase font-bold tracking-tighter text-slate-400">Rainfall</span>
              <span className="absolute -right-8 top-1/2 -translate-y-1/2 font-label text-[10px] uppercase font-bold tracking-tighter text-slate-400">UV Index</span>
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-label text-[10px] uppercase font-bold tracking-tighter text-slate-400">Wind</span>
              <span className="absolute -left-8 top-1/2 -translate-y-1/2 font-label text-[10px] uppercase font-bold tracking-tighter text-slate-400">Humidity</span>
            </div>
          </div>
          <div className="mt-12 space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-400">Precipitation Chance</span>
              <span className="font-bold">22%</span>
            </div>
            <div className="w-full bg-surface-container-low h-1.5 rounded-full overflow-hidden">
              <div className="bg-tertiary h-full w-[22%]" />
            </div>
            <div className="flex justify-between items-center text-sm pt-2">
              <span className="text-slate-400">Soil Saturation</span>
              <span className="font-bold">64%</span>
            </div>
            <div className="w-full bg-surface-container-low h-1.5 rounded-full overflow-hidden">
              <div className="bg-primary h-full w-[64%]" />
            </div>
          </div>
        </div>

        {/* Recent Insights Panel */}
        <div className="col-span-12 glass-panel rounded-xl p-8 border border-outline-variant/5">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h4 className="font-headline text-xl font-bold">Recent Insights</h4>
              <p className="font-label text-sm text-slate-400">AI-generated alerts and recommendations</p>
            </div>
            <button className="text-primary font-label text-xs font-bold uppercase tracking-widest hover:underline transition-all">
              View All Alerts
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Insights */}
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-surface-container-low hover:bg-surface-container-high transition-all duration-300 group">
              <div className="w-12 h-12 shrink-0 rounded-full bg-error-container/20 flex items-center justify-center text-error">
                <CloudRain className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="bg-error-container/40 text-error text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">High Priority</span>
                  <span className="text-[10px] text-slate-500 font-medium">2h ago</span>
                </div>
                <h5 className="font-headline text-base font-bold group-hover:text-primary transition-colors">Warning: Heavy Rainfall</h5>
                <p className="text-sm text-slate-400 mt-1">Expected 45mm within 24 hours. Check drainage in North-East pasture sections immediately.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-surface-container-low hover:bg-surface-container-high transition-all duration-300 group">
              <div className="w-12 h-12 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Insight</span>
                  <span className="text-[10px] text-slate-500 font-medium">5h ago</span>
                </div>
                <h5 className="font-headline text-base font-bold group-hover:text-primary transition-colors">Optimal Sowing Window</h5>
                <p className="text-sm text-slate-400 mt-1">Soil temperature and moisture levels are ideal for corn sowing in the next 48 hours.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
