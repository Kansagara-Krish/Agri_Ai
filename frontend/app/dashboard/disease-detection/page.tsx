"use client";

import { useState } from "react";
import { Camera, UploadCloud, FileImage, Lightbulb, ChevronRight, AlertTriangle, CheckCircle2, ShieldAlert, Scissors, Download, Share2, FlaskConical } from "lucide-react";
import Image from "next/image";

export default function DiseaseDetection() {
  const [isUploading, setIsUploading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSimulateUpload = () => {
    setIsUploading(true);
    setShowResults(false);
    setProgress(0);
    
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 5;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsUploading(false);
          setShowResults(true);
          localStorage.setItem("has_uploaded_leaf", "true");
        }, 500);
      }
    }, 100);
  };

  return (
    <div className="animate-fade-in space-y-8 max-w-5xl">
      {/* Header */}
      <div>
        <h2 className="font-headline text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Disease Detection</h2>
        <p className="font-label text-slate-500 max-w-2xl leading-relaxed">
          Upload a clear photo of the affected crop leaf or stem for instant AI diagnosis and precision treatment plans.
        </p>
      </div>

      {/* Top Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Area */}
        <div className="lg:col-span-2">
          <div className="w-full bg-surface border-2 border-dashed border-outline-variant rounded-3xl p-12 flex flex-col items-center justify-center text-center transition-all hover:border-primary/50">
            <div className="w-16 h-16 bg-[#bbf7d0] rounded-full flex items-center justify-center mb-6">
              <Camera className="w-8 h-8 text-[#16a34a]" />
            </div>
            <h3 className="font-headline text-2xl font-bold text-slate-900 mb-2">Drag & Drop or Click to Upload</h3>
            <p className="text-sm text-slate-500 mb-8">Supports JPG, PNG, up to 10MB</p>
            
            <div className="flex gap-4">
              <button 
                onClick={handleSimulateUpload}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#164e28] text-white font-label text-sm font-semibold shadow-md shadow-primary/10 hover:bg-[#1b6332] transition-colors"
              >
                <FileImage className="w-4 h-4" />
                Choose File
              </button>
              <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-100 text-slate-700 font-label text-sm font-semibold hover:bg-slate-200 transition-colors">
                <Camera className="w-4 h-4" />
                Live Camera
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          {isUploading && (
            <div className="mt-6 bg-[#f4f6f5] rounded-xl p-4 border border-outline-variant/50 animate-scale-in">
              <div className="flex justify-between items-center mb-2">
                <span className="font-label text-xs font-bold text-slate-700">Analyzing pixels...</span>
                <span className="font-label text-xs font-bold text-primary">{progress}%</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#1b432a] transition-all duration-100"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Pro-Tip */}
          <div className="bg-[#ffedd5] rounded-3xl p-8 shadow-sm">
            <div className="mb-4">
              <Lightbulb className="w-6 h-6 text-[#d97706]" />
            </div>
            <h4 className="font-headline text-lg font-bold text-[#9a3412] mb-3">Pro-Tip for Precision</h4>
            <p className="text-sm text-[#9a3412]/80 leading-relaxed mb-6">
              For the highest accuracy, ensure the leaf is well-lit and centered. Avoid blurry shots or complex backgrounds like soil or human hands.
            </p>
            <div className="flex gap-3">
              <div className="w-12 h-12 rounded-lg bg-slate-800 overflow-hidden relative border-2 border-white shadow-sm">
                 <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXqKvVrRI4b__XPJjFqAZgxsT_Iyp0XA_EsWAAOPXPpvm6_RTkbKIlfkaykybkCG_3MLS-ATNFIpgnaohu8l2vK94phMTmZs1NQOYJSsu3LSV4-NvyU9fIOzbkX4DUkNcyz3BL4ue2u6Jhnu3bIvjL2BqPP0lhiwzcqDp7LwqQ3vTp0Cbiw8PhGmMBI6L6ki_sQVAMBBCLvJfwPXSHHJ0B0fA4F71IoimLVnAxvA_Yn16GV1oUCTYJaF9rZHLKWxQVKbiroDf7j6SZ" alt="Good Example" fill className="object-cover" />
              </div>
              <div className="w-12 h-12 rounded-lg bg-slate-800 overflow-hidden relative border-2 border-white shadow-sm">
                 <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNdSavlZF_6zWpFq8z8Bw4d2L-sij-rDSOpm9VYveknl_VEQscT2pyh0xbdZt0lDQxsSIiUnyOlVDt-JwK-Fa9B4z071NE7RC0jfXdCDYhfjUJMXpvgltbMyAN_wLI8T2y9PFP9nie0Z0j7jUMdjjEXBMdsu9czZ5eRaWfTgEBvCUin6EEFQPg7yOSlYHPn6qsX9NVvbUZhMpXhp1--BMbj4GZlMLTqrBBk_Avq1DxY_aaYSc-lEHvXmvm7omZzskxw8YXnuGjGg8K" alt="Bad Example" fill className="object-cover opacity-50 grayscale" />
              </div>
            </div>
          </div>

          {/* Recent Detections */}
          <div className="bg-surface rounded-3xl p-6 border border-outline-variant/40 shadow-sm">
            <h4 className="font-headline text-sm font-bold text-slate-900 mb-4">Recent Detections</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#fee2e2] flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-[#ef4444]" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-800">Late Blight</h5>
                    <p className="text-[10px] text-slate-500 font-medium">Detected 2h ago</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
              </div>
              
              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#dcfce7] flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-[#22c55e]" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-800">Healthy Maize</h5>
                    <p className="text-[10px] text-slate-500 font-medium">Detected yesterday</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {showResults && (
        <div className="bg-surface rounded-3xl p-8 border border-outline-variant/40 shadow-sm flex flex-col md:flex-row gap-10 animate-slide-up">
          {/* Image Preview */}
          <div className="md:w-1/3 relative rounded-2xl overflow-hidden min-h-[300px] shadow-inner">
            <Image 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNdSavlZF_6zWpFq8z8Bw4d2L-sij-rDSOpm9VYveknl_VEQscT2pyh0xbdZt0lDQxsSIiUnyOlVDt-JwK-Fa9B4z071NE7RC0jfXdCDYhfjUJMXpvgltbMyAN_wLI8T2y9PFP9nie0Z0j7jUMdjjEXBMdsu9czZ5eRaWfTgEBvCUin6EEFQPg7yOSlYHPn6qsX9NVvbUZhMpXhp1--BMbj4GZlMLTqrBBk_Avq1DxY_aaYSc-lEHvXmvm7omZzskxw8YXnuGjGg8K" 
              alt="Analyzed Image" 
              fill 
              className="object-cover"
            />
            <div className="absolute bottom-6 left-6">
              <span className="bg-[#ef4444] text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                HIGH SEVERITY
              </span>
            </div>
          </div>

          {/* Results Data */}
          <div className="md:w-2/3 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-headline text-3xl font-extrabold text-slate-900">Bacterial Spot</h3>
                <div className="text-right">
                  <div className="font-headline text-2xl font-black text-slate-900">94.2<span className="text-lg">%</span></div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">CONFIDENCE</div>
                </div>
              </div>
              <p className="text-sm font-semibold text-[#16a34a] mb-8 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#16a34a]"></div>
                Affected Crop: Tomato (Solanum lycopersicum)
              </p>

              <h4 className="font-label text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                <div className="w-5 h-5 bg-[#164e28] rounded flex items-center justify-center text-white">
                  <ShieldAlert className="w-3 h-3" />
                </div>
                Suggested Treatment
              </h4>
              
              <div className="space-y-4 mb-8">
                <div className="bg-[#f8fafc] rounded-xl p-5 border border-outline-variant/50 flex gap-4">
                  <div className="mt-1 w-8 h-8 rounded-full bg-[#fef3c7] flex items-center justify-center shrink-0">
                    <FlaskConical className="w-4 h-4 text-[#d97706]" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800 text-sm mb-1">Copper-based Fungicide</h5>
                    <p className="text-xs text-slate-500 leading-relaxed">Apply early morning or late evening to prevent leaf burn. Repeat every 7-10 days.</p>
                  </div>
                </div>
                
                <div className="bg-[#f8fafc] rounded-xl p-5 border border-outline-variant/50 flex gap-4">
                  <div className="mt-1 w-8 h-8 rounded-full bg-[#ecfccb] flex items-center justify-center shrink-0">
                    <Scissors className="w-4 h-4 text-[#65a30d]" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800 text-sm mb-1">Pruning & Isolation</h5>
                    <p className="text-xs text-slate-500 leading-relaxed">Remove infected leaves immediately. Sterilize shears between each cut.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#164e28] text-white font-label text-sm font-semibold shadow-md shadow-primary/10 hover:bg-[#1b6332] transition-colors">
                <Download className="w-4 h-4" />
                Download Full Report
              </button>
              <button className="w-14 h-14 flex items-center justify-center rounded-xl bg-surface border border-outline-variant text-slate-600 hover:bg-slate-50 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
