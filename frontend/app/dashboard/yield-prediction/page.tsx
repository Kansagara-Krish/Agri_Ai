"use client";

import { TrendingUp, Calculator, CloudSun } from "lucide-react";

export default function YieldPrediction() {
  return (
    <div className="mt-8 animate-fade-in">
      <div className="mb-10">
        <span className="font-label text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2 block">
          Predictive Analytics
        </span>
        <h2 className="font-headline text-4xl font-extrabold tracking-tight">Yield Prediction Tool</h2>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-8 glass-panel p-8 rounded-xl border border-outline-variant/5">
          <h3 className="font-headline text-xl font-bold mb-6 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-primary" />
            Input Parameters
          </h3>
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-label text-sm uppercase tracking-widest text-slate-400">Crop Type</label>
                <select className="w-full bg-surface-container-low border-none rounded-lg p-3 text-sm font-label focus:ring-2 focus:ring-primary/40 text-slate-200">
                  <option>Wheat</option>
                  <option>Corn</option>
                  <option>Rice</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="font-label text-sm uppercase tracking-widest text-slate-400">Soil Nitrogen (N)</label>
                <input type="number" className="w-full bg-surface-container-low border-none rounded-lg p-3 text-sm font-label focus:ring-2 focus:ring-primary/40 text-slate-200" placeholder="e.g. 50" />
              </div>
              <div className="space-y-2">
                <label className="font-label text-sm uppercase tracking-widest text-slate-400">Soil Phosphorus (P)</label>
                <input type="number" className="w-full bg-surface-container-low border-none rounded-lg p-3 text-sm font-label focus:ring-2 focus:ring-primary/40 text-slate-200" placeholder="e.g. 30" />
              </div>
              <div className="space-y-2">
                <label className="font-label text-sm uppercase tracking-widest text-slate-400">Soil Potassium (K)</label>
                <input type="number" className="w-full bg-surface-container-low border-none rounded-lg p-3 text-sm font-label focus:ring-2 focus:ring-primary/40 text-slate-200" placeholder="e.g. 40" />
              </div>
            </div>
            <button className="w-full py-4 rounded-xl liquid-pill text-surface font-label font-bold text-lg shadow-xl shadow-primary/20 hover:brightness-110 transition-all">
              Generate Simulation
            </button>
          </form>
        </div>

        <div className="col-span-4 space-y-6">
          <div className="glass-panel p-6 rounded-xl border border-outline-variant/5">
             <div className="flex items-center gap-4 mb-4">
               <div className="w-12 h-12 rounded-lg bg-tertiary/20 flex items-center justify-center text-tertiary">
                 <CloudSun className="w-6 h-6" />
               </div>
               <div>
                  <h4 className="font-bold">Real-time Weather Sync</h4>
                  <p className="text-xs text-slate-400">Auto-fetched for current location</p>
               </div>
             </div>
             <div className="text-3xl font-black text-on-surface">26°C</div>
             <p className="text-sm font-label text-tertiary mt-1">Optimal Conditions</p>
          </div>
          
          <div className="glass-panel p-6 rounded-xl border border-outline-variant/5">
             <div className="flex items-center gap-4 mb-4">
               <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                 <TrendingUp className="w-6 h-6" />
               </div>
               <div>
                  <h4 className="font-bold">Estimated Yield Output</h4>
               </div>
             </div>
             <div className="text-3xl font-black text-slate-600">-- <span className="text-lg">t/ha</span></div>
             <p className="text-xs font-label text-slate-500 mt-2">Run simulation for result</p>
          </div>
        </div>
      </div>
    </div>
  );
}
