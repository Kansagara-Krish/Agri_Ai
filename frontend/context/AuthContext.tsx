"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  farmName?: string;
  location?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => Promise<void>;
  register: (name: string, email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  deleteAccount: () => Promise<void>;
  updateUser: (data: Partial<User>) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Initialize Supabase only if env vars are present (to prevent crashing without keys)
  const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project-id");
  const supabase = isSupabaseConfigured ? createClient() : null;

  useEffect(() => {
    async function loadUser() {
      if (!supabase) {
        // Fallback to local storage if supabase is not yet configured by the user
        const storedUser = localStorage.getItem("agriai_user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: profile } = await supabase
          .from("farmer_profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (profile) {
          setUser({
            id: profile.id,
            name: profile.name,
            email: profile.email,
            avatar: profile.avatar || "/default-avatar.jpg",
            farmName: profile.farm_name,
            location: profile.location
          });
        }
      }
      setIsLoading(false);
    }
    loadUser();
  }, []);

  const login = async (email: string, pass: string) => {
    if (!supabase) {
      // Mock login if no supabase config
      const mockUser = { id: btoa(email), name: email.split("@")[0], email, avatar: "/default-avatar.jpg" };
      setUser(mockUser);
      localStorage.setItem("agriai_user", JSON.stringify(mockUser));
      router.push("/dashboard");
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
    if (error) throw error;
    
    if (data.user) {
      const { data: profile } = await supabase
        .from("farmer_profiles")
        .select("*")
        .eq("id", data.user.id)
        .single();
      
      if (profile) {
        setUser({ id: profile.id, name: profile.name, email: profile.email, avatar: profile.avatar || "/default-avatar.jpg" });
        router.push("/dashboard");
      }
    }
  };

  const register = async (name: string, email: string, pass: string) => {
    if (!supabase) {
      // Mock register if no supabase config
      const mockUser = { id: btoa(email), name, email, avatar: "/default-avatar.jpg" };
      setUser(mockUser);
      localStorage.setItem("agriai_user", JSON.stringify(mockUser));
      router.push("/dashboard");
      return;
    }

    const { data, error } = await supabase.auth.signUp({ email, password: pass });
    if (error) throw error;

    if (data.user) {
      const { error: profileError } = await supabase.from("farmer_profiles").insert({
        id: data.user.id,
        name: name,
        email: email
      });
      if (profileError) throw profileError;

      setUser({ id: data.user.id, name, email, avatar: "/default-avatar.jpg" });
      router.push("/dashboard");
    }
  };

  const logout = async () => {
    if (!supabase) {
      setUser(null);
      localStorage.removeItem("agriai_user");
      window.location.href = "/login";
      return;
    }

    await supabase.auth.signOut();
    setUser(null);
    window.location.href = "/login";
  };

  const deleteAccount = async () => {
    if (!supabase) {
      if (user) {
        localStorage.removeItem("agriai_user");
        localStorage.removeItem(`dashboard_data_${user.id}`);
      }
      setUser(null);
      window.location.href = "/register";
      return;
    }

    if (user) {
      // Remove profile data and then sign out
      await supabase.from("farmer_profiles").delete().eq("id", user.id);
      await supabase.auth.signOut();
      setUser(null);
      window.location.href = "/register";
    }
  };

  const updateUser = async (data: Partial<User>) => {
    if (!supabase) {
      if (user) {
        const updated = { ...user, ...data };
        setUser(updated);
        localStorage.setItem("agriai_user", JSON.stringify(updated));
      }
      return;
    }

    if (user) {
      const { error } = await supabase
        .from("farmer_profiles")
        .update({
          name: data.name,
          avatar: data.avatar,
          farm_name: data.farmName,
          location: data.location
        })
        .eq("id", user.id);
        
      if (!error) {
        setUser({ ...user, ...data });
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, deleteAccount, updateUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
