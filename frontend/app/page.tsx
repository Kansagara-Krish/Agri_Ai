"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Leaf, Search, Bell, Globe, User, ArrowRight, BarChart3, 
  Map as MapIcon, UploadCloud, Activity, ThermometerSun, 
  Droplets, Sprout, ShieldAlert, Sparkles, ChevronRight, PlayCircle, LogOut
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export default function LandingPage() {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF8] text-[#0F172A] font-body overflow-x-hidden selection:bg-[#4CAF50]/30 selection:text-[#1B5E20]">
      
      {/* Floating Sticky Navbar */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200/50 py-3 shadow-sm' : 'bg-transparent py-6'}`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1B5E20] to-[#4CAF50] flex items-center justify-center shadow-lg shadow-green-900/20 group-hover:scale-105 transition-transform">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="font-headline text-2xl font-bold tracking-tight text-[#0F172A]">AgriAi</span>
          </Link>

          {/* Center Links */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600">
            <Link href="/dashboard" className="hover:text-[#1B5E20] transition-colors relative group">
              Dashboard
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#4CAF50] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
            <Link href="#insights" className="hover:text-[#1B5E20] transition-colors relative group">
              Insights
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#4CAF50] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
            <Link href="/dashboard/disease-detection" className="hover:text-[#1B5E20] transition-colors relative group">
              Disease Detection
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#4CAF50] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
            <Link href="#soil" className="hover:text-[#1B5E20] transition-colors relative group">
              Soil Analytics
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#4CAF50] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
            <Link href="#pricing" className="hover:text-[#1B5E20] transition-colors relative group">
              Pricing
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#4CAF50] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center relative group">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 group-focus-within:text-[#4CAF50] transition-colors" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-9 pr-4 py-2 bg-white/50 border border-slate-200 rounded-full text-sm w-48 focus:w-64 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4CAF50]/20 focus:border-[#4CAF50] transition-all duration-300"
              />
            </div>
            
            <button className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#FAFAF8]"></span>
            </button>
            <button className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors">
              <Globe className="w-5 h-5" />
            </button>
            
            {user ? (
              <div className="hidden md:flex items-center gap-4">
                <Link href="/dashboard/profile" className="flex items-center justify-center w-10 h-10 rounded-full bg-[#1B5E20] text-white font-bold hover:ring-2 hover:ring-[#4CAF50] transition-all">
                  {user.name.charAt(0).toUpperCase()}
                </Link>
                <Link href="/dashboard" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1B5E20] text-white text-sm font-semibold hover:bg-[#144718] hover:shadow-lg hover:shadow-[#1B5E20]/20 hover:-translate-y-0.5 transition-all duration-300">
                  Dashboard <ArrowRight className="w-4 h-4" />
                </Link>
                <button onClick={logout} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-600 transition-colors">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <Link href="/login" className="hidden md:flex items-center justify-center px-4 py-2 rounded-full text-[#0F172A] text-sm font-semibold hover:bg-slate-100 transition-colors">
                  Login
                </Link>

                <Link href="/register" className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1B5E20] text-white text-sm font-semibold hover:bg-[#144718] hover:shadow-lg hover:shadow-[#1B5E20]/20 hover:-translate-y-0.5 transition-all duration-300">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden px-6 lg:px-8">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-[#4CAF50]/10 to-transparent rounded-full blur-[100px] -z-10 -translate-y-1/2 translate-x-1/3"></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
            
            {/* Hero Left Content */}
            <motion.div 
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="max-w-2xl"
            >
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-8 text-sm font-semibold text-[#1B5E20]">
                <Sparkles className="w-4 h-4 text-[#4CAF50]" />
                Introducing AgriAI 2.0
              </motion.div>
              
              <motion.h1 variants={fadeUp} className="font-headline text-5xl sm:text-6xl lg:text-[72px] font-extrabold leading-[1.1] tracking-tight text-[#0F172A] mb-6">
                AI-Powered <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B5E20] to-[#4CAF50]">
                  Smart Farming
                </span>
              </motion.h1>
              
              <motion.p variants={fadeUp} className="text-lg text-slate-600 mb-10 leading-relaxed max-w-xl">
                The most advanced precision agriculture platform. Predict yields, detect diseases instantly, and optimize resource usage with military-grade satellite analytics and localized AI models.
              </motion.p>
              
              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
                <Link href="/dashboard" className="flex items-center gap-2 px-8 py-4 rounded-full bg-[#1B5E20] text-white text-base font-semibold hover:bg-[#144718] hover:shadow-xl hover:shadow-[#1B5E20]/20 hover:-translate-y-1 transition-all duration-300">
                  Deploy Free Trial
                </Link>
                <button className="flex items-center gap-2 px-8 py-4 rounded-full bg-white border border-slate-200 text-[#0F172A] text-base font-semibold hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm transition-all duration-300 group">
                  <PlayCircle className="w-5 h-5 text-slate-400 group-hover:text-[#4CAF50] transition-colors" />
                  View Platform Demo
                </button>
              </motion.div>
            </motion.div>

            {/* Hero Right Dashboard Mock */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full aspect-[4/3] lg:aspect-square"
            >
              {/* Main Dashboard UI Mock */}
              <div className="absolute inset-0 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col z-10 hover:shadow-3xl hover:shadow-[#1B5E20]/10 transition-shadow duration-500">
                {/* Mock Header */}
                <div className="h-14 border-b border-slate-100 flex items-center justify-between px-6 bg-slate-50/50">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="h-6 w-32 bg-white rounded-md border border-slate-200"></div>
                </div>
                {/* Mock Body */}
                <div className="flex-1 p-6 flex flex-col gap-4 bg-slate-50/30">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                      <div className="w-8 h-8 rounded-lg bg-[#E8F5E9] flex items-center justify-center mb-3">
                        <Activity className="w-4 h-4 text-[#4CAF50]" />
                      </div>
                      <div className="h-2 w-16 bg-slate-200 rounded-full mb-2"></div>
                      <div className="h-6 w-24 bg-slate-800 rounded-md"></div>
                    </div>
                    <div className="bg-[#1B5E20] p-4 rounded-2xl shadow-sm border border-green-900/20 text-white relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                       <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center mb-3 backdrop-blur-sm">
                        <ThermometerSun className="w-4 h-4 text-white" />
                      </div>
                      <div className="h-2 w-16 bg-white/50 rounded-full mb-2"></div>
                      <div className="h-6 w-24 bg-white rounded-md"></div>
                    </div>
                  </div>
                  <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-100 p-4 relative overflow-hidden">
                    <Image 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXqKvVrRI4b__XPJjFqAZgxsT_Iyp0XA_EsWAAOPXPpvm6_RTkbKIlfkaykybkCG_3MLS-ATNFIpgnaohu8l2vK94phMTmZs1NQOYJSsu3LSV4-NvyU9fIOzbkX4DUkNcyz3BL4ue2u6Jhnu3bIvjL2BqPP0lhiwzcqDp7LwqQ3vTp0Cbiw8PhGmMBI6L6ki_sQVAMBBCLvJfwPXSHHJ0B0fA4F71IoimLVnAxvA_Yn16GV1oUCTYJaF9rZHLKWxQVKbiroDf7j6SZ" 
                      alt="Map Mock" 
                      fill 
                      className="object-cover opacity-60"
                    />
                    <div className="absolute bottom-4 left-4 right-4 h-12 bg-white/90 backdrop-blur-md rounded-xl border border-white flex items-center px-4">
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="w-[60%] h-full bg-gradient-to-r from-[#1B5E20] to-[#4CAF50]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Stat Badges */}
              <motion.div 
                style={{ y: y1 }}
                className="absolute -left-6 top-16 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 z-20 flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center shrink-0">
                  <ShieldAlert className="w-5 h-5 text-[#4CAF50]" />
                </div>
                <div>
                  <p className="font-headline font-bold text-lg text-[#0F172A]">98.5%</p>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Accuracy</p>
                </div>
              </motion.div>

              <motion.div 
                style={{ y: y2 }}
                className="absolute -right-4 bottom-20 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 z-20 flex items-center gap-4"
              >
                <div className="flex -space-x-3 shrink-0">
                  <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white z-30"></div>
                  <div className="w-8 h-8 rounded-full bg-slate-300 border-2 border-white z-20"></div>
                  <div className="w-8 h-8 rounded-full bg-slate-400 border-2 border-white z-10"></div>
                </div>
                <div>
                  <p className="font-headline font-bold text-lg text-[#0F172A]">50k+</p>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Farmers</p>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Feature Sections */}
      <section id="insights" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-headline text-3xl md:text-5xl font-bold text-[#0F172A] mb-6">Deep agricultural intelligence, <br/>simplified.</h2>
            <p className="text-lg text-slate-600">Our proprietary AI models process millions of data points across satellite imagery, soil sensors, and weather patterns to deliver actionable insights.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <motion.div whileHover={{ scale: 1.02 }} className="bg-[#FAFAF8] rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center mb-8 group-hover:bg-[#1B5E20] transition-colors duration-300">
                <UploadCloud className="w-6 h-6 text-[#1B5E20] group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-headline text-xl font-bold text-[#0F172A] mb-3">Disease Engine</h3>
              <p className="text-slate-600 leading-relaxed">Upload a leaf photo and receive instant diagnosis with a 98% confidence rate, complete with treatment protocols.</p>
            </motion.div>
            
            {/* Card 2 */}
            <motion.div whileHover={{ scale: 1.02 }} className="bg-[#FAFAF8] rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center mb-8 group-hover:bg-[#1B5E20] transition-colors duration-300">
                <MapIcon className="w-6 h-6 text-[#1B5E20] group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-headline text-xl font-bold text-[#0F172A] mb-3">Yield Mapping</h3>
              <p className="text-slate-600 leading-relaxed">Visualize your farm's productivity via high-resolution satellite NDVI layers updated every 48 hours.</p>
            </motion.div>
            
            {/* Card 3 */}
            <motion.div whileHover={{ scale: 1.02 }} className="bg-[#FAFAF8] rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center mb-8 group-hover:bg-[#1B5E20] transition-colors duration-300">
                <Sprout className="w-6 h-6 text-[#1B5E20] group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-headline text-xl font-bold text-[#0F172A] mb-3">Soil Prescriptions</h3>
              <p className="text-slate-600 leading-relaxed">Automated NPK fertilizer recommendations tailored to specific grid zones within your greenhouse or open field.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Disease Preview Section */}
      <section className="py-24 bg-[#FAFAF8] overflow-hidden relative">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="bg-[#0F172A] rounded-[40px] p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1B5E20] rounded-full blur-[120px] opacity-40"></div>
            
            <div className="lg:w-1/2 relative z-10">
              <h2 className="font-headline text-3xl md:text-5xl font-bold text-white mb-6">Stop crop failure before it starts.</h2>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                Our computer vision models are trained on over 1.2 million images to detect early signs of blight, rust, and pest infestation weeks before human eyes can.
              </p>
              <ul className="space-y-4 mb-10">
                {['Detects 140+ plant pathogens', 'Real-time severity scoring', 'Automated intervention alerts'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white font-medium">
                    <div className="w-6 h-6 rounded-full bg-[#4CAF50]/20 flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-[#4CAF50]" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/dashboard/disease-detection" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#0F172A] font-bold hover:bg-slate-100 transition-colors">
                Try Disease Engine <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="lg:w-1/2 relative z-10 w-full max-w-md">
              <div className="aspect-[3/4] bg-slate-800 rounded-3xl overflow-hidden relative border-4 border-slate-700/50 shadow-2xl">
                <Image 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNdSavlZF_6zWpFq8z8Bw4d2L-sij-rDSOpm9VYveknl_VEQscT2pyh0xbdZt0lDQxsSIiUnyOlVDt-JwK-Fa9B4z071NE7RC0jfXdCDYhfjUJMXpvgltbMyAN_wLI8T2y9PFP9nie0Z0j7jUMdjjEXBMdsu9czZ5eRaWfTgEBvCUin6EEFQPg7yOSlYHPn6qsX9NVvbUZhMpXhp1--BMbj4GZlMLTqrBBk_Avq1DxY_aaYSc-lEHvXmvm7omZzskxw8YXnuGjGg8K" 
                  alt="Disease Scan" 
                  fill 
                  className="object-cover opacity-80"
                />
                
                {/* Mock Bounding Box */}
                <motion.div 
                  initial={{ opacity: 0, scale: 1.2 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="absolute top-[30%] left-[20%] w-[40%] h-[30%] border-2 border-red-500 rounded-lg bg-red-500/10"
                >
                  <div className="absolute -top-7 left-0 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded">Blight 96%</div>
                </motion.div>

                {/* Scan Line effect */}
                <motion.div 
                  animate={{ y: ['0%', '400%', '0%'] }}
                  transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                  className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-transparent to-[#4CAF50]/40 border-b border-[#4CAF50]"
                ></motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="bg-[#0F172A] pt-24 pb-12 text-slate-400 mt-auto">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-[#1B5E20] flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-white" />
                </div>
                <span className="font-headline text-xl font-bold text-white tracking-tight">AgriAI</span>
              </Link>
              <p className="text-sm leading-relaxed mb-8 max-w-sm">
                Empowering the next generation of agriculture with precision machine learning, satellite analytics, and actionable agronomic intelligence.
              </p>
              
              <div className="bg-slate-800/50 p-1 rounded-full flex items-center max-w-sm border border-slate-700/50 focus-within:border-[#4CAF50] transition-colors">
                <input 
                  type="email" 
                  placeholder="Subscribe to newsletter..." 
                  className="bg-transparent text-sm text-white px-4 py-2 w-full focus:outline-none"
                />
                <button className="bg-[#1B5E20] hover:bg-[#144718] text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors">
                  Join
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 tracking-wide">Product</h4>
              <ul className="space-y-4 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">Yield Forecast</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Disease Engine</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Soil Health</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Pricing</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 tracking-wide">Resources</h4>
              <ul className="space-y-4 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Case Studies</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">API Reference</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Community</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 tracking-wide">Company</h4>
              <ul className="space-y-4 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Partners</Link></li>
              </ul>
            </div>

          </div>
          
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>© 2026 AgriAI Systems, Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-white transition-colors">Security</Link>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
