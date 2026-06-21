"use client";

import Link from "next/link";
import { ArrowLeft, Mail, Lock } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import AuthLayout from "../components/AuthLayout";
import { motion } from "framer-motion";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/88 backdrop-blur-[20px] rounded-[32px] p-8 sm:p-10 shadow-[0_20px_60px_rgba(15,23,42,0.08)] border border-white"
        >
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-[#0F172A] font-headline mb-2">
              Welcome Back
            </h2>
            <p className="text-sm text-[#64748B] font-medium">
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

            {/* Password Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-[#4CAF50] transition-colors" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
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
                Password
              </label>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#1B5E20] focus:ring-[#4CAF50] border-slate-300 rounded cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm font-medium text-slate-600 cursor-pointer">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href="#" className="font-semibold text-[#1B5E20] hover:text-[#4CAF50] transition-colors px-3 py-1 bg-[#4CAF50]/10 rounded-full">
                  Forgot password?
                </Link>
              </div>
            </div>

            <div className="pt-2">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full flex justify-center py-3.5 px-4 rounded-2xl shadow-lg shadow-green-900/20 text-sm font-bold text-white bg-gradient-to-r from-[#1B5E20] to-[#2E7D32] hover:from-[#144718] hover:to-[#1B5E20] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4CAF50] transition-all"
              >
                Sign in to Dashboard
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
                Continue with Google
              </motion.button>
            </div>

            <div className="mt-8 text-center text-sm font-medium text-slate-600">
              New to AgriAI?{" "}
              <Link href="/register" className="font-bold text-[#1B5E20] hover:text-[#4CAF50] transition-colors">
                Create an account
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AuthLayout>
  );
}
