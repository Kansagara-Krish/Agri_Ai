"use client";

import { Save, Bell, Globe, Shield, Smartphone } from "lucide-react";
import { useState } from "react";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [dataSharing, setDataSharing] = useState(true);

  return (
    <div className="animate-fade-in max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="font-headline text-3xl font-extrabold text-slate-900 tracking-tight mb-2">System Settings</h2>
          <p className="font-label text-slate-500">Configure your farm preferences and system parameters.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#164e28] text-white font-label text-sm font-semibold shadow-md shadow-primary/10 hover:bg-[#1b6332] transition-colors">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Settings Navigation */}
        <div className="space-y-2">
          <button className="w-full flex items-center gap-3 p-4 rounded-xl bg-[#e8f5e9] text-[#164e28] font-semibold text-left transition-colors">
            <Globe className="w-5 h-5" />
            General
          </button>
          <button className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-slate-50 text-slate-600 font-semibold text-left transition-colors">
            <Bell className="w-5 h-5" />
            Notifications
          </button>
          <button className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-slate-50 text-slate-600 font-semibold text-left transition-colors">
            <Shield className="w-5 h-5" />
            Privacy & Security
          </button>
          <button className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-slate-50 text-slate-600 font-semibold text-left transition-colors">
            <Smartphone className="w-5 h-5" />
            Connected Devices
          </button>
        </div>

        {/* Settings Content */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-surface rounded-3xl p-8 border border-outline-variant/40 shadow-sm space-y-6">
            <h3 className="font-headline text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Farm Preferences</h3>
            
            <div>
              <label className="block font-label text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Farm Name</label>
              <input 
                type="text" 
                defaultValue="Sector 7-B Greenhouse" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 font-medium focus:ring-2 focus:ring-[#16a34a] focus:border-transparent outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-label text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Primary Crop Type</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 font-medium focus:ring-2 focus:ring-[#16a34a] outline-none transition-all appearance-none">
                  <option>Maize (Hybrid)</option>
                  <option>Organic Wheat</option>
                  <option>Soybeans</option>
                  <option>Tomatoes</option>
                </select>
              </div>
              <div>
                <label className="block font-label text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Measurement Unit</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 font-medium focus:ring-2 focus:ring-[#16a34a] outline-none transition-all appearance-none">
                  <option>Metric (kg, hectares)</option>
                  <option>Imperial (lbs, acres)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-3xl p-8 border border-outline-variant/40 shadow-sm space-y-6">
            <h3 className="font-headline text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">System Toggles</h3>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-800">Push Notifications</h4>
                <p className="text-sm text-slate-500">Receive alerts for weather and disease risks.</p>
              </div>
              <button 
                onClick={() => setNotifications(!notifications)}
                className={`w-12 h-6 rounded-full transition-colors relative ${notifications ? 'bg-[#16a34a]' : 'bg-slate-300'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${notifications ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
              <div>
                <h4 className="font-bold text-slate-800">Global Data Sharing</h4>
                <p className="text-sm text-slate-500">Contribute anonymized yield data to improve global AI models.</p>
              </div>
              <button 
                onClick={() => setDataSharing(!dataSharing)}
                className={`w-12 h-6 rounded-full transition-colors relative ${dataSharing ? 'bg-[#16a34a]' : 'bg-slate-300'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${dataSharing ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
