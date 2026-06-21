"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Sprout,
  Stethoscope,
  FlaskConical,
  Map as MapIcon,
  Leaf,
  Plus
} from "lucide-react";
import clsx from "clsx";

export default function DashboardSidebar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Crop Prediction", href: "/dashboard/yield-prediction", icon: Sprout },
    { name: "Disease Detection", href: "/dashboard/disease-detection", icon: Stethoscope },
    { name: "Fertilizer Advice", href: "/dashboard/recommendations", icon: FlaskConical },
    { name: "Map/Insights", href: "/dashboard/map-insights", icon: MapIcon },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full flex flex-col z-[60] bg-surface border-r border-outline-variant/50 w-64">
      <div className="p-6 pb-2">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-headline text-xl font-bold text-primary leading-none tracking-tight">AgriAI</h1>
            <p className="font-label text-[10px] tracking-widest text-slate-400 mt-0.5">MODERN RURAL INTEL</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {navLinks.map((link) => {
          const isActive = pathname === link.href || (link.href !== "/dashboard" && pathname.startsWith(link.href));
          const Icon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "flex items-center gap-4 px-4 py-3 rounded-xl font-label text-sm font-semibold transition-all duration-200 relative",
                isActive
                  ? "bg-green-50 text-[#1B5E20] before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1 before:bg-[#1B5E20] before:rounded-r-full"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              )}
            >
              <Icon className={clsx("w-5 h-5", isActive ? "text-[#1B5E20]" : "text-slate-400")} />
              <span>{link.name}</span>
            </Link>
          );
        })}
        
        <div className="pt-6 pb-2">
          <Link href="/dashboard/disease-detection" className="w-full flex justify-center items-center gap-2 bg-[#1B5E20] text-white px-4 py-3 rounded-xl font-label text-sm font-bold shadow-md shadow-green-900/20 hover:brightness-110 active:scale-95 transition-all">
            <Plus className="w-4 h-4" />
            Start Analysis
          </Link>
        </div>
      </nav>
    </aside>
  );
}
