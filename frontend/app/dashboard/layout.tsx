import DashboardSidebar from "../components/DashboardSidebar";
import DashboardTopNav from "../components/DashboardTopNav";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen bg-background">
      <DashboardSidebar />
      <main className="ml-72 min-h-screen pt-20 px-8 pb-12">
        <DashboardTopNav />
        {children}
      </main>
    </div>
  );
}
