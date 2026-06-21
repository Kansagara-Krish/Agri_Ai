"use client";

import { useEffect, useState, useRef } from "react";
import { Languages, User as UserIcon, LogOut, Settings, HelpCircle, Bell, ChevronDown, Edit2, Check, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

export default function DashboardTopNav() {
  const { user, logout } = useAuth();
  const [isCompact, setIsCompact] = useState(false);
  const [avatarHover, setAvatarHover] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const pathname = usePathname();

  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState("English (US)");
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, type: "error", title: "Heavy Rain Warning", desc: "Expect 40mm precipitation within 6h", time: "12m ago" },
    { id: 2, type: "warning", title: "Pest Probability High", desc: "Aphid warning in North Plot", time: "2h ago" },
    { id: 3, type: "info", title: "Welcome to AgriAI", desc: "Complete your farm profile details", time: "1d ago" }
  ]);

  const languageRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (languageRef.current && !languageRef.current.contains(target)) {
        setShowLanguageDropdown(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(target)) {
        setShowNotificationsDropdown(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      setIsCompact(scrollPos > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getBreadcrumbs = () => {
    const paths = pathname.split("/").filter(Boolean);
    if (paths.length === 0) return "AgriAI";
    if (paths.length === 1 && paths[0] === "dashboard") return "Dashboard";
    
    const pathNames: Record<string, string> = {
      "yield-prediction": "Crop Prediction",
      "disease-detection": "Disease Detection",
      "recommendations": "Fertilizer Advice",
      "map-insights": "Map Insights",
      "settings": "Settings",
      "profile": "Profile"
    };

    const lastPath = paths[paths.length - 1];
    return pathNames[lastPath] || lastPath;
  };

  return (
    <>
      {/* Wrapper container for viewport layout alignment next to Sidebar */}
      <div className={clsx(
        "fixed z-50 left-64 right-0 flex justify-center px-8 pointer-events-none transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
        isCompact ? "top-3" : "top-4"
      )}>
        <header 
          className={clsx(
            "flex justify-between items-center px-6 rounded-full border pointer-events-auto relative",
            "transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
            "hover:-translate-y-[1px]",
            isCompact 
              ? "w-[min(800px,75%)] h-[48px] bg-white border-[#1B5E20]/8 shadow-[0_16px_36px_rgba(15,23,42,0.08)]"
              : "w-full h-[56px] bg-white border-slate-200 shadow-[0_12px_40px_rgba(15,23,42,0.08)]"
          )}
        >
          {/* Top Glow Highlight */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/90 to-transparent pointer-events-none rounded-full" />

          {/* LEFT: Breadcrumb (Transitions to show only compact title on scroll) */}
          <div className="flex items-center flex-1">
            <span className="font-label text-sm font-semibold text-slate-500 tracking-wide transition-all duration-300">
              {getBreadcrumbs()}
            </span>
          </div>
          
          {/* CENTER: Clean / Empty as requested */}
          <div className="flex-shrink-0" />

          {/* RIGHT: Actions */}
          <div className="flex items-center justify-end flex-1 gap-1.5">
            {pathname === "/dashboard/profile" && (
              <Link 
                href="/dashboard/profile?edit=true"
                className="hidden lg:flex items-center gap-1 bg-gradient-to-r from-[#1B5E20] to-[#2E7D32] text-white px-3.5 py-1.5 rounded-full text-[11px] font-bold shadow-md shadow-green-900/20 hover:-translate-y-0.5 hover:shadow-lg transition-all mr-1.5 cursor-pointer"
              >
                <Edit2 className="w-3 h-3" /> Edit Profile
              </Link>
            )}

            {/* Language Dropdown */}
            <div className="relative flex items-center" ref={languageRef}>
              <button 
                onClick={() => {
                  setShowLanguageDropdown(!showLanguageDropdown);
                  setShowNotificationsDropdown(false);
                  setAvatarHover(false);
                }}
                className={clsx(
                  "flex items-center justify-center rounded-full transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] relative",
                  isCompact ? "w-8 h-8" : "w-9 h-9",
                  showLanguageDropdown ? "bg-[#4CAF50]/12 text-[#1B5E20]" : "text-slate-500 hover:bg-slate-100"
                )}
              >
                <Languages className={clsx("transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)]", isCompact ? "w-4 h-4" : "w-[18px] h-[18px]")} />
              </button>

              <AnimatePresence>
                {showLanguageDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 8, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute right-0 top-full mt-2 w-[180px] bg-white/95 backdrop-blur-[16px] rounded-2xl shadow-[0_16px_40px_rgba(15,23,42,0.12)] border border-slate-200/80 p-2 z-50"
                  >
                    <div className="px-2.5 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Language</div>
                    <div className="space-y-0.5">
                      {["English (US)", "Hindi", "Gujarati"].map((lang) => (
                        <button
                          key={lang}
                          onClick={() => {
                            setActiveLanguage(lang);
                            setShowLanguageDropdown(false);
                          }}
                          className={clsx(
                            "w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl transition-all text-left",
                            activeLanguage === lang 
                              ? "bg-[#4CAF50]/10 text-[#1B5E20]" 
                              : "text-[#0F172A] hover:bg-[#1B5E20]/8"
                          )}
                        >
                          <span>{lang}</span>
                          {activeLanguage === lang && <Check className="w-3.5 h-3.5 text-[#1B5E20]" />}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Notifications Dropdown */}
            <div className="relative flex items-center" ref={notificationsRef}>
              <button 
                onClick={() => {
                  setShowNotificationsDropdown(!showNotificationsDropdown);
                  setShowLanguageDropdown(false);
                  setAvatarHover(false);
                }}
                className={clsx(
                  "flex items-center justify-center rounded-full transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] relative mr-0.5",
                  isCompact ? "w-8 h-8" : "w-9 h-9",
                  showNotificationsDropdown ? "bg-[#4CAF50]/12 text-[#1B5E20]" : "text-slate-500 hover:bg-slate-100"
                )}
              >
                <Bell className={clsx("transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)]", isCompact ? "w-4 h-4" : "w-[18px] h-[18px]")} />
                {notifications.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white animate-pulse"></span>
                )}
              </button>

              <AnimatePresence>
                {showNotificationsDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 8, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute right-0 top-full mt-2 w-[320px] bg-white/95 backdrop-blur-[16px] rounded-3xl shadow-[0_20px_50px_rgba(15,23,42,0.15)] border border-slate-200/80 p-4 z-50"
                  >
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                      <h4 className="text-sm font-bold text-slate-900">Notifications</h4>
                      {notifications.length > 0 && (
                        <button 
                          onClick={() => setNotifications([])}
                          className="text-[11px] font-bold text-[#1B5E20] hover:underline"
                        >
                          Clear All
                        </button>
                      )}
                    </div>

                    {notifications.length === 0 ? (
                      <div className="py-6 text-center">
                        <Bell className="w-8 h-8 text-slate-350 mx-auto mb-2 opacity-50" />
                        <p className="text-xs text-slate-400 font-semibold">No new notifications</p>
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
                        {notifications.map((notif) => (
                          <div 
                            key={notif.id}
                            className="group relative p-2.5 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 flex gap-2.5"
                          >
                            <div className={clsx(
                              "w-2 h-2 rounded-full mt-1.5 flex-shrink-0",
                              notif.type === "error" ? "bg-red-500 animate-pulse" :
                              notif.type === "warning" ? "bg-amber-500" : "bg-blue-500"
                            )} />
                            <div className="flex-1 min-w-0 pr-4">
                              <div className="flex items-start justify-between gap-2">
                                <p className="text-xs font-bold text-slate-800 truncate">{notif.title}</p>
                                <span className="text-[10px] text-slate-400 font-semibold whitespace-nowrap">{notif.time}</span>
                              </div>
                              <p className="text-[11px] text-[#64748B] font-semibold leading-relaxed mt-0.5">{notif.desc}</p>
                            </div>
                            <button
                              onClick={() => setNotifications(notifications.filter(n => n.id !== notif.id))}
                              className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-slate-600 transition-opacity p-0.5 hover:bg-slate-100 rounded"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Avatar Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => {
                setAvatarHover(true);
                setShowLanguageDropdown(false);
                setShowNotificationsDropdown(false);
              }}
              onMouseLeave={() => setAvatarHover(false)}
            >
              <div className="flex items-center gap-1 cursor-pointer p-0.5 rounded-full hover:bg-white/50 transition-colors">
                <div 
                  className={clsx(
                    "relative shadow-sm rounded-full border border-white overflow-hidden hover:rotate-[5deg] transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isCompact ? "w-8 h-8" : "w-10 h-10"
                  )}
                >
                  <Image src={user?.avatar || "/default-avatar.jpg"} alt="Avatar" fill className="object-cover" />
                  {/* Online Indicator */}
                  <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white shadow-sm animate-pulse"></span>
                </div>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>

              <AnimatePresence>
                {avatarHover && (
                  <>
                    {/* Backdrop Overlay */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-40 bg-[rgba(15,23,42,0.04)] pointer-events-none"
                    />
                    <motion.div 
                      initial={{ opacity: 0, y: 18, scale: 0.98 }}
                      animate={{ opacity: 1, y: 8, scale: 1 }}
                      exit={{ opacity: 0, y: 18, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute right-0 top-full mt-2 w-[280px] bg-[rgba(255,255,255,0.94)] backdrop-blur-[24px] rounded-[24px] shadow-[0_24px_60px_rgba(15,23,42,0.16)] border border-white/85 p-4 z-50 pointer-events-auto"
                    >
                      {/* Header */}
                      <div className="bg-gradient-to-b from-[#4CAF50]/10 to-transparent p-4 -mx-4 -mt-4 rounded-t-[24px] flex items-center gap-3">
                          <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-sm relative flex-shrink-0">
                            <Image src={user?.avatar || "/default-avatar.jpg"} alt="Avatar" fill className="object-cover" />
                          </div>
                        <div className="overflow-hidden">
                          <p className="text-sm font-bold text-[#0F172A] truncate">{user?.name || "Farmer"}</p>
                          <p className="text-[11px] font-semibold text-[#64748B] truncate">{user?.email || "user@agriai.farm"}</p>
                        </div>
                      </div>
                      
                      {/* Divider */}
                      <div className="h-px bg-gradient-to-r from-transparent via-slate-900/10 to-transparent my-3 -mx-4" />
                      
                      {/* Menu Items */}
                      <div className="space-y-1">
                        <Link 
                          href="/dashboard/profile" 
                          className={clsx(
                            "group flex items-center gap-3 px-3.5 py-2.5 text-sm font-semibold rounded-xl relative transition-all duration-200",
                            pathname === "/dashboard/profile" 
                              ? "bg-[#4CAF50]/12 text-[#1B5E20] before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[3px] before:bg-[#1B5E20] before:rounded-r-full"
                              : "text-[#0F172A] hover:bg-[#1B5E20]/8 hover:before:absolute hover:before:left-0 hover:before:top-2 hover:before:bottom-2 hover:before:w-[3px] hover:before:bg-[#1B5E20] hover:before:rounded-r-full"
                          )}
                        >
                          <UserIcon className="w-4 h-4 opacity-70 transition-transform duration-200 group-hover:translate-x-[2px]" /> 
                          <span className="flex-1">My Profile</span>
                        </Link>
                        
                        <Link 
                          href="/dashboard/settings" 
                          className={clsx(
                            "group flex items-center gap-3 px-3.5 py-2.5 text-sm font-semibold rounded-xl relative transition-all duration-200",
                            pathname === "/dashboard/settings"
                              ? "bg-[#4CAF50]/12 text-[#1B5E20] before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[3px] before:bg-[#1B5E20] before:rounded-r-full"
                              : "text-[#0F172A] hover:bg-[#1B5E20]/8 hover:before:absolute hover:before:left-0 hover:before:top-2 hover:before:bottom-2 hover:before:w-[3px] hover:before:bg-[#1B5E20] hover:before:rounded-r-full"
                          )}
                        >
                          <Settings className="w-4 h-4 opacity-70 transition-transform duration-200 group-hover:translate-x-[2px]" /> 
                          <span className="flex-1">Account Settings</span>
                        </Link>
                        
                        <Link 
                          href="/dashboard/support" 
                          className={clsx(
                            "group flex items-center gap-3 px-3.5 py-2.5 text-sm font-semibold rounded-xl relative transition-all duration-200",
                            pathname === "/dashboard/support"
                              ? "bg-[#4CAF50]/12 text-[#1B5E20] before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[3px] before:bg-[#1B5E20] before:rounded-r-full"
                              : "text-[#0F172A] hover:bg-[#1B5E20]/8 hover:before:absolute hover:before:left-0 hover:before:top-2 hover:before:bottom-2 hover:before:w-[3px] hover:before:bg-[#1B5E20] hover:before:rounded-r-full"
                          )}
                        >
                          <HelpCircle className="w-4 h-4 opacity-70 transition-transform duration-200 group-hover:translate-x-[2px]" /> 
                          <span className="flex-1">Help & Support</span>
                        </Link>
                      </div>
                      
                      {/* Divider */}
                      <div className="h-px bg-gradient-to-r from-transparent via-slate-900/10 to-transparent my-3 -mx-4" />
                      
                      <button 
                        onClick={() => { setAvatarHover(false); setShowLogoutConfirm(true); }} 
                        className="group w-full flex items-center gap-3 px-3.5 py-2.5 text-sm font-semibold text-[#DC2626] hover:bg-[#DC2626]/8 hover:before:absolute hover:before:left-0 hover:before:top-2 hover:before:bottom-2 hover:before:w-[3px] hover:before:bg-[#DC2626] hover:before:rounded-r-full rounded-xl relative transition-all duration-200 text-left"
                      >
                        <LogOut className="w-4 h-4 opacity-70 transition-transform duration-200 group-hover:translate-x-[2px]" /> 
                        <span>Log Out</span>
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>
      </div>

    <AnimatePresence>
      {showLogoutConfirm && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] backdrop-blur-md bg-slate-900/40 flex items-center justify-center p-4"
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl"
          >
            <h3 className="font-headline text-2xl font-bold text-slate-900 mb-2">Log Out</h3>
            <p className="text-slate-500 mb-8">Are you sure you want to log out of your AgriAI account?</p>
            <div className="flex gap-4">
              <button onClick={() => setShowLogoutConfirm(false)} className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors">Cancel</button>
              <button onClick={logout} className="flex-1 py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5">Log Out</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </>
);
}
