"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { TrendingUp, Calculator, CloudSun } from "lucide-react";

export default function YieldPrediction() {
  const { user } = useAuth();
  const router = useRouter();
  const [isSimulating, setIsSimulating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [estimatedYield, setEstimatedYield] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSimulating(true);
    setProgress(0);

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsSimulating(false);
          setEstimatedYield("84.2");
          
          if (user) {
            const mockData = {
              predicted_yield: "84.2",
              risk_score: "Low",
              soil_health: 92,
              temperature: 24,
              humidity: 84,
              wind_speed: 12
            };
            localStorage.setItem(`dashboard_data_${user.id}`, JSON.stringify(mockData));
            localStorage.setItem("has_run_prediction", "true");
          }
          
          // Redirect back to dashboard to view the unlocked charts
          setTimeout(() => {
            router.push("/dashboard");
          }, 1500);
        }, 500);
      }
    }, 150);
  };

  return (
    <div className="mt-8 animate-fade-in">
      <div className="mb-10">
        <span className="font-label text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2 block">
          Predictive Analytics
        </span>
        <h2 className="font-headline text-4xl font-extrabold tracking-tight text-slate-900">Yield Prediction Tool</h2>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-8 glass-panel p-8 rounded-xl border border-outline-variant/5">
          <h3 className="font-headline text-xl font-bold mb-6 flex items-center gap-2 text-slate-800">
            <Calculator className="w-5 h-5 text-primary" />
            Input Parameters
          </h3>
          
          {isSimulating ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-12 h-12 border-4 border-green-100 border-t-[#1B5E20] rounded-full animate-spin mx-auto"></div>
              <p className="text-slate-600 font-bold text-sm">Running ML Simulation... {progress}%</p>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-label text-sm uppercase tracking-widest text-slate-500 font-semibold">Crop Type</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm font-label focus:ring-2 focus:ring-primary/40 text-slate-800">
                    <option>Wheat</option>
                    <option>Corn</option>
                    <option>Rice</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="font-label text-sm uppercase tracking-widest text-slate-500 font-semibold">Soil Nitrogen (N)</label>
                  <input required type="number" defaultValue={50} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm font-label focus:ring-2 focus:ring-primary/40 text-slate-800" placeholder="e.g. 50" />
                </div>
                <div className="space-y-2">
                  <label className="font-label text-sm uppercase tracking-widest text-slate-500 font-semibold">Soil Phosphorus (P)</label>
                  <input required type="number" defaultValue={30} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm font-label focus:ring-2 focus:ring-primary/40 text-slate-800" placeholder="e.g. 30" />
                </div>
                <div className="space-y-2">
                  <label className="font-label text-sm uppercase tracking-widest text-slate-500 font-semibold">Soil Potassium (K)</label>
                  <input required type="number" defaultValue={40} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm font-label focus:ring-2 focus:ring-primary/40 text-slate-800" placeholder="e.g. 40" />
                </div>
              </div>
              <button type="submit" className="w-full py-4 rounded-xl liquid-pill text-white font-label font-bold text-lg shadow-xl shadow-primary/20 hover:brightness-110 transition-all cursor-pointer">
                Generate Simulation
              </button>
            </form>
          )}
        </div>

        <div className="col-span-4 space-y-6">
          <div className="glass-panel p-6 rounded-xl border border-outline-variant/5">
             <div className="flex items-center gap-4 mb-4">
               <div className="w-12 h-12 rounded-lg bg-emerald-50 flex items-center justify-center text-primary border border-emerald-100">
                 <CloudSun className="w-6 h-6" />
               </div>
               <div>
                  <h4 className="font-bold text-slate-800">Real-time Weather Sync</h4>
                  <p className="text-xs text-slate-500">Auto-fetched for current location</p>
               </div>
             </div>
             <div className="text-3xl font-black text-slate-800">26°C</div>
             <p className="text-sm font-label text-[#1B5E20] mt-1 font-semibold">Optimal Conditions</p>
          </div>
          
          <div className="glass-panel p-6 rounded-xl border border-outline-variant/5">
             <div className="flex items-center gap-4 mb-4">
               <div className="w-12 h-12 rounded-lg bg-emerald-50 flex items-center justify-center text-primary border border-emerald-100">
                 <TrendingUp className="w-6 h-6" />
               </div>
               <div>
                  <h4 className="font-bold text-slate-800">Estimated Yield Output</h4>
               </div>
             </div>
             <div className="text-3xl font-black text-slate-800">
               {estimatedYield ? (
                 <span className="text-[#1B5E20] animate-pulse">{estimatedYield} <span className="text-lg text-slate-500">tons</span></span>
               ) : (
                 <span className="text-slate-400">-- <span className="text-lg">t/ha</span></span>
               )}
             </div>
             <p className="text-xs font-label text-slate-500 mt-2">
               {estimatedYield ? "Simulation complete! Unlocking dashboard..." : "Run simulation for result"}
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
