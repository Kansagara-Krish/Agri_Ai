"use client";

import Link from "next/link";
import { ArrowLeft, Mail, Lock, Eye, EyeOff, Leaf } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import AuthLayout from "../components/AuthLayout";
import { motion } from "framer-motion";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-[420px]">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-[#1B5E20] transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to home
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white/80 backdrop-blur-[20px] rounded-[36px] p-8 sm:p-10 shadow-[0_30px_80px_rgba(15,23,42,0.08)] border border-white/60 relative"
        >
          {/* Floating leaf icon badge at the top of the card */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full border border-slate-100 shadow-md flex items-center justify-center z-30">
            <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
              <Leaf className="w-4 h-4 text-[#1B5E20]" />
            </div>
          </div>

          <div className="mb-8 mt-2">
            <h2 className="text-3xl font-extrabold text-[#0F172A] font-headline mb-2 tracking-tight">
              Welcome Back
            </h2>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">
              Sign in to your AgriAI account to continue
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleLogin}>
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
                className="w-full pl-11 pr-4 py-3.5 bg-white/40 border border-slate-200/80 rounded-2xl text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50] focus:bg-white transition-all shadow-sm"
                placeholder="Email address"
              />
            </div>

            {/* Password Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-[#4CAF50] transition-colors" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-11 py-3.5 bg-white/40 border border-slate-200/80 rounded-2xl text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50] focus:bg-white transition-all shadow-sm"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#1B5E20] focus:ring-[#4CAF50] border-slate-300 rounded cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm font-semibold text-slate-600 cursor-pointer">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href="#" className="font-semibold text-[#1B5E20] hover:text-[#4CAF50] transition-colors px-3 py-1 bg-[#4CAF50]/8 rounded-full">
                  Forgot password?
                </Link>
              </div>
            </div>

            <div className="pt-2">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full flex justify-between items-center py-3.5 px-6 rounded-2xl shadow-lg shadow-green-900/10 text-sm font-bold text-white bg-gradient-to-r from-[#1B5E20] to-[#4CAF50] hover:shadow-xl hover:shadow-green-500/15 transition-all"
              >
                <span>Sign in to Dashboard</span>
                <span>→</span>
              </motion.button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100" />
              </div>
              <div className="relative flex justify-center text-sm font-semibold">
                <span className="px-3 bg-white/80 rounded-full text-slate-400">
                  OR
                </span>
              </div>
            </div>

            <div className="mt-6">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className="w-full flex items-center justify-center gap-3 py-3.5 px-4 border border-white/60 rounded-2xl shadow-sm bg-white/40 backdrop-blur-md text-sm font-bold text-slate-700 hover:bg-white/80 hover:border-slate-300 transition-all"
              >
                <Image src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width={20} height={20} />
                Continue with Google
              </motion.button>
            </div>

            <div className="mt-8 text-center text-sm font-semibold text-slate-500 flex items-center justify-center gap-1.5">
              <span>New to AgriAI?</span>
              <Link href="/register" className="font-bold text-[#1B5E20] hover:text-[#4CAF50] transition-colors flex items-center gap-1">
                Create an account <span>→</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AuthLayout>
  );
}
