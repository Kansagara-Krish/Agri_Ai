"use client";

import { UploadCloud, FileImage, ShieldAlert } from "lucide-react";

export default function DiseaseDetection() {
  return (
    <div className="mt-8 animate-fade-in">
      <div className="mb-10">
        <span className="font-label text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2 block">
          Computer Vision
        </span>
        <h2 className="font-headline text-4xl font-extrabold tracking-tight">AI Disease Detection</h2>
        <p className="text-slate-400 mt-2">Upload crop imagery for real-time pathogenic analysis</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-panel p-8 rounded-xl border border-outline-variant/5">
          <h3 className="font-headline text-xl font-bold mb-4">Upload Scan</h3>
          <div className="border-2 border-dashed border-primary/30 rounded-xl p-12 flex flex-col items-center justify-center cursor-pointer hover:bg-primary/5 transition-colors">
            <UploadCloud className="w-12 h-12 text-primary mb-4" />
            <p className="font-bold text-lg">Click to Upload Image</p>
            <p className="font-label text-xs text-slate-500 mt-2">Supported Formats: JPG, PNG, HEIC</p>
          </div>
        </div>

        <div className="glass-panel p-8 rounded-xl border border-outline-variant/5">
          <h3 className="font-headline text-xl font-bold mb-4">Analysis Results</h3>
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4 text-slate-400 pb-10">
            <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center">
              <FileImage className="w-8 h-8 opacity-50" />
            </div>
            <p>Upload an image to see immediate results.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
