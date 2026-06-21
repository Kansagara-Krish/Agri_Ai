"use client";

import Link from "next/link";
import { ArrowLeft, Mail, Lock, User, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import AuthLayout from "../components/AuthLayout";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1);
  const { register } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }
    try {
      await register(name, email, password);
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-[420px]">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-[#1B5E20] transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to home
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/88 backdrop-blur-[20px] rounded-[32px] p-8 sm:p-10 shadow-[0_20px_60px_rgba(15,23,42,0.08)] border border-white"
        >
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-[#0F172A] font-headline mb-2">
              Create Account
            </h2>
            <p className="text-sm text-[#64748B] font-medium">
              Join the future of precision agriculture
            </p>
          </div>

          {/* Animated Step Indicator */}
          <div className="flex items-center gap-2 mb-8">
            <div className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${step >= 1 ? 'bg-[#4CAF50]' : 'bg-slate-200'}`} />
            <div className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${step >= 2 ? 'bg-[#4CAF50]' : 'bg-slate-200'}`} />
          </div>

          <form className="space-y-5 relative" onSubmit={handleRegister}>
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  {/* Name Input */}
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-slate-400 group-focus-within:text-[#4CAF50] transition-colors" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="peer w-full pl-11 pr-4 py-3.5 bg-white/50 border border-slate-200 rounded-2xl text-sm text-slate-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#4CAF50]/20 focus:border-[#4CAF50] focus:bg-white transition-all shadow-sm"
                      placeholder="Full Name"
                    />
                    <label 
                      htmlFor="name" 
                      className="absolute left-11 -top-2.5 bg-white px-1 text-xs font-semibold text-slate-500 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3.5 peer-placeholder-shown:bg-transparent transition-all peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-[#4CAF50] peer-focus:bg-white"
                    >
                      Full Name
                    </label>
                  </div>
                  
                  {/* Email Input */}
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-[#4CAF50] transition-colors" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="peer w-full pl-11 pr-4 py-3.5 bg-white/50 border border-slate-200 rounded-2xl text-sm text-slate-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#4CAF50]/20 focus:border-[#4CAF50] focus:bg-white transition-all shadow-sm"
                      placeholder="Email address"
                    />
                    <label 
                      htmlFor="email" 
                      className="absolute left-11 -top-2.5 bg-white px-1 text-xs font-semibold text-slate-500 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3.5 peer-placeholder-shown:bg-transparent transition-all peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-[#4CAF50] peer-focus:bg-white"
                    >
                      Email address
                    </label>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  {/* Password Input */}
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-[#4CAF50] transition-colors" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="peer w-full pl-11 pr-4 py-3.5 bg-white/50 border border-slate-200 rounded-2xl text-sm text-slate-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#4CAF50]/20 focus:border-[#4CAF50] focus:bg-white transition-all shadow-sm"
                      placeholder="Password"
                    />
                    <label 
                      htmlFor="password" 
                      className="absolute left-11 -top-2.5 bg-white px-1 text-xs font-semibold text-slate-500 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3.5 peer-placeholder-shown:bg-transparent transition-all peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-[#4CAF50] peer-focus:bg-white"
                    >
                      Create Password
                    </label>
                  </div>

                  {/* Requirements */}
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <h4 className="text-xs font-bold text-slate-700 mb-2">Password requirements:</h4>
                    <ul className="space-y-1.5">
                      <li className="flex items-center gap-2 text-xs text-slate-500">
                        <CheckCircle2 className={`w-3.5 h-3.5 ${password.length >= 8 ? 'text-[#4CAF50]' : 'text-slate-300'}`} />
                        At least 8 characters
                      </li>
                      <li className="flex items-center gap-2 text-xs text-slate-500">
                        <CheckCircle2 className={`w-3.5 h-3.5 ${/[A-Z]/.test(password) ? 'text-[#4CAF50]' : 'text-slate-300'}`} />
                        One uppercase letter
                      </li>
                      <li className="flex items-center gap-2 text-xs text-slate-500">
                        <CheckCircle2 className={`w-3.5 h-3.5 ${/[0-9]/.test(password) ? 'text-[#4CAF50]' : 'text-slate-300'}`} />
                        One number
                      </li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="pt-4 flex gap-3">
              {step === 2 && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-3.5 rounded-2xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Back
                </button>
              )}
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="flex-1 flex justify-center py-3.5 px-4 rounded-2xl shadow-lg shadow-green-900/20 text-sm font-bold text-white bg-gradient-to-r from-[#1B5E20] to-[#2E7D32] hover:from-[#144718] hover:to-[#1B5E20] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4CAF50] transition-all"
              >
                {step === 1 ? 'Continue' : 'Create Account'}
              </motion.button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-sm font-medium">
                <span className="px-3 bg-white text-slate-400 rounded-full">
                  OR
                </span>
              </div>
            </div>

            <div className="mt-6">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className="w-full flex items-center justify-center gap-3 py-3.5 px-4 border border-slate-200 rounded-2xl shadow-sm bg-white text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all"
              >
                <Image src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width={20} height={20} />
                Sign up with Google
              </motion.button>
            </div>

            <div className="mt-8 text-center text-sm font-medium text-slate-600">
              Already have an account?{" "}
              <Link href="/login" className="font-bold text-[#1B5E20] hover:text-[#4CAF50] transition-colors">
                Sign in
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AuthLayout>
  );
}
