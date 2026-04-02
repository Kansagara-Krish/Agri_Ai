"use client";

import { useState } from "react";
import { Sparkles, Leaf, TestTube, Thermometer, CloudRain, Droplets, FlaskConical } from "lucide-react";

export default function SmartRecommendations() {
  type FormDataKey = 'N' | 'P' | 'K' | 'pH' | 'temperature' | 'humidity' | 'rainfall';

  const [formData, setFormData] = useState<Record<FormDataKey, number>>({
    N: 50,
    P: 50,
    K: 50,
    pH: 6.5,
    temperature: 25.0,
    humidity: 60.0,
    rainfall: 100.0,
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ fertilizer: string; dosage: string; notes: string } | null>(null);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: parseFloat(e.target.value) || 0 });
  };

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL is not configured");
      
      const res = await fetch(`${apiUrl}/recommend/fertilizer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to fetch recommendation");
      const data = await res.json();
      setResult(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 animate-fade-in">
      <div className="mb-10">
        <span className="font-label text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2 block">
          AI Advisory
        </span>
        <h2 className="font-headline text-4xl font-extrabold tracking-tight">Fertilizer Recommendation</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-8 glass-panel p-8 rounded-xl border border-outline-variant/5">
          <form onSubmit={handlePredict} className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { name: "N", label: "Nitrogen (N)", icon: FlaskConical },
                { name: "P", label: "Phosphorus (P)", icon: FlaskConical },
                { name: "K", label: "Potassium (K)", icon: FlaskConical },
                { name: "pH", label: "Soil pH", icon: TestTube, step: "0.1" },
                { name: "temperature", label: "Temperature (°C)", icon: Thermometer, step: "0.1" },
                { name: "humidity", label: "Humidity (%)", icon: Droplets, step: "0.1" },
                { name: "rainfall", label: "Rainfall (mm)", icon: CloudRain, step: "0.1" },
              ].map((field) => (
                <div key={field.name} className="space-y-2">
                  <label className="flex items-center gap-2 font-label text-xs uppercase tracking-widest text-slate-400">
                    <field.icon className="w-4 h-4" /> {field.label}
                  </label>
                  <input
                    type="number"
                    name={field.name}
                    value={formData[field.name as FormDataKey]}
                    onChange={handleChange}
                    step={field.step || "1"}
                    className="w-full bg-surface-container-low border-none rounded-lg p-3 text-sm font-label focus:ring-2 focus:ring-primary/40 text-slate-200"
                    required
                  />
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl liquid-pill text-surface font-label font-bold text-lg shadow-xl shadow-primary/20 hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
            >
              {loading ? "Analyzing Soil Integrity..." : "Predict Optimal Fertilizer"}
            </button>
            {error && <p className="text-error mt-4 text-center">{error}</p>}
          </form>
        </div>

        <div className="md:col-span-4">
          <div className="glass-panel p-8 rounded-xl border border-outline-variant/5 h-full flex flex-col justify-center transition-all">
            {result ? (
              <div className="animate-scale-in text-center">
                <div className="w-16 h-16 rounded-full bg-tertiary/20 flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="text-tertiary w-8 h-8" />
                </div>
                <h3 className="font-label text-xs uppercase tracking-widest text-slate-400 mb-2">Recommended Matrix</h3>
                <div className="text-4xl font-headline font-black text-tertiary mb-4">
                  {result.fertilizer}
                </div>
                <p className="text-sm text-slate-300 font-label">{result.notes}</p>
              </div>
            ) : (
              <div className="text-center opacity-50 flex flex-col items-center">
                <Leaf className="w-12 h-12 text-slate-500 mb-4" />
                <p className="font-label text-sm text-slate-400">Results will appear here upon simulation.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
