"use client";

import { useState, useEffect, Suspense } from "react";
import { User, Mail, Phone, MapPin, CreditCard, Shield, Camera, LogOut, Trash2, Edit2, Check, X, Sprout, Globe, Bell, MoreVertical, BadgeCheck, AlertTriangle, Leaf } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

function ProfileContent() {
  const { user, logout, deleteAccount, updateUser } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Editable states
  const [profileData, setProfileData] = useState({
    email: "",
    phone: "+91 98765 43210",
    location: "",
    farmType: "",
    language: "English (US)",
    notifications: "Email, Push Alerts",
  });

  const [farmSize, setFarmSize] = useState("12 acres");
  const [cropType, setCropType] = useState("Tomato");

  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    farmName: "",
    farmSize: "",
    cropType: ""
  });

  useEffect(() => {
    if (user) {
      setProfileData(prev => ({
        ...prev,
        email: user.email || prev.email || "john.doe@agriai.farm",
        location: user.location || prev.location || "Ahmedabad, Gujarat",
        farmType: user.farmName || prev.farmType || "Greenhouse Sector 7",
        phone: localStorage.getItem("profile_phone") || prev.phone
      }));
      setFarmSize(localStorage.getItem("profile_farm_size") || "12 acres");
      setCropType(localStorage.getItem("profile_crop_type") || "Tomato");
    }
  }, [user]);

  const isEditing = searchParams.get("edit") === "true";

  useEffect(() => {
    if (isEditing) {
      setShowEditModal(true);
      setEditForm({
        name: user?.name || "",
        email: user?.email || "",
        phone: localStorage.getItem("profile_phone") || "+91 98765 43210",
        location: user?.location || "",
        farmName: user?.farmName || "",
        farmSize: localStorage.getItem("profile_farm_size") || "12 acres",
        cropType: localStorage.getItem("profile_crop_type") || "Tomato"
      });
    } else {
      setShowEditModal(false);
    }
  }, [isEditing, user]);

  const closeModal = () => {
    setShowEditModal(false);
    router.push("/dashboard/profile");
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUser({
      name: editForm.name,
      email: editForm.email,
      location: editForm.location,
      farmName: editForm.farmName
    });

    localStorage.setItem("profile_phone", editForm.phone);
    localStorage.setItem("profile_farm_size", editForm.farmSize);
    localStorage.setItem("profile_crop_type", editForm.cropType);

    setProfileData(prev => ({
      ...prev,
      email: editForm.email,
      phone: editForm.phone,
      location: editForm.location,
      farmType: editForm.farmName
    }));
    setFarmSize(editForm.farmSize);
    setCropType(editForm.cropType);

    showToast("Profile and Farm details updated successfully");
    closeModal();
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSave = async (key: string, value: string) => {
    setProfileData(prev => ({ ...prev, [key]: value }));
    
    // Sync to backend if it's a context field
    if (key === 'email' || key === 'location' || key === 'farmType') {
      await updateUser({
        email: key === 'email' ? value : user?.email,
        location: key === 'location' ? value : user?.location,
        farmName: key === 'farmType' ? value : user?.farmName,
      });
    }
    
    showToast(`${key.charAt(0).toUpperCase() + key.slice(1)} updated successfully`);
  };

  const handleClearFarmDetails = async () => {
    await updateUser({ farmName: "", location: "" });
    localStorage.removeItem("has_uploaded_leaf");
    localStorage.removeItem("has_soil_data");
    localStorage.removeItem("has_run_prediction");
    localStorage.removeItem("profile_farm_size");
    localStorage.removeItem("profile_crop_type");
    if (user) {
      localStorage.removeItem(`dashboard_data_${user.id}`);
    }
    showToast("Farm details and onboarding flow reset");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="max-w-5xl mx-auto space-y-8 pb-12 relative"
    >
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-[110] bg-[#1B5E20] text-white px-6 py-3 rounded-full shadow-lg shadow-green-900/20 flex items-center gap-3"
          >
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-sm">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Profile Card */}
      <motion.div variants={itemVariants} className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-green-50/50 to-transparent rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          {/* Avatar */}
          <div className="relative group cursor-pointer">
            <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-xl relative bg-slate-50 flex items-center justify-center">
              <Image
                src={user?.avatar || "/default-avatar.jpg"}
                alt="Profile"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all duration-300">
                <Camera className="w-8 h-8 text-white mb-1" />
                <span className="text-white text-xs font-bold">Change Photo</span>
              </div>
            </div>
            <div className="absolute bottom-2 right-2 w-8 h-8 bg-[#4CAF50] border-4 border-white rounded-full flex items-center justify-center shadow-md">
              <BadgeCheck className="w-4 h-4 text-white" />
            </div>
          </div>
          
          {/* Info */}
          <div className="flex-1 mt-2">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
              <div className="text-center md:text-left flex-1">
                <h2 className="font-headline text-3xl font-extrabold text-slate-900 mb-2">{user?.name || "Farmer"}</h2>
                <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 text-xs font-semibold text-slate-500 mb-6">
                  <span className="bg-slate-100 px-3 py-1 rounded-full text-slate-600 border border-slate-200">ID: AGR-8492</span>
                  <span>Member since 2026</span>
                  <div className="flex items-center gap-1 text-[#1B5E20] bg-green-50 px-3 py-1 rounded-full">
                    <MapPin className="w-3 h-3" />
                    {profileData.location}
                  </div>
                </div>

                {/* Quick Farm Summary Row to fill space beautifully */}
                <div className="grid grid-cols-3 gap-6 pt-5 border-t border-slate-100 max-w-lg mx-auto md:mx-0">
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Farm Name</div>
                    <div className="text-sm font-bold text-slate-800 mt-1 truncate">{profileData.farmType || "Not Set"}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Farm Size</div>
                    <div className="text-sm font-bold text-slate-800 mt-1 truncate">{farmSize || "Not Set"}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Primary Crop</div>
                    <div className="text-sm font-bold text-[#1B5E20] mt-1 truncate">{cropType || "Not Set"}</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-row md:flex-col lg:flex-row items-center gap-3 shrink-0">
                <span className="bg-gradient-to-r from-[#1B5E20] to-[#2E7D32] text-white text-[10px] font-bold px-4 py-2.5 rounded-full uppercase tracking-widest flex items-center gap-1.5 shadow-md shadow-green-900/20">
                  <Shield className="w-3 h-3" /> Premium Tier
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Two Column Layout for the rest */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Personal Info */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div variants={itemVariants}>
            <h3 className="font-headline text-xl font-bold text-slate-900 mb-6">Personal & Farm Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <EditableCard icon={Mail} label="Email Address" fieldKey="email" value={profileData.email} onSave={handleSave} type="email" />
              <EditableCard icon={Phone} label="Phone Number" fieldKey="phone" value={profileData.phone} onSave={handleSave} type="tel" />
              <EditableCard icon={MapPin} label="Location" fieldKey="location" value={profileData.location} onSave={handleSave} type="text" />
              <EditableCard icon={Sprout} label="Farm Name / Type" fieldKey="farmType" value={profileData.farmType} onSave={handleSave} type="text" />
              <EditableCard icon={CreditCard} label="Farm Size" fieldKey="farmSize" value={farmSize} onSave={(k: string, v: string) => { localStorage.setItem("profile_farm_size", v); setFarmSize(v); showToast("Farm size updated successfully"); }} type="text" />
              <EditableCard icon={Leaf} label="Primary Crop" fieldKey="cropType" value={cropType} onSave={(k: string, v: string) => { localStorage.setItem("profile_crop_type", v); setCropType(v); showToast("Primary crop updated successfully"); }} type="text" />
              <EditableCard icon={Globe} label="Language" fieldKey="language" value={profileData.language} onSave={handleSave} type="select" options={["English (US)", "Hindi", "Gujarati"]} />
              <EditableCard icon={Bell} label="Notifications" fieldKey="notifications" value={profileData.notifications} onSave={handleSave} type="select" options={["Email, Push Alerts", "Email Only", "None"]} />
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Subscription & Danger Zone */}
        <div className="space-y-8">
          
          {/* Subscription Section */}
          <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="font-headline text-lg font-bold text-slate-900">Subscription</h3>
            </div>
            
            <div className="flex items-center gap-6 mb-8">
              {/* Fake Progress Ring */}
              <div className="relative w-20 h-20 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path className="text-slate-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                  <path className="text-[#4CAF50]" strokeDasharray="75, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
                <div className="absolute text-center">
                  <span className="block text-xl font-bold text-slate-900 leading-none">24</span>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase">Days</span>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold text-slate-800">Premium Plan</h4>
                <p className="text-xs text-slate-500 mt-1">Renews Nov 1, 2026</p>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full py-3 bg-[#1B5E20] text-white font-semibold rounded-xl hover:bg-[#144718] hover:-translate-y-0.5 transition-all shadow-md shadow-green-900/10">
                Manage Plan
              </button>
              <button className="w-full py-3 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors">
                View Invoices
              </button>
            </div>
          </motion.div>

          {/* Danger Zone */}
          <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 border border-red-100 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center border border-red-100/50">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="font-headline text-lg font-bold text-red-600">Danger Zone</h3>
            </div>
            
            <p className="font-body text-xs font-semibold leading-relaxed text-slate-400 mb-6">
              These actions affect your account access and data permanently.
            </p>
            
            <div className="space-y-3">
              <button 
                onClick={handleClearFarmDetails}
                className="w-full flex items-center p-4 bg-red-50/50 hover:bg-red-100/60 text-red-600 rounded-xl transition-all border border-red-100/50 text-left cursor-pointer group"
              >
                <Trash2 className="w-4 h-4 mr-3 shrink-0 text-red-500 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-xs tracking-wider uppercase">Clear Farm Profile (Test Onboarding)</span>
              </button>

              <button 
                onClick={() => setShowLogoutConfirm(true)} 
                className="w-full flex items-center p-4 bg-slate-50/60 hover:bg-slate-100/80 text-slate-700 rounded-xl transition-all border border-slate-200/60 text-left cursor-pointer group"
              >
                <LogOut className="w-4 h-4 mr-3 shrink-0 text-slate-500 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-xs tracking-wider uppercase">Log Out Session</span>
              </button>
              
              <button 
                onClick={() => setShowDeleteConfirm(true)} 
                className="w-full flex items-center p-4 bg-white hover:bg-red-50/30 text-red-600 rounded-xl transition-all border border-red-200 text-left cursor-pointer group"
              >
                <Trash2 className="w-4 h-4 mr-3 shrink-0 text-red-500 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-xs tracking-wider uppercase">Delete Account</span>
              </button>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Confirmation Modals & Edit Modal */}
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

        {showDeleteConfirm && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] backdrop-blur-md bg-slate-900/40 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl"
            >
              <h3 className="font-headline text-2xl font-bold text-red-600 mb-2">Delete Account</h3>
              <p className="text-slate-500 mb-8 text-sm leading-relaxed">Are you absolutely sure? This will permanently delete your farm data, history, and profile. This action cannot be undone.</p>
              <div className="flex gap-4">
                <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors">Cancel</button>
                <button onClick={deleteAccount} className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-600/20 transition-all hover:-translate-y-0.5">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showEditModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              className="bg-white rounded-[32px] p-8 max-w-lg w-full shadow-[0_24px_60px_rgba(15,23,42,0.16)] border border-slate-100 relative overflow-hidden"
            >
              <h3 className="font-headline text-2xl font-extrabold text-slate-900 mb-6 flex items-center gap-2">
                <Edit2 className="w-5 h-5 text-[#1B5E20]" />
                Edit Profile & Farm Details
              </h3>
              
              <form onSubmit={handleSaveModal} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider font-semibold">Full Name</label>
                    <input 
                      required
                      type="text" 
                      value={editForm.name} 
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-[#4CAF50] transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider font-semibold">Email Address</label>
                    <input 
                      required
                      type="email" 
                      value={editForm.email} 
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-[#4CAF50] transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider font-semibold">Phone Number</label>
                    <input 
                      required
                      type="text" 
                      value={editForm.phone} 
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-[#4CAF50] transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider font-semibold">Location / District</label>
                    <input 
                      required
                      type="text" 
                      value={editForm.location} 
                      onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-[#4CAF50] transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider font-semibold">Farm Name / Type</label>
                    <input 
                      required
                      type="text" 
                      value={editForm.farmName} 
                      onChange={(e) => setEditForm({ ...editForm, farmName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-[#4CAF50] transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider font-semibold">Farm Size</label>
                    <input 
                      required
                      type="text" 
                      value={editForm.farmSize} 
                      onChange={(e) => setEditForm({ ...editForm, farmSize: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-[#4CAF50] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider font-semibold">Primary Crop Type</label>
                  <input 
                    required
                    type="text" 
                    value={editForm.cropType} 
                    onChange={(e) => setEditForm({ ...editForm, cropType: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-[#4CAF50] transition-all"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={closeModal} 
                    className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors text-sm"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-3 px-4 bg-[#1B5E20] hover:bg-[#144718] text-white font-bold rounded-xl shadow-lg transition-all text-sm cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Profile() {
  return (
    <Suspense fallback={<div className="animate-pulse p-8 bg-white rounded-3xl h-64 flex items-center justify-center text-slate-400 font-bold">Loading Profile...</div>}>
      <ProfileContent />
    </Suspense>
  );
}

// Sub-component for Editable Cards
function EditableCard({ icon: Icon, label, value }: any) {
  return (
    <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-green-200 transition-all group">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
          <Icon className="w-4 h-4 text-slate-400 group-hover:text-[#1B5E20] transition-colors" />
        </div>
        <h4 className="font-bold text-[10px] text-slate-400 uppercase tracking-widest">{label}</h4>
      </div>
      <div className="pl-1">
        <span className="font-bold text-slate-800 text-sm select-all">{value || "--"}</span>
      </div>
    </div>
  );
}
