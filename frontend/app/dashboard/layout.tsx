"use client";

import DashboardSidebar from "../components/DashboardSidebar";
import DashboardTopNav from "../components/DashboardTopNav";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, ArrowRight } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();

  // Pages that require farm profile to be set
  const protectedPages = [
    "/dashboard/yield-prediction",
    "/dashboard/disease-detection",
    "/dashboard/recommendations",
    "/dashboard/map-insights"
  ];

  const isPageProtected = protectedPages.some(page => pathname.startsWith(page));
  const hasEmptyFarmDetails = !user?.farmName || !user?.location;
  const showBlurOverlay = isPageProtected && hasEmptyFarmDetails && !isLoading;

  return (
    <div className="relative min-h-screen bg-background">
      <DashboardSidebar />
      <main className="ml-64 min-h-screen pt-[96px] px-8 pb-12">
        <DashboardTopNav />
        
        {/* Page Content: Blurs when farm details are missing on protected pages */}
        <div className={clsx(
          "transition-all duration-500",
          showBlurOverlay && "filter blur-md pointer-events-none select-none"
        )}>
          {children}
        </div>
      </main>

      {/* Onboarding Enforcer Blur Modal */}
      <AnimatePresence>
        {showBlurOverlay && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-slate-900/30 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white rounded-[32px] p-8 max-w-md w-full shadow-[0_24px_60px_rgba(15,23,42,0.16)] border border-slate-100 text-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full -z-10" />
              
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-green-100">
                <AlertTriangle className="w-8 h-8 text-[#1B5E20]" />
              </div>
              
              <h3 className="font-headline text-2xl font-extrabold text-slate-900 mb-3">Farm Profile Required</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                You must complete your Farm Profile details (Location & Farm Type) before you can access the AI crop, yield prediction, and advice tools.
              </p>
              
              <div className="space-y-3">
                <Link 
                  href="/dashboard/profile"
                  className="w-full flex justify-center items-center gap-2 bg-[#1B5E20] hover:bg-[#144718] text-white py-3.5 px-4 rounded-xl font-bold shadow-md shadow-green-900/10 hover:-translate-y-0.5 transition-all text-sm"
                >
                  Setup Farm Details <ArrowRight className="w-4 h-4" />
                </Link>
                
                <Link 
                  href="/dashboard"
                  className="w-full flex justify-center items-center py-3.5 px-4 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold rounded-xl border border-slate-100 transition-colors text-sm"
                >
                  Return to Dashboard
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
