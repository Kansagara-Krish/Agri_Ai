import { Search, Languages, Bell } from "lucide-react";

export default function DashboardTopNav() {
  return (
    <header className="fixed top-0 left-72 right-0 z-50 h-16 flex justify-between items-center px-8 bg-[#0b1326]/60 backdrop-blur-xl transition-all duration-300">
      <div className="flex items-center gap-6">
        <div className="relative w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            className="w-full bg-surface-container-low border-none rounded-full pl-12 pr-4 py-2 text-sm font-label focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-slate-500 outline-none"
            placeholder="Search farm metrics..."
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="w-10 h-10 flex items-center justify-center rounded-full text-slate-400 hover:bg-primary/10 hover:text-primary transition-all duration-300">
          <Languages className="w-5 h-5" />
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded-full text-slate-400 hover:bg-primary/10 hover:text-primary transition-all duration-300 relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_#4edea3]"></span>
        </button>
        <div className="h-8 w-[1px] bg-outline-variant/20 mx-2"></div>
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="text-right">
            <p className="font-headline text-sm font-bold text-on-surface leading-tight">Farmer J. Doe</p>
            <p className="font-label text-[10px] text-slate-500 tracking-wider">PREMIUM TIER</p>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-primary/20 p-0.5 transition-transform group-hover:scale-105">
            <img
              alt="User Profile"
              className="w-full h-full rounded-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhkX2dBHRRRgS3sO2D2j7AqZRW5uiW24OUcDS5kYZMqAhzzpebWOVzzCVNyIRAz5Rmz9tRQoYC_nOMwhkfaTjmj5D1RyRQXIHHeRMeaxCuCipVmnaJcS0T9tES4odHW1VERPb9tiOncncbFjGsNt-x5rg45WkrLyjH7v97dCyjDTQ_0L6rRGzCmNwlIFK2T50BOGQfve0wXzmyqdPkqKAERb6Tol5EWshdPPfwefjxl1w6sPPAogCTvKBJj1LtCISR1yDCM_oaT3AD"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
