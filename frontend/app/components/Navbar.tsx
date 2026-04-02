"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 w-full z-50 bg-[#0b1326]/60 backdrop-blur-[20px] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
      <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
        <Link href="/" className="text-2xl font-extrabold tracking-tighter text-primary">
          KhetSahyog
        </Link>
        <div className="hidden md:flex gap-8 items-center font-headline text-sm tracking-wide">
          <Link
            href="#"
            className="text-primary font-bold border-b-2 border-primary pb-1 active:scale-95 transform transition-transform"
          >
            Ecosystem
          </Link>
          <Link
            href="#"
            className="text-slate-300 hover:text-primary transition-colors active:scale-95 transform transition-transform"
          >
            Predictions
          </Link>
          <Link
            href="#"
            className="text-slate-300 hover:text-primary transition-colors active:scale-95 transform transition-transform"
          >
            Intelligence
          </Link>
          <Link
            href="#"
            className="text-slate-300 hover:text-primary transition-colors active:scale-95 transform transition-transform"
          >
            Network
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="hidden md:block bg-primary-container text-on-primary-container px-6 py-2 rounded-full font-bold hover:bg-white/5 hover:-translate-y-1 transition-all duration-300 active:scale-95 transform"
          >
            Start Prediction
          </Link>
          <button className="md:hidden text-primary">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
}
